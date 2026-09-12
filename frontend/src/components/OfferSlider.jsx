import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const images = import.meta.glob("../assets/offerSlider/*.png", { eager: true });

export function OfferSlider() {
  const totalImages = Object.keys(images).length;
  //console.log(Object.keys(images).length);
  const imageurl = Object.values(images).map((img) => img.default);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstImg = currentIndex == 0;
    const newIndex = isFirstImg ? totalImages - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastImg = currentIndex == totalImages - 1;
    const newIndex = isLastImg ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div className="group relative mx-4 mt-6 h-112 max-w-screen">
      <div
        className="h-full w-full rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${imageurl[currentIndex]})` }}
      ></div>
      <div className="absolute top-[50%] right-5 hidden cursor-pointer rounded-full border-2 bg-black/20 p-1 text-xl text-white/70 group-hover:block">
        <BsChevronCompactRight onClick={nextSlide} />
      </div>
      <div className="absolute top-[50%] left-5 hidden cursor-pointer rounded-full border-2 bg-black/20 p-1 text-xl text-white/70 group-hover:block">
        <BsChevronCompactLeft onClick={prevSlide} />
      </div>
    </div>
  );
}
