import { BestSeller } from "../components/BestSellers";
import { Header } from "../components/Header";
import { OfferSlider } from "../components/OfferSlider";
import { TickerTape } from "../components/TickerTape";

export function Homepage({products}) {
  return (
    <>
      <title>Readify</title>
      <TickerTape />
      <Header />
      <OfferSlider />
      <BestSeller products={products} />
    </>
  );
}
