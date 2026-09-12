import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import Logo from "../assets/logo/logo_nobg1.png";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="bg-primary w-full">
      <div className="flex items-center justify-between">
        <div className="shrink-0 cursor-pointer pl-12">
          <Link to="/">
            <img src={Logo} className="h-23 w-55 object-contain"></img>
          </Link>
        </div>

        <div>
          <div className="flex gap-14 text-xl text-white">
            <Link
              to="/"
              className="decoration-four cursor-pointer underline-offset-5 hover:underline"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="decoration-four cursor-pointer underline-offset-5 hover:underline"
            >
              Shop
            </Link>
            <Link
              to="/contact"
              className="decoration-four cursor-pointer underline-offset-5 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="relative">
          <input
            className="w-80 rounded-full bg-gray-100 py-2 pl-3.5 focus:outline-none"
            placeholder="Search..."
          ></input>
          <button className="; bg-gray-100px-2 absolute right-2 cursor-pointer rounded-full py-2">
            <FaRegArrowAltCircleRight className="text-secondry size-6" />
          </button>
        </div>

        <div className="flex gap-12 pr-22">
          <div>
            <Link to="/wishlist">
              <CiHeart className="relative cursor-pointer text-3xl delay-75 duration-100 ease-in hover:scale-110" />
              {/*<span className="absolute top-10 right-61 text-white/70">0</span>*/}
            </Link>
          </div>
          <div>
            <Link to="/checkout">
              <CiShoppingCart className="relative cursor-pointer text-3xl delay-75 duration-100 ease-in hover:scale-110" />
            </Link>
          </div>
          <div>
            <Link to="/user">
              <CiUser className="cursor-pointer text-3xl delay-75 duration-100 ease-in hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
