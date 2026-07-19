
const cart ={

    cartItems : undefined ,

    loadFromStorage() {
        this.cartItems = localStorage.getItem('cart-oop') ? JSON.parse(localStorage.getItem('cart-oop')) : [];
    },

    saveCartToLocalStorage() {
        localStorage.setItem("cart-oop",JSON.stringify(this.cartItems)) ;
    },  
    
    addToCart(productId) {

        const quantitySelector = document.querySelector(
            `.js-quantity-selector-${productId}`
        );

        const quantity = quantitySelector
            ? Number(quantitySelector.value)
            : 1;

        let itemMatched = null;

        this.cartItems.forEach((cartitem) => {
            if (cartitem.productId === productId) {
            itemMatched = cartitem;
            }
        });

        if (itemMatched) {
            itemMatched.quantity += quantity;
        } else {
            this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId: '1'
            });
        }

        this.saveCartToLocalStorage();

    },

    removeFromCart(productId) {

        this.cartItems.forEach((cartitem,index)=>{
                    if(cartitem.productId === productId) this.cartItems.splice(index,1) ;
                });


                this.saveCartToLocalStorage() ;

                document.querySelector(".return-to-home-link").innerText = `${this.cartItems.length} items` ;

        
    },

    updateDeliveryDate(productId,deliveryOptionId){

        let itemMatched = null ;

        this.cartItems.forEach((cartitem)=>{
                if(cartitem.productId === productId) itemMatched = cartitem ;
        });

        itemMatched.deliveryOptionId = deliveryOptionId ;

        this.saveCartToLocalStorage();
    },

    updateCartQuantity() {

        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        localStorage.setItem("cartQuantity", cartQuantity);

        const cartQuantityElement = document.querySelector(".js-cart-quantity");

        if (cartQuantityElement) {
            cartQuantityElement.innerText = cartQuantity;
        }
    },

    updateQuantity(productId, newQuantity) {

        this.cartItems.forEach((cartitem) => {
            if (cartitem.productId === productId) {
            cartitem.quantity = newQuantity;
            }
        });

        this.saveCartToLocalStorage();

    }


}


cart.loadFromStorage() ; 




