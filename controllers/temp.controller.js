const { query } = require('express');
const tempModel = require('../models/temp.model');
const tempController = {};


//Methods
tempController.getTemps = async(req, res) => {
    //argumentos query en la url para el paginado
    const { page, perPage, fecha } = req.query;
    const optionsPagination={
        page:parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10)|| 10
    };


    //ADAPTAR ESTE CODIGO DEBAJO APRA QUE EN BASE A LA FECHA DEL DIA ACTUAL, ELIMINE LOS REGISTROS DE LA BASE DE DATOS
    //MANDANDOLE EL ID DEL MAP - AHORITA ELIMINA LAS TEMPERATURAS CON EL ID ESPECIFICO


    tempsNo = await tempModel.find()
    //console.log(typeof(tempsNo));
    //mapear el objeto
    for (var _id in tempsNo){
        if(tempsNo.hasOwnProperty(_id)){
            //obtenemos el valor especifico de la temperatura
            //tempCicloActua = tempsNo[temperatura].temperatura;
            idTempForEachTemp = tempsNo[_id].id;
            //console.log(idTempForEachTemp);
            if(idTempForEachTemp == '61185e2f74fece0f7a9064ce'){
                if(tempController.deleteTemp('61185e2f74fece0f7a9064ce')){
                    console.log('Temperatura Borrada')
                }
            }else{
                console.log('No se pudo eliminar la temperatura')
            }
        }
    }


    //si hay una fecha en la url
    if(fecha){
        var temps = await tempModel.paginate({fecha: fecha}, optionsPagination);
    }
    //si no hay una fecha mostrará todas las temperaturas
    else{
        var temps = await tempModel.paginate({}, optionsPagination);
    }
    //QUERY PARA MOSTRAR TEMPERATURAS ALTAS OCULTAMOS LAS TEMPERATURAS NORMALES Y LAS DEMAS Y SOLO DEJAMOS LAS ALTAS
    /*const query = {hora:0, fecha:0};
    const temps = await tempModel.find({}, query);*/
    res.json(temps);
};

//metodo elimina una temperatura especifica -adaptar a fechas-
tempController.deleteTemp = async(id) =>{
    await tempModel.findByIdAndDelete(id);
};

tempController.getTemp = async(req, res) => {
    const temp = await tempModel.findById(req.params.id);
    res.json(temp);
};

module.exports = tempController;