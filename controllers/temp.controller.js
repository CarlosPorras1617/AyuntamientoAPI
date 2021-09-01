const { query } = require('express');
const tempModel = require('../models/temp.model');
const tempController = {};


//Methods
tempController.getTemps = async(req, res) => {
    //argumentos query en la url para el paginado
    const { page, perPage, id } = req.query;
    const optionsPagination={
        page:parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10)|| 10
    };

    //tempsNo = await tempModel.find()
    //mapear el objeto
    for (var dataFromApi in tempsNo = await tempModel.find()){
        if(tempsNo.hasOwnProperty(dataFromApi)){
            //obtenemos el valor especifico de la temperatura y fecha de cada una
            idTempForEachTemp = tempsNo[dataFromApi].id;
            fechaTempForEachTemp = tempsNo[dataFromApi].fecha;
            //comprueba si las temperaturas son las actuales, de no ser asi, las elimina
           if(fechaTempForEachTemp != tempController.getActualDate()){
                if(tempController.deleteTemp(idTempForEachTemp)){
                    console.log('Temperaturas No Actuales Borradas')
                }
            }
        }
    }
    //filtro por ID, aunque es inecesario, debido a que siempre las elimina si no son actuales
    if(id){
        var temps = await tempModel.paginate({_id: id}, optionsPagination);
    }
    //si no hay un ID en la url mostrará todas las temperaturas
    else{
        var temps = await tempModel.paginate({}, optionsPagination);
    }
    res.json(temps);
};

//metodo agarra fecha actual
tempController.getActualDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

//metodo elimina una temperatura especifica -adaptar a fechas-
tempController.deleteTemp = async(id) =>{
    await tempModel.findByIdAndDelete(id);
};

tempController.getTemp = async(req, res) => {
    const temp = await tempModel.findById(req.params.id);
    res.json(temp);
};

module.exports = tempController;