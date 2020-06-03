const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
function render1() {
  inquirer
    .prompt([
      {
        name: "role",
        type: "list",
        message: "Employee Type:",
        choices: ["Manager", "Engineer", "Intern", "NA"],
      },
    ])

    .then(function (choice) {
      switch (choice.role) {
        case "Manager":
          addManager();
          break;
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          exitApplication();
      }
    });
}

render1();

function addManager() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Type your name",
      },
      {
        name: "id",
        type: "input",
        message: "Type your ID",
      },
      {
        name: "email",
        type: "input",
        message: "Type your email",
      },

      {
        name: "officeNumber",
        type: "input",
        message: "Type your office number",
      },
    ])
    .then(function (answers) {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      teamMembers.push(manager);
      console.log(answers);
      render1();
    });
}
function addEngineer() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Type your name",
      },
      {
        name: "id",
        type: "input",
        message: "Type your ID",
      },
      {
        name: "email",
        type: "input",
        message: "Type your email",
      },

      {
        name: "github",
        type: "input",
        message: "Type your GitHub username",
      },
    ])

    .then(function (answerseng) {
      const engineer = new Engineer(
          answerseng.name, 
          answerseng.id, 
          answerseng.email, 
          answerseng.github
    );
      teamMembers.push(engineer);
      console.log(answerseng);
      render1();
    });
}
function addIntern() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Type your name",
      },
      {
        name: "id",
        type: "input",
        message: "Type your ID",
      },
      {
        name: "email",
        type: "input",
        message: "Type your email",
      },

      {
        name: "school",
        type: "input",
        message: "Type your school name",
      },
    ])

    .then(function (answersint) {
      const intern = new Intern(answersint.name, answersint.id, answersint.email, answersint.school);
      teamMembers.push(intern);
      console.log(answersint);
      render1();
    });
}
function exitApplication() {
  const page = render(teamMembers);
  fs.writeFile(outputPath, page, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Succes!");
  });
}
