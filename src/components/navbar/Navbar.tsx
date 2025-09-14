import { HiMenu, HiUserCircle } from 'react-icons/hi'; // ← corrigido
import Sidebar from './Sidebar';
import { useState } from 'react';
import '../../App.css'
import logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-[10%] py-4 bg-white shadow-md">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-[85px] w-auto object-contain"
          />
        </Link>

        {/* Navegação Central */}
        <nav className="hidden md:flex space-x-6 font-[300] text-[20px] font-['DM_Sans']">
          <a href="#" className="text-[#0D572D] hover:text-green-800">
            Quem somos
          </a>
          <Link to="/paravoce" className="text-[#0D572D] hover:text-green-800">
            Para você
          </Link>
          <Link to="/parceiro" className="text-[#0D572D] hover:text-green-800">
            Seja parceiro
          </Link>
          <Link to="/planos" className="text-[#0D572D] hover:text-green-800">
            Planos
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-3 px-5 py-2 rounded-lg bg-[#FB7813] hover:bg-[#e66a0d] text-white shadow-md hover:shadow-lg transition duration-300"
          >
            <HiMenu className="h-6 w-6 text-white" />
            <HiUserCircle className="h-6 w-6 text-white" />
          </button>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
