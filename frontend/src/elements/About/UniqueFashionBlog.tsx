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
            <div className="section-head style-2 d-block">
              <h3 className="title w-100">
                Empower Every Day: Your Trusted Women's Wellness Destination
              </h3>
              <p>
                At PinkChoice, we're committed to providing women with premium
                hygiene, wellness, and lifestyle products that inspire
                confidence and comfort every day. Our carefully curated
                collection includes high-quality sanitary care, personal care
                essentials.
              </p>
              <p>
                At PinkChoice, we're committed to providing women with premium
                hygiene, wellness, and lifestyle products that inspire
                confidence and comfort every day. Our carefully curated
                collection includes high-quality sanitary care, personal care
                essentials.
              </p>
            </div>
            <div className="about-bx-detail">
              <div className="about-bx-pic radius">
                <Image src={IMAGES.testimonial4} alt="testimonial" />
              </div>
              <div>
                <h6 className="name">Mr. Dinesh Mishra</h6>
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
