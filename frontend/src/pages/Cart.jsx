import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { CartItem } from "../components/CartItems";
import { CartPaymentSummary } from "../components/CartPaymentSummary";
import { EmptyCart } from "../components/EmptyCart";

export function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/cart?expand=products").then((res) => {
      //console.log(res.data);
      setCart(res.data);
    });
  }, []);

  const clearCart = async () => {
    await axios.delete("api/cart").then((res) => {
      console.log(res.data);
      setCart([]);
    });
  };

  return (
    <div>
      <title>Checkout</title>
      <Header />

      <div>
        <div>
          <p className="py-6 text-center text-4xl">
            Checkout ( <span>{cart.length}</span> items )
          </p>
        </div>
        <div className="mt-10 mb-5 ml-18 text-2xl font-medium">
          <p>Your Cart</p>
        </div>

        {cart.length > 0 ? (
          <>
            <button onClick={clearCart} className="px-20 pb-1">
              Clear Cart
            </button>
            <div className="flex">
              <CartItem cart={cart} setCart={setCart} />
              <CartPaymentSummary cart={cart} />
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
}
