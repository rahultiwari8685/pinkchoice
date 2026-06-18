import React, { Fragment } from "react";
import Link from "next/link";

// const pricingTableData = [
//   { plane: "Distributor", price: "19", duration: "Week", features: "starter" },
//   { plane: "Virtual Store", price: "39", duration: "Month", features: "pro" },
//   {
//     plane: "Pink Choice Store",
//     price: "69",
//     duration: "Year",
//     features: "enterprise",
//   },
// ];

const pricingTableData = [
  {
    plane: "Distributor",
    description:
      "Become an authorized PinkChoice Distributor and grow your business by supplying premium women's wellness and hygiene products to retailers in your region.",
    button: "Become a Distributor",
    features: [
      "Exclusive Distributor Pricing",
      "Wide Range of PinkChoice Products",
      "Marketing & Promotional Support",
      "Fast & Reliable Deliveries",
      "Dedicated Business Relationship Manager",
      "Growth Opportunities Across Your Region",
    ],
  },
  {
    plane: "Virtual Store",
    description:
      "Launch your own online PinkChoice store without maintaining inventory. Start selling our trusted products directly to customers and earn attractive margins",
    button: "Start Your Virtual Store",
    features: [
      "No Inventory Required",
      "Easy Online Store Setup",
      "Nationwide Delivery Support",
      "Secure Online Payments",
      "Order & Sales Dashboard",
      "Attractive Profit Margins",
    ],
  },
  {
    plane: "Pink Choice Store",
    description:
      "Open an official PinkChoice Store and offer customers a complete range of women's healthcare, hygiene, and wellness products with trusted brand support.",
    button: "Open PinkChoice Store",
    features: [
      "Official PinkChoice Brand Store",
      "Premium Product Collection",
      "Complete Store Setup Assistance",
      "Marketing & Branding Support",
      "Business Growth Opportunities",
      "Dedicated Customer & Partner Support",
    ],
  },
];

const PricingBlog = () => {
  return (
    <Fragment>
      {pricingTableData.map((data, ind) => (
        <div
          className="col-lg-4 col-md-6 wow fadeInUp"
          data-wow-delay={`${(ind + 1) * 0.1}s`}
          key={ind}
        >
          <div className="pricingtable-wrapper style-1 bg-light m-b30">
            <div className="pricingtable-inner">
              <div className="pricingtable-title">
                <h3 className="title">{data.plane}</h3>

                <p className="text">{data.description}</p>
              </div>

              <div className="pricingtable-button">
                <Link
                  href="/registration"
                  className="btn btn-outline-secondary"
                >
                  {data.button}
                </Link>
              </div>

              <div className="pricingtable-list">
                <h4 className="list-title">Key Features:</h4>

                <ul className="pricingtable-features">
                  {data.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default PricingBlog;
