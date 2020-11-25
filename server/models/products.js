const mongoose = require('mongoose');


let Schema=mongoose.Schema;

var productSchema = new Schema({
    name: { type: String, required: [true, 'the name is necessary'] },
    priceunit: { type: Number, required: [true, 'the unit price is necessary'] },
    description: { type: String, required: false },
    img: { type: String, required: false },
    available: { type: Boolean, required: true, default: true },
    categorie: { type: Schema.Types.ObjectId, ref: 'Categorie', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Product', productSchema);

