const {v4: uudiv4} = require('uuid');

class Task {
    constructor (description) {
        this.id = uudiv4();
        this.description = description;
        this.completedDate = null;
    }
}

module.exports = Task;