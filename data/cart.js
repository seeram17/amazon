export const cart = [
  {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1
  },
  {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
  }
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
}

export function removeFromCart(productId) {
  cart.forEach((cartitem,index)=>{
            if(cartitem.productId === productId) cart.splice(index,1) ;
        });
}