const express = require('express');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const MarioChar = require('./test/MarioChar');
const User = require('./test/User');
const Resource= require('./test/Resource');
const url = require("url");

app.set('view engine', 'ejs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended:false}));
app.use('/img',express.static(path.join(__dirname,'/img')));

app.use('/model',express.static(path.join(__dirname,'/model')));
app.use('/fonts',express.static(path.join(__dirname,'/fonts')));
app.use(express.static(path.join(__dirname,'public')));
app.use('/model',express.static(path.join(__dirname,'/model')));


var userId="5df9f29c12562013c0e1e6d3";

// app.post('/search',(req,res,next)=>{

// 	console.log("kkkk")
// })

//for information through database query done through get request
app.get("/profile", function(req,res){
	//do database query using req.params.id
	//inject back to database through send
	//res.send("You requested this resource" + req.params.id);
	//using ejs template engine to handle dynamic content use the given link
	//https://www.youtube.com/watch?v=oZGmHNZv7Sc&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp&index=25 
	res.render('profile.ejs');
});



app.get("/upload", function(req,res){
	 

	const resource = Resource({name:'Voxel',address:"/img/logo.png",category:'Logo',price:500});
		resource.save().then(function(result){
		console.log(result);
	});
});

// app.get('/Product/:productId',(req,res,next)=>{
// 	const productId = req.params.productId;
// 	console.log(productId);

// 	Resource.findOne({_id:productId}).then((product)=>{
// 		console.log(product);
// 		res.render('product.ejs',{product:product});
// 	})
// })


app.post("/searchCategory",function(req,res){
	Resource.find({"category":/.*photos.*/i}).then((result)=>{
		console.log(result);
		res.render('store.ejs',{resource:result})
	});
})
app.post('/viewProduct',(req,res,next)=>{

	const productId = req.body.productId;
	console.log(productId);
	Resource.findOne({_id:productId}).then((product)=>{
		console.log(product);
//		var wishlist=[]
		if(product.category== "3D"){
			res.render('product3D.ejs');
		}

		res.render('product.ejs',{product:product});
	})
})
app.post('/delete',function(req,res){
	//console.log('_id',req.params._id);
	//console.log('uid',req.params.uid);
	console.log(req.body._id);
	User.findOne({_id:userId}).then((user)=>{
	Resource.find().then((products)=>{

	user.updateOne({$pull:{wishlist:{_id:req.body._id}}}).then((result)=>{
		//User.findOne({_id:userId}).then((user)=>{
		//console.log('her',user.wishlist);
		res.redirect('/index');
		//res.render('index.ejs',{userId:req.params.uid,prods:products,wishlist:user.wishlist})

//		result.wishlist.removeOne({id:req.pararms.pid}).then((record)=>{
		//result.update({$pull:{result.wishlist:{id:req.pararms.pid}}}).then((record)=>{	
		//res.redirect('/',{userId:uid,prods:products,wishlist:result.wishlist});

	}).catch((err)=>{
		console.log(err);
			});	
	})})})
//});

app.post('/search',function(req,res){
	const search = req.body.search;
	
	Resource.find({name :{$regex:search,$options:"$i"} }).then((products)=>{
		User.findOne({_id:userId}).then((result)=>{
		res.render('store.ejs',{userId:userId,
			prods:products,
			wishlist:result.wishlist});
		}).catch((err)=>{
		console.log(err);
			});	
	});
})
app.get("/store", function(req,res){
	Resource.find({category:"Photos"}).then((products)=>{
	console.log(products);
		User.findOne({_id:userId}).then((result)=>{
		res.render('store.ejs',{userId:userId,
			prods:products,
			wishlist:result.wishlist});
		}).catch((err)=>{
		console.log(err);
			});	
	});
});
app.get("/index", function(req,res){
	Resource.find({$or:[{category:"Photos"},{category:"3D"},{category:"Posters"},{category:"Logo"}]}).then((products)=>{
		User.findOne({_id:userId}).then((result)=>{
		res.render('index.ejs',{userId:userId,
			prods:products,
			wishlist:result.wishlist});
		}).catch((err)=>{
		console.log(err);
			});	
	});
});

app.post('/index:WishProduct',(req,res,next)=>{
	// try doing another post
	const productId = req.body.productId;
	 //const userId = req.body.userId;
	const userId = req.body.userId;
	console.log('Productid',productId);
	console.log("Userid",userId);
	User.findOne({_id:userId}).then(function(record){
		Resource.findOne({_id:productId}).then(function(resource){
		console.log(record);
		record.wishlist.push({id:productId,price:resource.price,address:resource.address,name:resource.name});
		record.save().then(function(result){
		console.log("Result basically userobject",result);
		//	User.findOne({_id:userId}).then((result)=>{
		//	console.log("heere",result.wishlist[0].address);
			Resource.find().then((products)=>{
			res.render('index.ejs',{userId:result._id,prods:products,wishlist:record.wishlist});
			//res.redirect('/');
		})
		}).catch((err)=>{
		console.log(err);
			});	
	});
	});
})

app.post('/signin',function(req,res){
	const username = req.body.username;
	const password = req.body.password;
	User.findOne({name:username,password:password}).then((result)=>{
		Resource.find().then((products)=>{
		console.log(result);
		if(result!=null){
			userId = result._id;
			res.render('index.ejs',{userId:result._id,prods:products,wishlist:result.wishlist});
		}
		else{
			res.render('register.ejs');
		}
	});
});
});

app.post('/store:WishProduct',(req,res,next)=>{
	// try doing another post
	const productId = req.body.productId;
	 //const userId = req.body.userId;
	const userId = req.body.userId;
	console.log('Productid',productId);
	console.log("Userid",userId);
	User.findOne({_id:userId}).then(function(record){
		Resource.findOne({_id:productId}).then(function(resource){
		console.log(record);
		record.wishlist.push({id:productId,price:resource.price,address:resource.address,name:resource.name});
		record.save().then(function(result){
		console.log("Result basically userobject",result);
		//	User.findOne({_id:userId}).then((result)=>{
		//	console.log("heere",result.wishlist[0].address);
			Resource.find().then((products)=>{
			res.redirect('/store');
			//res.render('store.ejs',{userId:result._id,prods:products,wishlist:record.wishlist});
			//res.redirect('/');
		})
		}).catch((err)=>{
		console.log(err);
			});	
	});
	});
})
app.post('/createAccount',function(req,res){
const username = req.body.username;
const email= req.body.email;
const password=req.body.password;
const wishlist=[];
	const user = User({name:username,email:email,password:password})
	user.save().then(function(result){
		console.log(result);
	});
	
});
app.get("/logout",(req,res)=>{
	userId = "5df9f29c12562013c0e1e6d3";
	Resource.find().then((products)=>{
	User.findOne({_id:userId}).then((result)=>{
	res.render('index.ejs',{userId:userId,
		prods:products,
		wishlist:result.wishlist});
	}).catch((err)=>{
	console.log(err);
		});	
	});

})
app.get("/product", function(req,res){
	res.render('product.ejs');
});

app.get("/store3D",(req,res)=>{
	Resource.find({category:"3D"}).then((model)=>{
		User.findOne({_id:userId}).then((result)=>{
		//	res.render('store.ejs',{userId:userId,
		//prods:model,
		//wishlist:result.wishlist});
		//res.redirect('store.ejs');
		res.render('store.ejs',{userId:userId,
		prods:model,
		wishlist:result.wishlist});
	})
	})
	})

app.get("/product3D", function(req,res){
	res.render('product3D.ejs');
});

app.get("/checkout", function(req,res){
	res.render('checkout.ejs');
});

app.get("/register", function(req,res){
	res.render('register.ejs');
});


app.post('/download', function(req,res){

  var file  = __dirname + req.body.address;

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});


/*app.use((req,res,next)=>{
	console.log('dhii')
})*/
mongoose.connect('mongodb+srv://hamza:wZRfPcS44tBEyKF@cluster0-qzqvg.mongodb.net/Voxel_Db?retryWrites=true&w=majority').then(function(done){
	console.log("connection established");
	app.listen(3000);
}).catch(function(error){
	console.log('connection error: ',error);
});


