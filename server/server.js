//Express App

//Initialization...
const Express = require("express");
const app = Express();
const path = require("path");
const hbs = require('hbs');
const fetchAPI = require("node-fetch");




//Connections / Enviromental variables
const HOST = "Localhost : 127.0.0.1";
const PORT = process.env.PORT || 5500;
const Author = "Arghya Banerjee";
const AppName = "We-ather"
const API_KEY = "86d6b0edaf026c4efc0e9aa5f74d9f75"

//Joining path for the public folder and partials folder...
const publicFolder = path.join(__dirname, "../public");
const partialFolder = path.join(__dirname, "../server/views/partials")
const serverPath = path.join(__dirname, "../server")
console.log(partialFolder)

//Built-in middleware to read all file formats...
app.use(Express.static(publicFolder));
app.use(Express.static(serverPath))

//set handlebars...
app.set('view engine', 'hbs')

// Set Partials
hbs.registerPartials(partialFolder)


//API's 



//Server...
app.get("/", (req, res) => {
    res.render('index');
})
app.get('/Weather', async (req, res) => {
    // try{
    //     //Time API :
    //     const timeAPI = await fetchAPI("https://www.timeapi.io/api/Time/current/coordinate?latitude=18.5196&longitude=73.8553")
    //     const timeAPIJson = await timeAPI.json()
    //     const timeAPIArr = [timeAPIJson]
    //     console.log( "APPI DATA : ", timeAPIArr[0].year)
    //     res.render('weather', {
    //         cityDateDay : timeAPIArr[0].day,
    //         cityDateMonth : timeAPIArr[0].month,
    //         cityDateYear : timeAPIArr[0].year,
    //     });

    // }catch(error){
    //     res.render('404error')
    // }

    res.render('weather');

})
app.get('/about', (req, res) => {
    res.send('This is About Page');
})

//404Error
app.get('*', (req, res) => {
    res.render('404error', {
        pageNotfound: "Opps! Page Not Found",
    });
})


// app.get('/weather', async (req, res)=>{
     
// })



//Server listening...
app.listen(PORT, () => {
    console.log(`Server is running at ${HOST} and Port no. is : ${PORT} \nCopyright (C) "${AppName}" Corporation by ${Author}. All rights reserved.`);
})