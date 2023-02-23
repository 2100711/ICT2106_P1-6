import React, { useState } from "react";

const CreateProduct = () => {
    [idInput, setidInput] = useState(0);
    [nameInput, setNameInput] = useState(0);
    [categoryInput, setCategoryInput] = useState(0);
    [manufacturerInput, setManufacturerInput] = useState(0);

    const handleIdInput = (e) => {
        setidInput(e.target.value); 
    }
    const handleNameInput = (e) => {
      setidInput(e.target.value);
    };
    const handleCategoryInput = (e) => {
      setidInput(e.target.value);
    };
    const handleManufacturerInput = (e) => {
      setidInput(e.target.value);
    };

    return (
      <form onSubmit={""}>
        <label>
          Product ID:
          <input
            name="ProductID"
            type="text"
            defaultValue={idInput}
            onChange={(e) => handleIdInput(e)}
          />
        </label>
        <br />
        <label>
          Product Name:
          <input
            name="ProductName"
            type="text"
            value={nameInput}
            onChange={(e) => handleNameInput(e)}
          />
        </label>
        <label>
          Category:
          <input
            name="Category"
            type="text"
            value={categoryInput}
            onChange={(e) => handleCategoryInput(e)}
          />
        </label>
        <label>
          Manufacturer:
          <input
            name="Manufacturer"
            type="text"
            value={manufacturerInput}
            onChange={(e) => handleManufacturerInput(e)}
          />
        </label>
      </form>
    );
}

export default CreateProduct;