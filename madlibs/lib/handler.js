

let eList = require('../data/emails.json')

const fs = require('fs')

exports.newsletterSignup = (request, response) => {
    response.render('newsletter-signup', {csrf: 'supersecretcode'})
}
exports.newsletterProcess = (request, response) => {
    console.log(request.body)
    var newUser = {
        "firstname" : request.body.firstname, 
        //from the json below! 
        "lastname" :request.body.lastname,
        "address" :request.body.address,
        "city" :request.body.city,
        "state" :request.body.state,
        "zip" :request.body.zip,
        "email" :request.body.email,
    }
    console.log("Cleaned user")
    console.log(newUser)
    //Once we have a clean user, we add to the eList 
    eList.users.push(newUser)
    console.log("current eList")
    console.log(eList)

    response.redirect(303,'/newsletter/thankyou')


    var json = JSON.stringify(eList)

    fs.writeFileSync('../data/emails.json', json, 'utf8', ()=>{
        console.log("finished writing file")
    })

}

exports.newsletterSignupList = (request,response)=>{
    let eList = require('../data/emails.json')
    console.log(eList)
    response.render('userspage' ,{"users":eList.users})
}

exports.newsletterUser = (request,response) =>{
    var userDetails = eList.users.filter((user)=>{
        return user.email == request.params.email
    })
    response.render('userdetails',{"users":userDetails})
}

exports.newsletterUserDelete = (request, response) => {
  var newUsers = { users: [] };

  newUsers.users = eList.users.filter((user) => {
    return user.email != request.params.email;
  });

  var json = JSON.stringify(newUsers);

  fs.writeFileSync("../data/emails.json", json, "utf8", () => {
    console.log("finished writing file");
  });

  response.send('<a href=/newsletter/list"> GoBack<a>');
};

