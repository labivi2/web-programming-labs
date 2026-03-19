// просто чекаємо ms мілісекунд
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// імітуємо запит до сервера
function simulateFetch(url) {
  return new Promise((resolve, reject) => {
    const time = Math.random() * 300 + 200;
    setTimeout(() => {
      if (!url.startsWith("https")) {
        reject(new Error(`Invalid URL: ${url}`));
        return;
      }

      // 70% шанс успіху
      if (Math.random() < 0.7) {
        resolve({ url, status: 200, data: "OK" });
      } else {
        reject(new Error("Server error: 500"));
      }
    }, time);
  });
}
// пробує зробити запит кілька разів якщо не вишло
async function fetchWithRetry(url, attempts) {
  let lastError;

  for (let i = 1; i <= attempts; i++) {
    console.log(`Спроба №${i}`);

    try {
      const result = await simulateFetch(url);
      return result; // якщо успіх повертаємо
    } catch (error) {
      lastError = error;
      await delay(500); // чекаємо перед наступною спробою
    }
  }

  throw lastError; // якщо всі спроби провалились
}
// робимо кілька запитів одночасно
async function fetchMultiple(urls) {
  const results = await Promise.allSettled(
    urls.map(url => simulateFetch(url))
  );

  return {
    successful: results
      .filter(r => r.status === "fulfilled")
      .map(r => r.value),

    failed: results
      .filter(r => r.status === "rejected")
      .map(r => r.reason.message),
  };
}
async function main() {
  console.log("=== Завдання 4: async/await ===");

  // 4.1
  console.time("delay");
  await delay(1000);
  console.timeEnd("delay"); // ~1000ms

  // 4.2
  try {
    const result = await simulateFetch(
      "https://jsonplaceholder.typicode.com/posts",
    );
    console.log("Успіх:", result);
  } catch (error) {
    console.error("Помилка:", error.message);
  }

  // 4.3 — retry для нестабільного сервера
  try {
    const result = await fetchWithRetry(
      "https://jsonplaceholder.typicode.com/posts",
      5,
    );
    console.log("fetchWithRetry результат:", result);
  } catch (error) {
    console.error("Всі спроби невдалі:", error.message);
  }

  // 4.4
  const results = await fetchMultiple([
    "https://jsonplaceholder.typicode.com/posts",
    "http://invalid-url",
    "https://jsonplaceholder.typicode.com/users",
  ]);
  console.log("Результати:", results);
}

main();