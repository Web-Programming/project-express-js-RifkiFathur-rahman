var express = require('express');
var router = express.Router();
var products = require('../../data/products.json');
var mainControllers = require('../controllers/main')
/* GET home page. */
router.get('/',mainControllers.index)

/* GET search product. */
//router.get('/search', function(req, res, next) {
  //const q = req.query.q ? req.query.q.toLowerCase() : "";

  //console.log("Search query:", q);

  // filtering product
  //let filtered = products;
  //if (q) {
  //  filtered = products.filter(p => p.name.toLowerCase().includes(q));
  //}

  //res.render('index', { 
    //title: 'Hasil Pencarian', 
    //products: filtered, 
    //query: req.query.q || "" 
  //});
//});

router.get('/',mainControllers.search)

console.log("Route index loaded");

module.exports = router;