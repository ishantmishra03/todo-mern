import { NavLink } from "react-router-dom";
// React Icons
import { SiTodoist } from "react-icons/si";
import { MdAddCircleOutline } from "react-icons/md";

const navItems = [
  { name: "Todos", to: "/todos", icon: <SiTodoist /> },
  { name: "Add Todo", to: "/todos/add-todo", icon: <MdAddCircleOutline /> },
];

const Sidebar = () => {
  return (
    <div>
      <div className="flex flex-col border-r border-slate-200 bg-slate-50/30 min-h-full pt-20 md:pt-19">
        {navItems.map(({ name, to, icon }) => (
          <NavLink
            key={name}
            to={to}
            end
            title={name}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 transition-colors duration-200 cursor-pointer 
    ${
      isActive
        ? "bg-orange-100 border-r-4 border-orange-500 text-orange-700 font-semibold"
        : "hover:bg-orange-50 text-slate-700 hover:text-orange-600"
    }`
            }
          >
            <div className="text-xl text-orange-500">{icon}</div>
            <p className="hidden md:block">{name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
