// беремо імя, прізвище та, по-батькові, і складаємо в красивий формат
function getFullName(user) {
  const { firstName, lastName, middleName = "" } = user;
  const middleInitial = middleName ? middleName[0] + ". " : ""; // якщо є по-батькові, беремо першу букву
  return `${lastName} ${firstName[0]}. ${middleInitial}`.trim(); // збираємо все в рядок і прибираємо зайві пробіли
}

// з кількох об'єктів робимо один
function mergeObjects(...objects) {
  return Object.assign({}, ...objects);
}

// з кількох масивів робимо один 
function removeDuplicates(...arrays) {
  return [...new Set(arrays.flat())];
}

// робимо новий об'єкт користувача з оновленнями
function createUpdatedUser(user, updates) {
  return {
    ...user,
    ...updates,
    address: {
      ...user.address,
      ...updates.address
    }
  };
}

// ===== Вивід результатів для перевірки =====
console.log("=== Завдання 1: Деструктуризація та Spread/Rest ===");
// Перевірка getFullName
console.log("1.1:", getFullName({ firstName: "Петро", lastName: "Іванов", middleName: "Сергійович" }));
console.log("1.1:", getFullName({ firstName: "Анна", lastName: "Коваль" }));
// Перевірка mergeObjects
console.log("1.2:", mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 }));
// Перевірка removeDuplicates
console.log("1.3:", removeDuplicates([1, 2, 3], [2, 3, 4], [4, 5]));
const user = { name: "John", age: 25, address: { city: "Kyiv", zip: "01001" } };
// Перевірка createUpdatedUser
const updated = createUpdatedUser(user, { age: 26, address: { zip: "02002" } });
console.log("1.4:", updated);
console.log("Original user:", user);