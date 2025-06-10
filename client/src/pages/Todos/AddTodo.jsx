import React, { useState } from "react";
import {
  Calendar,
  Flag,
  User,
  CheckCircle,
  FileText,
  Type,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

export default function TodoForm() {
  const { axios } = useAppContext();
  //All Fields of todo in formData
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isCompleted: false,
    dueDate: "",
    priority: "medium",
  });

  //For Input field design
  const [focusedField, setFocusedField] = useState(null);
  //Loaidng state to add Todo
  const [loading, setLoading] = useState(false);

  //Handle Input Chnage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Add Todo API call
    try {
      setLoading(true);
      const { data } = await axios.post('/api/todo/add', formData);
      if(data.success){
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const priorityColors = {
    low: "from-green-100 to-emerald-50 border-green-200 text-green-700",
    medium: "from-orange-100 to-amber-50 border-orange-200 text-orange-700",
    high: "from-red-100 to-rose-50 border-red-200 text-red-700",
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-slate-50 to-orange-100 p-6 relative overflow-hidden min-h-full w-full">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-200/30 to-slate-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-slate-200/30 to-orange-200/30 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-orange-100/20 to-slate-100/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6 relative">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-slate-700 to-orange-600 bg-clip-text text-transparent mb-2">
            Create New Todo
          </h1>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100/50 p-6 transform hover:shadow-xl transition-all duration-300">
            {/* Title Field */}
            <div className="relative mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2  items-center space-x-2">
                <Type className="w-4 h-4 text-orange-500" />
                <span>Title</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("title")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                    focusedField === "title"
                      ? "border-orange-400 shadow-lg shadow-orange-100 bg-white/80"
                      : "border-slate-200 hover:border-orange-300"
                  }`}
                  placeholder="Enter your todo title..."
                />
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-slate-400 transition-all duration-300 ${
                    focusedField === "title" ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
            </div>

            {/* Description Field */}
            <div className="relative mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2  items-center space-x-2">
                <FileText className="w-4 h-4 text-orange-500" />
                <span>Description</span>
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("description")}
                  onBlur={() => setFocusedField(null)}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none ${
                    focusedField === "description"
                      ? "border-orange-400 shadow-lg shadow-orange-100 bg-white/80"
                      : "border-slate-200 hover:border-orange-300"
                  }`}
                  placeholder="Describe your todo in detail..."
                />
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-slate-400 transition-all duration-300 ${
                    focusedField === "description" ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
            </div>

            {/* Due Date Field */}
            <div className="relative mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2  items-center space-x-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>Due Date</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("dueDate")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                    focusedField === "dueDate"
                      ? "border-orange-400 shadow-lg shadow-orange-100 bg-white/80"
                      : "border-slate-200 hover:border-orange-300"
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-slate-400 transition-all duration-300 ${
                    focusedField === "dueDate" ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
            </div>

            {/* Priority Field */}
            <div className="relative mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3  items-center space-x-2">
                <Flag className="w-4 h-4 text-orange-500" />
                <span>Priority</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["low", "medium", "high"].map((priority) => (
                  <label key={priority} className={`relative cursor-pointer`}>
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={formData.priority === priority}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 rounded-xl border-2 text-center font-medium transition-all duration-300 transform hover:scale-105 ${
                        formData.priority === priority
                          ? `bg-gradient-to-br ${priorityColors[priority]} shadow-lg scale-105`
                          : "bg-white/50 border-slate-200 text-slate-600 hover:border-orange-300"
                      }`}
                    >
                      <Flag
                        className={`w-5 h-5 mx-auto mb-2 ${
                          formData.priority === priority ? "" : "text-slate-400"
                        }`}
                      />
                      <span className="capitalize">{priority}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group text-sm cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>{loading ? "Creating..." : "Create Todo"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
