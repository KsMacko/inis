const shirtsContainer = document.createElement('div');
shirtsContainer.id = 'shirts-container';
document.body.appendChild(shirtsContainer);

function getImage(shirt, color = 'white') {
    if (shirt.colors && shirt.colors[color] && shirt.colors[color].front) {
        return shirt.colors[color].front;
    }
    return shirt.default.front;
}

function createShirtCard(shirt) {
    const card = document.createElement('div');
    card.classList.add('shirt-card');

    const title = document.createElement('h3');
    title.textContent = shirt.name || 'Unnamed Shirt';
    card.appendChild(title);

    const image = document.createElement('img');
    image.src = getImage(shirt);
    card.appendChild(image);

    const description = document.createElement('p');
    description.textContent = shirt.description || 'No description available.';
    card.appendChild(description);

    const price = document.createElement('p');
    price.textContent = shirt.price || 'Price not available';
    card.appendChild(price);

    const seePageButton = document.createElement('button');
    seePageButton.textContent = 'See Page';
    seePageButton.addEventListener('click', () => {
        localStorage.setItem('selectedShirt', JSON.stringify(shirt));
        window.location.href = 'details.html';
    });
    card.appendChild(seePageButton);

    // Кнопка "Quick View"
    const quickViewButton = document.createElement('button');
    quickViewButton.textContent = 'Quick View';
    quickViewButton.style.marginLeft = '10px';
    quickViewButton.addEventListener('click', () => {
        alert(`Quick View: ${shirt.name}`);
    });
    card.appendChild(quickViewButton);

    return card;
}

shirts.forEach(shirt => {
    const card = createShirtCard(shirt);
    shirtsContainer.appendChild(card);
});