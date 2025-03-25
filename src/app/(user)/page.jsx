import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import CategorySidebar from "../(user)/products/CategorySidebar";
import queryString from "query-string";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import Link from "next/link";
import AddToCart from "../(user)/products/[slug]/AddToCart";
import LikeProduct from "../(user)/products/LikeProduct";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";
import Image from "next/image";
import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumbers";

export const dynamic = "force-dynamic"; 

async function Home({ searchParams }) {
  const cookieStore = cookies();
  const queries = queryString.stringify(searchParams);
  const strCookies = toStringCookies(cookieStore);
  const productsPromise = getProducts(queries, strCookies);
  const categoryPromise = getCategories();
  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoryPromise,
  ]);
  const { q: searchValue = "" } = searchParams;
  const resultsText = products.length > 1 ? "نتایج" : "نتیجه";

  return (
    <div>
      <div className="grid grid-cols-9 place-items-center gap-6">
        <img className="col-span-2 w-full h-72 object-cover rounded-lg shadow-lg" src="/image/home/1.webp" alt=""/>
        <img className="col-span-5 w-full h-72 object-cover rounded-lg shadow-xl" src="/image/home/2.webp" alt=""/>
        <img className="col-span-2 w-full h-72 object-cover rounded-lg shadow-lg" src="/image/home/3.webp" alt=""/>
      </div>

      {searchValue && (
        <p className="mb-4">
          {products.length === 0
            ? "هیچ محصولی با این مشخصات یافت نشد"
            : `نشان دادن ${products.length} ${resultsText} برای `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      )}
       
      <div className="grid grid-cols-4 gap-4 py-2">
        <div className="col-span-1 h-fit my-20 bg-gray-900 rounded-xl shadow-md px-4 py-2">
          <CategorySidebar categories={categories} />
        </div>
       
        <div className="col-span-3">
        <div className="px-4 py-4">
      <h1 className="bg-gray-900 w-96  text-white font-bold py-2 px-6 rounded-lg relative before:absolute before:left-0 before:top-0 before:w-6 before:h-full  before:rounded-l-xl before:-skew-x-12">
      فهرست محصولات

      </h1>
    </div>
      {products.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {products.map((product) => (
                <div className="max-w-sm bg-gray-900  rounded-2xl shadow-lg p-4 relative"  key={product._id}>
                <span className="absolute top-2 left-2 text-white text-sm font-bold px-3 py-1 rounded-lg">
                
                   {!!product.discount && (
                          <div className="flex items-center gap-x-2 mb-6">
                          
                            <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                            %  {toPersianNumbers(product.discount)} 
                            </div>
                          </div>
                        )}
                </span>
                <div className=" pt-10">
                <Link  href={`/products/${product.slug}`}>
        <img
          className="object-cover rounded-2xl object-center w-full hover:scale-110 transition-all ease-out duration-300"
          fill
          src={product.imageLink}


        />
      </Link>
 

                </div>
                <Link href="/" className="block">
                <h2 className="mt-4 text-gray-600 text-lg font-bold     hover:text-blue-900">{product.title}</h2>
                </Link>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-400 line-through text-sm">{toPersianNumbersWithComma(product.price)}</span>
                  <span className="text-red-500 text-lg font-bold">{toPersianNumbersWithComma(product.offPrice)} تومان</span>
                </div>
                {/* <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600">
                  خرید
                </button> */}
                <div className="flex justify-end   items-center ">
                <LikeProduct className="my-4" product={product} />
                <AddToCart  product={product} />
                </div>
                 
              </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-6 flex items-center justify-center">هیچ محصولی یافت نشد</p>
          )}
      </div>
      </div>
   
     

     
    </div>
  );
}

export default Home;
