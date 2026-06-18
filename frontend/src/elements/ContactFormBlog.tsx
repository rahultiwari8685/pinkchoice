"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function ContactFormBlog() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("https://api.pinkchoice.in/api/contact/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="dz-form" onSubmit={submitHandler}>
        <label>Your Name</label>

        <input
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email Address</label>

        <input
          className="form-control"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>

        <input
          className="form-control"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <label>Message</label>

        <textarea
          rows={4}
          className="form-control mb-3"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button className="btn btn-white w-100" disabled={loading}>
          {loading ? "Submitting..." : "SUBMIT"}
        </button>
      </form>

      <ToastContainer />
    </>
  );
}
