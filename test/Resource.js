const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
	name: String,
	address: String,
	price: Number,
	category: String
});

const  Resource  = mongoose.model("Resource",ResourceSchema);
module.exports = Resource;