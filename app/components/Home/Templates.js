// 'use client'

// import { AppContext } from "@/app/context/AppContext";
// import { useContext } from "react";

// const Templates = () => {
//     const { handleLetterBg } = useContext(AppContext)
//     return (
//         <>
//             <section className="py-20 bg-gray-50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
//                     <div className="text-center mb-16">
//                         <h2 className="text-4xl font-bold text-gray-900 mb-4">
//                             Stunning Templates
//                         </h2>
//                         <p className="text-xl text-gray-600">
//                             Professional designs crafted for every type of salon
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {[
//                             { name: "Elegance", style: "Modern Hair Salon", gradient: "bg-gradient-to-br from-pink-50 to-purple-50" },
//                             { name: "Serenity", style: "Spa & Wellness", gradient: "bg-gradient-to-br from-purple-50 to-blue-50" },
//                             { name: "Glamour", style: "Nail Studio", gradient: "bg-gradient-to-br from-orange-50 to-pink-50" },
//                             { name: "Luxe", style: "Beauty Parlor", gradient: "bg-gradient-to-br from-pink-50 to-yellow-50" },
//                             { name: "Zen", style: "Massage Therapy", gradient: "bg-gradient-to-br from-green-50 to-blue-50" },
//                             { name: "Chic", style: "Makeup Artist", gradient: "bg-gradient-to-br from-purple-50 to-pink-50" }
//                         ].map((template, index) => (
//                             <div key={index} className="group cursor-pointer">
//                                 <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden">

                                    
//                                     <div className={`h-48 bg-gradient-to-br ${template.gradient} p-6 relative`}>
//                                         <div className="bg-white rounded-xl p-4 h-full flex flex-col justify-between shadow-inner">
//                                             <div>
//                                                 <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                                                 <div className="h-2 bg-gray-100 rounded w-3/4 mb-4"></div>
//                                             </div>
//                                             <div className="grid grid-cols-2 gap-2">
//                                                 <div className="h-8 bg-pink-100 rounded"></div>
//                                                 <div className="h-8 bg-purple-100 rounded"></div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="p-6">
//                                         <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                                             {template.name}
//                                         </h3>
//                                         <p className="text-gray-600 text-sm mb-4">
//                                             {template.style}
//                                         </p>
//                                         <button onClick={()=> handleLetterBg(template.gradient)} className="inline-block text-white bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow">
//                                             Preview Template →
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//         </>
//     )
// }

// export default Templates;


// {/* <div className="my-20 max-w-4xl mx-auto bg-white shadow-lg">
//                 <div className="h-3 bg-gradient-to-r from-gray-800 via-orange-500 to-orange-400"></div>
//                 <div className="p-8 min-h-[800px] relative">
//                     <div className="flex items-center mb-12">
//                         <div className="flex items-center mr-4">
//                             <div className="relative">
//                                 <div className="w-8 h-8 bg-orange-500 transform rotate-45 origin-center"></div>
//                                 <div className="absolute top-0 left-0 w-8 h-8 bg-gray-800 transform rotate-45 origin-center -translate-x-1 -translate-y-1"></div>
//                             </div>
//                         </div>
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-800 tracking-wide">INGOUDE</h1>
//                             <p className="text-sm text-gray-600 tracking-widest">COMPANY</p>
//                         </div>
//                     </div>
//                     <div className="flex justify-between items-start mb-8">
//                         <div>
//                             <p className="text-sm text-gray-600 mb-1">To:</p>
//                             <p className="font-semibold text-gray-800">Francois Mercer</p>
//                             <p className="text-sm text-gray-700">Studio Shadow / CEO</p>
//                             <p className="text-sm text-gray-700">123 Anywhere St, Any City, ST 12345</p>
//                         </div>
//                         <div className="text-right">
//                             <p className="text-sm text-gray-800 font-medium">December 30, 2023</p>
//                         </div>
//                     </div>
//                     <div className="mb-6">
//                         <p className="text-gray-800 font-medium">Dear Mr. Francois Mercer</p>
//                     </div>
//                     <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
//                         <p>
//                             A letterhead is the heading at the top of a sheet of letter paper (stationery).
//                             That heading usually consists of a name and an address, and a logo or corporate design,
//                             and sometimes a background pattern. The term "letterhead" is often used to refer to the
//                             whole sheet imprinted with such a heading. Many companies and individuals prefer to
//                             create a letterhead template in a word processor or other software application.
//                         </p>

//                         <p>
//                             This generally includes the same information as pre-printed stationery but without the
//                             additional costs involved. Letterhead can then be printed on stationery (or plain paper)
//                             as needed on a local output device or sent electronically.
//                         </p>

//                         <p>
//                             This generally includes the same information as pre-printed stationery but without the
//                             additional costs involved. Letterhead can then be printed on stationery (or plain paper)
//                             as needed on a local output device or sent electronically.
//                         </p>

//                         <p>
//                             The term "letterhead" is often used to refer to the whole sheet imprinted with such a
//                             heading. Many companies and individuals prefer to create a letterhead template in a
//                             word processor or other software application.
//                         </p>
//                     </div>

//                     <div className="mt-8 mb-16">
//                         <p className="text-gray-800 font-medium mb-8">Regards,</p>
//                         <div className="mb-4">
//                             <div className="font-bold text-2xl text-gray-800 mb-2" style={{ fontFamily: 'cursive' }}>
//                                 Schwaiger
//                             </div>
//                         </div>

//                         <div>
//                             <p className="font-semibold text-gray-800">Phyllis Schwaiger</p>
//                             <p className="text-sm text-gray-600">General Manager</p>
//                         </div>
//                     </div>
//                     <div className="absolute bottom-0 right-0 w-52 h-16">
//                         <div className="w-full h-full bg-gradient-to-tl from-orange-400 via-orange-500 to-gray-800 opacity-90 rounded-tl-full"></div>
//                     </div>
//                 </div>
//                 <div className="h-3 bg-gradient-to-r from-orange-400 via-orange-500 to-gray-800"></div>
//             </div> */}