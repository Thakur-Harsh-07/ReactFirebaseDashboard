import { useEffect, useState } from "react";
import api from "../Services/api";
import StudentList from "../Components/StudentList";
import StudentForm from "../Components/StudentForm";
import { auth } from "../Services/firebase";
import { FaSignOutAlt, FaSearch, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Dashboard({ user, signOut }) {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStudents = async () => {
    setIsLoading(true);
    try{
      const res = await api.get("/students");
      setStudents(res.data);
    }
    catch(error){
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = (student) => {
    setStudents((prev) => {
      return [...prev, student];
    });
    
    setShowForm(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
  <motion.div className="min-h-screen w-full"
    initial={{ opacity: 0, y: 60, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
    duration: 0.8,
    delay: 0.4,
    type: "spring",
    stiffness: 60,
    damping: 12
    }}>
      {/* Header */}
      <header className="w-full shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center items-center gap-9">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-b from-teal-500 via-blue-400 to-red-500 text-transparent bg-clip-text border-b">Welcome, {user.displayName}</h2>
            </div>
            <button 
              onClick={handleSignOut} 
              className="flex items-center bg-yellow-300 space-x-2 text-black hover:bg-yellow-400 transition-colors duration-200 px-4 py-2 rounded-lg"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="relative mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-white" />
            </div>
            <input
              className="bg-transparent block w-full pl-10 pr-3 py-2 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Filter by course..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Form and list*/}
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-4xl rounded-lg shadow-sm p-6 border border-blue-400 hover:shadow-blue-400 transition-shadow duration-200 hover:shadow-xl">
            <h3 className="text-lg font-bold text-blue-500 mb-4 text-center">Students List</h3>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-blue-500">Loading students...</span>
              </div>
            ) : (
              <StudentList students={students} filter={filter} />
            )}
          </div>
          {showForm ? (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl rounded-lg shadow-sm p-6 border border-blue-400 hover:shadow-blue-400 transition-shadow duration-200 hover:shadow-xl"
            >
              <h3 className="text-lg font-bold text-blue-500 mb-4">Add New Student</h3>
              <StudentForm onAdded={handleAdd} />
            </motion.div>
          ) : (
            <button 
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-yellow-300 text-black hover:bg-yellow-400 transition-colors duration-200 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg"
            >
              <FaPlus />
              <span>Add New Student</span>
            </button>
          )}
          
          
        </div>
      </main>
    </motion.div>
  );
}

export default Dashboard;