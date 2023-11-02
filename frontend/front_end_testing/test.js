// Get all the draggable elements
const draggables = document.querySelectorAll('.draggable');

// Add a "dragstart" event listener to each draggable element
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', draggable.id);
  });
});

// Add a "dragover" event listener to the containers to allow the drop
const containers = document.querySelectorAll('.container');
containers.forEach(container => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  // Add a "drop" event listener to the containers to handle the drop
  container.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(data);
    container.appendChild(draggableElement);
  });
});
