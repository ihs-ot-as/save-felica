//before anything, pass around and export command line options and arguments
//these values are used for initialization of other modules, so this must come first.
let { program } = require('commander');
program
  .option('-p, --passphrase <type>', 'passphrase for the private key');
program.parse();
const options = program.opts();
console.table(options);
module.exports = options;
program = null; //once the options are taken care of, no need to keep this library in memory. 


//do the initialization of sequelize (ORM to the database, in this case mysql)
const {sequelize,User,Record} = require("./models");


//do the initialization of encrytpion and conversion related stuff
require("./cryptos/init.js");
const conversions = require("./felica_utils/conversions.js")
const {decrypt} = require("./cryptos/decrypt.js");

//doing the initialization of express last. 
//we don't want to publish our product even for a moment unless everything's good and working.
const express = require("express");
const app = express();
app.use(express.json());



app.post("/users", async (req, res)=>{
    try{
        const record = req.body
        /*
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        cardUuid: DataTypes.STRING
        */
        let newUser = await User.create(record);
        res.json({newUser})
    }catch(err){
        res.status(500).json(err);
    }

})
app.post("/records", async (req, res)=>{
    /*
      device: DataTypes.STRING,
      operation: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
      exitMethod: DataTypes.STRING,
      date: DataTypes.DATE,
      originSt: DataTypes.STRING,
      destSt: DataTypes.STRING,
      balance: DataTypes.INTEGER
     */
    try{
        let decryptedPayload = decrypt(req.body);
        const transits = decryptedPayload.histories.map(buffer => conversions.toHistoryData(Buffer.from(buffer.data)));

        let newRecord = await Record.bulkCreate(transits);
        res.json({newRecord});
    }catch(err){
        res.status(500).json(err);
    }

})



sequelize.authenticate()//.sync({force:true})
.then(result =>{
    app.listen(5000, ()=> {console.log("the application started listening on port 5000");})
});

