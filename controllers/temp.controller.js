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
    const temps = await tempModel.paginate({fecha: fecha}, optionsPagination);
    //QUERY PARA MOSTRAR TEMPERATURAS ALTAS OCULTAMOS LAS TEMPERATURAS NORMALES Y LAS DEMAS Y SOLO DEJAMOS LAS ALTAS
    /*const query = {hora:0, fecha:0};
    const temps = await tempModel.find({}, query);*/
    res.json(temps);
};

tempController.getTemp = async(req, res) => {
    const temp = await tempModel.findById(req.params.id);
    res.json(temp);
};

module.exports = tempController;