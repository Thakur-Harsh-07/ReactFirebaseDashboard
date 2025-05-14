import { useState } from "react";
import api from "../Services/api";
import toast from "react-hot-toast";

function StudentForm({ onAdded }) {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    course: "" 
  });

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!formData.name || !formData.email.includes("@") || !formData.course) {
      return alert("Invalid input");
    }

    try {
      // Fetch data
      const response = await api.get("/students");
      const students = response.data;
      

      // Check for already existing  email
      const emailExists = students.some(student => student.email === formData.email);
      if (emailExists) {
        return alert("Student with this email already exists.");
      }

      // Add new student
      const res = await api.post("/students", formData);
      onAdded(res.data);
      toast.success("Student added successfully!");
      // Clear form
      setFormData({ name: "", email: "", course: "" });
    

    } catch (err) {
      console.error("Failed to submit:", err);
      alert("An error occurred. Please try again.");
    }
 };


  return (
    <form onSubmit={handleSubmit} className="space-y-2 h-fit w-fit">
       <label htmlFor="name" className="text-white-300 text-lg">Name</label>
      <input name="name" 
      placeholder="Enter Name" 
      value={formData.name} 
      onChange={handleChange} 
      className="border p-2 w-full bg-transparent" 
      />
       <label htmlFor="email" className="text-white-300text-lg">Email</label>
      <input name="email" 
      placeholder="Enter Email" 
      value={formData.email} 
      onChange={handleChange} 
      className="border p-2 w-full bg-transparent" />

      <label htmlFor="course" className="text-white-300 text-lg">Course</label>

      <input name="course" 
      placeholder="Enter Course" 
      value={formData.course} 
      onChange={handleChange} 
      className="border p-2 w-full bg-transparent" />
      <button type="submit" 
      className="bg-yellow-300 text-black px-4 py-2 hover:bg-yellow-400">Add Student</button>
    </form>
  );
}

export default StudentForm;