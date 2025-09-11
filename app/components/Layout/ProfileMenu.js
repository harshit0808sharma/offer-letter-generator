// "use client";
// import { AppContext } from "@/app/context/AppContext";
// import { useContext, useState } from "react";
// import { FiLogOut, FiUser, FiSun, FiMoon } from "react-icons/fi";

// export default function ProfileMenu() {
//   const { theme, setTheme, handleLogout } = useContext(AppContext);
//   const [open, setOpen] = useState(false);

//   return (
//     <div
//       className="relative inline-block"
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//     >
//       {/* Profile Button */}
//       <button className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-md transition-all duration-300 hover:scale-105">
//         <FiUser size={20} />
//       </button>

//       {/* Dropdown Menu */}
//       {open && (
//         <div className="absolute top-14 left-0 flex flex-col gap-2 transition-all duration-300">
//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="group relative flex items-center justify-start w-32 h-10 rounded-full bg-red-500 text-white shadow-md overflow-hidden transition-all duration-300 hover:w-32 hover:rounded-2xl active:translate-x-[2px] active:translate-y-[2px]"
//           >
//             <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:w-1/3 pl-0 group-hover:pl-4 h-full">
//               <FiLogOut size={18} />
//             </div>
//             <span className="absolute right-0 w-0 opacity-0 text-sm font-semibold transition-all duration-300 group-hover:opacity-100 group-hover:w-2/3 group-hover:pr-3 flex items-center h-full">
//               Logout
//             </span>
//           </button>

//           {/* Theme Button */}
//           <button
//             onClick={() => setTheme(!theme)}
//             className="group relative flex items-center justify-start w-32 h-10 rounded-full bg-gray-600 text-white shadow-md overflow-hidden transition-all duration-300 hover:w-32 hover:rounded-2xl active:translate-x-[2px] active:translate-y-[2px]"
//           >
//             <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:w-1/3 pl-0 group-hover:pl-4 h-full">
//               {theme === false ? <FiMoon size={18} /> : <FiSun size={18} />}
//             </div>
//             <span className="absolute right-0 w-0 opacity-0 text-sm font-semibold transition-all duration-300 group-hover:opacity-100 group-hover:w-2/3 group-hover:pr-3 flex items-center h-full">
//               {theme === false ? "Dark Mode" : "Light Mode"}
//             </span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
