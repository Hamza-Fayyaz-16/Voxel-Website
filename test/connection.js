const mongoose = require('mongoose');

//Connect to mongodb

mongoose.connect('mongodb+srv://hamza:wZRfPcS44tBEyKF@cluster0-qzqvg.mongodb.net/Voxel_Db?retryWrites=true&w=majority').then(function(done){
	console.log("connection established");
}).catch(function(error){
	console.log('connection error: ',error);
});
//mongoose.connection.once('open',function(){
//	console.log("connection established");
//}).on('error',function(error){
//	console.log('connection error: ',error);
///});