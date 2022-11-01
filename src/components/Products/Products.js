import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isTopPricedFilter, setIsTopPricedFilter] = useState(false);
  const localKandyUser = localStorage.getItem("kandy_user");
  const kandyUserObject = JSON.parse(localKandyUser);

  useEffect(
    () => {
      // console.log("Initial state of tickets", tickets); // View the initial state of tickets
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:8088/products?_sort=productName&_expand=productType`
        );
        const productsArray = await response.json();
        productsArray.sort((a, b) => {
          if (a.productName.toLowerCase() < b.productName.toLowerCase())
            return -1;
          if (a.productName.toLowerCase() > b.productName.toLowerCase())
            return 1;
          return 0;
        });
        setProducts(productsArray);
      };
      fetchData();
    },
    [] // When this array is empty, you are observing initial component state
  );

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (isTopPricedFilter) {
      const topPricedProducts = products.filter(
        (product) => product.price > 2.0
      );
      setFilteredProducts(topPricedProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [isTopPricedFilter]);

  return (
    <>
      <h2>Products</h2>
      {kandyUserObject.staff ? (
        <>
          <button onClick={() => navigate("/product/add")}>Add Product</button>
          <button
            onClick={() => {
              setIsTopPricedFilter(true);
            }}
          >
            Top Priced
          </button>
          <button
            onClick={() => {
              setIsTopPricedFilter(false);
            }}
          >
            Show all
          </button>
        </>
      ) : (
        <></>
      )}
      <article className="products">
        <table>
          <thead>
            <tr className="tableheader">
              <th>Product Name</th>
              <th>Price</th>
              <th>Product Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.productName}</td>
                  <td className="currency">
                    {product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td>{product.productType.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
    </>
  );
};
