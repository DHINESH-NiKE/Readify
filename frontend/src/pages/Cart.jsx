import { Header } from "../components/Header";
import book1 from "../assets/books/1.png";
import { CiHeart } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

export function Cart() {
  return (
    <div>
      <title>Checkout</title>
      <Header />

      <div>
        <div>
          <p className="py-6 text-center text-4xl">
            Checkout ( <span>3</span> items )
          </p>
        </div>
        <div className="mt-10 mb-5 ml-18 text-2xl font-medium">
          <p>Review your order</p>
        </div>

        <div className="flex">
          <div className="w-230">
            <div className="mx-20 mb-6 border bg-white py-10">
              <div className="flex">
                <div>
                  <img src={book1} className="h-35" />
                </div>
                <div className="">
                  <p className="text-xl">Title title title </p>
                  <p className="pt-3">₹ 300</p>
                  <div className="flex items-center gap-5 pt-3">
                    <p>Quantity :</p>
                    <div className="">
                      <button className="border-secondry rounded-l-full border border-r-0 px-2 text-2xl">
                        +
                      </button>
                      <div className="border-secondry inline border-y pt-1 pb-0.5 text-center text-xl">
                        1
                      </div>
                      <button className="border-secondry rounded-r-full border border-l-0 px-3 text-2xl">
                        -
                      </button>
                    </div>
                    <RiDeleteBin6Line className="text-xl" />
                    <CiHeart className="text-xl" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-20 mb-6 border bg-white py-10">
              <div className="flex">
                <div>
                  <img src={book1} className="h-35" />
                </div>
                <div className="">
                  <p className="text-xl">Title title title </p>
                  <p className="pt-3">₹ 300</p>
                  <div className="flex items-center gap-5 pt-3">
                    <p>Quantity :</p>
                    <div className="">
                      <button className="border-secondry rounded-l-full border border-r-0 px-2 text-2xl">
                        +
                      </button>
                      <div className="border-secondry inline border-y pt-1 pb-0.5 text-center text-xl">
                        1
                      </div>
                      <button className="border-secondry rounded-r-full border border-l-0 px-3 text-2xl">
                        -
                      </button>
                    </div>
                    <RiDeleteBin6Line className="text-xl" />
                    <CiHeart className="text-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="h-100 w-125 border bg-white px-4">
              <div>
                <p className="py-3 text-xl font-medium">Payment Summary</p>
                <div className="flex justify-between py-1">
                  <div>Items (2):</div>
                  <div> ₹ 300.00</div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Shipping & Handling:</div>
                  <div> ₹ 00.00</div>
                </div>
                <div className="flex justify-between py-1">
                  <div>Total Befor Tax:</div>
                  <div> ₹ 300.00</div>
                </div>
                <div className="flex justify-between py-1">
                  <div>GST (%5):</div>
                  <div>₹30.00</div>
                </div>
                <div className="flex justify-between pt-4 font-bold">
                  <div>Grand Total:</div>
                  <div>₹30.00</div>
                </div>
              </div>
              <div>
                <p className="mt-4 font-medium">Select Delivery Date</p>
                <div className="mt-2 flex flex-col gap-2">
                  <div>
                    <input type="radio" name="delivery" value="0"></input>
                    <span>
                      {" "}
                      5 days from now{" "}
                      <span className="font-medium">(Free)</span>{" "}
                    </span>
                  </div>
                  <div>
                    <input type="radio" name="delivery" value="99"></input>
                    <span>3 days from now(₹ 99.00)</span>
                  </div>
                  <div>
                    <input type="radio" name="delivery" value="149"></input>
                    <span>tomorrow (₹ 149.00)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
