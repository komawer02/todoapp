const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb+srv://root:ASDun0304@cluster0.eatnaco.mongodb.net/?retryWrites=true&w=majority', (err, client)=>{
    if(err){ return console.log(err);}

    db = client.db('todoapp');
    db.collection('post').insertOne({이름: 'john', 나이: 20}, (err, result)=>{
        console.log('저장완료');
    });
    app.listen(8080, function(){
        console.log('listening on 8080');
    });

})



app.get('/', (요청, 응답) => {
    응답.sendFile(__dirname + '/index.html')
})
app.post('/add', function(요청, 응답){
    응답.send('전송완료');
    db.collection('post').insertOne({제목 : 요청.body.title, 날짜 : 요청.body.date}, (err, result) =>{
        console.log('저장완료');
    })
})
app.get('/list', function(요청, 응답){
    
    db.collection('post').find().toArray(function(err, result){
        응답.render('list.ejs', {posts : result});
    });
    

})