//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.emailId;

  const  data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/fbe0107987";



  const options = {
    method: "POST",
    auth: "dhananjay99:65e865a0a2af6f9066a517ac22344d5a-us17"
  };

  const request  = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data" , function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/");

})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server running on 3000");
});



//API KEY - 65e865a0a2af6f9066a517ac22344d5a-us17

//List Id - fbe0107987
