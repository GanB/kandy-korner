import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductForm = () => {
  const navigate = useNavigate();
  /*
        TODO: Add the correct default properties to the
        initial state object
    */
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productTypeId: 1,
    price: 0.0,
  });
  const [productTypes, setProductTypes] = useState([]);
  /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObject = JSON.parse(localHoneyUser);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8088/productTypes`);
      const productTypes = await response.json();
      setProductTypes(productTypes);
    };
    fetchData();
  }, []);

  // TODO: Create the object to be saved to the API
  const addButtonClickHandler = (event) => {
    event.preventDefault();
    const newProductToSave = {
      productName: newProduct.productName,
      productTypeId: newProduct.productTypeId,
      price: newProduct.price,
    };

    // TODO: Perform the fetch() to POST the object to the API
    const sendData = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductToSave),
      };
      const response = await fetch(`http://localhost:8088/products`, options);
      await response.json();
      navigate("/products");
    };
    sendData();
  };

  return (
    <form className="ProductForm">
      <h2 className="ProductForm__title">Add Product</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Product Name"
            value={newProduct.productName}
            onChange={(event) => {
              const copyOfnewProduct = { ...newProduct };
              copyOfnewProduct.productName = event.target.value;
              setNewProduct(copyOfnewProduct);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <legend htmlFor="productType">Product Type:</legend>
          <select
            required
            autoFocus
            id="productType"
            name="productType"
            className="form-control"
            value={newProduct.productTypeId}
            onChange={(event) => {
              const copyOfnewProduct = { ...newProduct };
              copyOfnewProduct.productTypeId = parseInt(event.target.value);
              setNewProduct(copyOfnewProduct);
            }}
          >
            {productTypes.map((productType) => {
              return (
                <option key={productType.id} value={productType.id}>
                  {productType.category}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            required
            autoFocus
            type="number"
            step="0.99"
            className="form-control"
            placeholder="Price"
            value={newProduct.price}
            onChange={(event) => {
              const copyOfnewProduct = { ...newProduct };
              copyOfnewProduct.price = parseFloat(
                !isNaN(event.target.value) ? event.target.value : 0.0
              );
              setNewProduct(copyOfnewProduct);
            }}
          />
        </div>
      </fieldset>
      <button
        className={
          newProduct.productName.trim() && newProduct.price > 0.0
            ? "btn-primary"
            : "btn-disabled"
        }
        disabled={
          newProduct.productName.trim() && newProduct.price > 0.0 ? false : true
        }
        onClick={addButtonClickHandler}
      >
        Add Product
      </button>
      <button
        className="btn-cancel"
        onClick={() => {
          navigate("/products");
        }}
      >
        Cancel
      </button>
    </form>
  );
};
