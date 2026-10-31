
// Display food menu
export function displayFoods(foods, container, onAddToCart) {
    container.innerHTML = "";

    foods.forEach(food => {
        const foodElement = document.createElement("div");

        foodElement.innerHTML = `
            <h3>${food.name}</h3>
            <p>Price: ₹${food.price}</p>
            <button>Add to Cart</button>
        `;

        const button = foodElement.querySelector("button");

        button.addEventListener("click", () => {
            onAddToCart(food.id);
        });

        container.appendChild(foodElement);
    });
}


// Display cart items
export function displayCart(cartItems, total, container, totalElement) {
    container.innerHTML = "";

    cartItems.forEach(item => {
        const cartElement = document.createElement("div");

        cartElement.innerHTML = `
            <p>
                ${item.name} -
                ₹${item.price} × ${item.quantity}
                = ₹${item.itemTotal}
                <button class="remove-btn">Remove</button>
            </p>
        `;

        container.appendChild(cartElement);
    });

    totalElement.textContent = total;
}
