import { LIBRARY_NAME, books } from "./data.js";
import BookCollection from "./utils.js";
import { getBooksByGenre as filterByGenre, getAveragePages, getOldestBook } from "./utils.js";

console.log("=== Завдання 5: Модулі ===");

console.log("Бібліотека:", LIBRARY_NAME);
console.log("Всього книг:", books.length);

// функції
console.log("Книги жанру programming:", filterByGenre(books, "programming"));
console.log("Середня кількість сторінок:", getAveragePages(books));
console.log("Найстаріша книга:", getOldestBook(books));

// клас
const collection = new BookCollection(books);

console.log("Відсортовані книги:", collection.getSortedByYear());

collection.addBook({
  title: "New Book",
  author: "Me",
  year: 2024,
  pages: 150,
  genre: "test"
});

console.log("Кількість книг після додавання:", collection.count);