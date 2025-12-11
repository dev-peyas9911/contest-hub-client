import React from "react";
import { motion } from "framer-motion";
import { Link, useRouteError } from "react-router";
import { AlertTriangle, RefreshCcw } from "lucide-react";


export default function ErrorPage() {
const error = useRouteError();
const status = error?.status || 500;
const message = error?.statusText || error?.message || "Something went wrong!";


return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
<motion.div
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.4 }}
className="bg-white shadow-xl rounded-2xl p-10 max-w-lg text-center"
>
<motion.div
initial={{ rotate: -10 }}
animate={{ rotate: 0 }}
transition={{ duration: 0.3 }}
className="flex justify-center mb-6"
>
<AlertTriangle size={80} className="text-red-500" />
</motion.div>


<h1 className="text-5xl font-bold mb-2 text-gray-800">{status}</h1>
<p className="text-gray-600 text-lg mb-4">{message}</p>


<div className="flex flex-col gap-3 mt-6">
<Link
to="/"
className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
>
Go Home
</Link>


<button
onClick={() => window.location.reload()}
className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 flex items-center gap-2 justify-center transition-all"
>
<RefreshCcw size={18} /> Retry
</button>
</div>
</motion.div>
</div>
);
}