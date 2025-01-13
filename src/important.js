//import { localImportantProjects } from ".";
import { projects } from ".";
import { completed_projects } from ".";
import { pending_projects } from ".";

export function displayImportantProjects(){

    const reference = localStorage.getItem('project');
        
    let localProjects = projects;
    let localImportantProjects = [];

    if (reference) {
        localProjects = JSON.parse(reference);
    }
    
    localProjects.forEach((proj) => {
        if(proj.importance===true){
            localImportantProjects.push(proj);
        }
    });

    console.log(localImportantProjects);
    const content = document.querySelector(".content");
    content.innerHTML = "";

    const projInfoCard = document.querySelector(".newprojectinfocard");
    if(projInfoCard!==null)
        projInfoCard.innerHTML = "";

    localImportantProjects.forEach((project) => {
        const projectDiv = document.createElement("div");
        projectDiv.className = "project";

        const projectTitle = document.createElement("p");
        projectTitle.className = "projectTitle";
        projectTitle.innerText = project.projectName;
        if (project.importance === true) projectTitle.innerText += " ⭐";
        projectDiv.appendChild(projectTitle);

        const tasklist = document.createElement("ul");
        tasklist.classList.add("task-list");

        project.tasks.forEach((task, taskIndex) => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span>${task.taskName} | ${task.desc} | Due: ${task.due} | Priority: ${task.priority}</span>
                <button class="complete-task">Complete</button>
                <button class="delete-task">Delete</button>
            `;

            if(task.taskStatus===true){
                taskItem.style.textDecoration = "line-through";
            }

            taskItem.querySelector(".complete-task").addEventListener("click", () => {
                taskItem.style.textDecoration = "line-through";
            });

            taskItem.querySelector(".delete-task").addEventListener("click", () => {
                tasklist.removeChild(taskItem);
                project.tasks.splice(taskIndex, 1); 
            });

            tasklist.appendChild(taskItem);
        });

        projectDiv.appendChild(tasklist);

        if(project.projectStatus===true){
            projectDiv.style = "outline: 10px solid green";
            const projCompleted = document.createElement("div");
            projCompleted.classList.add("projectCompletedTxt");
            projCompleted.innerHTML = '<p>Completed!</p>'
            projCompleted.style = "text-align: center; color: darkgreen; font-sixe: 5rem; font-weight: 800;"

            projectDiv.appendChild(projCompleted);
            
        }else{
            const removeProjectButton = document.createElement("button");
            removeProjectButton.className = "remove-project";
            removeProjectButton.innerText = "Complete Project";
            removeProjectButton.addEventListener("click", () => {
                projectDiv.style = "outline: 10px solid green";
                projectDiv.removeChild(removeProjectButton);

                const projCompleted = document.createElement("div");
                projCompleted.classList.add("projectCompletedTxt");
                projCompleted.innerHTML = '<p>Completed!</p>'
                projCompleted.style = "text-align: center; color: darkgreen; font-sixe: 5rem;"

                projectDiv.appendChild(projCompleted);

                project.projectStatus = true;
    
                localStorage.setItem('project', JSON.stringify(localProjects));
    
                completed_projects.push(project);
                localStorage.setItem('completed_projects', JSON.stringify(completed_projects));
    
                // Remove from pending projects
                const projectcompletedIndex = pending_projects.findIndex(p => p.projectName === project.projectName);
                if (projectcompletedIndex !== -1) {
                    pending_projects.splice(projectcompletedIndex, 1);
                    //content.removeChild(projectDiv);
                }
            });

            projectDiv.appendChild(removeProjectButton);
        }
        
        content.appendChild(projectDiv);
    });
}