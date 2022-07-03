const Todo = require('../models/Todo');


exports.todoSignup = async (req, res, next) => {
    const {task} = req.body;
    try {
        const task = new Todo({task});
        const result = await task.createTodo();
        res.send(task);
    } catch (error) {
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