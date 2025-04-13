const detailsContainer = document.getElementById('shirt-details');

const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));

if (!selectedShirt) {
    detailsContainer.innerHTML = '<h1>Shirt not found</h1>';
} else {
    const title = document.createElement('h1');
    title.textContent = selectedShirt.name || 'Unnamed Shirt';
    detailsContainer.appendChild(title);

    const image = document.createElement('img');
    image.style.maxWidth = '300px';
    image.style.height = 'auto';

    let selectedColor = localStorage.getItem('selectedColor') || 'white';
    let isFront = true;

    if (selectedShirt.colors[selectedColor] && selectedShirt.colors[selectedColor].front) {
        image.src = selectedShirt.colors[selectedColor].front;
    } else {
        image.src = selectedShirt.default.front;
    }

    detailsContainer.appendChild(image);

    const description = document.createElement('p');
    description.textContent = selectedShirt.description || 'No description available.';
    detailsContainer.appendChild(description);

    const price = document.createElement('p');
    price.textContent = selectedShirt.price || 'Price not available';
    detailsContainer.appendChild(price);

    const flipButton = document.createElement('button');
    flipButton.textContent = 'Flip';
    flipButton.classList.add('back-button'); // Используем тот же стиль, что и для кнопки "Назад"
    flipButton.style.marginTop = '10px';
    flipButton.addEventListener('click', () => {
        if (isFront) {
            if (selectedShirt.colors[selectedColor] && selectedShirt.colors[selectedColor].back) {
                image.src = selectedShirt.colors[selectedColor].back;
            } else {
                image.src = selectedShirt.default.back;
            }
        } else {
            if (selectedShirt.colors[selectedColor] && selectedShirt.colors[selectedColor].front) {
                image.src = selectedShirt.colors[selectedColor].front;
            } else {
                image.src = selectedShirt.default.front;
            }
        }
        isFront = !isFront;
    });
    detailsContainer.appendChild(flipButton);

    const colorButtonsContainer = document.createElement('div');
    colorButtonsContainer.classList.add('color-buttons');

    for (const color in selectedShirt.colors) {
        const button = document.createElement('button');
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.backgroundColor = color;
        button.title = color.charAt(0).toUpperCase() + color.slice(1);

        if (color === selectedColor) {
            button.style.border = '2px solid black';
        }

        button.addEventListener('click', () => {
            localStorage.setItem('selectedColor', color);
            selectedColor = color;

            // Обновляем изображение
            if (isFront) {
                if (selectedShirt.colors[color] && selectedShirt.colors[color].front) {
                    image.src = selectedShirt.colors[color].front;
                } else {
                    image.src = selectedShirt.default.front;
                }
            } else {
                if (selectedShirt.colors[color] && selectedShirt.colors[color].back) {
                    image.src = selectedShirt.colors[color].back;
                } else {
                    image.src = selectedShirt.default.back;
                }
            }

            const allButtons = colorButtonsContainer.querySelectorAll('button');
            allButtons.forEach(btn => btn.style.border = '');

            button.style.border = '2px solid black';
        });
        colorButtonsContainer.appendChild(button);
    }

    detailsContainer.appendChild(colorButtonsContainer);

    const backButton = document.createElement('button');
    backButton.classList.add('back-button');
    backButton.textContent = 'Back to Catalog';
    backButton.addEventListener('click', () => {
        window.location.href = 'lab23.html';
    });
    detailsContainer.appendChild(backButton);
}