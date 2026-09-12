import { IoCartSharp } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

export function BestSeller({ products }) {
  const bestBooks = products.filter((books) => books.bestseller);
  console.log(bestBooks);
  return (
    <div className="mx-18 my-15">
      <div className="">
        <h1 className="text-5xl  font-medium">Best Sellers</h1>
        <p className="text-l pt-4">Read What Millions Have Loved!</p>
      </div>
      <div className="flex gap-4 overflow-x-scroll ">
        {bestBooks.map((book) => {
          return (
            <div key={book.id}className="relative mt-5 w-69 rounded-2xl bg-white shrink-0">
              <div>
                <div className="pt-1">
                  <img className="h-69" src={`/${book.image}`} alt="" />
                </div>
                <div className="pt-1 pl-5">
                  <p className=" font-medium">{book.title}</p>
                  <p className="pt-2 font-light"></p>
                  <div className="flex gap-2 pt-2">
                    <div className="line-through">
                      ₹<span className="pl-1">{book.price + 100}</span>
                    </div>
                    <div className="font-bold">
                      ₹<span className="pl-1">{book.price}</span>
                    </div>
                    <div className="bg-four px-1">
                      ₹<span className="pl-1">100</span> Off
                    </div>
                  </div>
                  <div className="py-5 pt-4 pl-10">
                    <button className="bg-secondry flex w-33 items-center justify-center gap-1 rounded-full">
                      <IoCartSharp />
                      <p>Add to Cart</p>
                    </button>
                  </div>
                  <div className="absolute top-2 right-2">
                    <CiHeart className="rounded-full border text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
