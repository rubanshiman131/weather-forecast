const express = require("express");
const https= require("https");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({extended: true}))

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html")
});

app.post("/",function(req,res){

const query = (req.body.cityname);
const apikey = "1d19b9c6268583e997e8007d6b92f800"
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=" + apikey + "&units="+unit+"";
https.get(url,function(response){

    response.on("data",function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp
      const weatherdescription = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imageurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      res.write("<h1>The temperature in "+query+" is " + temp + " degree Celsius </h1>" );
        res.write("<p>the current temperature is " + weatherdescription + "</p>");
      res.write("<img src="+imageurl+">")
      res.send();
      
    })
  })
})

app.listen(3000,function(req,res){
  console.log("server is running on port 3000");
});
