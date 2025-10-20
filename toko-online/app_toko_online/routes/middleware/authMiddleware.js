exports.adminOnly = (req, res, next) => {
    const isAdmin = req.body.isAdmin; // Contoh: {"isAdmin":true}
    if (isAdmin === true) {
        console.log('Middleware:akses admin diberikan');
        next(); //lanjutkan
    } else {
        //403 forbidden
        return res.status(403).json({
            succes: false,
            message: 'akses ditolak. endpoitn ini membutuhkan hak admin.'
        })
    }
}