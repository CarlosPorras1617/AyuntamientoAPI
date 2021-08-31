const mongoose = require('mongoose');
//url DB
const URL = 'mongodb+srv://admin:admin@cluster0.oggpp.mongodb.net/sensor18b20';
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('MongoDB connected'))
    .catch(err => console.log(err));

module.exports = mongoose;