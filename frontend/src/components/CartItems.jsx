import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

export const CartItem = ({ cart, setCart }) => {
  const deleteCartItem = async (cartid) => {
    await axios.delete(`/api/cart/${cartid}`);
    const newCart = await axios.get("/api/cart?expand=products");
    setCart(newCart.data);
  };

  const inCartItem = async (cartid) => {
    await axios.put(`/api/cart/${cartid}`, {
      quantitychange: 1,
    });
    const newCart = await axios.get("/api/cart?expand=products");
    setCart(newCart.data);
  };
  const desCartItem = async (cartid) => {
    await axios.put(`/api/cart/${cartid}`, {
      quantitychange: -1,
    });
    const newCart = await axios.get("/api/cart?expand=products");
    setCart(newCart.data);
  };
  return (
    <>
      <div className="w-230">
        {cart.map((cartItem) => {
          console.log(cartItem);
          return (
            <div
              key={cartItem._id}
              className="mx-20 mb-6 border bg-white py-10"
            >
              <div className="flex">
                <div>
                  <img
                    src={`/${cartItem.productid.image}`}
                    className="h-35 mx-5"
                  />
                </div>
                <div className="">
                  <p className="text-xl">{cartItem.productid.title} </p>
                  <p className="pt-3">₹ {cartItem.productid.price}</p>
                  <div className="flex items-center gap-5 pt-3">
                    <p>Quantity :</p>
                    <div className="">
                      <button
                        onClick={() => {
                          inCartItem(cartItem._id);
                        }}
                        className="border-secondry rounded-l-full border border-r-0 px-2 text-2xl"
                      >
                        +
                      </button>
                      <div className="border-secondry inline border-y pt-1 pb-0.5 text-center text-xl">
                        {cartItem.quantity}
                      </div>
                      <button
                        onClick={() => {
                          desCartItem(cartItem._id);
                        }}
                        className="border-secondry rounded-r-full border border-l-0 px-3 text-2xl"
                      >
                        -
                      </button>
                    </div>
                    <RiDeleteBin6Line
                      onClick={() => deleteCartItem(cartItem._id)}
                      className="text-xl"
                    />
                    <CiHeart className="text-xl" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
