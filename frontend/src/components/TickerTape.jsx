import { useEffect, useRef, useState } from "react";

const OFFERS = [
  {
    id: "free-delivery",
    icon: "🚚",
    title: "Free delivery on every order",
    subtitle: "No minimum spend, no hidden charges",
  },
  {
    id: "flat-10",
    icon: "💸",
    title: "Flat 10% off, today only",
    subtitle: "Applied automatically at checkout",
  },
  {
    id: "10-above-499",
    icon: "🏷️",
    title: "10% off on orders above ₹499",
    subtitle: "Add a little more to unlock it",
  },
  {
    id: "book-bundle",
    icon: "📚",
    title: "Buy 2 books, get 1 free",
    subtitle: "Mix and match across any titles",
  },
];

const ENTER_MS = 600;
const HOLD_MS = 3000;
const EXIT_MS = 600;

export function TickerTape() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("enter"); // "enter" | "center" | "exit"
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);

    setPhase("enter");

    const toCenter = setTimeout(() => setPhase("center"), 20);

    const toExit = setTimeout(() => setPhase("exit"), 20 + ENTER_MS + HOLD_MS);

    const toNext = setTimeout(
      () => {
        setIndex((current) => (current + 1) % OFFERS.length);
      },
      20 + ENTER_MS + HOLD_MS + EXIT_MS,
    );

    timers.current = [toCenter, toExit, toNext];

    return () => timers.current.forEach(clearTimeout);
  }, [index]);

  const offer = OFFERS[index];

  const positionClass =
    phase === "enter"
      ? "translate-x-full opacity-0"
      : phase === "exit"
        ? "-translate-x-full opacity-0"
        : "translate-x-0 opacity-100";

  return (
    <div className="w-full overflow-hidden rounded-xl ">
      <div className="relative flex h-14 items-center justify-center px-4 sm:h-10">
        <div
          key={offer.id}
          className={`flex items-center gap-2 text-center transition-all duration-[600ms] ease-out motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:opacity-100 sm:gap-3 ${positionClass}`}
        >
          <span className="text-lg sm:text-xl" aria-hidden="true">
            {offer.icon}
          </span>
          <p className="text-sm font-semibold">
            {offer.title}
            <span className="hidden font-normal"> — {offer.subtitle}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TickerTape;
