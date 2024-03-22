import Express  from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import { createServer } from "http";

const app = Express();
const port = 3000;
const db = new sqlite3.Database('db.db')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.post('/api/registrar', (req, res) => {
    const {id, email, name, passwordHash, passwordDate} = req.body;

    db.run('INSERT INTO users(id, email, name, passwordHash, passwordDate) VALUES(?, ? ,? , ?, ?)', [id, email, name, passwordHash, passwordDate], (err) => {
        if(err){
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send('usuario Resgistrado exitosamente')
        }
    })
})

app.post('/api/iniciarSesion', (req, res) => {
    const {email, passwordHash} = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if(err){
            res.status(500).send('Error del servidor')
        }else if(!user){
            res.status(401).send('Usuario no encontrado')
        }else if(user.passwordHash == passwordHash){
            res.status(200).send(user)
        }else{
            res.status(401).send('Contraseña incorrecta')
        }
    })
})

app.post('/api/changePassword', (req, res) => {
    const {newPassword, date, userId} = req.body;

    db.run('UPDATE users SET passwordHash = ? WHERE id = ?', [newPassword, idUser], (err) => {
        if(err){
            res.status(500).send('Error del servidor')
        }else{ 
            res.status(200).send('Contraseña cambiada con exito')
        }
    })
    db.run('INSERT INTO passwordHistory(passwordHash, date, userId) VALUES(?, ?, ?)', [newPassword, date, userId], (err) => {
        if(err){
            res.status(500).send('Error del servidor')
        }else{
            res.status(200).send('Registro realizado con exito')
        }
    })
})

const server = createServer(app);

server.listen(port, () => {
    console.log(`Puerto: ${port}`)
})