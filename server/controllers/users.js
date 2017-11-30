var mongoose=require('mongoose');
var User=mongoose.model("User");
module.exports={
	one: function(req, res){
		if(!req.session._id){
			res.redirect("/");
		}else{
			User.findById(req.params.id, function(err, user){
				if(err){
					res.json(err);
				}else{
					user.password=null;
					res.json(user);
				};
			});
		}
	},
	create: function(req, res){
		var user=new User(req.body);
		user.save(function(err, user){
			if(err){
				res.json(err);
			}else{
				req.session._id=user._id;
				res.json({success: user._id});
			};
		});
	}
};