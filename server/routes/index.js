var express = require('express');
var router = express.Router();
var todo = require('../app/controller/todo');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

router.delete('/todo/:id', todo.del);

router.get('/todo', todo.fetch);

router.post('/todo', todo.add);


module.exports = router;