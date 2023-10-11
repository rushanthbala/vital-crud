import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addUser } from "../../Service/api";
import { useNavigate } from "react-router-dom";

function MyForm() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for the input field when it's being corrected
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length === 0) {
      // Data is valid, send it to the backend
      sendDataToBackend();
    } else {
      // Data is not valid, update errors state
      setErrors(newErrors);
    }
  };

  const sendDataToBackend = async () => {
    // Send 'name' and 'description' to the backend
    // Replace '/api/endpoint' with your actual backend API endpoint

    try {
      const response = await addUser("api/todo", formData);
      navigate("/todo");
      console.log(response);
    } catch (error) {}
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      {/* Apply CSS class for centering */}
      <div className="form-container">
        {" "}
        {/* Apply CSS class for form container */}
        <form onSubmit={handleSubmit}>
          <h3>
            Todo
          </h3>
          <div>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </div>
          <br />
          <div>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
          </div>
          <br />

          <div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyForm;
