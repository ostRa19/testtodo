const db = require('../db');
//User constructor
function Todo ({
                   task
               }) {
    this.task= task;
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
module.exports = Todo;
// db.query: the query method we exported earlier from db/index.js