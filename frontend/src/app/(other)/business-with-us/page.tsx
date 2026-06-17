import CommanLayout from "@/components/CommanLayout";
import CommanBanner from "@/components/CommanBanner";
import GetInTouch from "@/components/GetInTouch";
import IMAGES from "@/constant/theme";
import PricingBlog from "@/elements/PricingBlog";

export const metadata = {
  title: "PinkChoice | Premium Women's Hygiene & Wellness Store",
  description:
    "Shop premium women's hygiene and wellness products at PinkChoice. Discover sanitary pads, feminine care essentials, personal care products, and wellness solutions designed for comfort, confidence, and everyday care. Enjoy secure payments and fast delivery across India.",
  keywords: [
    "PinkChoice",
    "Women's Hygiene",
    "Sanitary Pads",
    "Feminine Care",
    "Women's Wellness",
    "Personal Care",
    "Online Shopping",
    "Health Products",
    "India",
  ],
};

const PricingTablePage = () => {
  return (
    <CommanLayout>
      <div className="page-content bg-light">
        <CommanBanner
          mainText="Business With Us"
          parentText="Home"
          currentText="Business With Us"
          image={IMAGES.BackBg1.src}
        />
        <section className="dz-pricingtable ">
          <div className="container">
            <div className="row pricingtable-wraper">
              <PricingBlog />
            </div>
          </div>
        </section>
        <GetInTouch />
      </div>
    </CommanLayout>
  );
};
export default PricingTablePage;
