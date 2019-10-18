const express=require('express');
const app=express();
const expressHandlebars  = require('express-handlebars');
const path=require('path');




var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost:27017/demonode';
var databaseName='demonode';
//var databaseName=configRoute.databaseName;// Store Database Name
var collectionName="userdata"; // Define Collection Name

connectDb= function(callback){
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db){
        if(err){
            throw err;
        }else{
            console.log("Database Connected");
        }
        db.on('close', () => { console.log('MongoDB-> Closed connection'); });
        callback(err, db);
    })
}




// Init App

// Init Express Handlebars
// app.engine('handlebars', expressHandlebars());
app.engine(
    "handlebars",
    expressHandlebars({
        extname: '.handlebars',
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname,'views/theme'),
        partialsDir:path.join(__dirname,'views/includes')
    })
  );
app.set('view engine', 'handlebars');

app.get('/', function(req, res){

    var item={       
        Name:'raja',
        Age:'24',
    }
    console.log(item);
    //return
    connectDb(function(err, client){
        if(err){
            throw err;
        }else{
            const db=client.db(databaseName); // Enter Database Name
            db.collection(collectionName).insertOne(item, function(err,result){
                client.close();
                if(err){
                    throw err;
                }else{
                    console.log(result);
                }
                
            })
        }                
    });

    res.render('view');
})

app.get('/add', function(req, res){
    res.render('add');
})







//start server
app.listen(5000, function(){
    console.log("the server is running 5000");
})