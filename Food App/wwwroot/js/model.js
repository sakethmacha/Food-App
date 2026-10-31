
// Food menu data
export const foods = [
    { id: 1, name: "Pizza", price: 250 },
    { id: 2, name: "Burger", price: 120 },
    { id: 3, name: "Biryani", price: 180 },
    { id: 4, name: "Sandwich", price: 100 },
    { id: 5, name: "Pasta", price: 160 }
];

// Cart logic
export function createCart() {

    // Private cart data
    let cartItems = [];

    // Add food to cart
    function addItem(foodId) {
        const existingItem = cartItems.find(
            item => item.id === foodId
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                id: foodId,
                quantity: 1
            });
        }
    }

    // Remove food from cart
    function removeItem(foodId) {
        cartItems = cartItems.filter(
            item => item.id !== foodId
        );
    }

    // Get cart details
    function getItems() {
        return cartItems.map(item => {
            const food = foods.find(
                food => food.id === item.id
            );

            return {
                ...food,
                quantity: item.quantity,
                itemTotal: food.price * item.quantity
            };
        });
    }

    // Calculate total
    function getTotal() {
        return getItems().reduce(
            (total, item) => total + item.itemTotal,
            0
        );
    }

    return {
        addItem,
        removeItem,
        getItems,
        getTotal
    };
}
