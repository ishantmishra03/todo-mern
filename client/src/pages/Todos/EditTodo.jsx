import React, { useState, useEffect } from "react";
import {
  Calendar,
  Flag,
  CheckCircle,
  FileText,
  Type,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTodo() {
  const { axios } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isCompleted: false,
    dueDate: "",
    priority: "medium",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch existing todo
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const { data } = await axios.post("/api/todo/getOne", { id });
        if (data.success) {
          setFormData(data.todo);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/todo/edit", { ...formData, todoId : id });
      if (data.success) {
        toast.success(data.message);
        navigate("/todos");
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-200/30 to-slate-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-slate-200/30 to-orange-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-orange-100/20 to-slate-100/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-6 relative">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-slate-700 to-orange-600 bg-clip-text text-transparent mb-2">
            Edit Todo
          </h1>
        </div>

        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100/50 p-6">
            {/* Title */}
            <div className="relative mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Type className="w-4 h-4 text-orange-500 inline-block mr-1" /> Title <span className="text-red-500">*</span>
              </label>
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
                placeholder="Enter title..."
              />
            </div>

            {/* Description */}
            <div className="relative mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <FileText className="w-4 h-4 text-orange-500 inline-block mr-1" /> Description
              </label>
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
                placeholder="Update your description..."
              />
            </div>

            {/* Due Date */}
            <div className="relative mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Calendar className="w-4 h-4 text-orange-500 inline-block mr-1" /> Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate?.split("T")[0] || ""}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("dueDate")}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                  focusedField === "dueDate"
                    ? "border-orange-400 shadow-lg shadow-orange-100 bg-white/80"
                    : "border-slate-200 hover:border-orange-300"
                }`}
              />
            </div>

            {/* Priority */}
            <div className="relative mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                <Flag className="w-4 h-4 text-orange-500 inline-block mr-1" /> Priority
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["low", "medium", "high"].map((priority) => (
                  <label key={priority} className="relative cursor-pointer">
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
                      <Flag className="w-5 h-5 mx-auto mb-2" />
                      <span className="capitalize">{priority}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group text-sm cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>{loading ? "Updating..." : "Update Todo"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
