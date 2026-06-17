import WithoutFooterLayout from "@/components/WithoutFooterLayout";
import ContactUs from "./_components/ContactUs";

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

const ContactUsPage = () => {
  return (
    <WithoutFooterLayout>
      <ContactUs />
    </WithoutFooterLayout>
  );
};
export default ContactUsPage;
