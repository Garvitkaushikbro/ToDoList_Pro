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
    activityLogContainer.innerHTML = "";
    const activityLog = JSON.parse(localStorage.getItem("activityLog"));
    overlayactivityLog.classList.remove("hidden");
    activityLogContainer.classList.remove("hidden");

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

      const dateOption = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const timeOption = {
        hour: "numeric",
        minute: "numeric",
      };

      const dueDate = new Date(data.dueDate);
      const date = new Intl.DateTimeFormat("en-IN", dateOption).format(dueDate);
      const time = new Intl.DateTimeFormat("en-IN", timeOption).format(dueDate);
      const timestampParagraph = document.createElement("p");
      descriptionParagraph.textContent = date + "|" + time;
      activityDiv.appendChild(timestampParagraph);

      activityLogContainer.appendChild(activityDiv);
    });
  } else if (e.target.classList.contains("viewBackLogs")) {
    viewBackLogContainer.innerHTML = "";
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
