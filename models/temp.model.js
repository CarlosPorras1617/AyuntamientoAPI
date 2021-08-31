const mongoose = require('mongoose');
const { Schema } = mongoose;

//paginar
const mongoosePaginate = require('mongoose-paginate-v2');

const TempSchema = new Schema({
    fecha: {type: String, required: true},
    hora: {type: String, required: true},
    temperatura: {type: Number, required: true},
    temperaturamedia: {type: Number, required:true },
    temperaturalta: {type: Number, required: true}
});

//paginar
TempSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('temperaturas', TempSchema,);