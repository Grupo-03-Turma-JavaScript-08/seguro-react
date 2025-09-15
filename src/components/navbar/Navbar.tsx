import { HiMenu, HiUserCircle } from 'react-icons/hi';
import Sidebar from './Sidebar';
import { useState } from 'react';
import '../../App.css';
import logo from '../../assets/img/logo.png';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="pt-[20px] px-[10%]">
            <div className="fixed top-0 left-0 w-full z-50">
                <nav className="w-full h-28 bg-[#f0f3f8] flex items-center">
                    <div className="w-10/12 mx-auto flex items-center justify-between">

                        {/* Logo + Links juntos */}
                        <div className="flex items-center gap-10">
                            <Link to="/" className="flex-shrink-0">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="h-20 w-auto object-contain"
                                />
                            </Link>

                            <div className="hidden md:flex items-center space-x-6 font-['DM_Sans'] text-[18px]">
                                <NavLink
                                    to="/quemsomos"
                                    className={({ isActive }) =>
                                        `w-40 text-center px-5 py-2 rounded-xl shadow-[4px_4px_8px_#bec3cf,-4px_-4px_8px_#ffffff] transition-colors duration-300 ${
                                            isActive
                                                ? 'text-[#1D7B61]'
                                                : 'text-[#072B28] hover:text-[#1D7B61]'
                                        }`
                                    }
                                >
                                    Quem somos
                                </NavLink>

                                <NavLink
                                    to="/paravoce"
                                    className={({ isActive }) =>
                                        `w-40 text-center px-5 py-2 rounded-xl shadow-[4px_4px_8px_#bec3cf,-4px_-4px_8px_#ffffff] transition-colors duration-300 ${
                                            isActive
                                                ? 'text-[#1D7B61]'
                                                : 'text-[#072B28] hover:text-[#1D7B61]'
                                        }`
                                    }
                                >
                                    Para você
                                </NavLink>

                                <NavLink
                                    to="/parceiro"
                                    className={({ isActive }) =>
                                        `w-40 text-center px-5 py-2 rounded-xl shadow-[4px_4px_8px_#bec3cf,-4px_-4px_8px_#ffffff] transition-colors duration-300 ${
                                            isActive
                                                ? 'text-[#1D7B61]'
                                                : 'text-[#072B28] hover:text-[#1D7B61]'
                                        }`
                                    }
                                >
                                    Seja parceiro
                                </NavLink>

                                <NavLink
                                    to="/planos"
                                    className={({ isActive }) =>
                                        `w-40 text-center px-5 py-2 rounded-xl shadow-[4px_4px_8px_#bec3cf,-4px_-4px_8px_#ffffff] transition-colors duration-300 ${
                                            isActive
                                                ? 'text-[#1D7B61]'
                                                : 'text-[#072B28] hover:text-[#1D7B61]'
                                        }`
                                    }
                                >
                                    Planos
                                </NavLink>
                            </div>
                        </div>

                        {/* Botão hambúrguer isolado na direita */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#FB7813] hover:bg-[#e66a0d] text-white shadow-md hover:shadow-lg transition duration-300"
                        >
                            <HiMenu className="h-6 w-6 text-white" />
                            <HiUserCircle className="h-6 w-6 text-white" />
                        </button>
                    </div>
                </nav>

                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>
        </div>
    );
};

export default Navbar;
