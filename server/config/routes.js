var users=require('../controllers/users.js');
var sessions=require('../controllers/sessions.js');
var bicycles=require('../controllers/bicycles.js');
module.exports=function(app){
	app.get("/users/:id", function(req, res){
		users.one(req, res);
	});
	app.post("/users", function(req, res){
		users.create(req, res);
	});
	app.post("/sessions", function(req, res){
		sessions.create(req, res);
	});
	app.delete("/sessions/:id", function(req, res){
		sessions.destroy(req, res);
	});
	app.get("/bicycles", function(req, res){
		bicycles.all(req, res);
	});
	app.get("/bicycles/random", function(req, res){
		bicycles.random(req, res);
	});
	app.get("/users/:id/bicycles", function(req, res){
		bicycles.list(req, res);
	});
	app.post("/users/:id/bicycles", function(req, res){
		bicycles.create(req, res);
	});
	app.put("/users/:id/bicycles/:b_id", function(req, res){
		bicycles.update(req, res);
	});
	app.delete("/users/:id/bicycles/:b_id", function(req, res){
		bicycles.destroy(req, res);
	});
	app.all("*", (req,res,next)=>{
        res.sendFile(path.resolve("./public/dist/index.html"));
    });
};