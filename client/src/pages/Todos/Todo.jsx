import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
// Loader
import Loader from "../../components/Loader/Loader";

export default function Todo() {
  const { id } = useParams();
  const { axios, navigate } = useAppContext();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get todo related with id
  const getTodo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/todo/getOne", { id });
      if (data.success) {
        setTodo(data.todo);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTodo();
  }, [id]);

  // Update todo field (isCompleted or priority)
  const updateTodoField = async (field, value) => {
    try {
      setTodo((prev) => ({ ...prev, [field]: value })); 
      const { data } = await axios.post("/api/todo/change-priority", {
        newPriority : value, todoId: todo._id
      });
      if (!data.success) {
        toast.error(data.message);
        getTodo();
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      getTodo();
    }
  };

  //Priority Tag Colors
  const priorityColors = {
    low: "text-green-700 bg-green-100",
    medium: "text-yellow-700 bg-yellow-100",
    high: "text-red-700 bg-red-100",
  };

  // Toggle todo isCompleted
  const toggleTodo = async (todoId) => {
    try {
      const { data } = await axios.post("/api/todo/toggle-isCompleted", {
        todoId,
      });
      if (data.success) {
        toast.success(data.message);

        // Optimistic update
        setTodo((prev) => ({
          ...prev,
          isCompleted: !prev.isCompleted,
        }));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Delete Todo
  const deleteTodo = async (todoId) => {
    const confirmDelete = confirm("Do you want to delete ?");
    if (!confirmDelete) return;
    try {
      const { data } = await axios.post("/api/todo/delete", { todoId });
      if (data.success) {
        toast.success(data.message);
        navigate("/todos");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading || !todo) return <Loader />;

  return (
    <main className="min-h-screen w-full bg-slate-50 p-10 flex flex-col max-w-4xl mx-auto">
      {/* Title */}
      <section className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
          {todo.title}
        </h1>
        <div
          className={`inline-block px-4 py-1 rounded-full font-semibold ${
            priorityColors[todo.priority.toLowerCase()] ||
            "bg-gray-100 text-gray-700"
          }`}
        >
          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}{" "}
          Priority
        </div>
      </section>

      {/* Description */}
      <section className="mb-10">
        <label
          htmlFor="description"
          className="block mb-2 text-slate-700 font-semibold text-lg"
        >
          Description
        </label>
        <textarea
          id="description"
          readOnly
          value={todo.description}
          rows={6}
          className="w-full p-4 rounded-lg border border-slate-300 resize-none text-slate-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </section>

      {/* isCompleted Checkbox & Priority Dropdown & Due Date */}
      <section className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-10 gap-6">
        <label className="flex items-center gap-3 text-lg font-semibold text-slate-800 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => {
              toggleTodo(todo._id);
            }}
            className="h-6 w-6 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
          />
          {todo.isCompleted ? "Completed" : "Pending"}
        </label>

        <div className="flex items-center gap-3 text-lg text-slate-700 font-medium">
          <label htmlFor="priority" className="font-semibold select-none">
            Priority:
          </label>
          <select
            id="priority"
            value={todo.priority.toLowerCase()}
            onChange={(e) => updateTodoField("priority", e.target.value)}
            className="p-2 rounded border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="text-lg text-slate-700 font-medium whitespace-nowrap">
          Due Date:{" "}
          <time dateTime={todo.dueDate}>
            {new Date(todo.dueDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex gap-6">
        <button
          onClick={() => {}}
          className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-lg shadow-md transition   ${todo.isCompleted ? "bg-gray-500 text-white hover:bg-gray-600 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"}`}
          aria-label="Edit Todo"
          disabled={todo.isCompleted}
        >
          <FaEdit /> Edit
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition cursor-pointer"
          aria-label="Delete Todo"
        >
          <FaTrash /> Delete
        </button>
      </section>
    </main>
  );
}
