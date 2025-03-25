"use client";

import { likeProduct } from "@/services/productService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
function LikeProduct({ product }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const likeHandler = async () => {
    try {
      const { message } = await likeProduct(product._id);
      toast.success(message);
      router.refresh(pathname + "?" + searchParams.toString());
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="">
      <button onClick={likeHandler}>
        {product.isLiked ? (
         
          <CiHeart className="fill-primary-900 w-8 h-10" />
        ) : (
          <IoIosHeart  className="text-rose-700 w-8 h-10 " ف />
        )}
      </button>
    </div>
  );
}
export default LikeProduct;
