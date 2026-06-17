import { Metadata } from "next";
import HomePage from "./(home)/home/page";

export const metadata: Metadata = {
  title: "PinkChoice | E-Commerce Platform",
  description:
    "PinkChoice is a leading e-commerce platform for women's hygiene, wellness, personal care, and lifestyle products. Discover quality products at affordable prices with a seamless online shopping experience.",
};

export default function Home() {
  return (
    <div>
      <main>
        <HomePage />
      </main>
    </div>
  );
}
