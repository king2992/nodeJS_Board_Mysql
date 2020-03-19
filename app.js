var express = require('express')
var app = express()
var router = require('./router/router')
var path = require('path')
var bodyParser = require('body-parser')

app.listen(3000)

app.get('/', function(req,res){
    res.redirect('/board/list')
})

app.set('view engine', 'ejs') //view engine

app.use('/node_modules',express.static('node_modules')) //static file path
app.use('/js',express.static('js')) //static file path
app.use(bodyParser.json()) //post pattern get Parameter
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)