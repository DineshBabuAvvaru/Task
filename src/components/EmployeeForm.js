import React, { useState, useEffect } from "react";
import "./EmployeeForm.css";

function App() {
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
    images: "",
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProduct(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const addProduct = () => {
    fetch(
      "https://registration-form-92149-default-rtdb.firebaseio.com/registration-form.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log([...product, data]);
        setProduct([...product, data]);
        setNewProduct({
          title: "",
          description: "",
          price: 0,
          discountPercentage: 0,
          rating: 0,
          stock: 0,
          brand: "",
          category: "",
          thumbnail: "",
          images: "",
        });
      })
      .catch((error) => console.log(error));
  };

  const updateProduct = () => {
    if (selectedProduct) {
      fetch(`https://dummyjson.com/products/${selectedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedProducts = product.map((item) =>
            item.id === selectedProduct ? product : item
          );

          setProduct(updatedProducts);
          setNewProduct({
            title: "",
            description: "",
            price: 0,
            discountPercentage: 0,
            rating: 0,
            stock: 0,
            brand: "",
            category: "",
            thumbnail: "",
            images: "",
          });
          setShow(false);
          setSelectedProduct(null);
        })
        .catch((error) => console.error(error));
    }
  };

  const deleteProduct = (id) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedProducts = product.filter((product) => product.id !== id);
        setProduct(updatedProducts);
      })
      .catch((error) => console.log(error));
  };

  const selectProductForUpdate = (product) => {
    setNewProduct({ ...product });
    setShow(true);
    setSelectedProduct(product.id);
  };

  return (
    <div className="App">
      <div className="form">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={newProduct.title}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          value={newProduct.description}
          onChange={handleInputChange}
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          value={newProduct.price}
          onChange={handleInputChange}
        />

        <label htmlFor="discountPercentage">DiscountPercentage</label>
        <input
          id="discountPercentage"
          name="discountPercentage"
          type="number"
          value={newProduct.discountPercentage}
          onChange={handleInputChange}
        />

        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          name="rating"
          type="number"
          value={newProduct.rating}
          onChange={handleInputChange}
        />

        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          name="stock"
          type="number"
          value={newProduct.stock}
          onChange={handleInputChange}
        />

        <label htmlFor="brand">Brand</label>
        <input
          id="brand"
          name="brand"
          type="text"
          value={newProduct.brand}
          onChange={handleInputChange}
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          type="text"
          value={newProduct.category}
          onChange={handleInputChange}
        />

        <label htmlFor="thumbnail">Thumbnail</label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="file"
          value={newProduct.thumbnail}
          onChange={handleInputChange}
        />

        <label htmlFor="images">Images</label>
        <input
          id="images"
          name="images"
          type="file"
          value={newProduct.images}
          onChange={handleInputChange}
        />

        {show ? (
          <button onClick={updateProduct}>Update</button>
        ) : (
          <button onClick={addProduct}>Add</button>
        )}
      </div>

      <div className="product-list">
        <h2>Product List</h2>
        <ul>
          {product.map((product, index) => (
            <li key={product.id}>
              {product.title} - {product.price}
              <button onClick={() => selectProductForUpdate(product)}>
                Update
              </button>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
