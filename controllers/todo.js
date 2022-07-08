const Todo = require('../models/Todo');


exports.todoCreate = async (req, res, next) => {
    const {task} = req.body;
    try {
        const todo = new Todo({task});
        console.log("this is todo", todo)
        const result = await todo.createTodo();
        res.send(todo);
    } catch (error) {
        // console.log(error);
        // res.end();
        const errorToThrow = new Error();
        switch (error?.code) {
            case '23505':
                errorToThrow.message = 'Task already exists';
                errorToThrow.statusCode = 403;
                break;
            default:
                errorToThrow.statusCode = 500;
        }
        //pass error to next()
        next(errorToThrow);
    }
};

exports.todoRead = async (req, res, next) => {
    const {task} = req.body;
    try {
        const todo = new Todo({task});
        const result = await todo.readTodo();
        res.send(result);
    } catch (error) {
        // console.log(error);
        // res.end();
        const errorToThrow = new Error();
        switch (error?.code) {
            case '23505':
                errorToThrow.statusCode = 403;
                break;
            default:
                errorToThrow.statusCode = 500;
        }
        //pass error to next()
        next(errorToThrow);
    }
};

exports.todoEdit = async (req, res, next) => {
    const {id, task, completed_at} = req.body;
    try {
        const todo = new Todo({id, task, completed_at});
        const result = await todo.editTodo();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.end();
        const errorToThrow = new Error();
        switch (error?.code) {
            case '23505':
                // errorToThrow.message = 'Task already exists';
                errorToThrow.statusCode = 403;
                break;
            default:
                errorToThrow.statusCode = 500;
        }
        //pass error to next()
        next(errorToThrow);
    }
};

exports.todoStatus = async (req, res, next) => {
    const {id, completed_at} = req.body;
    try {
        const todo = new Todo({id, completed_at});
        const result = await todo.statusTodo();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.end();
        const errorToThrow = new Error();
        switch (error?.code) {
            case '23505':
                // errorToThrow.message = 'Task already exists';
                errorToThrow.statusCode = 403;
                break;
            default:
                errorToThrow.statusCode = 500;
        }
        //pass error to next()
        next(errorToThrow);
    }
};


exports.todoDelete = async (req, res, next) => {
    const {task} = req.body;
    try {
        const todo = new Todo({task});
        const result = await todo.deleteTodo();
        res.send(result);
    } catch (error) {
        // console.log(error);
        // res.end();
        const errorToThrow = new Error();
        switch (error?.code) {
            case '23505':
                errorToThrow.statusCode = 403;
                break;
            default:
                errorToThrow.statusCode = 500;
        }
        //pass error to next()
        next(errorToThrow);
    }
};