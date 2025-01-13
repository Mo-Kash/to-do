//import { localCompletedProjects } from ".";
import { projects } from ".";

export function displayCompletedProjects() {
    const reference = localStorage.getItem('project');
        
    let localProjects = projects;
    let localCompletedProjects = [];

    // Load projects from localStorage
    if (reference) {
        localProjects = JSON.parse(reference);
    }
    
    // Filter completed projects
    localCompletedProjects = localProjects.filter(proj => proj.projectStatus === true);

    console.log(localCompletedProjects);

    const content = document.querySelector(".content");
    content.innerHTML = "";

    const projInfoCard = document.querySelector(".newprojectinfocard");
    if (projInfoCard !== null) projInfoCard.innerHTML = "";
    
    localCompletedProjects.forEach((project) => {
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

            // Complete task button
            taskItem.querySelector(".complete-task").addEventListener("click", () => {
                taskItem.style.textDecoration = "line-through";
            });

            // Delete task button
            taskItem.querySelector(".delete-task").addEventListener("click", () => {
                tasklist.removeChild(taskItem);
                project.tasks.splice(taskIndex, 1); 
                localStorage.setItem('project', JSON.stringify(localProjects));
            });

            tasklist.appendChild(taskItem);
        });

        projectDiv.appendChild(tasklist);

        projectDiv.style = "outline: 10px solid green";

        // Remove project button
        const removeProjectButton = document.createElement("button");
        removeProjectButton.className = "remove-project";
        removeProjectButton.innerText = "Remove Project";
        removeProjectButton.addEventListener("click", () => {
            // Find and remove the project from localProjects
            const projectIndex = localProjects.findIndex(p => p.projectName === project.projectName);
            if (projectIndex !== -1) {
                localProjects.splice(projectIndex, 1); // Remove from main array
                projects.splice(projectIndex, 1);
            }

            // Find and remove the project from localCompletedProjects
            const completedProjectIndex = localCompletedProjects.findIndex(p => p.projectName === project.projectName);
            if (completedProjectIndex !== -1) {
                localCompletedProjects.splice(completedProjectIndex, 1); // Remove from filtered array
                content.removeChild(projectDiv); // Remove from DOM
            }

            // Update localStorage
            localStorage.setItem('project', JSON.stringify(localProjects));
            localStorage.setItem('completed_projects', JSON.stringify(localCompletedProjects));
        });

        projectDiv.appendChild(removeProjectButton);
        content.appendChild(projectDiv);
    });
}
