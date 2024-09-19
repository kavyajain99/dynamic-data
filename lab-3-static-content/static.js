/************* NOTES  *************
- few ways of declaring variables: 
    -var - function scoped (larger scale)
    -const - kinda == final in JAVA 
    -let - block scoped
- JS built on the java object model 
- Why do somethings have semicolons and some no?
• to access local files we need to work w file system
• __dirname automatically fills out file path precursor this is the absolute path of the file 
• 200 = good, 300 = switch, 400 = bad, 500 = fatal
• 
• 
• 
 ************************************/


// start of any node app
const http = require('http')

//allows us to read an interact local files
const fs = require("fs") 


// fs.readFile('public/home.html', (errors, content) =>{
//     //errors go first in the case the file doesnt exist
//     //content will contain the contens of the file if everything worked
//     //we can tehn do something like response.end(content)

//     if(errors){
//         response.writeHead(500, {'Content-type':'text/plain'})
//         return response.end('500- Internal Error')
//     }
//     response.writeHead(200, {"Content-Type" : "text/html})"})
//     response.end(content)
// })

// listen to server port and give a response back to the client 
const port = process.env.PORT || 3000

// -------> read files and display them 
const displayPage = (path, res, contentType, responseCode =200) => {
    fs.readFile(__dirname + path, (errors, content) =>{ 
        if(errors){
            res.writeHead(500, {'Content-type':'text/plain'})
            return res.end('500- Internal Error')
        }
        res.writeHead(responseCode, {"Content-Type" : contentType})
        res.end(content)
    })
}

//where app lives ---> any logic implmented here 
const server = http.createServer( (request,response) => {

   //----> Newfashioned print statements  
   console.log(request.url) // allows us to change the stuff after the slash
   console.log(request.method) // has get (read), post( write), put (update), delete 

   var path = request.url

   switch(path){
    case "":
    case "/":
    displayPage('/public/home.html', response, 'text/html')
    break

    case '/about':
    displayPage('/public/about.html', response, 'text/html')
    break

    case '/contact':
    displayPage('/public/contact.html', response, 'text/html')     
    break

    case '/logo':
    displayPage('/public/zebra.jpg', response, 'image/jpg')     
    break

    default:
    displayPage('/public/404.html', response, 'text/html', 400) 
    break
   }


//    if( (path == "") || (path == "/") ) {  //-----> BLANK PAGE 
//        response.writeHead(200 , { "Content-Type" : "text/plain" })
//        response.end("Home ")
//    } else if((path == "/about") || (request.url== "/gallery")) { //-----> HTML ON PAGE 
//        response.writeHead(200 , { "Content-Type" : "text/HTML" })
//        //response.("About")
//        response.end("<html> <head> <title> TAB NAME </title>  </head> <body> <h1> <i> some words nested in HTML <i> </h1> </body> </html>")
//    } else if(path == "/contact") {
//        response.writeHead(200 , { "Content-Type" : "text/plain" })
//        response.end("Contact blah blah")
//    } else { //-----> BLANK PAGE 
//        response.writeHead(404 , { "Content-Type" : "text/plain" })
//        response.end("Page Not Found - 400 is error")
//    }


})

//now here, we make it run 
server.listen(port, () => console.log("server started on port " + port + " press ctrl + c to stop" ))

//view at http://localhost:3000/

