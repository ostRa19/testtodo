const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
router.post('/todo', todoController.todoSignup);
router.get('/todo', todoController.todoRead);
router.post('/todoupdate', todoController.todoUpdate);
router.delete('/todo', todoController.todoDelete);
module.exports = router;