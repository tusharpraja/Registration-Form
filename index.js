const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express ();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.lt2g5xv.mongodb.net/registrationFomDB`, {
   useNewUrlParser : true,
   useUnifiedTopology : true,
});

const registertionSchema = new mongoose.Schema({
    name : String,
    eamil : String,
    password : String
});

// Model of registration schema
const Registration = mongoose.model("Registration",registertionSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/pages/index.html");
    console.log("res");
})

app.post("/register",async(req,res) => {
     try {
        const {name, eamil, password} = req.body;

        const ExistingUser = await Registration.findOne({email:email});

        //check for existing user 

        if(!ExistingUser){
            const registerData = new Registration({
                name,
                eamil,
                password
    
            });

            awaitregisterData.save();
            res.redirect("/succes");
        }else{
            console.log("User already exit");
            res.redirect("/error");
        }
     }
      catch (error) {
        console.log(error);
        res.redirect("/error");
        
     }
})

app.get("/succes",(req,res)=>{ 
    res.sendFile(__dirname + "/pages/succes.html");
})

app.get("/error",(req,res)=>{
    res.sendFile(__dirname + "/pages/error.html");
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
