"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext";
import { HiMail, HiLockClosed, HiUsers } from "react-icons/hi";
import Cookies from "js-cookie";

export default function LoginPage() {
    const [email, setEmail] = useState("offerly@testing.com");
    const [password, setPassword] = useState("testing");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setIsAuthenticated, setCookieExists } = useContext(AppContext);

    useEffect(() => {
        toast.info(
            "Hi, welcome to Offerly! You are in testing mode. Use the pre-filled credentials.",
            { autoClose: 8000, position: "top-right" }
        );
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                Cookies.set("authToken", data.token, { path: "/", expires: 1 });
                setIsAuthenticated(true);
                setCookieExists("exists");
                const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
                localStorage.setItem(
                    "cookieExists",
                    JSON.stringify({ value: "exists", expiresAt })
                );

                toast.success("Login successful! Redirecting...");

                setTimeout(() => router.push("/"), 1000);
            } else {
                toast.error("Access denied. Only admin can login.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (err) {
            toast.error("Something went wrong.");
        }

        setLoading(false);
    };

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col md:flex-row shadow-[0_0_10px_0_rgba(0,0,0,0.3)] rounded-none md:rounded-2xl overflow-hidden w-full max-w-5xl">
                <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
                    <div className="w-full max-w-md">
                        <div className="flex items-center mb-8">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                <HiUsers className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-gray-800">Offer Letter Platform</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Log in to your Account</h1>
                        <p className="text-gray-500 mb-8">Note: Login with you authorized credentials!</p>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            <div className="relative">
                                <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>


                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 rounded-lg text-white font-semibold transition ${loading
                                    ? "bg-blue-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex-1 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center p-8 relative overflow-hidden">                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
                        <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full"></div>
                        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center text-white">
                        <div className="relative mb-16">
                            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto flex items-center justify-center mb-8 relative">
                                <HiUsers className="w-16 h-16 text-white" />

                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg"></div>
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg"></div>
                                </div>
                                <div className="absolute top-1/2 -right-12 w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                                </div>
                            </div>

                            <div className="w-64 h-48 bg-white/20 backdrop-blur-sm rounded-xl p-4 mx-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex space-x-1">
                                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-3 bg-white/30 rounded w-3/4"></div>
                                    <div className="h-3 bg-white/30 rounded w-1/2"></div>
                                    <div className="h-3 bg-white/30 rounded w-2/3"></div>
                                    <div className="h-3 bg-white/30 rounded w-5/6"></div>
                                    <div className="h-3 bg-white/30 rounded w-1/3"></div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-4">Welcome To Our Offer Letter Generator Platform</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-md mx-auto">
                            Please Authenticate Yourself
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}