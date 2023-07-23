const sort = document.querySelector(".sort");
sort.addEventListener("mouseenter", function (e) {
  e.preventDefault();
  const sortOptions = document.querySelector(".sortOptions");
  sortOptions.classList.remove("hidden");
});

sort.addEventListener("mouseleave", function (e) {
  e.preventDefault();
  const sortOptions = document.querySelector(".sortOptions");
  sortOptions.classList.add("hidden");
});

const sortOptions = document.querySelector(".sortOptions");

function compareByDate1(a, b) {
  return a.dueDate - b.dueDate;
}

function compareByDate2(a, b) {
  return b.dueDate - a.dueDate;
}

sortOptions.addEventListener("click", function (e) {
  let newData = JSON.parse(localStorage.getItem("data"));
  e.preventDefault();
  if (e.target.classList.contains("noSort")) {
    render(newData, showAll);
  } else if (e.target.classList.contains("sortRight")) {
    newData.sort(compareByDate2);
    console.log(newData);
    render(newData, showAll);
  } else if (e.target.classList.contains("sortWrong")) {
    newData.sort(compareByDate1);
    console.log(newData);
    render(newData, showAll);
  }
});
