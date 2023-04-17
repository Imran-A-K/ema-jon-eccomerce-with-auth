import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () =>{
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();

    const storedCart = getShoppingCart();
    const savedCart = [];
    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);
        if(addedProduct){
            const quantity = storedCart[id]
            addedProduct.quantity = quantity;
            // console.log(addedProduct);
            savedCart.push(addedProduct);
        }
    }

    // if you need to send two things
    // return [products,savedCart]
    // another option
    // return {products, cart:savedCart}

    return savedCart;
}

export default cartProductsLoader;