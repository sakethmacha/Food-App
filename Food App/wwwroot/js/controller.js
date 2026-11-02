
import {
    foods,
    createCart,
    Customer,
    PremiumCustomer,
    Order,
    validateCustomerName,
    submitOrder
} from "./model.js";

import {
    displayFoods,
    displayCart,
    displayBill
} from "./view.js";


// =====================================
// CONTROLLER CLASS
// =====================================

export class FoodController {

    constructor() {

        // this refers to the current controller object
        this.cart = createCart();

        this.foodList = document.getElementById("foodList");
        this.cartList = document.getElementById("cartList");

        this.searchFood = document.getElementById("searchFood");

        this.customerName = document.getElementById("customerName");
        this.customerType = document.getElementById("customerType");

        this.placeOrderButton =
            document.getElementById("placeOrder");

        this.orderMessage =
            document.getElementById("orderMessage");


        // BINDING
        // Preserve the controller's this context.

        this.handleSearch = this.handleSearch.bind(this);

        this.handleCheckout = this.handleCheckout.bind(this);


        // Event listeners

        this.searchFood.addEventListener(
            "input",
            this.handleSearch
        );

        this.placeOrderButton.addEventListener(
            "click",
            this.handleCheckout
        );


        this.loadFoods(foods);

        this.updateCart();

    }


    // =====================================
    // DISPLAY FOOD MENU
    // =====================================

    loadFoods(foodData) {

        displayFoods(
            foodData,
            this.foodList,

            // Passing function as argument
            this.handleAddToCart.bind(this)
        );

    }


    // =====================================
    // ADD FOOD TO CART
    // =====================================

    handleAddToCart(foodId) {

        this.cart.addItem(foodId);

        this.updateCart();

        this.orderMessage.textContent = "";

    }


    // =====================================
    // REMOVE FOOD FROM CART
    // =====================================

    handleRemoveFromCart(foodId) {

        this.cart.removeItem(foodId);

        this.updateCart();

    }


    // =====================================
    // UPDATE CART
    // =====================================

    updateCart() {

        const items = this.cart.getItems();

        displayCart(
            items,
            this.cartList,
            this.handleRemoveFromCart.bind(this)
        );

        this.updateBill();

    }


    // =====================================
    // UPDATE BILL
    // =====================================

    updateBill() {

        const items = this.cart.getItems();

        const customer = this.getCustomer();

        const order = new Order(items, customer);

        displayBill(
            order.getSubtotal(),
            order.getDiscount(),
            order.getFinalAmount()
        );

    }


    // =====================================
    // CUSTOMER OBJECT
    // =====================================

    getCustomer() {

        const name = this.customerName.value;

        if (this.customerType.value === "premium") {

            return new PremiumCustomer(name);

        }

        return new Customer(name);

    }


    // =====================================
    // SEARCH FOOD
    // =====================================

    handleSearch() {

        // this refers to FoodController
        const searchText =
            this.searchFood.value.toLowerCase();

        const filteredFoods = foods.filter(food =>
            food.name.toLowerCase().includes(searchText)
        );

        this.loadFoods(filteredFoods);

    }


    // =====================================
    // CHECKOUT
    // =====================================

    handleCheckout() {

        const name = this.customerName.value;

        if (!validateCustomerName(name)) {

            this.orderMessage.textContent =
                "Please enter a valid customer name.";

            return;

        }


        const customer = this.getCustomer();

        const order = new Order(
            this.cart.getItems(),
            customer
        );


        // Passing success and failure functions
        // as arguments to submitOrder().

        submitOrder(

            order,

            // Success callback
            (confirmedOrder) => {

                this.orderMessage.textContent =
                    `Order placed successfully! 
                    Customer: ${confirmedOrder.customer.name}.
                    Total: ₹${confirmedOrder.getFinalAmount().toFixed(2)}`;

                this.cart.getItems().forEach(item => {
                    this.cart.removeItem(item.id);
                });

                this.updateCart();

            },


            // Failure callback
            (message) => {

                this.orderMessage.textContent = message;

            }

        );

    }

}
