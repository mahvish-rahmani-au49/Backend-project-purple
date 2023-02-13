/*console.log('hello world')*/
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
const { request } = require('http');
const { response } = require('express');




let serviceAccount = require("./ecom-website.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore(); 

//declare static path
let staticpath = path.join(__dirname, "public");

/**Inizializing express.js */

const app = express();

//midleware
app.use(express.static(staticpath));
app.use(express.json());
//routes
app.get("/", (request,response) => {
    response.sendFile(path.join(staticpath, "index.html"));
})

//signup
app.get('/signup',(request,response) =>{
    response.sendFile(path.join(staticpath, "signup.html"));

})

app.post('/signup',(request,response) =>{
    let {name,email,password,number,tac,notification} = request.body;

    //form validation

    if(name.length < 3){
        return response.json({'alert':'Name must be 3 letters long'});
    }else if (!email.length){
        return response.json({'alert':'Enter your Email'});
     } else if (!password.length){
        return response.json({'alert':'password should be 8 letters long'});
    }else if (!number.length){
        return response.json({'alert':'Enter your phone number'});

}else if (!Number(number.length) || number.length <10){
    return response.json({'alert':'Invalid number, Please enter valid number'});
}else if(!tac){
    return response.json({'alert': 'You should agree to our terms and conditions'});
}
    //store user data in db
    db.collection('users').doc(email).get()
    .then(user => {
        if(user.exists){
            return response.json({'alert': 'email already exists'});
        } else{
            //encrypt .
            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(password,salt,(err,hash) => {
                    request.body.password = hash;
                    db.collection('users').doc(email).set(request.body)
                    .then(data => {
                        response.json({
                            name: request.body.name, 
                            email: request.body.email,
                            seller: request.body.seller,
                        })
                    })
                })
            })
        }
    })
})

//login
app.get('/login',(request,response) => {
    response.sendFile(path.join(staticpath, "login.html"));
 })

app.post('/login',(request,response) => {
    let {email,password} = request.body;
    if(!email.length || !password.length){
        return response.join({'alert': 'fill all the input'})
    }
    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){
            return response.json({'alert': 'log in email does not exists'})
        } else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return response.json({
                        name: data.name,
                        email: data.email,
                        seller: data.saller,
                    })
                }else{
                    return response.json({'alert': 'password in incorrect'});
                }
            })
        }
    })

})

//seller route
app.get('/seller', (request,response) => {
    response.sendFile(path.join(staticpath, "seller.html"));
})

app.post('/seller',(request,response) => {
    let {name,about,address,number,tac,legit,email} = request.body;
    if(!name.length || !address.length || !about.length || number.length < 10 || !Number(number)){
        return response.json({'alert': 'some information(s) is/are invalid'});
    }else if(!tac || !legit){
        return response.json({'alert': 'you must agree to our terms and conditions'})
    }else{
        //update users status.
        db.collection('sellers').doc(email).set(request.body)
        .then(data => {
            db.collection('users').doc(email).update({
                seller: true
            }).then(data => {
                response.json(true);
            })

        })
    }
})

// add product
app.get('/add-product', (request,response) => {
    response.sendFile(path.join(staticpath, "addproduct.html"));
})

//product page

app.get('/product', (request,response) => {
    response.sendFile(path.join(staticpath, "product.html"));
})



app.get('/search', (request,response) => {
    response.sendFile(path.join(staticpath, "search.html"));
})

//404 route

app.get('/404',(request,response) =>{
    response.sendFile(path.join(staticpath,"404.html"));
})

app.use((request,response) => {
    response.redirect('/404');
    
})
app.listen(8000, () => {
    console.log('listening on port.....');
})