require ('dotenv').config();

const express = require('express')
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')

const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env;

const app = express()

app.use(express.json())

app.use(session({
    resave:false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl:{
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('Database up!')
}).catch(err => console.log(err))

///
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
///
app.post('/api/post', ctrl.newPost) //creates post :)

app.get('/api/post', ctrl.getPosts) //for all posts :)
app.get('/api/yourposts', ctrl.getUserPosts) //for all user posts :)
app.get('/api/post/:id', ctrl.getIndivPosts) //for individual posts :)

app.put('/api/post/:id', ctrl.editPost) //edits post :[]

app.delete('/api/post/:id', ctrl.deletePost) //deletes post :)
///

app.listen(SERVER_PORT, console.log(`You are on Port: ${SERVER_PORT} `))