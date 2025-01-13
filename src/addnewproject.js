import { Project } from ".";
import { projects, important_projects, pending_projects } from ".";

export function AddProjectToScreen(projectName, important) {
    const content = document.querySelector(".content");

    const proj = new Project(projectName, false, important); 
    projects.push(proj);
    pending_projects.push(proj); 
    if (important) {
        important_projects.push(proj);
    }

    const projectDiv = document.createElement("div");
    projectDiv.className = "project";

    const projectTitle = document.createElement("p");
    projectTitle.className = "projectTitle";
    projectTitle.innerText = projectName;
    if (important === true) projectTitle.innerText += " ⭐";
    projectDiv.appendChild(projectTitle);

    const taskform = document.createElement("form");
    taskform.classList.add("taskform");
    projectDiv.appendChild(taskform);

    const tasklist = document.createElement("ul");
    tasklist.classList.add("task-list");
    projectDiv.appendChild(tasklist);

    const removeProjectButton = document.createElement("button");
    removeProjectButton.className = "remove-project";
    removeProjectButton.innerText = "Add Project";
    projectDiv.appendChild(removeProjectButton);

    content.appendChild(projectDiv);

    taskform.innerHTML = `<input type="text" id="taskname" name="taskTitle" placeholder="Task Title" required />
                          <input type="text" id="taskdesc" name="taskDesc" placeholder="Task Description" required />
                          <input type="date" name="taskDue" required />
                          <select name="taskPriority" required>
                              <option value="" disabled selected>Priority</option>
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                          </select>
                          <button type="submit" class="add-task-btn">Add Task</button>`;

    taskform.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(taskform);
        const taskTitle = formData.get("taskTitle");
        const taskDesc = formData.get("taskDesc");
        const taskDue = formData.get("taskDue");
        const taskPriority = formData.get("taskPriority");

        proj.addTask(taskTitle, taskDesc, taskDue, taskPriority, false); 

        localStorage.setItem('project', JSON.stringify(projects));

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `<span>${taskTitle} | ${taskDesc} | Due: ${taskDue} | Priority: ${taskPriority} | </span>
                              <button class="complete-task">Complete</button>
                              <button class="delete-task">Delete</button>`;

        taskItem.querySelector(".complete-task").addEventListener("click", () => {
            taskItem.style.textDecoration = "line-through";
            const taskIndex = proj.tasks.findIndex((task) => task.taskName === taskTitle);
            if (taskIndex !== -1) {
                proj.tasks[taskIndex].taskStatus = true; 
            }
        });

        taskItem.querySelector(".delete-task").addEventListener("click", () => {
            const taskIndex = proj.tasks.findIndex((task) => task.taskName === taskTitle);
            if (taskIndex !== -1) {
                proj.removeTask(taskIndex); 
                tasklist.removeChild(taskItem);
            }
        });

        tasklist.appendChild(taskItem);
        taskform.reset();

        console.log(proj.tasks);
        console.log(proj);
    });

    return proj;
}
