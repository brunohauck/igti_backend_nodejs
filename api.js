const _ = require('lodash');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
var db = require('./modules/daomodule');


var USERS = [
    { 
        'name': 'Bruno de Líbero Hauck Ferreira', 
        'username': 'brunohauck',
        'email':'brunohauck@gmail.com', 
        'phone':'(31)988724779', 
        'password': '123456', 
        'img_url':'https://media.licdn.com/dms/image/C4D03AQGkbLIovbjpEQ/profile-displayphoto-shrink_200_200/0?e=1559174400&v=beta&t=AX0Zd0cT36yL8g2OAFvKCo9K408Mms4YU_Ky4KLIz5g' },
    { 
        'name': 'André Pereira', 
        'username': 'pereira',
        'email':'apereirahauck@gmail.com', 
        'phone':'(31)111111111', 
        'password': '123456', 
        'img_url':'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png' },
];

var PRODUCTS = [
    { 
        'productName': 'Curso IONIC 4', 
        'price': 39.99, 
        'description': 'Curso IONIC 4 do básico ao avançado', 
        'img_url':'https://i.udemycdn.com/course/240x135/1325912_2431.jpg' },
    { 
        'productName': 'Curso Angular 7 com Node Js e Mongo DB', 
        'price': 39.99, 
        'description': 'Curso Angular 7 com Mongo DB do básico ao avançado', 
        'img_url':'https://udemy-images.udemy.com/course/480x270/833442_b26e_3.jpg' 
    },
];


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTION");
    next();
});

app.use(bodyParser.json());
//app.use(expressJwt({secret: 'fdsfljalfldajfldafjdlkafljdaa'}).unless({path: ['/api/auth']}));

app.get('/', function (req, res) {
    res.send('Angular JWT Todo API Server')
});

app.post('/api/auth', function(req, res) {
    const body = req.body;
    const user = USERS.find(user => user.username == body.username);
    if(!user || body.password != '123456') return res.sendStatus(401);
    var token = jwt.sign({userID: user.id}, 'fdsfljalfldajfldafjdlkafljdaa', {expiresIn: '2h'});
    res.send({token});
});

app.post('/api/createuser', function(req, res) {
    const user = req.body;    
    db.createUser(user, function(err, value) {
        if (err) throw err;
        console.log(value);
        if(value){
            res.send({"msg": "sucesso"});
        }else{
            res.send({"msg": "erro"});
        }
    });        
});

app.put('/api/edituser', function(req, res) {
    const user = req.body;   
    console.log(user);     
    db.editUser( user, function(err, value) {
        if (err) throw err;
        console.log(value);
        if(value){
            res.send({"msg": "sucesso"});
        }else{
            res.send({"msg": "erro"});
        }
    });        
});

app.delete('/api/deleteuser/:id', function(req, res) {
    console.log("----->delete")
    const id = req.params.id;   
    console.log(id);     
    db.deleteUser( id, function(err, value) {
        if (err) throw err;
        console.log(value);
        if(value){
            res.send({"msg": "sucesso"});
        }else{
            res.send({"msg": "erro"});
        }
    });        
});

app.get('/api/users', function (req, res){
    res.type('json');
    db.dbGetAllUsers( function(err, value) {
        if (err) throw err;
        console.log(value);
        res.send(value);
    });
});

app.get('/api/products', function (req, res){
    res.type('json');
    db.dbGetAllProducts( function(err, value) {
        if (err) throw err;
        console.log(value);
        res.send(value);
    });
});

app.get('/api/createcollections', function (req, res){
    res.type('json');
    db.createUsersColetion();
    console.log("Criando UserCollection");
    db.createUsers(USERS);
    //db.createProductsCollection();
    //db.createProducts(PRODUCTS);
    console.log("Salvando os usuários estáticos no banco de dados");
});

app.get('/api/getAllUsers', function (req, res){
    res.type('json');
    db.dbGetAllUsers( function(err, value) {
        if (err) throw err;
        console.log(value);
        res.send(value);
    });
});

app.get('/api/getUserById/:id', function (req, res){
    var user_id = req.params.id;
    res.type('json');
    console.log(user_id);
    db.dbGetUserById( user_id, function(err, value) {
        if (err) throw err;
        console.log(value);
        res.send(value);
    });
});

app.listen(4000, function(){
    console.log('API IGTI v2.1');
});

