const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
router.post('/todo', todoController.todoSignup);
module.exports = router;