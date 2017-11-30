var mongoose=require('mongoose');
var bcrypt=require("bcrypt-as-promised");
var Schema = mongoose.Schema;
var BicycleSchema=new mongoose.Schema({
	title: {type: String, required: [true, "Title is required"]},
	description: {type: String, required: [true, "Description is required"], maxlength: [200, "Description must be at most 200 characters"]},
	price: {type: Number, required: [true, "Price is required"], min: [1, "Price must be at least $1"]},
	location: {type: String, required: [true, "Location is required"]},
	image: {type: String, required: [true, "Image is required"]},
	_user: {type: Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true});
mongoose.model("Bicycle", BicycleSchema);