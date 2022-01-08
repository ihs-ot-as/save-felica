const devices = require("./init.js");

function get(key){
    let type = typeof key;
    if(type!= "string") throw `Please provide a key in string. You provided ${key} of the type ${type}`
    return devices[key] ?? `Not Defined (${key})`
}

exports.get = get;