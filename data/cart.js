export const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [

];

export function addToCart(productId) {
   let itemMatched = null ;

      cart.forEach((cartitem)=>{
            if(cartitem.productId === productId) itemMatched = cartitem ;
    });


    if(itemMatched){
      itemMatched.quantity= itemMatched.quantity + parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value) ;  
    }else{
      cart.push({
        productId: productId,
        quantity: parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value),
        deliveryOptionId:'1'
      });
    }

    saveCartToLocalStorage() ;

}

export function removeFromCart(productId) {

  cart.forEach((cartitem,index)=>{
            if(cartitem.productId === productId) cart.splice(index,1) ;
        });

        document.querySelector(`.cart-item-container-${productId}`).remove() ;

        saveCartToLocalStorage() ;

        document.querySelector(".return-to-home-link").innerText = `${cart.length} items` ;

    
}

export function updateCartQuantity() {

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  localStorage.setItem("cartQuantity", cartQuantity);

  const cartQuantityElement = document.querySelector(".js-cart-quantity");

  if (cartQuantityElement) {
    cartQuantityElement.innerText = cartQuantity;
  }

  const checkoutQuantityElement = document.querySelector(".return-to-home-link");

  if (checkoutQuantityElement) {
    checkoutQuantityElement.innerText = `${cart.length} items`;
  }
}

export function updateQuantity(productId, newQuantity) {

  cart.forEach((cartitem) => {
    if (cartitem.productId === productId) {
      cartitem.quantity = newQuantity;
    }
  });

  saveCartToLocalStorage();

}

export function updateDeliveryDate(productId,deliveryOptionId){

     let itemMatched = null ;

      cart.forEach((cartitem)=>{
            if(cartitem.productId === productId) itemMatched = cartitem ;
    });

    itemMatched.deliveryOptionId = deliveryOptionId ;

    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart",JSON.stringify(cart)) ;
}