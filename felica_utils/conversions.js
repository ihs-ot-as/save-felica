const Station = require("./accessor_station_code/queries.js");
const Operation = require("./accessor_operations/queries.js");
const Device = require("./accessor_devices/queries.js");
const PaymentMethod = require("./accessor_payment_methods/queries.js");
const ExitMethod = require("./accessor_exit_methods/queries.js");

function toHistoryData(history){
    try{
        //console.log({history});
        let convertedData = {
            device : history.readUIntBE(0,1),
            operation: history.readUIntBE(1,1),
            paymentMethod:history.readUIntBE(2,1),
            exitMethod:history.readUIntBE(3,1),
            date : history.readUIntBE(4,2),
            entry:{
                lineOfEntry: history.readUIntBE(6,1),
                stationOfEntry: history.readUIntBE(7,1)
            },
            exit:{
                lineOfExit : history.readUIntBE(8,1),
                stationOfExit: history.readUIntBE(9,1),
            },
            balance : history.readUIntLE(10,2), //note this is little endian; not a typo
            serial:history.readUIntBE(12,3),
            region:history.readUIntBE(15,1),
            originalBuffer:history.toString("base64")
        }
        
        //logic for converting date
        let date = convertedData.date;
        let binaryDate =date.toString(2).padStart(16,"0"); 
        //好嘢~！ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
        //console.log({binaryDate})
        const year =parseInt(binaryDate.slice(0,7),2).toString().padStart(2,"0");
        const month = parseInt(binaryDate.slice(7,11),2).toString().padStart(2,"0");
        const day = parseInt(binaryDate.slice(11,16),2).toString().padStart(2,"0");
        convertedData.date = new Date(`20${year}-${month}-${day}`);
    
        //convert station information
        let stationOfEntryObj = Station.getByAreacodeLinecodeStationcode(convertedData.region, convertedData.entry.lineOfEntry, convertedData.entry.stationOfEntry );
        let stationOfExitObj = Station.getByAreacodeLinecodeStationcode(convertedData.region, convertedData.exit.lineOfExit, convertedData.exit.stationOfExit )
        let toReadableDescription = (st) =>st ?`${st.CompanyName}株式会社 ${st.LineName}線 ${st.StationName}駅` : "不明";
        convertedData.originSt = toReadableDescription(stationOfEntryObj); 
        convertedData.destSt = toReadableDescription(stationOfExitObj);
    
        //device
        convertedData.device = Device.get(convertedData.device.toString());

        //operation
        convertedData.operation = Operation.get(convertedData.operation.toString());

        //paymentMethod
        convertedData.paymentMethod = PaymentMethod.get(convertedData.paymentMethod.toString());

        convertedData.exitMethod = ExitMethod.get(convertedData.exitMethod.toString());

    
        //console.log(JSON.stringify(convertedData, null, 2));
        return convertedData;
    }catch(err){
        console.error(`Cannot convert the object due to ${err}`)
        return undefined;
    }

}

exports.toHistoryData = toHistoryData;

