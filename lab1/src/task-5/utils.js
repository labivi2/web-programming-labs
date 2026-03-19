// фільтр книг за жанром
export function getBooksByGenre(books, genre) {
  return books.filter(b => b.genre === genre);
}

// середня кількість сторінок
export function getAveragePages(books) {
  return books.reduce((sum, b) => sum + b.pages, 0) / books.length;
}

// найстаріша книга
export function getOldestBook(books) {
  return books.reduce((oldest, b) => b.year < oldest.year ? b : oldest);
}

export default class BookCollection {
  constructor(books) {
    this.books = [...books];
  }

  // сортування по року
  getSortedByYear() {
    return [...this.books].sort((a, b) => a.year - b.year);
  }

  // додати книгу
  addBook(book) {
    this.books.push(book);
  }

  // кількість книг
  get count() {
    return this.books.length;
  }
}