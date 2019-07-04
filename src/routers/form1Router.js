const express = require('express');
const instantData = require('../connection/collectionConnect');
const stationData = require('../utils/stationData'); // mongodb aggregate
const calcDSV = require('../utils/wallinLogic');
const moment = require('moment-timezone');

// const geocoding = require('../utils/geocoding'); // logic
const router = express.Router();

const newDate = new Date();


router.post('/form1',  async (req, res, next)=>{

    try{

    
        const inputDate = new Date(req.body.emdate);
        const hvDate = new Date(req.body.hvdate);
        // const address = req.body.address;
        const stateSelected = req.body.states;
        const emdate = moment(inputDate);
        // const emdate7 = emdate.clone().add(7, 'days');
        const hvdate = moment(hvDate);
        let currentDate = moment().format(newDate.toISOString());
        // geocoding.geocoding(address, console.log)

        if(emdate > currentDate){
            return res.render("errPage", {
                errMsg: "Emergence date picked is beyond current date"
            })
        }

        if(hvdate > currentDate){
            return res.render("errPage", {
                errMsg: "Harvest date picked is beyond current date"
            })
        }

        let stationDataCursor = stationData.filteredData(instantData, inputDate, hvDate, stateSelected);

    
        stationDataCursor.toArray().then(async (docArr)=>{
                
                return await Promise.all(docArr.map(async function(val, ind){

                    try {
                        const feature = await calcDSV.calcDSV(val);                        
                        return feature

                    } catch (error) {

                        console.log(ind);
                        console.log("Error happened in data array", error);
                        return res.render("errPage", {
                            errMsg: "Error 500: Server Error."
                        })
                        
                    }

                }));

                
        }).then((doc)=>{
            res.json(doc)
        })
    
    } catch(error){
        res.render("errPage", {
            errMsg: error
        })
    }
})




module.exports = router;