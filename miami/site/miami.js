//this imports express into our project 
const express = require('express')

//name of app, then type is express
const app = express()

const expressHandlebars = require('express-handlebars')

app.engine('handlebars', expressHandlebars.engine ({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

const PORT = process.env.port || 3000

/******* PROCESS ROUTES *******/ 

app.get('/', (request, response) => {
    response.render('Home')
    })

app.get('/about', (request, response) => {
    response.render('about')
    })  
     
app.get('/baklava', (request, response) => {
    response.type('text/plain')
    response.send('BAKLAVA shops');
    })    

app.get('/mango-trees', (request, response) => {
    response.type('text/plain')
    response.send('Mango trees');
    })  

// -----> THIS TRIGGERS A SERVER ERROR 
app.get('/cats', (req, res) => {
    response.type('text/plain')
    response.send('Stray cats');
    })     

app.get('/history', (request, response) => {
    response.type('text/plain')
    response.send('history of miami');
    }) 

 

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



