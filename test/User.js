const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String,
	password: String,
	email: String,
	wishlist:[{
		name: String,
		price : Number,
		address: String,
		id: String
	}]
});

const User  = mongoose.model("user",UserSchema);

module.exports = User;
