var express = require('express')
var app = express()
var router = express.Router()
var connection = require("../../config/dbConfig")
var item
router.get('/list', function(req, res) {
    getList(req, res)
})

router.get('/add', function(req, res){
    res.render('./board/add.ejs')
})

router.post('/add', function(req, res){

    var title = req.body.title
    var content = req.body.content
    var writer = req.body.writer

    var query = connection.query('insert into board (title, content, writer) values (?,?,?)', [title, content, writer], function(err, rows){
        res.redirect('/board/list')
    })
})

router.get('/detail/:idx', function(req, res){
    var idx = req.params.idx
    item = 'detail'
    getItem(item, idx, req, res)
})

router.get('/update/:idx', function(req, res){
    var idx = req.params.idx
    item = 'update'
    getItem(item, idx, req, res)
})

router.post('/update', function(req, res){
    var idx = req.body.idx
    var title = req.body.title
    var content = req.body.content
    var writer = req.body.writer
    item = 'update'

    var query = connection.query('update board set title = ? , content = ? , writer = ? where idx = ?', [title, content, writer, idx], function(err){
       getItem(item, idx, req, res)
    })

})

router.get('/delete/:idx', function(req, res){
    console.log("delete")
    var idx = req.params.idx
    var query = connection.query('delete from board where idx = ?', [idx], function(err){
        getList(req, res)
    })
})

function getList(req, res){
    connection.query('select * from board', function(err, rows){
        res.render('./board/list.ejs', {'rows' : rows})    
    })
}

function getItem(item, idx, req, res){
    var query = connection.query('select * from board where idx = ?', [idx], function(err, rows){
        res.render('./board/'+item+'.ejs', {'rows' : rows})
    })
}
module.exports = router