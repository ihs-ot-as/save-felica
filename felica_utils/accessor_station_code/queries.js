const records = require("./init.js")

function getByAreacodeLinecodeStationcode(areaCode,lineCode, stationCode){
    return records.find(record => 
        record.AreaCode == areaCode.toString() && 
        record.LineCode == lineCode.toString() &&
        record.StationCode == stationCode.toString()
    )
}
exports.getByAreacodeLinecodeStationcode = getByAreacodeLinecodeStationcode