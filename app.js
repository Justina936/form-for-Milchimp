const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({externed:true}));
app.use(express.static("public"));


app.get('/', function (req, res) {
  res.sendFile(__dirname+"/index.html");
});
 app.post("/", function(req,res){
   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const email = req.body.email;

   console.log(firstName,lastName,email)




var data = {


members:[
  {
    email_address:email,
    status:"subscribed",
    merge_fields:{
      FNAME: firstName,
      LANME: lastName
    }

  }
]

};
 var jsonData = JSON.stringify(data);

const url = "https://us19.api.mailchimp.com/3.0/lists/d950bd5340"
const option = {
 method:"POST",
 auth:"justina:3ee361c11ba8c2849d613e94d00e1473-us19"
};

 const request = https.request  (url,option,function(response){

   if (response.statusCode === 200){
     res.send ("WoW you got there!");}
  else{
    res.send("error!");
  }



   response.on("data",function(data){
     console.log(JSON.parse(data));

   });

 });
 request.write(jsonData);
 request.end();

 });


app.listen(3000,function(){
  console.log("Server Works on LocalHost 3000 mailchimp");
});


// 3ee361c11ba8c2849d613e94d00e1473-us19 mailchimp api
// unique code d950bd5340
