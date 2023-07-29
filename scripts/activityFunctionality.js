const sideBar = document.querySelector(".sideBar");
const activityLogContainer = document.querySelector("#activityLogContainer");
const viewBackLogContainer = document.querySelector("#viewBackLogContainer");
const overlayactivityLog = document.querySelector(".overlayactivityLog");
const overlayviewBackLog = document.querySelector(".overlayviewBackLog");

overlayactivityLog.addEventListener("click", function () {
  activityLogContainer.innerHTML = "";
  activityLogContainer.classList.add("hidden");
  overlayactivityLog.classList.add("hidden");
});

overlayviewBackLog.addEventListener("click", function () {
  viewBackLogContainer.innerHTML = "";
  overlayviewBackLog.classList.add("hidden");
  viewBackLogContainer.classList.add("hidden");
});

sideBar.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("activityLogs")) {
    const activityLog = JSON.parse(localStorage.getItem("activityLog"));
    overlayactivityLog.classList.remove("hidden");
    activityLogContainer.classList.remove("hidden");

    // Loop through the activityLog array and generate HTML for each entry
    activityLog.forEach((entry) => {
      const activityDiv = document.createElement("div");
      activityDiv.classList.add("activity");

      const actionHeader = document.createElement("h3");
      const str = entry.action.toUpperCase();
      actionHeader.textContent = `${str}`;
      activityDiv.appendChild(actionHeader);

      const data = entry.data;
      const titleParagraph = document.createElement("p");
      titleParagraph.textContent = `Title: ${data.title}`;
      activityDiv.appendChild(titleParagraph);

      const descriptionParagraph = document.createElement("p");
      descriptionParagraph.textContent = `Description: ${data.description}`;
      activityDiv.appendChild(descriptionParagraph);

      // const doneParagraph = document.createElement("p");
      // doneParagraph.textContent = `Done: ${data.done ? "Yes" : "No"}`;
      // activityDiv.appendChild(doneParagraph);

      // const categoryParagraph = document.createElement("p");
      // categoryParagraph.textContent = `Category: ${data.category}`;
      // activityDiv.appendChild(categoryParagraph);

      // const priorityParagraph = document.createElement("p");
      // priorityParagraph.textContent = `Priority: ${data.priority}`;
      // activityDiv.appendChild(priorityParagraph);

      // if (data.subtask.length > 0) {
      //   const subtaskList = document.createElement("ul");
      //   subtaskList.textContent = "Subtasks:";
      //   subtaskList.classList.add("subtask");
      //   data.subtask.forEach((subtask) => {
      //     const subtaskItem = document.createElement("li");
      //     subtaskItem.textContent = subtask;
      //     subtaskList.appendChild(subtaskItem);
      //   });
      //   activityDiv.appendChild(subtaskList);
      // }

      // const dueDateParagraph = document.createElement("p");
      // dueDateParagraph.textContent = `Due Date: ${data.dueDate.toLocaleString()}`;
      // activityDiv.appendChild(dueDateParagraph);

      activityLogContainer.appendChild(activityDiv);
    });
  } else if (e.target.classList.contains("viewBackLogs")) {
    overlayviewBackLog.classList.remove("hidden");
    viewBackLogContainer.classList.remove("hidden");

    filteredData = JSON.parse(localStorage.getItem("data"));
    filteredData = filteredData.map((obj) => {
      obj.dueDate = new Date(obj.dueDate);
      return obj;
    });

    console.log(filteredData);
    filteredData = filteredData.filter((d) => {
      let x = Date.now();
      let y = new Date(d.dueDate);
      y = +y;
      return y < x && !d.done;
    });
    console.log(filteredData);
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

      // const doneParagraph = document.createElement("p");
      // doneParagraph.textContent = `Done: ${data.done ? "Yes" : "No"}`;
      // viewBackDiv.appendChild(doneParagraph);

      // const categoryParagraph = document.createElement("p");
      // categoryParagraph.textContent = `Category: ${data.category}`;
      // viewBackDiv.appendChild(categoryParagraph);

      // const priorityParagraph = document.createElement("p");
      // priorityParagraph.textContent = `Priority: ${data.priority}`;
      // viewBackDiv.appendChild(priorityParagraph);

      // if (data.subtask.length > 0) {
      //   const subtaskList = document.createElement("ul");
      //   subtaskList.textContent = "Subtasks:";
      //   subtaskList.classList.add("subtask");
      //   data.subtask.forEach((subtask) => {
      //     const subtaskItem = document.createElement("li");
      //     subtaskItem.textContent = subtask;
      //     subtaskList.appendChild(subtaskItem);
      //   });
      //   viewBackDiv.appendChild(subtaskList);
      // }
      const option = {
        hour: "numeric",
        minute: "numeric",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const date = new Intl.DateTimeFormat("en-IN", option).format(
        data.dueDate
      );
      const dueDateParagraph = document.createElement("p");
      dueDateParagraph.textContent = `Due Date: ${date}`;
      viewBackDiv.appendChild(dueDateParagraph);

      viewBackLogContainer.appendChild(viewBackDiv);
    });
  }
});
