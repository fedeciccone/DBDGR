var express = require('express');
var router = express.Router();

const inicio = {
  titulo: "Guia rapida sobre Dead by Daylight",
  descripcion: "Esta es una guia para comprender rapidamente los personajes de DBD tanto asesinos como supervivientes."
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Guia DBD", inicio:inicio});
});

module.exports = router;
