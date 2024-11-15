
//this imports express into our project 
const express = require('express')

//name of app, then type is express
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

//Specify static routes
app.use(express.static('public'))

const expressHandlebars = require('express-handlebars')
const { newsletterSignup } = require('./lib/handler')

app.engine('handlebars', expressHandlebars.engine ({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

const handler = require('./lib/handler')

const PORT = process.env.port || 3000

// HERE 
app.get("/", (request, response)=>{
    response.render('page', {request})
})

app.get("/mad", (request, response)=>{
    const data = require("./data/mad-data.json")
    response.render('madform', {data})
    // the data --> coresponds to mad-data.json
})

app.post('/process', (request, response)=>{
    response.send('got post')
})

app.get('/process',(request, response)=>{
    console.log(request.query)
})

app.get('/newsletter-signup/', handler.newsletterSignup)

app.post('/newsletter-signup/process', handler.newsletterProcess)

app.get('/newsletter/list', handler.newsletterSignupList)

app.get('/newsletter/thankyou', (request,response)=>{
    response.render('thankyou')
})

app.get('/newsletter/details/:email', handler.newsletterUser)

app.get('/newsletter/delete/:email',handler.newsletterUserDelete)

//ERROR CASES 

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