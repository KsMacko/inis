let numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?', '');

let personalMovieDB = {
    count: numberOfFilms,
    movies: {}
};
for (let i = 0; i < 2; i++) {
    let movieName, movieRating;
    do {
        movieName = prompt('Один из последних просмотренных фильмов?', '').trim();
        movieRating = prompt('На сколько оцените его?', '').trim();
    } while (
        movieName === null ||
        movieName === '' ||
        movieName.length > 50 ||
        movieRating === null ||
        movieRating === ''
        );
    personalMovieDB.movies[movieName] = movieRating;
}
console.log(personalMovieDB);
function createTableFromData() {
    const container = document.createElement('div');
    container.id = 'table-container';
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['Название фильма', 'Оценка'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    for (const [movieName, rating] of Object.entries(personalMovieDB.movies)) {
        const row = document.createElement('tr');
        const movieCell = document.createElement('td');
        movieCell.textContent = movieName;
        row.appendChild(movieCell);
        const ratingCell = document.createElement('td');
        ratingCell.textContent = rating;
        row.appendChild(ratingCell);
        table.appendChild(row);
    }
    container.appendChild(table);
    document.body.appendChild(container);
}
createTableFromData();