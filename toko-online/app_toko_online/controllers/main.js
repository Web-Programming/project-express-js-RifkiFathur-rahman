var products = require('../../data/products.json');

const index = (req, res) => {
    res.render('index', {
    title: 'Toko Online Sederhana',
    products: products
  });
};

const search = (req, res, next) => {
  const q = req.query.q ? req.query.q.toLowerCase() : "";

  console.log("Search query:", q);

  let filtered = products;
  if (q) {
    filtered = products.filter(p => p.name.toLowerCase().includes(q));
  }

  res.render('index', { 
    title: 'Hasil Pencarian', 
    products: filtered, 
    query: req.query.q || "" 
  });
};

module.exports = { index };
module.exports = { search };