const express=require("express")
const path=require("path");
const app=express();
// const bodyparser=require("body-parser");
// addding mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
// 
const port=80;

// define mongoose schema
const contactSchema = new mongoose.Schema({
     name: String ,
     phone: String ,
     email: String ,
     adress: String, 
     desc: String ,
     
    });
const Contact = mongoose.model('Contact', contactSchema);
// 


// express specific stuff
app.use('/static',express.static('static'))//for serving static files
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine','pug')//set the template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory 

// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = { }
    res.status(200).render('contact.pug', params);
})
// when data will be submitted we will do app.post
app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        // res.send("Submitted")
        res.send("Submitted")
    }).catch(()=>
    {
        res.status(400).send("Item was not saved to the database")
    });
})

// strating the server
app.listen(port,()=>
{
    console.log(`the application started succesfully on port ${port}`);
});


