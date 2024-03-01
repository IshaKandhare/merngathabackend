//App.js
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors = require("cors");


const MONGOURL="mongodb://0.0.0.0:27017/Gatha";



main()
.then(()=>{
    console.log("Connection successful!!");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGOURL);
}

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With , Content-Type , Accept"
    );
    next();
})


app.use(express.json());
app.use(cors({ origin: true }));
app.use("/api",require("./routes/auth"));
app.use("/api",require("./routes/article"));


app.get("/", (req,res)=>{
    res.send('root is working!!');
})
app.listen(8080,()=>{
    console.log("App is listening");
})