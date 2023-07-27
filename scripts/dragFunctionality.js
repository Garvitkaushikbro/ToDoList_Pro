const container = document.querySelector("#listTask");

container.addEventListener("dragover", (e) => {
  e.preventDefault(); // Add this line to enable drop
  const drag = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(container, e.clientY);

  if (afterElement === null) container.appendChild(drag);
  else container.insertBefore(drag, afterElement);
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset)
        return { offset: offset, element: child };
      else return closest;
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
}
