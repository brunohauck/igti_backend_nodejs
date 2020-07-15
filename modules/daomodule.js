var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017";
var url = "mongodb+srv://brunohauck:q8DYwYy95uVdz8bV@cluster0.gqghb.gcp.mongodb.net/mydb?retryWrites=true&w=majority";

exports.createUsersColetion = function (){
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.createCollection("users", function(err, res) {
          if (err) throw err;
          console.log("Users Collection created!");
          db.close();
        });
      }); 
};

exports.createUsers = function (users){
    MongoClient.connect(url, { useNewUrlParser: true } , function(err, db ) {
        if(err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("users").insertMany(users, function(err, res){
            if(err) throw err;
            db.close();
        });
    });
}

exports.createUser = function (user,callback){
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("users").insertOne(user, function(err, res) {
            if(err)
            {
              callback(err,false);
            }
            else{
                var result = true
                db.close();
                callback(null,result);
            }            
        });
    });
};


exports.deleteUser = function (id,callback){
    var ObjectID = require('mongodb').ObjectID; 
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { _id : ObjectID(id) };
        dbo.collection("users").deleteOne(query,  { upsert: true }, function(err, res) {
            if(err)
            {
              callback(err,false);
            }
            else{
                var result = true
                db.close();
                callback(null,result);
            }            
        });
    });
};

exports.editUser = function (user,callback){
    var ObjectID = require('mongodb').ObjectID; 
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { _id : ObjectID(user._id) };
        var newvalues = 
        { $set: 
            { 
            "name": user.name, 
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "password": user.password,
            },
        };
        dbo.collection("users").updateOne(query, newvalues, { upsert: true }, function(err, res) {
            if(err)
            {
              callback(err,false);
            }
            else{
                var result = true
                db.close();
                callback(null,result);
            }            
        });
    });
};

exports.dbGetUserById = function (userId,callback) {
    var ObjectID = require('mongodb').ObjectID; 
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var query = { _id : ObjectID(userId) };
      dbo.collection('users').find(query).toArray(function(err,result){
        if(err)
        {
          callback(err,null);
        }
        if(result)
          callback(null,result);
      });
    });
};

exports.dbGetAllUsers = function (callback){
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("users").find({}).toArray(function(err, result) {
            if(err)
            {
              callback(err,null);
            }
            if(result){
                db.close();
                callback(null,result);
            }            
        });
    });
};

//------------------------------------Products-------------------------------------------------------------

//Cria uma função já no padrão ES6 
exports.createProductsCollection = function (){
    // Conecta no banco de dados
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        // Define o nome do banco de dados
        var dbo = db.db("mydb");
        // Cria a col
        dbo.createCollection("products", function(err, res) {
          // Caso der erro imprime o erro no terminal  
          if (err) throw err;
          console.log("Products Collection created!");
          // Fexa a conexão com banco de dados
          db.close();
        });
      }); 
};

exports.createProduct = function (product,callback){
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("products").insertOne(product, function(err, res) {
            if(err)
            {
              callback(err,false);
            }
            else{
                var result = true
                db.close();
                callback(null,result);
            }            
        });
    });
};




exports.editProduct = function (product,callback){
    var ObjectID = require('mongodb').ObjectID; 
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { _id : ObjectID(product._id) };
        var newvalues = 
        { $set: 
            { 
            "productName": product.productName, 
            "price": product.price,
            "description": product.description,
            "img_url": product.img_url,
            },
        };
        dbo.collection("products").updateOne(query, newvalues, { upsert: true }, function(err, res) {
            if(err)
            {
              callback(err,false);
            }
            else{
                var result = true
                db.close();
                callback(null,result);
            }            
        });
    });
};

exports.deleteProduct = function (id,callback){
    var ObjectID = require('mongodb').ObjectID; 
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { _id : ObjectID(id) };
        dbo.collection("products").deleteOne(query,  { upsert: true }, function(err, res) {
            if(err)
            {
              callback(err,false);
            }
            else{
                var result = true
                db.close();
                callback(null,result);
            }            
        });
    });
};

// foi criada um função onde passamos por parâmetro nosso Json 
exports.createProducts = function (products){
    // conecta no banco de dados
    MongoClient.connect(url, { useNewUrlParser: true } , function(err, db ) {
        if(err) throw err;
        // define qual é banco de dados
        var dbo = db.db("mydb");
        // insere um Json com uma lista de produtos
        // Obs a função "insertMany" é especícica para uma lista
        // Para inserir somente um produto você deve usar "insertOne"
        dbo.collection("products").insertMany(products, function(err, res){
            if(err) throw err;
            db.close();
        });
    });
}

exports.dbGetProductById = function (productId,callback) {
    var ObjectID = require('mongodb').ObjectID; 
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var query = { _id : ObjectID(productId) };
      dbo.collection('products').find(query).toArray(function(err,result){
        if(err)
        {
          callback(err,null);
        }
        if(result)
          callback(null,result);
      });
    });
};

// um ponto importante dessa função e definição de um callback que 
// vai retornar a informação para o ponto do sistema que executamos
// essa função assincrona que no caso é nosso arquivo api.js
exports.dbGetAllProducts = function (callback){
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        // realiza um find na coleção products que vai retornar um Json com todos
        // os produtos cadastrados nessa coleção. 
        dbo.collection("products").find({}).toArray(function(err, result) {
            if(err)
            {
              // em caso de erro retorna o erro  
              callback(err,null);
            }
            if(result){
                db.close();
                // em caso de sucesso será retornado a lista de produtos cadastrada no
                // banco de dados
                callback(null,result);
            }            
        });
    });
};








