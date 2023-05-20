const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https');
const { options } = require('request');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var fName=req.body.first_name;
    var lName=req.body.last_name;
    var emaiId=req.body.Email;
    
    var data={
        members:[
            {
                email_address:emaiId,
                status:"subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName
                }
            }
        ]
    };
    var JSONdata=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/2a3befb359";
    var options={
        method:"POST",
        auth:"vageesh1:87f162b58f8a0776425044db61f52e79-us21"
    }
    var sz=0;
    const request= https.request(url,options,function(response){
            response.on('data',function(data){
                const reqData=JSON.parse(data);
                if(response.statusCode === 200){
                    res.sendFile(__dirname+"/success.html");
                }
                else{
                    res.sendFile(__dirname+"/failure.html");
                }
            });
    });
    // console.log(request);
    // request.write(JSONdata);
    request.end();
   
});
app.post("/fail",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("server is listening on 3000");
});

// Mailchimp details
// API key
// 87f162b58f8a0776425044db61f52e79-us21
// Unique ID
// 2a3befb359