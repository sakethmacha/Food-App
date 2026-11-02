
// =====================================
// CLASS CONCEPTS AND OBJECTS
// =====================================

export class Food {

    constructor(id, name, price, icon) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.icon = icon;
    }

    getDetails() {
        return `${this.name} - ₹${this.price}`;
    }
}


// Food objects
export const foods = [
    new Food(1, "Pizza", 250, "🍕"),
    new Food(2, "Burger", 120, "🍔"),
    new Food(3, "Biryani", 180, "🍛"),
    new Food(4, "Sandwich", 100, "🥪"),
    new Food(5, "Pasta", 160, "🍝")
];


// =====================================
// INHERITANCE AND PROTOTYPAL CHAIN
// =====================================

export class Customer {

    constructor(name) {
        this.name = name;
    }

    getDiscountRate() {
        return 5;
    }

    getCustomerType() {
        return "Regular Customer";
    }
}


// PremiumCustomer inherits from Customer
export class PremiumCustomer extends Customer {

    constructor(name) {
        super(name);
    }

    getDiscountRate() {
        return 10;
    }

    getCustomerType() {
        return "Premium Customer";
    }
}


// =====================================
// CURRYING
// =====================================

// Configure discount first, then provide price.

export function calculateDiscount(discountPercentage) {

    return function (price) {

        return price * discountPercentage / 100;

    };

}


// =====================================
// MEMOIZATION
// =====================================

// Store previous calculation results.

export function memoize(callback) {

    const cache = {};

    return function (...args) {

        const key = JSON.stringify(args);

        if (Object.hasOwn(cache, key)) {
            console.log("Returning cached result");
            return cache[key];
        }

        console.log("Calculating new result");

        const result = callback(...args);

        cache[key] = result;

        return result;
    };
}


// Memoized bill calculation
export const calculateTotal = memoize(function (items) {

    return items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

});


// =====================================
// RETURNING FUNCTIONS FROM FUNCTIONS
// =====================================

// Create reusable validation functions.

export function createValidator(validationRule) {

    return function (value) {

        return validationRule(value);

    };

}


// Customer name validation
export const validateCustomerName = createValidator(
    name => name.trim().length >= 2
);


// =====================================
// CART USING CLOSURE
// =====================================

export function createCart() {

    let cartItems = [];

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


    function removeItem(foodId) {

        cartItems = cartItems.filter(
            item => item.id !== foodId
        );

    }


    function getItems() {

        return cartItems.map(item => {

            const food = foods.find(
                food => food.id === item.id
            );

            return {
                ...food,
                quantity: item.quantity
            };

        });

    }


    function getTotal() {

        return calculateTotal(getItems());

    }


    return {
        addItem,
        removeItem,
        getItems,
        getTotal
    };

}


// =====================================
// ORDER CLASS
// =====================================

export class Order {

    constructor(items, customer) {

        this.items = items;
        this.customer = customer;

    }

    getSubtotal() {

        return calculateTotal(this.items);

    }

    getDiscount() {

        const discountCalculator =
            calculateDiscount(this.customer.getDiscountRate());

        return discountCalculator(this.getSubtotal());

    }

    getFinalAmount() {

        return this.getSubtotal() - this.getDiscount();

    }

}


// =====================================
// PASSING FUNCTIONS AS ARGUMENTS
// =====================================

export function submitOrder(order, onSuccess, onFailure) {

    if (order.items.length === 0) {

        onFailure("Your cart is empty!");

        return;

    }

    onSuccess(order);

}
