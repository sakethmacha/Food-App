
// =====================================
// DISPLAY FOOD MENU
// =====================================

export function displayFoods(foods, container, onAddToCart) {

    container.innerHTML = "";

    foods.forEach(food => {

        const foodElement = document.createElement("div");

        foodElement.className = "food-card";

        foodElement.innerHTML = `
            <div class="food-icon">${food.icon}</div>
            <h3>${food.name}</h3>
            <p>Price: ₹${food.price}</p>
            <button class="add-btn">Add to Cart</button>
        `;

        const button = foodElement.querySelector(".add-btn");

        button.addEventListener("click", () => {
            onAddToCart(food.id);
        });

        container.appendChild(foodElement);

    });

}


// =====================================
// DISPLAY SHOPPING CART
// =====================================

export function displayCart(
    cartItems,
    container,
    onRemove
) {

    container.innerHTML = "";

    cartItems.forEach(item => {

        const cartElement = document.createElement("div");

        cartElement.className = "cart-item";

        cartElement.innerHTML = `
            <p>
                ${item.name} × ${item.quantity}
                = ₹${item.price * item.quantity}
            </p>

            <button class="remove-btn">Remove</button>
        `;

        const button = cartElement.querySelector(".remove-btn");

        button.addEventListener("click", () => {
            onRemove(item.id);
        });

        container.appendChild(cartElement);

    });

}


// =====================================
// DISPLAY BILL
// =====================================

export function displayBill(
    subtotal,
    discount,
    finalAmount
) {

    document.getElementById("totalAmount").textContent =
        subtotal.toFixed(2);

    document.getElementById("discountAmount").textContent =
        discount.toFixed(2);

    document.getElementById("finalAmount").textContent =
        finalAmount.toFixed(2);

}
