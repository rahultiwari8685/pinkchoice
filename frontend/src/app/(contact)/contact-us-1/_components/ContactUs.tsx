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
                      <li>+91-8795094927</li>
                      <li>+91-8808540402</li>
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
            src="https://www.google.com/maps/place/Uttar+Pradesh+Police+Recruitment+%26+Promotion+Board/@26.8405498,80.9403864,17z/data=!3m1!4b1!4m6!3m5!1s0x399bfdaa2cf29701:0x3c7ccfb5a775a9c2!8m2!3d26.8405498!4d80.9403864!16s%2Fg%2F1ptw8s18j?hl=en&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
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
