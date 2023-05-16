import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () =>{
    // if the cart data is in database you have to use async await
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart); // getting all the properties of the object in an array
    // console.log(ids)

    // chalaki korle ita korte paro this will work because there is default page and limit in the server. by giving page=0 and limit=100000 you load all the data by this hack. this could not work in some cases
    // const loadedProducts = await fetch(`http://localhost:5000/products?page=0&limit=1000000000`);
    const loadedProducts = await fetch('http://localhost:5000/productByIds', {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await loadedProducts.json();
    console.log('products by id',products)
    const savedCart = [];
    for(const id in storedCart){
        const addedProduct = products.find(pd => pd._id === id);
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