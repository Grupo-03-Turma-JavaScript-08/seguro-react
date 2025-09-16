import { HiMenu, HiUserCircle } from 'react-icons/hi'; // ← corrigido
import Sidebar from './Sidebar';
import { useState } from 'react';
import '../../App.css'
import logo from '../../assets/img/logo.png'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-[10%] py-4 bg-white shadow-md">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-[85px] w-auto object-contain"
          />
        </NavLink>

        {/* Navegação Central */}
        <div className="hidden md:flex items-center space-x-6 font-[300] text-[20px] font-['DM_Sans']">


          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-[#FB7813] font-semibold'
                : 'text-[#0D572D] hover:text-green-800'
            }
          >
            Home
          </NavLink>
          {/* <div className="hidden md:block w-px h-8 bg-gray-300"></div> */}
          {/* <a href="#quemsomos" className="text-[#0D572D] hover:text-green-800">
            Quem somos
          </a> */}

          <div className="hidden md:block w-px h-8 bg-gray-300"></div>

          <NavLink
            to="/paravoce"
            className={({ isActive }) =>
              isActive
                ? 'text-[#FB7813] font-semibold'
                : 'text-[#0D572D] hover:text-green-800'
            }
          >
            Para você
          </NavLink>

          <div className="hidden md:block w-px h-8 bg-gray-300"></div>

          <NavLink
            to="/parceiro"
            className={({ isActive }) =>
              isActive
                ? 'text-[#FB7813] font-semibold'
                : 'text-[#0D572D] hover:text-green-800'
            }
          >
            Seja parceiro
          </NavLink>

          <div className="hidden md:block w-px h-8 bg-gray-300"></div>

          <NavLink
            to="/planos"
            className={({ isActive }) =>
              isActive
                ? 'text-[#FB7813] font-semibold'
                : 'text-[#0D572D] hover:text-green-800'
            }
          >
            Planos
          </NavLink>
        </div>

        {/* Separador + botão lateral */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-3 px-5 py-2 rounded-lg bg-[#FB7813] hover:bg-[#e66a0d] text-white shadow-md hover:shadow-lg transition duration-300"
          >
            <HiMenu className="h-6 w-6 text-white" />
            <HiUserCircle className="h-6 w-6 text-white" />
          </button>
        </div>

      </nav >

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
