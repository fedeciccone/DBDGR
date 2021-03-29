var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer')
const Sequelize = require('sequelize')
const db = require('../config/db')

router.get('/', function(req,res){
    res.render('contacto.hbs',{title:"¡Envianos tu pregunta o sugerencia!"})
})

router.post('/', function(req,res) {
    let nicknameForm, emailForm, mensajeForm
    nicknameForm = req.body.nickname
    emailForm = req.body.email
    mensajeForm = req.body.mensaje

    function validacion() {
        if(nicknameForm == "" || emailForm == "" || mensajeForm == ""){
            let validacion = "Faltan datos por completar"
            res.render('contacto.hbs',{
                validacion,
                nicknameForm,
                emailForm,
                mensajeForm
            })
        }else{
            async function main() {
              let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, 
                auth: {
                  user: "phomer98@gmail.com",
                  pass: "myzmfnnhloeiugtc",
                },
              });
                  
              let info = await transporter.sendMail({
                from: `${nicknameForm} <${emailForm}>`,
                to: "phomer98@gmail.com",
                subject: "Pregunta o sugerencia de" `${nicknameForm}`,
                html: `${mensajeForm} `, 
              });

db.authenticate()
.then(() => {
  console.log('Conectado a la base de datos')
})
.catch(err => {
  console.log('No se conectó a la base')
})

const envioForm = db.define('contactos',{
  id:{
    type:Sequelize.NUMBER,
    allowNull:false,
    primaryKey:true,
    autoIncrement: true
  },
  nickname:{
    type:Sequelize.STRING
  },
  email:{
    type:Sequelize.STRING
  },
})

try {
  const enviar = await envioForm.create({
    id:'',
    nickname: nicknameForm,
    email:emailForm
  })
console.log(enviar)
console.log("Dato enviado")
}
catch (error) {
  console.log(error + "/ Enviando desde el Form Contacto")
}
res.render('formEnviado.hbs')
}
main().catch(console.error);

    }
}
    validacion()  
});

module.exports = router;
