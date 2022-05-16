const express =  require('express');
const res = require('express/lib/response');
const router = express.Router();

const connection = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add',(req,resp)=> {
    res.send('recibido');
});


module.exports = router;