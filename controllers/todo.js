const Todo = require('../models/Todo');


exports.todoSignup = async (req, res, next) => {
    const {task} = req.body;
    try {
        const todo = new Todo({task});
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

exports.todoUpdate = async (req, res, next) => {
    const {oldtask, task, completed_at} = req.body;
    try {
        const todo = new Todo({oldtask, task, completed_at});
        const result = await todo.updateTodo();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.end();
        // const errorToThrow = new Error();
        // switch (error?.code) {
        //     case '23505':
        //         // errorToThrow.message = 'Task already exists';
        //         errorToThrow.statusCode = 403;
        //         break;
        //     default:
        //         errorToThrow.statusCode = 500;
        // }
        // //pass error to next()
        // next(errorToThrow);
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