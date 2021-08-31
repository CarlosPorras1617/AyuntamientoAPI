const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {mongoose} = require('./database');
//Config
const app = express();
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: '*'}));

//Routes
app.use('/api/18b20', require('./routes/temp.routes'));

//Server Response PORT
app.listen(app.get('port'), ()=>{
    console.log('Server en el puerto: ', app.get('port'))
});