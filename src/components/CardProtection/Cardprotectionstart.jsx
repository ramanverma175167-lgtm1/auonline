import { useState } from "react";
import "./PaymentForm.css";
import { useNavigate } from "react-router-dom";

export default function SimpleForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cardLimit: "",
    mobile: "",
    email: "",
    city: "",
    zip: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Only numbers for mobile & zip
    if (name === "mobile" || name === "zip") {
      value = value.replace(/\D/g, "");
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validation
    if (!/^\d{10}$/.test(formData.mobile)) {
      return setMessage("Mobile number must be 10 digits");
    }

    if (!/^\d{5,6}$/.test(formData.zip)) {
      return setMessage("Zip code must be 5 or 6 digits");
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return setMessage("Enter a valid email");
    }

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/api/form/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Data saved successfully ✅ Redirecting...");

        // Reset form
        setFormData({
          name: "",
          cardLimit: "",
          mobile: "",
          email: "",
          city: "",
          zip: "",
        });

        // 🔥 Redirect after 1.5 sec
      setTimeout(() => {
  navigate("/activate-card", {
    state: { mobile: formData.mobile },
  });
}, 5000);
      } else {
        setMessage(data.error || "Failed to save data");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card-form">
        <h2>Fill Personal Details</h2>

        {message && <div className="form-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <label>Name on Cards :</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Card Limit :</label>
          <input
            type="number"
            name="cardLimit"
            placeholder="Enter card limit"
            value={formData.cardLimit}
            onChange={handleChange}
            required
          />

          <label>Mobile Number :</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter mobile number"
            maxLength={10}
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <label>Email ID :</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>City :</label>
          <input
            type="text"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label>Zip Code :</label>
          <input
            type="text"
            name="zip"
            placeholder="Enter zip code"
            maxLength={6}
            value={formData.zip}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn1" disabled={loading}>
            {loading ? "Proceeding..." : "Proceed"}
          </button>
        </form>
      </div>
    </div>
  );
}