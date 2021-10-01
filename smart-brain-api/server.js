const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smart-brain',
  password: 'xenix2000*',
  port: 5432
});
/*const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'postgres',
      password : 'xenix2000*',
      database : 'smart-brain'
    }
});

/*postgres.select('*').from('users').then(data=>{
    console.log(data);
});*/

/*const database ={
    users:[
        {
            id:'123',
            name: 'John',
            email:'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id:'124',
            name: 'Sally',
            email:'sally@gmail.com',
            password: 'banana',
            entries: 0,
            joined: new Date()
        }
    ],
    login:[
        {
            id:'987',
            hash:'',
            email:'john@gmail.com'
        }
    ]
}*/

app.get('/', (req,res)=>{
    res.send(database.users);
})

app.post('/signin', (req,res)=>{   
    const getAllHorrors = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        let islogin = false, index = 0;
        for(let i = 0; i < results.rows.length; i++){
            if (req.body.email === results.rows[i].email &&
                req.body.password === results.rows[i].password){
                    islogin = true;
                    index = i;
                    break;
                }
        }
        if(islogin){
            res.json(results.rows[index]);
        }
        else{
            res.status(400).json('error logging in');
        }
    });
    };
    getAllHorrors();
})

app.post('/register', (req, res)=>{
    const {name, email, password} = req.body;
    /*bcrypt.hash(password, null, null, function(err, hash) {
       console.log(hash);
        // Store hash in your password DB.
    });
    database.users.push(
        {
            id:'125',
            name: name,
            email:email,
            entries: 0,
            joined: new Date()
        }
    )
    db('users').insert({
        name: name,
        email: email,
        joined: new Date()
    });*/
    if(name === "" || email ==="" || password === ""){
        return res.json('canot register');
    }
    const addHorror = async (request, response) => {
    pool.query('INSERT INTO users (name, email, password, joined) VALUES ($1, $2, $3, $4)', [name, email, password, new Date()], (error, results) => {
        if(error){
            res.status(404).json('Can not register')
        }
        else{
            res.json('register')
        }
    });
    };
    addHorror();
    //res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res)=>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if (!found){
        res.status(400).json('not found');
    }
})

app.put('/image', (req,res)=>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found){
        res.status(400).json('not found');
    }
})

/*
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/
app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})