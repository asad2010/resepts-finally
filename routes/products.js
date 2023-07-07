const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
router.get('/', (req, res) => {
    res.render('index', { products });
})
router.get('/one/:id', (req,res)=>{
    let produc = products.find(el=>el.id == req.params.id)
    res.render('one', {produc})
})
router.get('/products', (req, res) => {

    const type = req.query.type;
    const filteredProducts = products.filter(product => product.type === type);
    res.render('index', { products: filteredProducts });

});
router.get('/search', function (req, res) {
    const query = req.query.query;
    fs.readFile('./products.json', function (err, data) {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            const products = JSON.parse(data);
            const filteredProducts = products.filter(function (product) {
                return product.name.toLowerCase().includes(query.toLowerCase());
            });
            res.render('search', { products: filteredProducts });
        }
    });
});

module.exports = router;