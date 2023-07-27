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

function compareByDate1(dateStr1, dateStr2) {
  const date1 = +dateStr1.dueDate;
  const date2 = +dateStr2.dueDate;
  return date1 - date2;
}

function compareByDate2(dateStr1, dateStr2) {
  const date1 = +dateStr1.dueDate;
  const date2 = +dateStr2.dueDate;
  return date2 - date1;
}

sortOptions.addEventListener("click", function (e) {
  let newData = JSON.parse(localStorage.getItem("data"));
  newData = newData.map((obj) => {
    obj.dueDate = new Date(obj.dueDate);
    return obj;
  });
  e.preventDefault();
  if (e.target.classList.contains("noSort")) {
    render(newData, showAll);
  } else if (e.target.classList.contains("sortRight")) {
    newData.sort(compareByDate2);
    render(newData, showAll);
  } else if (e.target.classList.contains("sortWrong")) {
    newData.sort(compareByDate1);
    render(newData, showAll);
  }
});
