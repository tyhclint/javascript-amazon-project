import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: addToCart', () => {
    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem'); //Mock only lasts for one test (After one test, the method is no longer mocked)

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        }); //Mock the getItem() method to return an empty array
        loadFromStorage(); //load the cart from localStorage. this time, the getItem() method will return an empty array based on the Mock previously.
        // This is for testing purporses.

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); //check how many times setItem() have been called
        //it() will only pass (green colour) if all the expect() within the it() block passes
    });

    
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        }); //Mock the getItem() method to return an empty array
        loadFromStorage(); 

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
        // This is for testing purporses.
    });

    
});