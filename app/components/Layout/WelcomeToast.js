// 'use client';
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function WelcomeToast() {
//   useEffect(() => {
//     toast.info(
//       <div>
//         <p>Hi, welcome to Offerly! You are in testing mode.</p>
//         <button
//           onClick={handleTestLogin}
//           className="bg-blue-500 text-white px-3 py-1 mt-2 rounded text-sm hover:bg-blue-600"
//         >
//           Login with Test Account
//         </button>
//       </div>,
//       { autoClose: 6000 } // closes after 6 seconds
//     );
//   }, []);

//   const handleTestLogin = () => {
//     window.location.href = "/login?test=true";
//   };

//   return null;
// }
