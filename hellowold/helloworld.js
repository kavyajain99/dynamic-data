/* 
NOTES 
- few ways of declaring variables: 
    -var - function scoped (larger scale)
    -const - kinda = final in JAVA 
    -let - block scoped
- JS built on the java object model 
- Why do somethings have semicolons and some no?
 */

// start of any node app
const http = require('http')

// listen to server port and give a response back to the client 
const port = process.env.PORT || 3000

//where app lives ---> any logic implmented here 
const server = http.createServer( (request,response) => {
   console.log(request) 
   response.writeHead(200 , { "Content-Type" : "text/plain" })
   response.end("Hello World") //server will always respond this way 

   console.log(request.url) // allows us to change the stuff after the slash
   console.log(request.method) // has get (read), post( write), put (update), delete 

   if (request.url == "/about"){
    console.log("fsdjfsdfdjsl")
   }
})

//now here, we make it run 
server.listen(port, () => console.log("server started on port " + port + " press ctrl + c to stop" ))


//view at http://localhost:3000/

/* // another version 
// server.listen(PORT, () => console.log(`server started on port ${PORT}; `+`` press Ctrl C to terminate ....') */