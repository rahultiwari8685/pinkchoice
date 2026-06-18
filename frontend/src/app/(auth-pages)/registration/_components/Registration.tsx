"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import IMAGES from "@/constant/theme";
import PasswordInputBox from "@/components/PasswordInputBox";

export default function Registration() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company_name: "",
    email: "",
    mobile: "",
    monthly_sales: "",
    yearly_turnover: "",
    experience_years: "",
    business_address: "",
    residential_address: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassword = (value: string) => {
    setForm({
      ...form,
      password: value,
    });
  };

  const handleConfirmPassword = (value: string) => {
    setForm({
      ...form,
      confirm_password: value,
    });
  };

  const saveRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirm_password) {
      alert("Password does not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://api.pinkchoice.in/api/business/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            company_name: form.company_name,
            email: form.email,
            mobile: form.mobile,
            monthly_sales: Number(form.monthly_sales),
            yearly_turnover: Number(form.yearly_turnover),
            experience_years: Number(form.experience_years),
            business_address: form.business_address,
            residential_address: form.residential_address,
            password: form.password,
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        alert("Registration Submitted Successfully.");

        setForm({
          name: "",
          company_name: "",
          email: "",
          mobile: "",
          monthly_sales: "",
          yearly_turnover: "",
          experience_years: "",
          business_address: "",
          residential_address: "",
          password: "",
          confirm_password: "",
        });

        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content bg-light">
      <section className="px-3">
        <div className="row">
          {/* Left Side */}

          <div className="col-lg-6 start-side-content">
            <div className="dz-bnr-inr-entry">
              <h1>Business Registration</h1>

              <nav className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">Registration</li>
                </ul>
              </nav>
            </div>

            <div className="registration-media">
              <Image src={IMAGES.RegistrationPng3} alt="" />
            </div>
          </div>

          {/* Right Side */}

          <div className="col-lg-6 end-side-content justify-content-center">
            <div className="login-area">
              <h2 className="text-secondary text-center">
                Business Registration
              </h2>

              <p className="text-center mb-4">
                Register your business with PinkChoice
              </p>

              <form onSubmit={saveRegistration}>
                <div className="mb-3">
                  <label>Full Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Company Name (Optional)</label>

                  <input
                    className="form-control"
                    name="company_name"
                    value={form.company_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Mobile</label>

                  <input
                    className="form-control"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Monthly Sales</label>

                    <input
                      type="number"
                      className="form-control"
                      name="monthly_sales"
                      value={form.monthly_sales}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Yearly Turnover</label>

                    <input
                      type="number"
                      className="form-control"
                      name="yearly_turnover"
                      value={form.yearly_turnover}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label>Experience (Years)</label>

                  <input
                    type="number"
                    className="form-control"
                    name="experience_years"
                    value={form.experience_years}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Business Address</label>

                  <textarea
                    rows={3}
                    className="form-control"
                    name="business_address"
                    value={form.business_address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Residential Address</label>

                  <textarea
                    rows={3}
                    className="form-control"
                    name="residential_address"
                    value={form.residential_address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <PasswordInputBox
                    placeholder="Password"
                    value={form.password}
                    onChange={handlePassword}
                  />
                </div>

                <div className="mb-4">
                  <label>Confirm Password</label>

                  <PasswordInputBox
                    placeholder="Confirm Password"
                    value={form.confirm_password}
                    onChange={handleConfirmPassword}
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-secondary w-100"
                >
                  {loading ? "Submitting..." : "Register"}
                </button>

                <div className="text-center mt-3">
                  Already have an account? <Link href="/login">Sign In</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
