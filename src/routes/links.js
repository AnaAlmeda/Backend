const express =  require('express');
const res = require('express/lib/response');
const pool = require('../database');
const router = express.Router();

const connection = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req,resp)=> {
    const {title, url, description} = req.body;
    const newBody = {
        title,
        url,
        description
    };   
    await pool.query('INSERT INTO links set ?', [newBody]);


    res.send('recibido');
});


module.exports = router;