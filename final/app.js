//this imports express into our project 
const express = require('express')

//name of app, then type is express
const app = express()

//Specify static routes
app.use(express.static('public'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const expressHandlebars = require('express-handlebars')

app.engine('handlebars', expressHandlebars.engine ({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

const PORT = process.env.port || 3000


/******* PROCESS ROUTES *******/ 

// Home 
app.get('/', (request, response) => {
    // //console.log(gallery)
    const data = require("./data/homepage.json")
    const plants = require("./data/plants.json")
    const mammals = require("./data/mammals.json")
    const amphibians = require("./data/amphibians.json")
    response.render('homepage',{data, amphibians, mammals, plants})
    //response.render('homepage')

    })


// --------------> CATEGORY 1: Mammals
app.get('/mammals/category', (request,response)=> {
    const data = require('./data/mammals.json')
    response.render('category', {data})
    })

// --------------> CATEGORY 2: Amphibians
app.get('/amphibians/category', (request, response) =>{
    const data = require('./data/amphibians.json')
    response.render('category', {data})

})

// --------------> CATEGORY 3: Plants
app.get('/plants/category', (request, response) =>{
    const data = require ('./data/plants.json')
    response.render('category', {data})
    //response.render('category')
})

// --------------> Details 1: Mammals

app.get('/mammals/details/:id', (request,response)=> {
    const data = require('./data/mammals.json')

    let currId = parseInt(request.params.id, 10);

    // Use filter to find the matching object
    let filteredData = data.products.filter((objectFinder) => objectFinder.id === currId);
    let currData = filteredData.length > 0 ? filteredData[0] : null;

    let dataSuggested = data.products.slice(0, 4);

    console.log("curData ", currData)

    console.log("dataSuggested:", dataSuggested);

    response.render('details', {data, currData, dataSuggested})
   
    })

// --------------> Details 2: Amphibians

app.get('/amphibians/details/:id', (request,response)=> {
    const data = require('./data/amphibians.json')

   // Convert request.params.id to a number
   let currId = parseInt(request.params.id, 10);

   // Use filter to find the matching object
   let filteredData = data.products.filter((objectFinder) => objectFinder.id === currId);
   let currData = filteredData.length > 0 ? filteredData[0] : null;

   let dataSuggested = data.products.slice(0, 4);

   console.log("curData ", currData)

   console.log("dataSuggested:", dataSuggested);

   response.render('details', {data, currData, dataSuggested})
    })    

// --------------> Details 3: Plants

app.get('/plants/details/:id', (request,response)=> {
    const data = require('./data/plants.json')

    // Convert request.params.id to a number
    let currId = parseInt(request.params.id, 10);

    // Use filter to find the matching object
    let filteredData = data.products.filter((objectFinder) => objectFinder.id === currId);
    let currData = filteredData.length > 0 ? filteredData[0] : null;

    let dataSuggested = data.products.slice(0, 4);

    console.log("curData ", currData)

    console.log("dataSuggested:", dataSuggested);

    response.render('details', {data, currData, dataSuggested})
    })    


// ********** FROM COPILOT LETS SEE     

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    helpers: {
        groupedProducts: function (products, groupSize) {
            let grouped = [];
            for (let i = 0; i < products.length; i += groupSize) {
                grouped.push(products.slice(i, i + groupSize));
            }
            return grouped;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// TEST 

app.get('/test', (request, response) => {
    response.render('test', { message: 'This is a test' });
});



// app.get('/plants/details/:id', (request, response) => {
//     const data = require("./data/plants.json")
//     // filter it to get only the data that attaches to id
//     var tempData ={"products":[]}
//     var tempData = {}
//     tempData.data.products = data.products.filter((product)=>{
//         return product.id == request.params.id

//     })

//     response.render('details',{"data:":data})
//     })

// ********************** CART ******************************** // 

let cart = {"productsArr":[]}

// DISP CONTENTS
app.get("/cart", (request, response) => {
    // checks if the ID query param is provided in the request
    if (typeof(request.query.id) != "undefined") {
        // if it exists, add it's data to the cart arr
        cart.productsArr.push(request.query)
    } else {
        //debug statement
        console.log(request.query.id)
    }
    response.render("cart", { products: cart.productsArr });
})

// NEW PROD 
app.post("/cart/process", (request, response) => {
    //debug
    console.log('information gathered', request.body)
    
    //gets below vars from the request 
    const { id, category, description, price, image } = request.body;
    //adds above to my array 
    cart.productsArr.push({ id, category, description, price, image });

    //another debug
    console.log("Cur cart contents array! : ", cart);

    //apparently this is called an endpoint!
    response.redirect("/cart");
})

// DELETE BUTTON 
app.post("/cart/remove", (request, response) => {
    // this is caled de-suturing (and above is opp)
    const { id } = request.body;
    //creates a new arr w all the elements that are ! the one listed below
    cart.productsArr = cart.productsArr.filter(item => item.id !== id);

    //another debug
    console.log("Cart Updated: ", cart);

    //redirect 2 the endpoinT
    response.redirect("/cart");
});

// @TODO CHECKOUT STUFF HERE

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

