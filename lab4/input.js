const workspace = document.getElementById('workspace');
const targets = document.querySelectorAll('.target');

let draggedElement = null;
let isStickyDragging = false;
let initialX = 0;
let initialY = 0;

targets.forEach(target => {
    const rect = target.getBoundingClientRect();
    target.dataset.initialLeft = rect.left;
    target.dataset.initialTop = rect.top;
    target.dataset.initialWidth = rect.width;
    target.dataset.initialHeight = rect.height;
});
function resetPositionAndSize(element) {
    element.style.position = 'absolute';
    element.style.left = `${element.dataset.initialLeft}px`;
    element.style.top = `${element.dataset.initialTop}px`;
    element.style.width = `${element.dataset.initialWidth}px`;
    element.style.height = `${element.dataset.initialHeight}px`;
}
function handleStart(event) {
    event.preventDefault();

    let clientX, clientY;
    if (event.type === 'mousedown') {
        clientX = event.clientX;
        clientY = event.clientY;
    } else if (event.type === 'touchstart') {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    }

    const target = document.elementFromPoint(clientX, clientY)?.closest('.target');

    if (isStickyDragging && draggedElement) {
        if (Math.abs(clientX - initialX) < 5 && Math.abs(clientY - initialY) < 5) {
            draggedElement.style.backgroundColor = 'red';
            draggedElement = null;
            isStickyDragging = false;
            return;
        }
    }
    if (event.detail === 2 || event.type === 'dblclick') {
        if (isStickyDragging && draggedElement === target) {
            draggedElement.style.backgroundColor = 'red';
            draggedElement = null;
            isStickyDragging = false;
        } else {
            draggedElement = target;
            draggedElement.style.backgroundColor = 'blue';
            isStickyDragging = true;
            initialX = clientX;
            initialY = clientY;
        }
        return;
    }
    if (target) {
        draggedElement = target;
        initialX = clientX;
        initialY = clientY;
    }
}

function handleMove(event) {
    if (!draggedElement) return;

    let clientX, clientY;
    if (event.type === 'mousemove') {
        clientX = event.clientX;
        clientY = event.clientY;
    } else if (event.type === 'touchmove') {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    }

    if (isStickyDragging) {
        draggedElement.style.left = `${clientX - draggedElement.offsetWidth / 2}px`;
        draggedElement.style.top = `${clientY - draggedElement.offsetHeight / 2}px`;
    } else {
        const deltaX = clientX - initialX;
        const deltaY = clientY - initialY;
        draggedElement.style.left = `${parseFloat(draggedElement.style.left || draggedElement.offsetLeft) + deltaX}px`;
        draggedElement.style.top = `${parseFloat(draggedElement.style.top || draggedElement.offsetTop) + deltaY}px`;
        initialX = clientX;
        initialY = clientY;
    }
}

function handleEnd(event) {
    if (!isStickyDragging) {
        draggedElement = null;
    }
}

function handleMultiTouch(event) {
    if (event.touches.length > 1 && draggedElement) {
        resetPositionAndSize(draggedElement);
        draggedElement.style.backgroundColor = 'red';
        draggedElement = null;
        isStickyDragging = false;
    }
}

function handleEscapeKey(event) {
    if (event.key === 'Escape' && draggedElement) {
        resetPositionAndSize(draggedElement);
        draggedElement.style.backgroundColor = 'red';
        draggedElement = null;
        isStickyDragging = false;
    }
}

function handleWheel(event) {
    if (isStickyDragging && draggedElement) {
        event.preventDefault();
        const step = 10;

        const delta = Math.sign(event.deltaY);
        let newWidth = parseFloat(draggedElement.style.width || draggedElement.offsetWidth) - delta * step;
        let newHeight = parseFloat(draggedElement.style.height || draggedElement.offsetHeight) - delta * step;

        const MIN_SIZE = 40;
        newWidth = Math.max(newWidth, MIN_SIZE);
        newHeight = Math.max(newHeight, MIN_SIZE);
        draggedElement.style.width = `${newWidth}px`;
        draggedElement.style.height = `${newHeight}px`;

        console.log(`Новый размер: ${newWidth}x${newHeight}`);
    }
}
workspace.addEventListener('mousedown', handleStart);
workspace.addEventListener('mousemove', handleMove);
workspace.addEventListener('mouseup', handleEnd);

workspace.addEventListener('touchstart', handleStart);
workspace.addEventListener('touchmove', handleMove);
workspace.addEventListener('touchend', handleEnd);
workspace.addEventListener('touchstart', handleMultiTouch);

document.addEventListener('keydown', handleEscapeKey);

workspace.addEventListener('wheel', handleWheel);