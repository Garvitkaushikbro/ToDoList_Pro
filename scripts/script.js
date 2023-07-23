let data = [];
let id = 0;
let isHamburgerOpen = false;
let activityLog = [];

// Store the 'data' array in localStorage
localStorage.setItem("data", JSON.stringify(data));
localStorage.setItem("id", JSON.stringify(id));
localStorage.setItem("isHamburgerOpen", JSON.stringify(isHamburgerOpen));
localStorage.setItem("activityLog", JSON.stringify(activityLog));

const inputTask = document.getElementById("inputTask");
const button = document.querySelector("button");
const listTask = document.querySelector("#listTask");

const showAll = (_) => true;

function render(data, filterFunction) {
  while (listTask.firstChild) listTask.firstChild.remove();
  const currentData = data.filter(filterFunction);

  const rest = document.querySelector(".rest");
  if (data.length === 0) rest.classList.remove("hidden");

  for (let d of currentData) {
    let li = document.createElement("li");
    li.classList.add(d.id);
    li.classList.add("task_and_option");
    let x = new Date(d.dueDate);
    const date = new Intl.DateTimeFormat("en-uk").format(x);
    let taskString = `<div class="task ${d.done ? "blur" : ""} 
    ${d.priority === "high" ? "rbl" : ""} 
    ${d.priority === "low" ? "gbl" : ""}
    ${d.priority === "medium" ? "obl" : ""} ">
      <div class="task_header">
        <div class="task_title">${d.title}</div>
        <div class="task_dueDate">Due date: ${date}</div>
      </div>
      <div class="task_description ${d.done ? "hidden" : ""}">${
      d.description
    }</div>
      <ul class="task_subtask ${d.done ? "hidden" : ""}">`;

    for (let i = 0; i < d.subtask.length; i++) {
      let st = d.subtask[i];
      taskString += `<li class="subtask">- ${st} <svg data-tab=${i} class="deleteSubtask" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
  </li>`;
    }
    taskString += `</ul></div>`;

    li.innerHTML = taskString;

    const undone = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    undone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    undone.setAttribute("fill", "none");
    undone.setAttribute("viewBox", "0 0 24 24");
    undone.classList.add("done");

    // Create the path element and set its attributes
    const pathElement3 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement3.setAttribute("stroke-linecap", "round");
    pathElement3.setAttribute("stroke-linejoin", "round");
    pathElement3.setAttribute("d", "M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3");

    // Append the path element to the SVG element
    undone.appendChild(pathElement3);

    // Append the SVG element to the container div
    const svgContainer = document.getElementById("svgContainer");

    const done = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    done.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    done.setAttribute("viewBox", "0 0 24 24");
    done.classList.add("done");

    // Create the path for the icon
    const pathElement2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement2.setAttribute("stroke-linecap", "round");
    pathElement2.setAttribute("stroke-linejoin", "round");
    pathElement2.setAttribute(
      "d",
      "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    );

    done.appendChild(pathElement2);

    // Create the SVG element
    const remove = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    remove.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    remove.setAttribute("viewBox", "0 0 24 24");
    remove.classList.add("remove");

    // Create the path for the icon
    const pathElement1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement1.setAttribute("stroke-linecap", "round");
    pathElement1.setAttribute("stroke-linejoin", "round");
    pathElement1.setAttribute(
      "d",
      "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    );

    remove.appendChild(pathElement1);

    // Create the SVG element
    const edit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    edit.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    edit.setAttribute("viewBox", "0 0 24 24");
    edit.classList.add("edit");

    // Create the path for the icon
    const pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttribute("stroke-linecap", "round");
    pathElement.setAttribute("stroke-linejoin", "round");
    pathElement.setAttribute(
      "d",
      "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    );

    // Append the path to the SVG element
    edit.appendChild(pathElement);

    const options = document.createElement("div");
    options.classList.add("options");

    if (d.done) {
      options.appendChild(undone);
    } else {
      options.appendChild(done);
    }
    options.appendChild(edit);
    options.appendChild(remove);

    li.appendChild(options);
    listTask.appendChild(li);
    const rest = document.querySelector(".rest");
    if (data.length !== 0) rest.classList.add("hidden");
  }
}

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const year = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const time = new Date(Date.now());
const currentYear = String(time.getFullYear());
document.querySelector(".dateContainer h1").textContent = week[time.getDay()];
document.querySelector(".dateContainer h2").textContent = `${time.getDate()} ${
  year[time.getMonth()]
}'${currentYear.slice(2)}`;
