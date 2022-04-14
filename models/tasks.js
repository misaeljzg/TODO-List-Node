/**
 * _list :
 *  {'uuid-1234322221-2-2-2-2-: {id:12, desc:asadf, completed: Apr-4'}}
 */

const Task = require("./task");

class Tasks {

    constructor () {
        this._list = {};
    }

    get listAsArray() {
        const list = [];

        Object.keys(this._list).forEach(key => {
            list.push(this._list[key])
        });

        return list;
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    loadTasksFromDB(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    createTask(description = ''){

        const task = new Task(description);

        this._list[task.id] = task;

    }

    tasksList() {
        let tasks = ``;
        this.listAsArray.forEach((task, index) => {
            const indexPlusOne = `${index + 1}`.green;
            const {description, completedDate} = task;
            const completed = (completedDate) ? 'Completed'.green : 'Pending'.red;
            tasks += `${indexPlusOne} ${description} :: ${completed}\n`;
        });
        console.log(tasks);
    }

    listCompletedTasks(showCompleted = true) {
        let tasks = ``;
        const filteredTasks = showCompleted
                        ? this.listAsArray.filter(task => task.completedDate !== null) 
                        : this.listAsArray.filter(task => task.completedDate === null)
        filteredTasks.forEach((task, index) => {
            const indexPlusOne = `${index + 1}`.green;
            const {description, completedDate} = task;
            const completed = (completedDate) ? 'Completed'.green : 'Pending'.red;
            tasks += `${indexPlusOne} ${description} :: ${showCompleted ? completedDate : completed}\n`;
        });
        console.log(tasks);
    }

    toggleCompletedStatus(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if(!task.completedDate){
                task.completedDate = new Date().toISOString();
            }
        });

        this.listAsArray.forEach(task => {
            if(!ids.includes(task.id)) {
                this._list[task.id].completedDate = null;
            }
        })
    }
}

module.exports = Tasks;