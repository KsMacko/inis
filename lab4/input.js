
const workspace = document.getElementById('workspace');
const targets = document.querySelectorAll('.target');

let draggedElement = null;
let isDragging = false;
let isStickyDragging = false;
let initialMouseX = 0;
let initialMouseY = 0;
let initialElementX = 0;
let initialElementY = 0;

function resetPosition(element) {
    element.style.position = 'absolute';
    element.style.left = `${element.dataset.initialLeft}px`;
    element.style.top = `${element.dataset.initialTop}px`;
}

targets.forEach(target => {
    const rect = target.getBoundingClientRect();
    target.dataset.initialLeft = rect.left;
    target.dataset.initialTop = rect.top;
});

workspace.addEventListener('mousedown', (event) => {
    const target = event.target.closest('.target');
    if (!target) return;

    if (event.detail === 2) {
        if (isStickyDragging && draggedElement === target) {
            draggedElement.style.backgroundColor = 'red';
            draggedElement = null;
            isStickyDragging = false;
        } else {
            draggedElement = target;
            draggedElement.style.backgroundColor = 'blue'; // Меняем цвет
            isStickyDragging = true;
        }
        return;
    }
    draggedElement = target;
    isDragging = true;
    initialMouseX = event.clientX;
    initialMouseY = event.clientY;
    initialElementX = parseFloat(draggedElement.style.left || draggedElement.offsetLeft);
    initialElementY = parseFloat(draggedElement.style.top || draggedElement.offsetTop);
});

workspace.addEventListener('mousemove', (event) => {
    if (!draggedElement) return;

    if (isDragging) {
        // Обычное перетаскивание
        const deltaX = event.clientX - initialMouseX;
        const deltaY = event.clientY - initialMouseY;
        draggedElement.style.left = `${initialElementX + deltaX}px`;
        draggedElement.style.top = `${initialElementY + deltaY}px`;
    } else if (isStickyDragging) {
        draggedElement.style.left = `${event.clientX - draggedElement.offsetWidth / 2}px`;
        draggedElement.style.top = `${event.clientY - draggedElement.offsetHeight / 2}px`;
    }
});
workspace.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        draggedElement = null;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (draggedElement) {
            resetPosition(draggedElement);
            draggedElement.style.backgroundColor = 'red';
            draggedElement = null;
            isDragging = false;
            isStickyDragging = false;
        }
    }
});