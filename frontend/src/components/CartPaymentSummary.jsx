import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const CartPaymentSummary = ({ cart }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    standardPrice: 0,
    estimatedDeliveryTimeMsS: null,

    fastPrice: 0,
    estimatedDeliveryTimeMsF: null,

    expressPrice: 0,
    estimatedDeliveryTimeMsE: null,

    itemsTotal: 0,
    shipping: 0,
    totalBeforeTax: 0,
    gst: 0,
    grandTotal: 0,
  });

  const [delivery, setDelivery] = useState("standard");

  useEffect(() => {
    let ignore = false;
    const getPaymentSummary = async () => {
      try {
        const res = await axios.post("/api/cart/payment", { delivery });
        if (!ignore) {
          setPaymentDetails(res.data);
        }
      } catch (error) {
        if (!ignore) {
          console.log(error.response?.data);
        }
      }
    };
    getPaymentSummary();

    return () => {
      ignore = true;
    };
  }, [delivery, cart]);

  const deliveryChange = (e) => {
    const value = e.target.value;
    setDelivery(value);
  };

  return (
    <div>
      <div className="mb-7 border bg-white px-4 pb-4">
        <p className="mt-4 font-medium">Select Delivery Date</p>

        <div className="mt-2 flex flex-col gap-2">
          <div>
            <input
              type="radio"
              name="delivery"
              value="standard"
              checked={delivery === "standard"}
              onChange={deliveryChange}
            />

            <label>
              {" "}
              {dayjs(paymentDetails.estimatedDeliveryTimeMsS).format(
                "dddd, MMMM D",
              )}
            </label>

            <div className="pl-5 text-gray-500">
              <span>
                {paymentDetails.standardPrice === 0
                  ? "FREE"
                  : paymentDetails.standardPrice}
              </span>{" "}
              Shipping
            </div>
          </div>

          <div>
            <input
              type="radio"
              name="delivery"
              value="fast"
              checked={delivery === "fast"}
              onChange={deliveryChange}
            />

            <label>
              {" "}
              {dayjs(paymentDetails.estimatedDeliveryTimeMsF).format(
                "dddd, MMMM D",
              )}
            </label>

            <div className="pl-5 text-gray-600">
              ₹<span>{paymentDetails.fastPrice}</span> - Shipping
            </div>
          </div>

          <div>
            <input
              type="radio"
              name="delivery"
              value="express"
              checked={delivery === "express"}
              onChange={deliveryChange}
            />

            <label>
              {" "}
              {dayjs(paymentDetails.estimatedDeliveryTimeMsE).format(
                "dddd, MMMM D",
              )}
            </label>

            <div className="pl-5 text-gray-500">
              ₹<span>{paymentDetails.expressPrice}</span> - Shipping
            </div>
          </div>
        </div>
      </div>

      <div className="h-60 w-125 border bg-white px-4">
        <div>
          <p className="py-3 text-xl font-medium">Payment Summary</p>

          <div className="flex justify-between py-1">
            <div>Items ({cart.length}):</div>
            <div>₹ {paymentDetails.itemsTotal}</div>
          </div>

          <div className="flex justify-between py-1">
            <div>Shipping & Handling:</div>
            <div>₹ {paymentDetails.shipping}</div>
          </div>

          <div className="flex justify-between py-1">
            <div>Total Before Tax:</div>
            <div>₹ {paymentDetails.totalBeforeTax}</div>
          </div>

          <div className="flex justify-between py-1">
            <div>GST (5%):</div>
            <div>₹ {paymentDetails.gst.toFixed(2)}</div>
          </div>

          <div className="flex justify-between pt-4 font-bold">
            <div>Grand Total:</div>
            <div>₹ {paymentDetails.grandTotal.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
