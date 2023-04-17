import React, { useEffect, useState } from 'react'
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { deleteShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';


const Shop = () => {
    const [products,setProducts] = useState([]);
    useEffect( () =>{
        fetch('products.json')
        .then(response =>response.json())
        .then(apiData => setProducts(apiData))
    },[]);
    const [cart, setCart] = useState([])

    useEffect(() =>{
        const storedCart = getShoppingCart();
        const savedCart = [];
         // step 1 - get the id
         for(const id in storedCart){
          // step 2 - get the product using id
              const addedProduct = products.find(product => product.id === id)
              if(addedProduct){
                //step -3 - get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //step 4: add the added product to the savedcart
                savedCart.push(addedProduct)
              }
         }
         // step 5: set the cart
         setCart(savedCart)
    },[products])

    const handleAddToCart = (product) =>{
      // const newCart = [...cart,product]
      let newCart = [];
      // if product doesn't exist in the cart, then set quantity = 
      //if exist update quantity by 1
      const exists = cart.find(pd => pd.id === product.id)
      if(!exists){
        product.quantity = 1;
        newCart = [...cart, product]
      }
     else{
        exists.quantity = exists.quantity + 1
        const remaining = cart.filter(pd => pd.id !== product.id)
        newCart = [...remaining,exists]
     }
      setCart(newCart);
      // console.log(newCart);
      addToDb(product.id)
    }

    const handleClearCart = ()=>{
      setCart([]);
      deleteShoppingCart();
    }

  return (
    <div className='shop-container'>
        <div className="products-container">
           {
            products.map( product => <Product 
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
               /> )
           } 
        </div>
        <div className='cart-container'>
        <Cart cart={cart} handleClearCart={handleClearCart} >
           <Link className='proceed-link' to="/orders">
              <button className='button-proceed'>Review Order</button>
           </Link>
        </Cart>
        </div>
    </div>
  )
}

export default Shop