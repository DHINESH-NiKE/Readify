import { Header } from "../components/Header";
import axios from "axios";
export function Shop({ products }) {
  const addToCart = async (productid) => {
    console.log("Product ID:", productid);

    try {
      const response = await axios.post("/api/cart", {
        productid,
      });

      console.log(response.data);
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("BACKEND ERROR:", error.response?.data);
    }
  };
  return (
    <>
      <title>Shop</title>
      <Header />
      <div>
        <section className="body-font text-gray-600">
          <div className="container mx-auto px-5 py-24">
            <div className="-m-4 flex flex-wrap">
              {products.map((book) => {
                //console.log(book);
                return (
                  <div
                    key={book._id}
                    className="mb-10 w-full border-r-2 border-amber-100 p-4 md:w-1/2 lg:w-1/4"
                  >
                    <a className="relative block h-48 overflow-hidden rounded">
                      <img
                        alt="book image"
                        className="h-50 object-center"
                        src={`/${book.image}`}
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">
                        {book.Author}
                      </h3>
                      <h2 className="title-font text-lg font-medium text-gray-900">
                        {book.title}
                      </h2>
                      <p className="mt-1">₹{book.price}</p>
                      <button
                        className="mt-2 h-9 w-23 rounded-full bg-amber-500 cursor-pointer"
                        onClick={() => addToCart(book._id)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
