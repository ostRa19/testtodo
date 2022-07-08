const db = require('../db');

function validateCreate(quote) {
    let messages = [];
    console.log(quote);
    if (!quote) {
        messages.push('No task is provided');
    }
    if (quote.length > 255) {
        messages.push('Task cannot be longer than 255 characters');
    }
    if (quote.length < 3) {
        messages.push('Task cannot be shorter than 255 characters');
    }
    if (messages.length) {
        let error = new Error(messages.join());
        error.statusCode = 400;
        // throw error;
        return messages;
    }
}

//User constructor
function Todo ({
                   id,
                   task,
                   completed_at
               }) {
    this.id = id;
    this.task = task;
    this.completed_at = completed_at;
};

// add a createUser method to the prototype
Todo.prototype.createTodo = async function() {
    try {
        let validateRequest = validateCreate(this.task);
        // console.log('validateRequest', validateRequest)
        if (validateRequest.length === 0){
            const {rows} = await db.query(
                `INSERT INTO tasks(task) 
            VALUES ($1)`,
                [this.task]
            );
        return rows;
    }else{
            console.log(validateRequest);
        }
    } catch (error) {
        throw error;
    }
};

Todo.prototype.readTodo = async function() {
    try {
        const { rows } = await db.query(
            `SELECT (id, task, completed_at) FROM tasks`
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

Todo.prototype.statusTodo = async function() {
    try {
        const  currentStatus = await db.query(
            `SELECT completed_at FROM tasks WHERE id=$1`,
            [this.task]

        )
        // console.log(currentStatus.rows[0].completed_at)
        if(currentStatus.rows[0].completed_at === null) {
            const newStatus = await db.query(
                `UPDATE tasks SET completed_at = NOW() WHERE id = $1 `,
                [this.id]
            )
        }else{
            const newStatus = await db.query(
                `UPDATE tasks SET completed_at = null WHERE id = $1 `,
                [this.id]
            )
        }
        return currentStatus.rows[0].completed_at;
    } catch (error) {
        throw error;
    }
};

Todo.prototype.editTodo = async function() {
    try {
        const { rows } = await db.query(
            `UPDATE tasks SET (task, completed_at) = ($2, $3) WHERE id = $1`,
            [this.id, this.task, this.completed_at]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

Todo.prototype.deleteTodo = async function() {
    try {
        const { rows } = await db.query(
            `DELETE FROM tasks WHERE id = $1`,
            [this.id]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = Todo;
// db.query: the query method we exported earlier from db/index.js