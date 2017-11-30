var mongoose=require('mongoose');
var User=mongoose.model("User");
var bcrypt=require("bcrypt-as-promised");
module.exports={
	create: function(req, res){
		var elapsed=Date.now()-req.session.first;
		if(req.session.attempts>=5&&elapsed<3.6e+6){
			res.json({success: false, restricted: 3.6e+6-elapsed});
		}else{
			if(elapsed>=3.6e+6||!req.session.attempts){
				req.session.attempts=1;
				req.session.first=Date.now();
			}else if(req.session.attempts<5){
				req.session.attempts++;
			}
			User.findOne({email: req.body.email}, function(err, user){
				if(err){
					res.json({success: false});
				}else{
					bcrypt.compare(req.body.password, user.password).then(function(){
						req.session.attempts=0;
						req.session._id=user._id;
						res.json({success: user._id});
					}, function(){
						res.json({success: false});
					});
				};
			});
		};
	},
	destroy: function(req, res){
		if(req.session._id==req.params.id){
			req.session._id=null;
			res.json({success: true});
		}else{
			res.json({success: false});
		}
	}
};