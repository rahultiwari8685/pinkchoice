import React, { useState } from "react";

const OrderSection = ({ productId, product }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    size: "",
    color: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productId", productId);

    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    try {
      setLoading(true);

      const res = await fetch("https://pinkchoice.in/api/orders", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Order Submitted ✅");
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="row g-0">
              {/* Product Info */}
              <div className="col-md-4 bg-light p-4">
                <h3 className="fw-bold mb-3">Order Summary</h3>

                {product && (
                  <>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="img-fluid rounded mb-3"
                    />

                    <h5>{product.title}</h5>

                    <h3 className="text-primary">₹{product.price}</h3>
                  </>
                )}

                <hr />

                <label className="form-label">Size</label>
                <select
                  name="size"
                  className="form-control mb-3"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Size</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>

                <label className="form-label">Color</label>
                <input
                  type="text"
                  name="color"
                  className="form-control"
                  placeholder="Enter Color"
                  onChange={handleChange}
                />
              </div>

              {/* Customer Details */}
              <div className="col-md-8 p-5">
                <h3 className="fw-bold mb-4">Customer Information</h3>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="John Doe"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="john@example.com"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 mb-4">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="+91 9876543210"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Place Order"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
