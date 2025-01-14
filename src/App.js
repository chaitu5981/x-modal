import { useEffect, useRef, useState } from "react";
import "./App.css";
const App = () => {
  const initialState = {
    username: "",
    email: "",
    phone: "",
    date: "",
  };

  const [data, setData] = useState(initialState);
  const modalRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...data, [name]: value }));
  };
  const handleClick = (e) => {
    if (e.target.contains(modalRef.current)) setShowForm(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email.includes("@")) {
      alert("Invalid email");
      return;
    }
    if (data.phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number");
      return;
    }
    if (!data.date) {
      alert("Invalid date of birth");
      return;
    }
    let enteredDate = new Date(data.date);
    let today = new Date();
    if (enteredDate.getDate() > today.getDate()) {
      alert("Invalid date of birth.Date of birth cannot be in the future.");
      return;
    }
    setShowForm(false);
    setData(initialState);
  };

  return (
    <div className="container">
      <h1>User Details Modal</h1>
      <button className="btn" onClick={() => setShowForm(true)}>
        Open Form
      </button>
      {showForm && (
        <div className="modal-container" ref={modalRef}>
          <div className="modal">
            <form className="form modal-content" onSubmit={handleSubmit}>
              <h2>Fill Details</h2>
              <label for="username">Username:</label>
              <input
                required
                type="text"
                className="input"
                value={data.username}
                id="username"
                name="username"
                onChange={handleChange}
              />
              <label for="email">Email Address:</label>
              <input
                type="email"
                className="input"
                value={data.email}
                id="email"
                name="email"
                onChange={handleChange}
              />
              <label for="phone">Phone Number:</label>
              <input
                type="number"
                className="input"
                value={data.phone}
                id="phone"
                name="phone"
                onChange={handleChange}
              />
              <label for="date">Date of Birth:</label>
              <input
                type="date"
                className="input"
                value={data.date}
                id="dob"
                name="date"
                onChange={handleChange}
              />
              <button type="submit" className="btn submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
