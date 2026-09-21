import { FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className="flex h-120 w-full flex-col  items-center bg-white">
      <img src="/images/EmptyBag.png" className="w-60" alt="Empty cart" />

      <div className="text-center text-3xl font-medium">Your cart is empty</div>

      <div className="py-1 text-center text-xl">
        Your next great read is waiting for you
      </div>

      <button>
        <Link
          className="mt-5 flex items-center gap-2 rounded-full bg-secondry px-6 py-3 text-white"
          to="/shop"
        >
          <FaBookOpen />
          <span>Browse Books →</span>
        </Link>
      </button>
    </div>
  );
};
