// DOM References
const fetchBtn = document.getElementById("fetch-btn");
const postsTbody = document.getElementById("posts-tbody");
const productsTbody = document.getElementById("products-tbody");
const todosTbody = document.getElementById("todos-tbody");

// Function 1: Fetches Posts API after 1000ms delay
function PromiseAPI1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/posts")
        .then((response) => response.json())
        .then((data) => {
          // Display data on UI
          postsTbody.innerHTML = "";
          data.posts.slice(0, 10).forEach((post) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${post.id}</td>
              <td>${post.title}</td>
              <td>${post.body}</td>
            `;
            postsTbody.appendChild(tr);
          });
          // Resolve promise with true
          resolve(true);
        })
        .catch((error) => reject(error));
    }, 1000);
  });
}

// Function 2: Fetches Products API after 2000ms delay
function PromiseAPI2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
          // Display data on UI
          productsTbody.innerHTML = "";
          data.products.slice(0, 10).forEach((product) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${product.id}</td>
              <td>${product.title}</td>
              <td>${product.brand || "N/A"}</td>
              <td>$${product.price}</td>
            `;
            productsTbody.appendChild(tr);
          });
          // Resolve promise with true
          resolve(true);
        })
        .catch((error) => reject(error));
    }, 2000);
  });
}

// Function 3: Fetches Todos API after 3000ms delay
function PromiseAPI3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/todos")
        .then((response) => response.json())
        .then((data) => {
          // Display data on UI
          todosTbody.innerHTML = "";
          data.todos.slice(0, 10).forEach((todo) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${todo.id}</td>
              <td>${todo.todo}</td>
              <td>${todo.completed ? "Yes" : "No"}</td>
            `;
            todosTbody.appendChild(tr);
          });
          // Resolve promise with true
          resolve(true);
        })
        .catch((error) => reject(error));
    }, 3000);
  });
}

// Event listener on button click
fetchBtn.addEventListener("click", () => {
  // Disable button to prevent multiple triggers
  fetchBtn.disabled = true;

  // Promise Chaining using .then()
  PromiseAPI1()
    .then((res1) => {
      // Check if Promise 1 was resolved successfully before returning Promise 2
      if (res1) {
        return PromiseAPI2();
      }
    })
    .then((res2) => {
      // Check if Promise 2 was resolved successfully before returning Promise 3
      if (res2) {
        return PromiseAPI3();
      }
    })
    .then((res3) => {
      if (res3) {
        console.log("All API promises resolved in sequential chain!");
      }
    })
    .catch((error) => {
      console.error("An error occurred in the promise chain:", error);
    })
    .finally(() => {
      // Re-enable button after full sequence finishes
      fetchBtn.disabled = false;
    });
});
