const inquirer = require("inquirer");
const initialQuestions = () => {
  inquirer

    // Prompting the user with the initial questions.
    .prompt({
      type: "list",
      name: "begin choices",
      message: "What would you like to do? (Select on of the following)",
      choices: [
        "View All Employees",
        "Add New Employee",
        "Update Employee Role",
        "View All Roles",
        "Add New Role",
        "View All Departments",
        "Add New Department",
        "All finished!",
      ],
    })
    // Using swtich case (which I have never used before btw) to determine what function to run depenfing on the choice selected.
    .then((data) => {
      switch (data["begin choices"]) {
        case "View All Employees":
          console.log("choice 1");
          break;
        case "Add New Employee":
          console.log("choice 2");
          break;
        case "Update Employee Role":
          console.log("choice 3");
          break;
        case "View All Roles":
          console.log("choice 4");
          break;
        case "Add Role":
          console.log("choice 5");
          break;
        case "View All Departments":
          console.log("choice 6");
          break;
        case "Add Department":
          console.log("choice 7");
          break;
        case "All finished!":
          console.log("choice 8");
          break;
      }
    });
};

initialQuestions();
