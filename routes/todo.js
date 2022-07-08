const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
router.post('/todo', todoController.todoCreate);
router.get('/todo', todoController.todoRead);
router.put('/todo', todoController.todoEdit);
router.patch('/todo', todoController.todoStatus);
router.delete('/todo', todoController.todoDelete);
module.exports = router;