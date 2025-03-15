//Model
class Cart {
  //PascalCase for classes
  cartItems; //public property
  #localStorageKey; //private property

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey; //set the property of the object
    this.#loadFromStorage();
  }

  #loadFromStorage() { //private method
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); //JSON.parse converts strings back to arrays

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems)); //localStorage only can store strings so need convert to strings
  }

  addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}
//organise data and functions into an object (OOP)
//make it easy to create multiple objects with the same structure

const cart = new Cart("cart-oop"); //generate nw object using class
const businessCart = new Cart("cart-business"); //create another cart object

console.log(cart);
console.log(businessCart);
