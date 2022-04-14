## CLI TODO LIST WITH NODEJS

Hello, this is a basic TODO list which interacts with the user through
the command line, it has 6 options which are 

1. Create task
2. List tasks
3. List completed tasks
4. List pending tasks
5. Complete task(s)
6. Delete task
0. Exit

This is officially my first (of many more to come hopefully!) personal project done in order to showcase the
skills acquired in NodeJS as I keep learning, it focuses mainly on basic knowledge needed as a background before starting with heavier stuff, namely:
- Require function, objects, etc from other files within the project (module.exports)
- Requiring packages (here I used Colors, Inquire and UUID, more on this later)
- NPM (install, uninstall)
- Working of Package.json
- Receiving parameters through the command line
- Reading documentation from the three packages used.

### OVERVIEW

Upon execution, a list with the seven options mentioned above is displayed in the command line.

All the menus available here are created with [Inquirer](https://www.npmjs.com/package/inquirer) which is an amazing package that comes with a huge collection of interfaces in case we want to build a CLI.

The colorful options were made with [Colors](https://www.npmjs.com/package/colors) which is a package that does exactly as its name suggests and is very intuitive to use while having a lot of options available :)

The Task class takes care of creating a new task, here we use [UUID](https://www.npmjs.com/package/uuid) in order to generate a unique id for the task, then the date when it was completed is initially set to null (it can be changed later on, through option number 5) and a description which is what the user is prompted to enter when entering option 1.

The Task**s** class (bad choice calling both of them so similar) contains our list of tasks and implements the functions that let us delete, show, create, set as complete and load them from the file where we are storing them, to make our list persist.

The saveFile module handles writing to and reading from a json file in order to store our current task list, here I learnt the JSON.parse and JSON.stringify functions which are very usefull to convert data from string -> JSON and viceversa (because we can't use writeFileSync with json object).

Then the app file is the one handling the main workflow of our project, here we require all of the functions and objects that we exposed earlier, and by using await on the functions created in inquirer.js (didn't really mention this class as it was mostly just read the documentation and finding what I needed and how to implement it) enables us to use the option selected by the user and calling the corresponding functions.