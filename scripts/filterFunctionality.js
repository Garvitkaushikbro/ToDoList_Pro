const filter = document.querySelector(".filter");
const modalFilter = document.querySelector(".modalFilter");
const overlayFilter = document.querySelector(".overlayFilter");
const formTaskFilter = document.querySelector("#form_task_filter");
const closeModalFilter = document.querySelector(".close_form_task_filter");

const removeModalFilter = function () {
  overlayFilter.classList.add("hidden");
  modalFilter.classList.add("hidden");
};

const showModalFilter = function () {
  overlayFilter.classList.remove("hidden");
  modalFilter.classList.remove("hidden");
};

overlayFilter.addEventListener("click", removeModalFilter);

closeModalFilter.addEventListener("click", removeModalFilter);

filter.addEventListener("mouseenter", function (e) {
  e.preventDefault();
  const filterOptions = document.querySelector(".filterOptions");
  filterOptions.classList.remove("hidden");
});

filter.addEventListener("mouseleave", function (e) {
  e.preventDefault();
  const filterOptions = document.querySelector(".filterOptions");
  filterOptions.classList.add("hidden");
});

const filterOptions = document.querySelector(".filterOptions");

const showHigh = (d) => d.priority === "high";
const showLow = (d) => d.priority === "low";
const showMedium = (d) => d.priority === "medium";
const showHome = (d) => d.category === "home";
const showOffice = (d) => d.category === "office";
const showGym = (d) => d.category === "gym";
const showDone = (d) => d.done;
const showNotDone = (d) => !d.done;

filterOptions.addEventListener("click", function (e) {
  e.preventDefault();
  let newData = JSON.parse(localStorage.getItem("data"));
  newData = newData.map((obj) => {
    obj.dueDate = new Date(obj.dueDate);
    return obj;
  });
  if (e.target.classList.contains("filterHigh")) {
    render(newData, showHigh);
  } else if (e.target.classList.contains("filterLow")) {
    render(newData, showLow);
  } else if (e.target.classList.contains("filterMedium")) {
    render(newData, showMedium);
  } else if (e.target.classList.contains("noFilter")) {
    render(newData, showAll);
  } else if (e.target.classList.contains("filterDone")) {
    render(newData, showDone);
  } else if (e.target.classList.contains("filterNotDone")) {
    render(newData, showNotDone);
  } else if (e.target.classList.contains("categoryFilter")) {
    showModalFilter();
  }
});

formTaskFilter.addEventListener("submit", function (e) {
  e.preventDefault();
  let newData = JSON.parse(localStorage.getItem("data"));
  newData = newData.map((obj) => {
    obj.dueDate = new Date(obj.dueDate);
    return obj;
  });
  const selectedCategory = Array.from(
    formTaskFilter.elements.form_task_category_filter.value.split(" ")
  );
  newData = newData.filter((d) => selectedCategory.includes(d.category));
  formTaskFilter.reset();
  render(newData, showAll);
});
