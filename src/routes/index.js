const express =  require ('express');
const router = express.Router();


router.get ('/', (req, res) =>{
        res.log ('fallando');
    });

module.exports = router;
