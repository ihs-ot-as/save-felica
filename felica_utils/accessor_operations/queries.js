const operations = require("./init.js");

function get(key){
    let type = typeof key;
    if(type!= "string") throw `Please provide a key in string. You provided ${key} of the type ${type}`
    return operations[key] ?? `Not Defined (${key})`
}

exports.get = get;