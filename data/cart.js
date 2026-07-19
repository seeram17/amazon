export let cart  ;

loadFromStorage() ; 

export function loadFromStorage(){

  cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [

];

}

export function addToCart(productId) {

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const quantity = quantitySelector
    ? Number(quantitySelector.value)
    : 1;

  let itemMatched = null;

  cart.forEach((cartitem) => {
    if (cartitem.productId === productId) {
      itemMatched = cartitem;
    }
  });

  if (itemMatched) {
    itemMatched.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveCartToLocalStorage();
}

export function removeFromCart(productId) {

  cart.forEach((cartitem,index)=>{
            if(cartitem.productId === productId) cart.splice(index,1) ;
        });


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