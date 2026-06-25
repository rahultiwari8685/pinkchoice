import Image from "next/image";
import IMAGES from "../../constant/theme";

const UniqueFashionBlog = () => {
  return (
    <div className="container">
      <div className="row about-style2 align-items-xl-center align-items-start">
        <div className="col-lg-6 col-lg-5 col-sm-5 m-b30 sticky-top">
          <div className="about-thumb">
            <Image src={IMAGES.MenPng} alt="Man" />
          </div>
        </div>
        <div className="col-lg-6 col-md-7 col-sm-7">
          <div className="about-content">
            ```jsx
            <div className="section-head style-2 d-block">
              <h3 className="title w-100">
                Empowering Women with Care, Confidence & Wellness
              </h3>

              <p>
                At <strong>PinkChoice</strong>, we believe every woman deserves
                access to premium hygiene, wellness, and personal care products
                that promote confidence, comfort, and a healthier lifestyle. Our
                thoughtfully curated range is designed to support women through
                every stage of life with trusted quality, innovation, and care.
              </p>

              <p>
                From everyday feminine hygiene essentials to wellness and
                lifestyle solutions, PinkChoice is committed to delivering safe,
                reliable, and affordable products that prioritize your
                well-being. Our mission is to empower women by combining
                quality, convenience, and compassion, making self-care simple,
                accessible, and inspiring for everyone.
              </p>
            </div>
            ```
            <div className="about-bx-detail">
              <div className="about-bx-pic radius">
                <Image src={IMAGES.testimonial4} alt="testimonial" />
              </div>
              <div>
                <h6 className="name">Mrs. Pratibha Mishra</h6>
                <span className="position">Ceo and founder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueFashionBlog;
