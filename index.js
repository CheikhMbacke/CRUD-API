/**
 * Node_Modules
 */
const express = require('express');
const path = require('path');
const logger = require('./Middleware/logger');
const members= require('./Members');
const exphbs = require('express-handlebars');
const router = require('./Route/API/members.api');
const app = express();
var PORT = process.env.PORT || 5000;

//app.use(logger);
/**
 * Hnadlebars middleware
 */
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
/**
 * Endpoints Handdlebars
 */
app.get('/',(req,res)=>{
    res.render('index',{
        title:"MEMBER APP",
        members
    });
});
/**
 * Set a static folder
 */
app.use(express.static(path.join(__dirname,'public')));
/**
 * Init BOdy parser Middleware
 */
app.use(express.json());
app.use(express.urlencoded({extended:false}));
/**
 * Set a API route
 */
app.use('/api/members',router);
/**
 * Running server
 */
app.listen(PORT,()=>{console.log(`Server is running on ${PORT}`)});



