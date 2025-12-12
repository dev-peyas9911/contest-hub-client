import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import Container from "../components/Shared/Container";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "My Participated Contests", path: "/dashboard/participated" },
    { label: "My Winning Contests", path: "/dashboard/winnings" },
    { label: "My Profile", path: "/dashboard/profile" },
    { label: "Add Contest Page", path: "/dashboard/add-contest" },
    { label: "My Created Contests Page", path: "/dashboard/created-contests" },
    { label: "Submitted Tasks Page", path: "/dashboard/submitted-tasks" },
    { label: "Edit Contest Page", path: "/dashboard/edit-contest" },
    { label: "Manage Users", path: "/dashboard/manage-users" },
    { label: "Manage Contests", path: "/dashboard/manage-contests" },
  ];

  return (
    <Container>
      <div className="flex h-screen bg-base-200">
        {/* Sidebar */}
        <div
          className={`fixed z-50 top-14 lg:top-0 left-0 h-full w-64 bg-base-100 shadow-xl transform transition-transform duration-300 p-4 flex flex-col gap-4 ${
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold mb-4 text-primary hover:text-primary-focus"
          >
            ContestHub
          </Link>

          {/* Navigation */}
          <ul className="menu p-0 text-base">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 block ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-base-300 hover:text-black"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile toggle button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 btn btn-square btn-ghost"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-6 w-full overflow-y-auto mt-10 lg:mt-0">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}
