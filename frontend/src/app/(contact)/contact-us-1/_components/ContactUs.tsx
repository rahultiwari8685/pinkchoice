import Link from "next/link";
import ContactFormBlog from "@/elements/ContactFormBlog";

const ContactUs = () => {
  return (
    <div className="page-content bg-light">
      <div className="contact-bnr bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-info style-1 text-start text-white">
                <h2 className="title wow fadeInUp" data-wow-delay="0.1s">
                  DISCOVER US
                </h2>
                <p className="text wow fadeInUp" data-wow-delay="0.2s">
                  <span className="text-decoration-underline">
                    <Link href="/our-team">
                      PinkChoice is here to support you;
                    </Link>
                  </span>
                  <br />
                  Our team is dedicated to helping you choose the right women's
                  wellness, hygiene, and lifestyle products with confidence.
                </p>
                <div
                  className="contact-bottom wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="contact-left">
                    <h3>Call Us</h3>
                    <ul>
                      <li>+91-8005384284</li>
                      <li>+91-8795094927</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="contact-area1 style-1 m-r20 m-md-r0 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <ContactFormBlog />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-inner-2 pt-0">
        <div className="map-iframe map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.9618098851743!2d80.93756877599952!3d26.841166963160468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdaa2cf29701%3A0x3c7ccfb5a775a9c2!2sUttar%20Pradesh%20Police%20Recruitment%20%26%20Promotion%20Board!5e0!3m2!1sen!2sin!4v1747208354921!5m2!1sen!2sin"
            style={{
              border: "0",
              width: "100%",
              minHeight: "100%",
              marginBottom: "-8px",
            }}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
