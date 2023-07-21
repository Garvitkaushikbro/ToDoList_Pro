data = [];
let id;
const inputTask = document.getElementById("inputTask");
const button = document.querySelector("button");
const listTask = document.querySelector("#listTask");

function render() {
  while (listTask.firstChild) listTask.firstChild.remove();

  for (let d of data) {
    let li = document.createElement("li");
    li.innerHTML = `<div>title: ${d.title} id: ${d.id}</div>`;
    li.className = d.id;

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
    options.appendChild(edit);
    options.appendChild(remove);
    options.classList.add("options");

    li.appendChild(options);
    listTask.appendChild(li);
  }
}

fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed"); // Handle non-200 HTTP status codes
    }
    return response.json(); // Parse response body as JSON
  })
  .then((d) => {
    // Process the array data
    data = d;
    id = d.length + 1;
    render();
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.log("Error:", error);
  });

// Add task
button.addEventListener("click", function add() {
  if (inputTask.value === "") {
    alert("Please enter a task.");
  } else {
    data.push({ title: inputTask.value, id: id });
    id++;
    inputTask.value = "";
    render();
  }
});

listTask.addEventListener("click", function (e) {
  console.log(e.target.getAttribute("class"));
  if (e.target.className === "remove") {
    console.log("gar");
  } else if (e.target.className === "edit") {
    console.log("vit");
  }
});

// document.querySelector("#save").addEventListener("click", function save() {
//   let edit = document.getElementById("input");
//   let value = edit.value;
//   for (let i = 0; i < data.length; i++) {
//     if (data[i].id == edit.className) {
//       if (value == "") break;
//       data[i].title = value;
//     }
//   }
//   let inputDataId = document.getElementById("inputDataId");
//   inputDataId.style.display = "none";
//   render();
// });
