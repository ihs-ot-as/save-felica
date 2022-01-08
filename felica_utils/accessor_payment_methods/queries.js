const paymentMethods = require("./init.js");

function get(key){
    let type = typeof key;
    if(type!= "string") throw `Please provide a key in string. You provided ${key} of the type ${type}`
    key = key.padStart(2,"0");
    return paymentMethods[key] ?? `Not Defined (${key})`
}

exports.get = get;