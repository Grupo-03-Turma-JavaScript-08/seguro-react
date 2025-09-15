import { HiMenu, HiUserCircle } from 'react-icons/hi';
import Sidebar from './Sidebar';
import { useState } from 'react';
import '../../App.css';
import logo from '../../assets/img/logo.png';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <nav className="w-full h-28 bg-[#f0f3f8] flex items-center justify-center shadow-md">
                <div className="w-10/12 mx-auto flex items-center justify-between">
                    {/* Logo + Links juntos */}
                    <div className="flex items-center gap-0">
                        <Link to="/" className="flex-shrink-0">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-20 w-auto object-contain"
                            />
                        </Link>

                        <div className="hidden md:flex items-center space-x-0 font-['DM_Sans'] text-[18px]">
                            <NavLink
                                to="/quemsomos"
                                className={({ isActive }) =>
                                    `text-center px-5 py-2 rounded-xl transition-colors duration-300 ${
                                        isActive
                                            ? 'text-[#1D7B61] font-semibold'
                                            : 'text-[#072B28] hover:text-[#1D7B61]'
                                    }`
                                }
                            >
                                <strong>QUEM SOMOS</strong>
                            </NavLink>

                            <NavLink
                                to="/paravoce"
                                className={({ isActive }) =>
                                    `text-center px-5 py-2 rounded-xl transition-colors duration-300 ${
                                        isActive
                                            ? 'text-[#1D7B61] font-semibold'
                                            : 'text-[#072B28] hover:text-[#1D7B61]'
                                    }`
                                }
                            >
                                <strong>PARA VOCÊ</strong>
                            </NavLink>

                            <NavLink
                                to="/parceiro"
                                className={({ isActive }) =>
                                    `text-center px-5 py-2 rounded-xl transition-colors duration-300 ${
                                        isActive
                                            ? 'text-[#1D7B61] font-semibold'
                                            : 'text-[#072B28] hover:text-[#1D7B61]'
                                    }`
                                }
                            >
                                <strong>SEJA PARCEIRO</strong>
                            </NavLink>

                            <NavLink
                                to="/planos"
                                className={({ isActive }) =>
                                    `text-center px-5 py-2 rounded-xl transition-colors duration-300 ${
                                        isActive
                                            ? 'text-[#1D7B61] font-semibold'
                                            : 'text-[#072B28] hover:text-[#1D7B61]'
                                    }`
                                }
                            >
                                <strong>PLANOS</strong>
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
    );
};

export default Navbar;
