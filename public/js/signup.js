
//classes
//factory pattern for user creation
class User{

  constructor (name, password){
    this.name = name;
    this.password = password;
  }

}
/*
class admin{

  constructor (name, password){
    this.name = name;
    this.rank = password;
    this.type = "admin";
  }

  check(){
    console.log('$(this.name) is checking')
  }
}

class student{

  constructor (name, password){
    this.name = name;
    this.password = password
    this.type = "student";
  }

  check(){
    console.log('$(this.name) is student')
  }
} */
class userFactory {
  constructor() {
    this.createUser = function() {
      let user;
      user = new User();
/*      if (type === 'teacher') user = new teacher();
      else if (type === 'admin') user = new admin();
      else if (type === 'student') user = new student();*/
      return user;
    };
  }
}
//singleton pattern for database
class dataBase{

  constructor(data) {
    if (database.exists) {
      return database.instance;
    }
    this._data = data;
    database.instance = this;
    database.exists = true;
    return this;
  }

    getData() {
      return this._data;
    }

    setData(data) {
      this._data = data;
    }

}

//main code
//database to be here but we don't know it so we use array for now
//user_arr = []

const factory = new userFactory();


function myFunction() {
  var name = document.getElementById('user').value;
  var password = document.getElementById('pass').value;
/*  var occ;

  var x = document.getElementsByName('occupation');
  for (var i = 0, length = x.length; i < length; i++){
    if (x[i].checked)
    {
    // do whatever you want with the checked radio
    occ = x[i].value;
    // only one radio can be logically checked, don't check the rest
    break;
    }*/
  //}
//  addUser(occ,name,password);
  addUser(name,password);
}

//usefunction to add admin or teacher
function addUser(name,password){
  let newUser = factory.createUser();
  newUser.name = document.getElementById("user").value;
  newUser.password = password;
  localStorage.setItem(name,password);
  //user_arr.push(newUser);
  //console.log(user_arr);
}


function login() {
  var name = document.getElementById("userlogin").value;
  var password = document.getElementById("passlogin").value;
  var type;
  if(localStorage.getItem(name)!=null){
    if (localStorage.getItem(name)==password) {
      window.location.href = 'file:///C:/Users/Hamza/Desktop/Voxel/checkout.html';
    }
    else{
      alert('Wrong password');
    }
  }
  /*for (var i=0 ; i < user_arr.length;i++){
    if (user_arr[i]["name"]==name && user_arr[i]["password"]==password){
      type = user_arr[i]["type"];
      if (type == "teacher"){
        window.location.href = 'prac2.html';
      }
      else if (type == 'admin'){
        //u Can change the target url for the respecctive view
        window.location.href = "prac1.html";
      }

      else if (type == 'student'){
       window.location.href = "prac.html";; */
      
  else{
    alert("Not a registered user");
      
    }
  }
function login_proxy(){
  login();
}

/*function user_list(){
    console.log("here");
    console.log(user_arr)
    for (var i =0 ; i<user_arr.length;i++){
    console.log("here");
    console.log(user_arr[i]["name"]);

  }
}
  function edit(){
    var content = document.getElementById('content').value;
    console.log(content);
    var div=document.getElementById('ideas');
    div.innerHTML += content;

  }*/
// //usefunctionto
// function addTeacher(name,rank){
//  let newUser = factory.createUser('teacher');
//  newUser.name = name;
//  newUser.rank = rank;
//  user_arr.push(newUser);
// }

//how to use function
//addUser('teacher','Ahmad','1');
//console.log(user_arr[0]);