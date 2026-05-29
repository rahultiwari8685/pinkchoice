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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("https://pinkchoice.in/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          ...form,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Order Submitted Successfully ✅");

        setForm({
          name: "",
          email: "",
          phone: "",
          size: "",
          color: "",
        });

        window.location.href = "/";
      } else {
        alert(data.message || "Order failed");
      }
    } catch (err) {
      console.error("Order Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="row g-0">
                  {/* Left Side Product Summary */}
                  <div className="col-md-4 bg-light p-4">
                    <h4 className="fw-bold mb-4">Order Summary</h4>

                    {product && (
                      <>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="img-fluid rounded mb-3"
                        />

                        <h5 className="fw-bold">{product.title}</h5>

                        <h4 className="text-primary mb-4">₹{product.price}</h4>
                      </>
                    )}

                    <div className="mb-3">
                      <label className="form-label">Select Size</label>

                      <select
                        name="size"
                        className="form-control"
                        value={form.size}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Color</label>

                      <input
                        type="text"
                        name="color"
                        className="form-control"
                        placeholder="Enter Color"
                        value={form.color}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Right Side Customer Form */}
                  <div className="col-md-8 p-5">
                    <h3 className="fw-bold mb-4">Customer Information</h3>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>

                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter Full Name"
                          value={form.name}
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
                          placeholder="Enter Email"
                          value={form.email}
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
                          placeholder="Enter Phone Number"
                          value={form.phone}
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
                          {loading ? "Submitting..." : "📦 Place Order"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderSection;
