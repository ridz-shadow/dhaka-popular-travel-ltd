import { useState } from "react";

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "master_price", label: "Master Price" },
  { id: "custom_price", label: "Custom Price" },
  { id: "calendar", label: "Calendar" },
  { id: "reports", label: "Reports" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNotificationClick = (event) => {
    event.preventDefault();
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span
            className="material-symbols-outlined text-xl cursor-pointer lg:hidden"
            onClick={toggleMenu}
          >
            menu
          </span>
          <h1 className="text-xl font-semibold ml-2 lg:ml-0">Flight Search</h1>
          <nav className="hidden lg:flex ml-6">
            <ul className="flex space-x-6">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a href="#">{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center">
          <button className="mr-4" onClick={handleNotificationClick}>
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div>
            <img
              src="/images/avatar.jpg"
              alt="Avatar"
              className="rounded-full w-8 h-8 avatar cursor-pointer hover:outline hover:outline-offset-2 hover:outline-2"
            />
          </div>
        </div>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={closeMenu}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white z-50 w-64 p-8 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold">Flight Search</h1>
          <span
            className="material-symbols-outlined text-xl cursor-pointer"
            onClick={closeMenu}
          >
            close
          </span>
        </div>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="mb-4">
                <a href="#" onClick={closeMenu}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
