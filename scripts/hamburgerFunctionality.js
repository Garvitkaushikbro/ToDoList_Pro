const hamb = document.querySelector(".navHamburger");

hamb.addEventListener("click", function () {
  let isHamburgerOpen = JSON.parse(localStorage.getItem("isHamburgerOpen"));
  const sideBar = document.querySelector(".sideBar");
  console.log(sideBar);
  if (!isHamburgerOpen) sideBar.style.transform = "translateX(0%)";
  else sideBar.style.transform = "";
  isHamburgerOpen = !isHamburgerOpen;
  localStorage.setItem("isHamburgerOpen", JSON.stringify(isHamburgerOpen));
});
