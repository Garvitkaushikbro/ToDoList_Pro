const sideBar = document.querySelector(".sideBar");
const activityLogContainer = document.querySelector("#activityLogContainer");

sideBar.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("activityLogs")) {
    const activityLog = [...JSON.parse(localStorage.getItem("activityLog"))];
    overlay.classList.remove("hidden");
    activityLogContainer.classList.remove("hidden");
    overlay.addEventListener("click", function () {
      overlay.classList.add("hidden");
      activityLogContainer.classList.add("hidden");
    });
    // Loop through the activityLog array and generate HTML for each entry
    activityLog.forEach((entry) => {
      const activityDiv = document.createElement("div");
      activityDiv.classList.add("activity");

      const actionHeader = document.createElement("h3");
      actionHeader.textContent = `Action: ${entry.action}`;
      activityDiv.appendChild(actionHeader);

      const data = entry.data;
      const titleParagraph = document.createElement("p");
      titleParagraph.textContent = `Title: ${data.title}`;
      activityDiv.appendChild(titleParagraph);

      const descriptionParagraph = document.createElement("p");
      descriptionParagraph.textContent = `Description: ${data.description}`;
      activityDiv.appendChild(descriptionParagraph);

      const doneParagraph = document.createElement("p");
      doneParagraph.textContent = `Done: ${data.done ? "Yes" : "No"}`;
      activityDiv.appendChild(doneParagraph);

      const categoryParagraph = document.createElement("p");
      categoryParagraph.textContent = `Category: ${data.category}`;
      activityDiv.appendChild(categoryParagraph);

      const priorityParagraph = document.createElement("p");
      priorityParagraph.textContent = `Priority: ${data.priority}`;
      activityDiv.appendChild(priorityParagraph);

      if (data.subtask.length > 0) {
        const subtaskList = document.createElement("ul");
        subtaskList.textContent = "Subtasks:";
        subtaskList.classList.add("subtask");
        data.subtask.forEach((subtask) => {
          const subtaskItem = document.createElement("li");
          subtaskItem.textContent = subtask;
          subtaskList.appendChild(subtaskItem);
        });
        activityDiv.appendChild(subtaskList);
      }

      const dueDateParagraph = document.createElement("p");
      dueDateParagraph.textContent = `Due Date: ${data.dueDate.toLocaleString()}`;
      activityDiv.appendChild(dueDateParagraph);

      activityLogContainer.appendChild(activityDiv);
    });
  } else if (e.target.classList.contains("viewBackLogs")) {
    overlay.classList.remove("hidden");
    viewBackLogContainer.classList.remove("hidden");
    overlay.addEventListener("click", function () {
      overlay.classList.add("hidden");
      viewBackLogContainer.classList.add("hidden");
    });

    filteredData = [...JSON.parse(localStorage.getItem("data"))];
    filteredData = filteredData.filter((d) => {
      let x = new Date(Date.now());
      let y = new Date(y);
      return y - x < 0;
    });
    filteredData.forEach((data) => {
      const viewBackDiv = document.createElement("div");
      viewBackDiv.classList.add("viewBack");

      const actionHeader = document.createElement("h3");
      actionHeader.textContent = `Pending`;
      viewBackDiv.appendChild(actionHeader);

      const titleParagraph = document.createElement("p");
      titleParagraph.textContent = `Title: ${data.title}`;
      viewBackDiv.appendChild(titleParagraph);

      const descriptionParagraph = document.createElement("p");
      descriptionParagraph.textContent = `Description: ${data.description}`;
      viewBackDiv.appendChild(descriptionParagraph);

      const doneParagraph = document.createElement("p");
      doneParagraph.textContent = `Done: ${data.done ? "Yes" : "No"}`;
      viewBackDiv.appendChild(doneParagraph);

      const categoryParagraph = document.createElement("p");
      categoryParagraph.textContent = `Category: ${data.category}`;
      viewBackDiv.appendChild(categoryParagraph);

      const priorityParagraph = document.createElement("p");
      priorityParagraph.textContent = `Priority: ${data.priority}`;
      viewBackDiv.appendChild(priorityParagraph);

      if (data.subtask.length > 0) {
        const subtaskList = document.createElement("ul");
        subtaskList.textContent = "Subtasks:";
        subtaskList.classList.add("subtask");
        data.subtask.forEach((subtask) => {
          const subtaskItem = document.createElement("li");
          subtaskItem.textContent = subtask;
          subtaskList.appendChild(subtaskItem);
        });
        viewBackDiv.appendChild(subtaskList);
      }

      const dueDateParagraph = document.createElement("p");
      dueDateParagraph.textContent = `Due Date: ${data.dueDate.toLocaleString()}`;
      viewBackDiv.appendChild(dueDateParagraph);

      viewBackLogContainer.appendChild(viewBackDiv);
    });
  }
});
