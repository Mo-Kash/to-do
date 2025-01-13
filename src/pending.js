import { projects } from ".";
import { completed_projects } from ".";

export function displayPendingProjects() {
    const reference = localStorage.getItem('project');
    let localProjects = projects;
    let localPendingProjects = [];

    // Load projects from localStorage
    if (reference) {
        localProjects = JSON.parse(reference);
    }
    
    localPendingProjects = localProjects.filter(proj => proj.projectStatus === false);

    console.log(localPendingProjects);

    const content = document.querySelector(".content");
    content.innerHTML = "";

    const projInfoCard = document.querySelector(".newprojectinfocard");
    if (projInfoCard !== null) projInfoCard.innerHTML = "";

    localPendingProjects.forEach((project) => {
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

            // Task complete button
            taskItem.querySelector(".complete-task").addEventListener("click", () => {
                taskItem.style.textDecoration = "line-through";
            });

            // Task delete button
            taskItem.querySelector(".delete-task").addEventListener("click", () => {
                tasklist.removeChild(taskItem);
                project.tasks.splice(taskIndex, 1); // Update project.tasks
                localStorage.setItem('project', JSON.stringify(localProjects));
            });

            tasklist.appendChild(taskItem);
        });

        projectDiv.appendChild(tasklist);

        // Remove project button
        const removeProjectButton = document.createElement("button");
        removeProjectButton.className = "remove-project";
        removeProjectButton.innerText = "Complete Project";
        removeProjectButton.addEventListener("click", () => {
            project.projectStatus = true;

            // Update projects in localStorage
            localStorage.setItem('project', JSON.stringify(localProjects));

            // Move to completed_projects
            completed_projects.push(project);
            localStorage.setItem('completed_projects', JSON.stringify(completed_projects));

            // Remove from pending projects
            const projectcompletedIndex = localPendingProjects.findIndex(p => p.projectName === project.projectName);
            if (projectcompletedIndex !== -1) {
                localPendingProjects.splice(projectcompletedIndex, 1);
                content.removeChild(projectDiv);
            }
        });

        projectDiv.appendChild(removeProjectButton);
        content.appendChild(projectDiv);
    });
}
