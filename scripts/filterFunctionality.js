const filter = document.querySelector(".filter");
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
  let data = [...JSON.parse(localStorage.getItem("data"))];
  e.preventDefault();
  if (e.target.classList.contains("filterHigh")) {
    render(data, showHigh);
  } else if (e.target.classList.contains("filterLow")) {
    render(data, showLow);
  } else if (e.target.classList.contains("filterMedium")) {
    render(data, showMedium);
  } else if (e.target.classList.contains("advanceFilter")) {
    console.log("as");
  } else if (e.target.classList.contains("noFilter")) {
    render(data, showAll);
  } else if (e.target.classList.contains("filterHome")) {
    render(data, showHome);
  } else if (e.target.classList.contains("filterOffice")) {
    render(data, showOffice);
  } else if (e.target.classList.contains("filterGym")) {
    render(data, showGym);
  } else if (e.target.classList.contains("filterDone")) {
    render(data, showDone);
  } else if (e.target.classList.contains("filterNotDone")) {
    render(data, showNotDone);
  }
});
