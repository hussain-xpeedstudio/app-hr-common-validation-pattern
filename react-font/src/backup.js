import React, { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    user_id: "",
    user_email: "",
  });

  const [apiData, setApiData] = useState(null);
  const [validationRules, setValidationRules] = useState({});
  const [validationMessages, setValidationMessages] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchValidationData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/validation");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Assuming the API response contains validation rules and messages
        if (data.validationRules && data.validationMessages) {
          setValidationRules(data.validationRules);
          setValidationMessages(data.validationMessages);
        }

        setApiData(data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchValidationData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data based on the received rules
    const errors = {};
    for (const fieldName in validationRules) {
      const rules = validationRules[fieldName].split("|");
      for (const rule of rules) {
        const [ruleName, ruleValue] = rule.split(":");
        switch (ruleName) {
          case "required":
            if (!formData[fieldName]) {
              errors[fieldName] = validationMessages[`${fieldName}.${ruleName}`];
            }
            break;
          case "numeric":
            if (!/^\d+$/.test(formData[fieldName])) {
              errors[fieldName] = validationMessages[`${fieldName}.${ruleName}`];
            }
            break;
          case "min":
            if (formData[fieldName].length < parseInt(ruleValue)) {
              errors[fieldName] = validationMessages[`${fieldName}.${ruleName}`];
            }
            break;
          case "max":
            if (formData[fieldName].length > parseInt(ruleValue)) {
              errors[fieldName] = validationMessages[`${fieldName}.${ruleName}`];
            }
            break;
          case "email":
            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData[fieldName])) {
              errors[fieldName] = validationMessages[`${fieldName}.${ruleName}`];
            }
            break;
          default:
            break;
        }
      }
    }

    // Set validation errors
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Form data is valid
      alert("Form submitted successfully!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation error for the changed field
    setValidationErrors({
      ...validationErrors,
      [name]: undefined,
    });
  };

  return (
    <div className="App">
      <h1>React Form Validation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
          />
          <span style={{ color: "red" }}>{validationErrors.user_id}</span>
        </div>
        <div>
          <label>User Email:</label>
          <input
            type="text"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
          />
          <span style={{ color: "red" }}>{validationErrors.user_email}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
      {apiData && (
        <div>
          <h2>API Data:</h2>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;