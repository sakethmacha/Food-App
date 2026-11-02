
import {
    Food,
    Customer,
    PremiumCustomer
} from "./model.js";


// =====================================
// CLASS AND OBJECT
// =====================================

const pizza = new Food(1, "Pizza", 250, "🍕");

console.log("Food object:", pizza);

console.log("Food details:", pizza.getDetails());


// =====================================
// INHERITANCE
// =====================================

const regularCustomer = new Customer("Rahul");

const premiumCustomer = new PremiumCustomer("Priya");

console.log(
    "Regular discount:",
    regularCustomer.getDiscountRate()
);

console.log(
    "Premium discount:",
    premiumCustomer.getDiscountRate()
);


// =====================================
// PROTOTYPAL CHAIN
// =====================================

// PremiumCustomer inherits from Customer.

console.log(
    "Premium inherits Customer:",
    Object.getPrototypeOf(PremiumCustomer.prototype)
    === Customer.prototype
);

// Customer inherits from Object.

console.log(
    "Customer inherits Object:",
    Object.getPrototypeOf(Customer.prototype)
    === Object.prototype
);

// Check an object's prototype.

console.log(
    "Premium customer prototype:",
    Object.getPrototypeOf(premiumCustomer)
);
