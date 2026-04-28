import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowToOrder from "@/components/HowToOrder";
import ProductCatalog from "@/components/ProductCatalog";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductCatalog />
        <HowToOrder />
        <About />
      </main>
      <Footer />
    </>
  );
}
