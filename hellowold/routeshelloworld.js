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

   //----> Newfashioned print statements  
   console.log(request.url) // allows us to change the stuff after the slash
   console.log(request.method) // has get (read), post( write), put (update), delete 

   const path = request.url; // the address more or less ?


   if( (path == "") || (path == "/") ) {  //-----> BLANK PAGE 
       response.writeHead(200 , { "Content-Type" : "text/plain" })
       response.end("Home ")
   } else if((path == "/about") || (request.url== "/gallery")) { //-----> HTML ON PAGE 
       response.writeHead(200 , { "Content-Type" : "text/HTML" })
       //response.("About")
       response.end("<html> <head> <title> TAB NAME </title>  </head> <body> <h1> <i> some words nested in HTML <i> </h1> </body> </html>")
   } else if(path == "/contact") {
       response.writeHead(200 , { "Content-Type" : "text/plain" })
       response.end("Contact blah blah")
   } else { //-----> BLANK PAGE 
       response.writeHead(404 , { "Content-Type" : "text/plain" })
       response.end("Page Not Found - 400 is error")
   }
})

//now here, we make it run 
server.listen(port, () => console.log("server started on port " + port + " press ctrl + c to stop" ))

//view at http://localhost:3000/


/* SERVING STATIC CONTENT



*/