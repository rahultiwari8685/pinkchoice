import IMAGES from "../constant/theme";
import SubscribeNewsletter from "./SubscribeNewsletter";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  footerStyle?: string;
}

const Footer = ({ footerStyle }: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer className={`site-footer ${footerStyle || "style-1"}`}>
      {/* Footer Top */}

      <div className="footer-top py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left */}

            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="footer-logo mb-4">
                <Link href="/">
                  {footerStyle === "footer-dark" ? (
                    <Image src={IMAGES.LogoWhite} alt="PinkChoice" />
                  ) : (
                    <Image src={IMAGES.logo} alt="PinkChoice" />
                  )}
                </Link>
              </div>

              <ul className="widget-address list-unstyled">
                <li className="mb-3">
                  <strong>Address</strong>
                  <br />
                  19 B, Vidhansabha Marg (Near Akashwani), Hazratganj, Lucknow -
                  226001
                </li>

                <li className="mb-3">
                  <strong>Email</strong>
                  <br />
                  business@pinkchoice.in
                </li>

                <li>
                  <strong>Phone</strong>
                  <br />
                  +91 8005384284
                </li>
              </ul>
            </div>

            {/* Right */}

            <div className="col-lg-6">
              <div
                className="p-5 rounded-4"
                style={{
                  background: "#fff5f8",
                  border: "1px solid #f3d4df",
                }}
              >
                <h3 className="mb-3">Subscribe Newsletter</h3>

                <p className="mb-4">
                  Subscribe to receive the latest product updates, business
                  opportunities, offers and news from PinkChoice.
                </p>

                <SubscribeNewsletter />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}

      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <p className="copyright-text mb-0">
                © {year} <Link href="/">PinkChoice</Link> All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
