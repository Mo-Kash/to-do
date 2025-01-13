import "./styles.css";
import { createSidebar} from "./sidebar";
import { createFooter } from "./footer";
import { AddProjectToScreen } from "./addnewproject";
import { displayCompletedProjects } from "./completed";
import { displayAllProjects } from "./viewprojects";
import { displayImportantProjects } from "./important";
import { displayPendingProjects } from "./pending";

export const projects = [];
export const completed_projects = [];
export const important_projects = [];
export const pending_projects = [];


class Task{
    constructor(taskName, desc, due, priority, taskStatus){
        this.taskName = taskName;
        this.desc = desc;
        this.due = due;
        this.priority = priority;
        this.taskStatus = taskStatus;
    }
}

export class Project{
    constructor(projectName, projectStatus, importance){
        this.projectName = projectName;
        this.projectStatus = projectStatus;
        this.importance = importance;
        this.tasks = [];
    }

    addTask(taskName, desc, due, priority, taskStatus){
        const task = new Task(taskName, desc, due, priority, taskStatus);
        this.tasks.push(task);
    }

    removeTask(index){
        this.tasks.splice(index, 1);
    }
}

createSidebar();
createFooter();

const content = document.querySelector(".content");
const header = document.querySelector(".header");
const sidebar = document.querySelector(".sidebar");

header.innerHTML = `<p class=todoTitle>To - Do</p>`

function addProjectLogic(proj) {
    const project = new Project(proj.projectName, false, proj.importance);
    projects.push(project); 
    pending_projects.push(project); 
    projects.pop();
    pending_projects.pop();

    if (proj.importance) {
        important_projects.push(project);
    }

    localStorage.setItem('project', JSON.stringify(projects));

    console.log("Added Project:", project);
    console.log("Completed Projects:", completed_projects);
    console.log("Pending Projects:", pending_projects);
    console.log("Important Projects:", important_projects);
    console.log("All Projects:", projects);
}

function removeProjectLogic(projectName) {
    projects.forEach((proj) => {
        if (proj.projectName === projectName) {
            const pendingIndex = pending_projects.indexOf(proj);
            if (pendingIndex !== -1) {
                completed_projects.push(proj); 
                pending_projects.splice(pendingIndex, 1); 

                if (important_projects.includes(proj)) {
                    const importantIndex = important_projects.indexOf(proj);
                    important_projects.splice(importantIndex, 1); 
                }
            }
        }
    });

    console.log("Completed Projects:", completed_projects);
    console.log("Pending Projects:", pending_projects);
    console.log("Important Projects:", important_projects);
    console.log("All Projects:", projects);
}

function addProjectDOM(){

    const newprojectinfocard = document.createElement("div");
    newprojectinfocard.className = "newprojectinfocard";
    newprojectinfocard.innerHTML = `<p class="newProj">New Project</p>
                        <div class="projectform">
                            <label for="projectname">Project Name:    <input type="text" id="projectname"></label>
                            <button type="button" id="submitproject">Add Project</button>
                            <input type="checkbox" id="importance" name="importanceinput" value="Important">
                            <label for="importance">Mark as Important</label>
                        </div>`;
    header.appendChild(newprojectinfocard);

    const submitprojectbutton = document.getElementById("submitproject");
    submitprojectbutton.addEventListener("click", (e)=>{
        e.preventDefault();
        const projectName = document.getElementById("projectname").value.trim();
        if(projectName){
            let important = document.querySelector('#importance').checked;
            header.removeChild(newprojectinfocard);
            const proj = AddProjectToScreen(projectName, important);
            addProjectLogic(proj);

            const content = document.querySelector(".content");
            const projectDiv = [...content.querySelectorAll(".project")].find(div =>
                div.querySelector(".projectTitle").innerText.includes(projectName)
            );
            const removeProjectButton = projectDiv.querySelector(".remove-project");

            removeProjectButton.addEventListener("click", () => {
                removeProjectLogic(projectName);
                content.removeChild(projectDiv);
            });
        }else{
            alert("Please enter a project name.");
        }
    })
}

document.querySelector(".newprojectbutton").addEventListener("click", (e)=>{
    e.preventDefault();
    content.innerHTML = "";
    addProjectDOM();
})

document.querySelector(".completedbutton").addEventListener("click", (e)=>{
    e.preventDefault();
    displayCompletedProjects();
});

document.querySelector(".pendingbutton").addEventListener("click", (e)=>{
    e.preventDefault();
    displayPendingProjects();
});

document.querySelector(".impbutton").addEventListener("click", (e)=>{
    e.preventDefault();
    displayImportantProjects();
});

document.querySelector(".viewbutton").addEventListener("click", (e)=>{
    e.preventDefault();
    displayAllProjects();
});
