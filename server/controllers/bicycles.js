var mongoose=require('mongoose');
var User=mongoose.model("User");
var Bicycle=mongoose.model("Bicycle");
module.exports={
	all: function(req, res){
		if(!req.session._id){
			res.redirect("/");
		}else{
			Bicycle.find({}, function(err, bicycles){
				res.json(err ? err : bicycles);
			});
		};
	},
	random: function(req, res){
		Bicycle.count().exec(function(err, count){
			if(err){
				res.json(err);
			}else{
				Bicycle.findOne().skip(Math.floor(Math.random()*count)).exec(function(err, bicycle){
					res.json(err ? err : bicycle);
				});
			};
		});
	},
	list: function(req,res){
		if(req.session._id==req.params.id){
			Bicycle.find({_user: req.session._id}, function(err, bicycles){
				res.json(err ? err : bicycles);
			});
		}else{
			res.redirect("/");
		};
	},
	create: function(req,res){
		if(req.session._id==req.params.id){
			var bicycle=new Bicycle(req.body);
			bicycle._user=req.session._id;
			bicycle.save(function(err, bicycle){
				if(err){
					res.json(err);
				}else{
					User.findByIdAndUpdate(req.session._id, {$push: {bicycles: bicycle}}, function(err, user){
						res.json(err ? err : {success: true});
					});
				};
			});
		}else{
			res.redirect("/");
		};
	},
	update: function(req,res){
		if(req.session._id==req.params.id){
			Bicycle.update({_id: req.params.b_id, _user: req.params.id}, req.body, function(err){
				res.json(err ? err : {success: true});
			});
		}else{
			res.redirect("/");
		};
	},
	destroy: function(req,res){
		if(req.session._id==req.params.id){
			Bicycle.remove({_id: req.params.b_id, _user: req.params.id}, function(err){
				res.json(err ? err : {success: true});
			});
		}else{
			res.redirect("/");
		};
	}
};