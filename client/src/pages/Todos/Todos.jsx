import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

export default function Todos() {
  const { axios, navigate } = useAppContext();

  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const { data } = await axios.get("/api/todo/get");
      if (data.success) {
        setTodos(data.todos);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Toggle isCompleted
  const toggleTodo = async (todoId) => {
    try {
      const { data } = await axios.post("/api/todo/toggle-isCompleted", {
        todoId,
      });
      if (data.success) {
        toast.success(data.message);
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === todoId
              ? { ...todo, isCompleted: !todo.isCompleted }
              : todo
          )
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Apply search and filter
  const filteredTodos = todos
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
    .filter((todo) => {
      if (filter === "active") return !todo.isCompleted;
      if (filter === "completed") return todo.isCompleted;
      return true;
    });

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      {/* Header & Search Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">My Tasks</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:items-center sm:justify-end">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full sm:w-64 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-2">
            {["all", "active", "completed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-md text-sm font-medium border cursor-pointer ${
                  filter === type
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-300"
                } hover:bg-orange-100 transition`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Sections */}
      {["high", "medium", "low"].map((level) => {
        const priorityTodos = filteredTodos.filter(
          (todo) => todo.priority.toLowerCase() === level
        );

        return (
          <div key={level} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 capitalize text-slate-800">
              {level} Priority
            </h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {priorityTodos.map((todo) => (
                <div
                  key={todo._id}
                  className="relative bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col justify-between cursor-pointer"
                >
                  <div className="absolute top-0 left-0 h-1 w-full bg-orange-400 rounded-t-md" />

                  {/* Title & Checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleTodo(todo._id);
                      }}
                      className="mt-1 h-5 w-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                    />
                    <span
                      onClick={() => navigate(`/todos/${todo._id}`)}
                      className={`text-lg font-medium ${
                        todo.isCompleted
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>

                  {/* Due Date & Overdue */}
                  <div className="mt-6 text-sm text-gray-500 space-y-1">
                    <div>
                      <span className="font-medium text-gray-600">Due:</span>{" "}
                      {new Date(todo.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    {!todo.isCompleted &&
                      new Date(todo.dueDate) < new Date() && (
                        <div className="text-xs text-red-600 bg-red-50 border border-red-300 px-2 py-1 rounded">
                          ⚠️ Overdue
                        </div>
                      )}
                  </div>
                </div>
              ))}

              {priorityTodos.length === 0 && (
                <p className="text-gray-500 col-span-full text-center">
                  No {level} priority tasks found.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
