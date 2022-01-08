const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const options = require("../app.js")

const {passphrase} = options;
var PRIVKEY;

try{
    if(!passphrase) throw "passphrase to decrypt the private key with is not defined.";
    let key = undefined // fs.readFileSync(path.join(__dirname,'/keys/private_key'), 'utf8');
    PRIVKEY= { key, passphrase};
    Object.freeze(PRIVKEY);
}catch(error){
    console.error( "something went wrong")
    console.error({error});
    process.exit(1);
}
module.exports = PRIVKEY;
