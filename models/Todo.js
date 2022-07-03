const db = require('../db');
//User constructor
function Todo ({
                   oldtask,
                   task,
                   completed_at
               }) {
    this.oldtask= oldtask;
    this.task= task;
    this.completed_at = completed_at;
};

// add a createUser method to the prototype
Todo.prototype.createTodo = async function() {
    try {
        const { rows } = await db.query(
            `INSERT INTO tasks(task) 
            VALUES ($1)`,
            [this.task]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

Todo.prototype.readTodo = async function() {
    try {
        const { rows } = await db.query(
            `SELECT * FROM tasks`
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

Todo.prototype.updateTodo = async function() {
    try {
        const { rows } = await db.query(
            // if(this.task== true && this.oldtask==true) {
                `UPDATE tasks SET (task, completed_at) = ($2, $3) WHERE task = $1`,
            //  `UPDATE tasks SET (task, completed_at) = ($2, $3) WHERE task = $1`,
            //  `UPDATE tasks SET task = $2 WHERE task = $1`,
            //  `UPDATE tasks SET completed_at = $3 WHERE task = $2`,

                    [this.oldtask, this.task, this.completed_at]
            // };
        );
        //completed_at

        return rows;
    } catch (error) {
        throw error;
    }
};

Todo.prototype.deleteTodo = async function() {
    try {
        const { rows } = await db.query(
            `DELETE FROM tasks WHERE task = $1`,
            [this.task]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = Todo;
// db.query: the query method we exported earlier from db/index.js