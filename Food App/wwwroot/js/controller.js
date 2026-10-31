
// Import Model
import { foods, createCart } from "./model.js";

// Import View
import { displayFoods, displayCart } from "./view.js";

// Create cart
const cart = createCart();

// Get HTML elements
const foodList = document.getElementById("foodList");
const cartList = document.getElementById("cartList");
const searchFood = document.getElementById("searchFood");
const totalAmount = document.getElementById("totalAmount");
const placeOrderButton = document.getElementById("placeOrder");
const orderMessage = document.getElementById("orderMessage");


// Display food menu
function loadFoods(foodData) {
    displayFoods(foodData, foodList, addToCart);
}


// Add food to cart
function addToCart(foodId) {
    cart.addItem(foodId);
    updateCart();
}


// Update cart display
function updateCart() {
    const items = cart.getItems();

    displayCart(
        items,
        cart.getTotal(),
        cartList,
        totalAmount
    );

    // Handle Remove buttons
    const removeButtons = cartList.querySelectorAll(".remove-btn");

    removeButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            cart.removeItem(items[index].id);
            updateCart();
        });
    });
}


// Search food
searchFood.addEventListener("input", function () {
    const searchText = this.value.toLowerCase();

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchText)
    );

    loadFoods(filteredFoods);
});


// Place order
placeOrderButton.addEventListener("click", function () {
    if (cart.getItems().length === 0) {
        orderMessage.textContent = "Your cart is empty!";
        return;
    }

    orderMessage.textContent =
        `Order placed successfully! Total: ₹${cart.getTotal()}`;

    cart.getItems().forEach(item => {
        cart.removeItem(item.id);
    });

    updateCart();
});


// Initial application display
loadFoods(foods);
updateCart();
