export const cart = [];

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
}