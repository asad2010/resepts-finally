const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser')
const todosRouter = require('./routes/products')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')
app.use('/', todosRouter)
app.listen(3000, ()=>{
    console.log(`server running on port 3000`);
})

