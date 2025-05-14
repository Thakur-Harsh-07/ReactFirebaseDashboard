import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

function Login({ signIn }) {
  return (
    <motion.div className="flex items-center justify-center "
    initial={{ opacity: 0, y: 60, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
    duration: 0.8,
    delay: 0.4,
    type: "spring",
    stiffness: 60,
    damping: 12
    }}>
      <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-400 transition-shadow duration-200  w-full mx-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome to Student Dashboard</h1>
        <p className="text-center mb-8 text-gray-600">Please login to see students details</p>
        <div className="flex flex-col items-center">
          <button 
            onClick={signIn} 
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          >
            <FaGoogle className="text-xl text-blue-500"/>
            <span className="text-lg font-medium">Login with Google</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;