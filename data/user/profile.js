
const mongoose = require ('mongoose');

const profileSchema = new mongoose.Schema ({
    TenNguoiDung: {
        type:String,
        required:false
    },
    SoDienThoai: {
        type:String,
        required: false
    },
    CMND: {
        type:String,
        required:false
    },
    MaUser: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    __v: false
})
module.exports = mongoose.model('Profile',profileSchema)