var mongoose=require('mongoose');
var bcrypt=require("bcrypt-as-promised");
var Schema = mongoose.Schema;
var UserSchema=new mongoose.Schema({
	first_name: {type: String, required: [true, "First name is required"]},
	last_name: {type: String, required: [true, "Last name is required"]},
	email: {type: String, required: [true, "Email is required"], validate: {validator: function(email){
		return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test(email);
	}, message: "Email must be valid"}, unique: true},
	password: {type: String, required: [true, "Password is required"], minlength: [16, "Password must be at least 16 characters"]},
	bicycles: [{type: Schema.Types.ObjectId, ref: "Bicycle"}]
}, {timestamps: true});
UserSchema.pre("save", function(done){
	bcrypt.hash(this.password, 10).then(hashed_password=>{
		this.password=hashed_password;
		done();
	}).catch(error=>{
		console.log(error);
		done();
	})
})
mongoose.model("User", UserSchema);