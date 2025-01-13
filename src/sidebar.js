export function createSidebar(){
    const sidebar = document.querySelector(".sidebar");

    const sidebartitle = document.createElement("div");
    sidebartitle.classList.add("sidebartitle");
    sidebartitle.innerHTML = `<p>Your Projects</p>`
    sidebar.appendChild(sidebartitle);

    const view = document.querySelector(".viewallprojects");
    const imp = document.querySelector(".important");
    const pending = document.querySelector(".pending");
    const completed = document.querySelector(".completed");
    const addnew = document.querySelector(".addnewproject");

    const viewbutton = document.createElement("button");
    viewbutton.classList.add("viewbutton");
    viewbutton.classList.add("sidebarbutton");
    viewbutton.textContent = "View Your Projects";
    view.appendChild(viewbutton);
    sidebar.appendChild(view);

    const impbutton = document.createElement("button");
    impbutton.classList.add("impbutton");
    impbutton.classList.add("sidebarbutton");
    impbutton.textContent = "Important Projects";
    imp.appendChild(impbutton);
    sidebar.appendChild(imp);

    const pendingbutton = document.createElement("button");
    pendingbutton.classList.add("pendingbutton");
    pendingbutton.classList.add("sidebarbutton");
    pendingbutton.textContent = "Pending Projects";
    pending.appendChild(pendingbutton);
    sidebar.appendChild(pending);

    const completedbutton = document.createElement("button");
    completedbutton.classList.add("completedbutton");
    completedbutton.classList.add("sidebarbutton");
    completedbutton.textContent = "Completed";
    completed.appendChild(completedbutton);
    sidebar.appendChild(completed);

    const newprojbutton = document.createElement("button");
    newprojbutton.classList.add("newprojectbutton");
    newprojbutton.classList.add("sidebarbutton");
    newprojbutton.textContent = "New Project +";
    addnew.appendChild(newprojbutton);
    sidebar.appendChild(addnew);
}
