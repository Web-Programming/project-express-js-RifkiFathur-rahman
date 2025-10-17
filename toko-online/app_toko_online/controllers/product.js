var products = require('../../data/products.json');
var Product = require("../models/products");
const index = async (req, res) => {
 	try {
        //gunakan find({})
        //untuk mengambil seluruh data dari collection
        const prod = await Product.find({}); 
        res.render('index', {
            title: 'Toko Online Sederhana - Ini Dari Mongo DB',
            products: prod
        });
    }catch(err){
        res.status(500).send("Gagal memuat produk");
    }
}; 

const detail = async (req, res) => {
    try{
        //const productId = parseInt(req.params.id); //Tangkap ID dari URL
        //const product = products.find(p => p.id === productId); //Cari produk by id
        
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if(!product){ //jika produk tidak ditemukan
            return res.status(404).send('Produk tidak ditemukan!');
        }
        res.render('product-detail',
            {
                title : product.name,
                product : product
            }
        );
    }catch(err){
        res.status(404).send("Gagal memuat detail produk");
    }
}; 

//membuat rest api
const apiall = async (req, res) => {
 	try {
        const prod = await Product.find({}); 
        res.status(200).json(
            {
                status: true,
                message: "Data produk berhasil diambil",
                data: prod
            });
    }catch(err){
        res.status(500).json({
            status : false,
            message: "Gagal memuat produk"
        });
    }
}; 

const create = async(req, res)=>{
    try{
        //ambil data nya
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock || 0
        });

        //simpan ke db
        const product = await newProduct.save();

        //kirim respon
        res.status(200).json({
            status : true,
            message : "produk berhasil disimpan"
            data : product
        });
    }catch(err){
        res.status(500).json({
            status : false,
            message : "Internal Server Eror"
        });
    }
};

const detailproduk = async (req, res) => {
    try {
        // Ambil id produk dari parameter URL
        const productId = req.params.id;

        // Cari produk berdasarkan id di MongoDB
        const product = await Product.findById(productId);

        // Jika produk tidak ditemukan
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Produk tidak ditemukan"
            });
        }

        // Jika ditemukan, kirim data JSON ke client (Postman)
        res.status(200).json({
            status: true,
            message: "Detail produk berhasil diambil",
            data: product
        });

    } catch (err) {
        // Jika ada error (misal format id salah)
        res.status(500).json({
            status: false,
            message: "Gagal memuat detail produk"
        });
    }
};

const update = async(req, res) =>{

};

const remove = async(req, res) =>{

};

module.exports = { index, detail, apiall, create, detailproduk,update,remove }; 