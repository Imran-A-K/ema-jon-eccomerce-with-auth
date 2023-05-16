import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { deleteShoppingCart } from "../../utilities/fakedb";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  // pagination sector
  const { totalProducts } = useLoaderData();
  // console.log(totalProducts)
  /**
   * Done: 1. Determine the total number of items:
   * TODO: 2. Decide on the number of items per page:
   * DONE: 3. Calculate the total number of pages:
   * DONE: 4. Determine the current page:
   *
   */
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(i);
  // }
  // you can do like this for finding page numbers the normal way but if you want to do it with
  // advanced javascript you can do it like  const pageNumbers = [...Array(totalPages).keys()];

  const pageNumbers = [...Array(totalPages).keys()]; //Array is a constructor
  // console.log(pageNumbers)
  const options = [5, 10, 15, 20]; // dropdown options

  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  const [products, setProducts] = useState([]);

  // old useEffect for loading all products in a single page
  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((response) => response.json())
  //     .then((apiData) => setProducts(apiData));
  // }, []);

  // new useEffect for loading data for per page with query
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  // end of pagination sector

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart); // getting all the properties of the object

    fetch("http://localhost:5000/productByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((response) => {
        return response.json();
      })
      .then((cartProducts) => {
        // console.log('only products in the shopping cart', cartProducts)
        const savedCart = [];
        // step 1 - get the id
        for (const id in storedCart) {
          // step 2 - get the product using id
          const addedProduct = cartProducts.find((product) => product._id === id);
          if (addedProduct) {
            //step -3 - get quantity of the product
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            //step 4: add the added product to the savedcart
            savedCart.push(addedProduct);
          }
        }
        // step 5: set the cart
        setCart(savedCart);
      });
  }, []);

  const handleAddToCart = (product) => {
    // const newCart = [...cart,product]
    let newCart = [];
    // if product doesn't exist in the cart, then set quantity =
    //if exist update quantity by 1
    const exists = cart.find((pd) => pd._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    // console.log(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <>
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link className="proceed-link" to="/orders">
              <button className="button-proceed">Review Order</button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* pagination */}
      <div className="pagination">
        <p>
          Current Page: {currentPage} an items per page: {itemsPerPage}
        </p>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {number + 1} {/* think simple here you are just displaying the increased number the value of number is not changing hence no parameters are changing you are just displaying */}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
