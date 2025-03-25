import Link from "next/link";
import { TfiAngleLeft } from "react-icons/tfi";


export function CustomNavLink({ children, href }) {
  
 

  return (
      <li className="list-none py-2 ">
      <Link
        href={href}
        className=  "flex items-center justify-between text-black   py-3  gap-5  transition-all duration-300 hover:gap-2 rounded-lg  hover:bg-blue-100 hover:text-blue-600" 
       
        >
        
        
       <div className="flex itmes-center  gap-4">
       {children} 
       </div>
       <span><TfiAngleLeft className="w-5 h-4" /></span>
      </Link>
  
        </li>
  );
}
