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
        quantity: parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value)
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

function saveCartToLocalStorage() {
  localStorage.setItem("cart",JSON.stringify(cart)) ;
}