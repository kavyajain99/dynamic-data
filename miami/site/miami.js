//this imports express into our project 
const express = require('express')

//name of app, then type is express
const app = express()

//Specify static routes
app.use(express.static('public'))

const expressHandlebars = require('express-handlebars')

app.engine('handlebars', expressHandlebars.engine ({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

const PORT = process.env.port || 3000

//import app wide data
const gallery = require ("./data/gallery.json")

/******* PROCESS ROUTES *******/ 

app.get('/', (request, response) => {
    //console.log(gallery)

    const data = require("./data/home-data.json")
    response.render('landing',{
        gallery,
        data
    })
    // response.render('landing', {
    //     gallery, 
    //     title:"this is miami ", 
    //     abstract: "Miami is a loud place to live.",
    //     image: "tree.jpg"
    //     })
    })

app.get('/fruits', (request, response) => {
    const data = require("./data/fruits-data.json")
    response.render('landing', {
        gallery,
        data
    }) 
})   
     
app.get('/groceries', (request, response) => {
    const data = require("./data/groceries-data.json")
    response.render('landing', {
        gallery,
        data
    }) 
})      
app.get('/parks', (request, response) => {
    const data = require("./data/parks-data.json")
    response.render('landing', {
        gallery,
        data
    })  
})          
app.get('/unusual', (request, response) => {
    const data = require("./data/unusual-data.json")
    response.render('landing', {
        gallery,
        data
    })      
})  

// -----> THIS TRIGGERS A SERVER ERROR 
// app.get('/cats', (hello, world) => {
//     response.type('text/plain')
//     response.send('Stray cats');
//     })     


/******* ERROR HANDLING *******/ 

// case 1 - not found = non existent route
app.use((request, response)=>{
    response.status(404)
    response.render('404')
})

// case 2 - server error = errors in OUR code could happen or DB...
app.use((error, request, response, next)=>{ //function overloading
    console.log(error)
    response.status(500)
    response.render('500')
})

// start server
app.listen(PORT,()=>{
    console.log(`express is running on port http://localhost:$ {PORT} `)
    console.log('Press controll c to terminate')
})


