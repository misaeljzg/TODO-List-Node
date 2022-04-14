require('colors');

const {
    inquirerMenu,
    pause,
    readInput,
    listTasksToDelete,
    confirm,
    showChecklist } = require('./helpers/inquirer');
const { saveInfo, readDB } = require('./helpers/saveFile');

const Tasks = require('./models/tasks');

const main = async () => {

    let option = '';
    const tasks = new Tasks();

    const tasksDB = readDB();

    if (tasksDB) { //load existing tasks from file, if any
        tasks.loadTasksFromDB(tasksDB);
    }

    do {
        //print the menu
        option = await inquirerMenu();

        switch (option) {
            case '1':
                //Create task
                const description = await readInput('Description: ');
                tasks.createTask(description);
                break;

            case '2':
                //List all tasks
                tasks.tasksList();
                break;

            case '3':
                //List completed tasks
                tasks.listCompletedTasks();
                break;
            case '4':
                //List pending tasks
                tasks.listCompletedTasks(false);
                break;

            case '5': //Complete Tasks
                const ids = await showChecklist(tasks.listAsArray);
                tasks.toggleCompletedStatus(ids);
                break;

            case '6':
                //Delete task
                const id = await listTasksToDelete(tasks.listAsArray);
                if (id !== '0') {
                    const deleteConfirmation = await confirm('Are you sure?');
                    if (deleteConfirmation) {
                        tasks.deleteTask(id);
                        console.log('Task deleted successfully');
                    }
                }
                break;


        }

        saveInfo(tasks.listAsArray);

        await pause();
    } while (option != '0');
}

main();