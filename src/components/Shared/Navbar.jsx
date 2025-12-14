import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { Sun, Moon } from "lucide-react";

import { AuthContext } from "../../providers/AuthContext";
import toast from "react-hot-toast";
import Container from "./Container";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const { user, setUser, logOut } = useContext(AuthContext);
  // console.log(user);

  const handleSignout = () => {
    // signOut(auth)
    logOut()
      .then(() => {
        toast.success("Sign out succesfully");
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
  };

  return (
    <Container>
      <div className="navbar bg-base-100 shadow-sm sticky top-0 left-0 w-full z-50  ">
        <div className="navbar-start">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center">
            <img
              src="https://thumbs.dreamstime.com/b/contest-icon-online-learning-perfect-application-web-logo-presentation-template-design-line-style-173518731.jpg"
              alt="Logo"
              className="w-10 h-10 object-cover rounded-full"
            />
            <span className="text-xl font-bold">Contest Hub</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contests"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : ""
                }
              >
                All Contests
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/extra-section"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : ""
                }
              >
                Extra Section
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-2">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* Conditional Auth Buttons */}
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline btn-primary btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User" referrerPolicy="no-referrer" src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <span className="font-semibold">{user?.displayName}</span>
                </li>
                <li>
                  <Link className="font-bold hover:text-green-400" to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleSignout}
                    className="btn btn-error btn-sm mt-2"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            ☰
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 right-0"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-contests">All Contests</NavLink>
            </li>
            <li>
              <NavLink to="/extra-section">Extra Section</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
