"use client";

import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import { HiOutlineHome, HiOutlineShoppingCart } from "react-icons/hi";
import {toPersianNumbersWithComma, toPersianNumbersWithoutComma} from "@/utils/toPersianNumbers";
import { truncateText } from "@/utils/truncateText";
import { useEffect, useRef, useState } from "react";
import { CustomNavLink } from "@/components/CustomNavlLink";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
function Header() {
  const { data, error, isLoading } = useGetUser();
  const { user, cart } = data || {};
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header
      className={`shadow-md mb-10 sticky top-0 transition-all duration-200 bg-gray-900 ${
        isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav>
        <ul className="flex items-center  justify-between py-2 container xl:max-w-screen-xl">
          <li>
            <Link className="block py-2" href="/">
              خانه
            </Link>
          </li>
       

         <div className="flex gap-2 items-center ">
         <li>
  <Link className="relative block py-2 text-gray-800 hover:text-blue-600" href="/cart">
    <HiOutlineShoppingCart className="text-2xl text-blue-400" />
    {cart?.payDetail?.productIds?.length > 0 && (
      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
        {cart.payDetail.productIds.length}
      </span>
    )}
  </Link>
</li>
          {/* {user ? (
            <span>{user.name}</span>
          ) : (
            <li>
              <Link className="block py-2" href="/auth">
                ورود
              </Link>
            </li>
          )} */}
          <li >
          <div className=" flex  justify-end lg:col-span-4 col-span-11 order-3  ">
          <div
            className={`inline-flex justify-end items-center md:gap-2  
 `}
          >
            {user ? (
              <div
                ref={dropdownRef}
                className="relative  md:block md:row-span-2 md:col-span-3 space-y-4 rounded-lg"
              >
                <div className=" rounded-2xl overflow-hidden">
                  <div
                    className="flex items-center justify-between py-4 px-4   cursor-pointer gap-2"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <h1 className="bg-gray-300 rounded-full text-3xl w-8  h-8 text-center ">
                      {truncateText(user?.name, 1)}
                    </h1>

                    <ChevronDownIcon
                      className={`w-6 h-6 transition-all duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  <div
                    className={`absolute top-full left-0 w-64 rounded-md bg-white transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                    style={{ zIndex: 10 }}
                  >
                    <div className="">
                      
                      <section className="flex items-center border-b border-gray-200 m-2 gap-x-4 ">
                        <h1 className="bg-gray-300 rounded-full text-3xl w-10  h-10 text-center ">
                          {truncateText(user?.name, 1)}
                        </h1>
                        <div className=" flex flex-col  ">
                          <span className="font-medium text-sm text-gray-400">
                            {user?.name}
                          </span>
                          <span className="font-medium text-sm text-gray-400">
                            {toPersianNumbersWithoutComma(user?.phoneNumber)}
                          </span>
                        </div>
                      </section>
                      <ul className=" font-medium flex  text-center flex-col px-2 rounded-lg ">
                        {user.role === "ADMIN" ? (
                          <CustomNavLink href="/admin">
                            <HiOutlineHome className="w-5 h-5" />
                            <span>داشبورد</span>
                          </CustomNavLink>
                        ) : user.role === "USER" ? (
                          <CustomNavLink href="/profile">
                            <HiOutlineHome className="w-5 h-5" />
                            <span>داشبورد</span>
                          </CustomNavLink>
                        ) : user.role === "LAWYER" ? (
                          <CustomNavLink href="/lawyerPanel">
                            <HiOutlineHome className="w-5 h-5" />
                            <span>داشبورد</span>
                          </CustomNavLink>
                        ) : null}

                       
                        {/* <Logout /> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" md:bg-white rounded-full cursor-pointer   max-sm:text-sm">
                <button className="bg-blue-900 hover:bg-blue-600 font-medium text-sm flex gap-1 text-white  items-center px-2 py-1 rounded-md">
                

                  <Link href="/auth">
                    <h1> ورود || ثبت نام</h1>
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
          </li>
         </div>
         
        </ul>
      </nav>
    </header>
  );
}
export default Header;
