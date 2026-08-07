// Local JSON dataset provided
const localMenuData = [
  { id: 1, name: "Cheeseburger", price: 5.99, imgSrc: "https://unsplash.com/photos/double-patty-cheeseburger-jh5XyK4Rr3Y" },
  { id: 2, name: "Pizza", price: 8.99, imgSrc: "https://unsplash.com/photos/pizza-with-berries-MQUqbmszGGM" },
  { id: 3, name: "Tacos", price: 3.99, imgSrc: "https://unsplash.com/photos/two-tortillas-with-vegetables-and-sauce-on-a-table-VMrIQ9hDaZk" },
  { id: 4, name: "Sushi", price: 11.99, imgSrc: "https://unsplash.com/photos/sushi-on-black-ceramic-plate-iOHJKJqO6E0" },
  { id: 5, name: "Pasta", price: 9.99, imgSrc: "https://unsplash.com/photos/closeup-photo-of-spaghetti-pasta-with-a-tomato-meat-sauce-shot-with-selective-focus-Gi4njnD6isM" },
  { id: 6, name: "Fried Chicken", price: 7.99, imgSrc: "https://unsplash.com/photos/food-lot-on-a-green-leaf-plate-nwmZhwOSVnM" },
  { id: 7, name: "Grilled Cheese Sandwich", price: 4.99, imgSrc: "https://unsplash.com/photos/bread-with-cheese-fillings-on-white-ceramic-plate-ZB8NK8cB4EE" },
  { id: 8, name: "Steak", price: 15.99, imgSrc: "https://unsplash.com/photos/grilled-meat-on-white-ceramic-plate-pe9dvM1rQkM" },
  { id: 9, name: "Caesar Salad", price: 6.99, imgSrc: "https://unsplash.com/photos/meat-with-lettuce-on-white-ceramic-plate-63mHpYEyjCA" },
  { id: 10, name: "Fish and Chips", price: 8.49, imgSrc: "https://unsplash.com/photos/fried-chicken-with-fries-and-sauce-Pf-bZQpCaMI" },
  { id: 11, name: "Ramen", price: 9.49, imgSrc: "https://unsplash.com/photos/a-bowl-of-ramen-with-chopsticks-and-a-glass-of-beer-mE6kjov4rTg" },
  { id: 12, name: "Burrito", price: 7.49, imgSrc: "https://source.unsplash.com/random/1920x1080/?burrito" },
  { id: 13, name: "Pho", price: 8.99, imgSrc: "https://source.unsplash.com/random/1920x1080/?pho" },
  { id: 14, name: "Pad Thai", price: 9.99, imgSrc: "https://source.unsplash.com/random/1920x1080/?pad_thai" },
  { id: 15, name: "Gyro", price: 6.49, imgSrc: "https://source.unsplash.com/random/1920x1080/?gyro" },
  { id: 16, name: "Ice Cream", price: 3.99, imgSrc: "https://source.unsplash.com/random/1920x1080/?ice_cream" },
  { id: 17, name: "Smoothie", price: 4.99, imgSrc: "https://source.unsplash.com/random/1920x1080/?smoothie" },
  { id: "18", name: "Apple Pie", price: 4.49, imgSrc: "https://source.unsplash.com/random/1920x1080/?apple_pie" },
  { id: 19, name: "Chocolate Cake", price: 5.49, imgSrc: "https://source.unsplash.com/random/1920x1080/?chocolate_cake" },
  { id: 20, name: "Pancakes", price: 4.99, imgSrc: "https://source.unsplash.com/random/1920x1080/?pancakes" },
  { id: 21, name: "Cupcake", price: 2.99, imgSrc: "https://source.unsplash.com/random/1920x1080/?cupcake" },
  { id: 22, name: "Crepes", price: 5.99, imgSrc: "https://source.unsplash.com/random/1920x1080/?crepes" },
  { id: 23, name: "Club Sandwich", price: 6.99, imgSrc: "https://source.unsplash.com/random/1920x1080/?club_sandwich" },
  { id: 24, name: "Falafel", price: 5.49, imgSrc: "https://source.unsplash.com/random/1920x1080/?falafel" },
  { id: 25, name: "Curry", price: 9.49, imgSrc: "https://source.unsplash.com/random/1920x1080/?curry" }
];

let fullMenuData = [];

// ====================================================
// Task 1: getMenu()
// ====================================================
function getMenu() {
  // Using the provided JSON array
  fullMenuData = localMenuData;
  renderMenu(fullMenuData);
}

function renderMenu(items) {
  const container = document.getElementById("menu-container");
  if (!container) return;
  container.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
      <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" alt="${item.name}" />
      <div class="food-info">
        <div class="food-name">${item.name}</div>
        <div class="food-footer">
          <span class="food-price">$${item.price}/-</span>
          <button class="add-btn" onclick="startOrderFlow()">+</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ====================================================
// Task 2: TakeOrder() - Resolves in 2500ms with 3 random burgers
// ====================================================
function TakeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter items containing 'burger' or fallback to full menu if fewer items match
      const burgers = fullMenuData.filter((item) =>
        item.name.toLowerCase().includes("burger")
      );
      const sourceList = burgers.length >= 3 ? burgers : fullMenuData;

      const selectedOrders = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * sourceList.length);
        selectedOrders.push(sourceList[randomIndex]);
      }

      resolve({ order: selectedOrders });
    }, 2500);
  });
}

// ====================================================
// Task 3: orderPrep() - Resolves in 1500ms
// ====================================================
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

// ====================================================
// Task 4: payOrder() - Resolves in 1000ms
// ====================================================
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

// ====================================================
// Task 5: thankyouFnc()
// ====================================================
function thankyouFnc() {
  alert("Thank you for ordering with us! Your order has been placed successfully.");
}

// ====================================================
// Tasks 6 & 7: Chaining & Execution
// ====================================================
function startOrderFlow() {
  const modal = document.getElementById("status-modal");
  const modalStatus = document.getElementById("modal-status");

  if (modal) modal.classList.remove("hidden");
  if (modalStatus) modalStatus.innerText = "Taking order (Selecting 3 items)...";

  TakeOrder()
    .then((orderObj) => {
      console.log("Order Selected:", orderObj);
      if (modalStatus) modalStatus.innerText = "Chef is preparing your order...";
      return orderPrep();
    })
    .then((prepStatus) => {
      console.log("Order Prep Status:", prepStatus);
      if (modalStatus) modalStatus.innerText = "Processing payment...";
      return payOrder();
    })
    .then((paymentStatus) => {
      console.log("Payment Status:", paymentStatus);
      if (modal) modal.classList.add("hidden");
      if (paymentStatus.paid) {
        thankyouFnc();
      }
    })
    .catch((error) => {
      console.error("Order process error:", error);
      if (modal) modal.classList.add("hidden");
      alert("Something went wrong while processing your order.");
    });
}

// App Initialization
window.addEventListener("DOMContentLoaded", () => {
  getMenu();
});