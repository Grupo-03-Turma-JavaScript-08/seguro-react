import { HiOutlineX, HiOutlineLogout } from 'react-icons/hi';
import { NavLink, Link } from 'react-router-dom';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-[#072B28]">Menu</h2>
        <button onClick={onClose}>
          <HiOutlineX className="h-6 w-6 text-gray-600 hover:text-[#1D7B61]" />
        </button>
      </div>

      {/* Botão de Login */}
      <div className="p-4 border-b border-gray-200">
        <Link
          to="/login"
          className="block w-full text-center px-5 py-3 rounded-lg bg-[#FB7813] text-white font-medium shadow-md hover:bg-[#e66a0d] transition"
          onClick={onClose}
        >
          Login
        </Link>
      </div>

      {/* Links simples em lista */}
      <nav className="flex flex-col p-4 space-y-3 font-['DM_Sans'] text-[18px]">
        <NavLink
          to="/perfil"
          onClick={onClose}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition-colors duration-300 ${isActive ? 'text-[#1D7B61] font-semibold' : 'text-gray-700 hover:text-[#1D7B61]'
            }`
          }
        >
          Perfil do usuário
        </NavLink>

        <NavLink
          to="/admin"
          onClick={onClose}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition-colors duration-300 ${isActive ? 'text-[#1D7B61] font-semibold' : 'text-gray-700 hover:text-[#1D7B61]'
            }`
          }
        >
          Administrador
        </NavLink>

        <a
          href="#quemsomos"
          onClick={onClose}
          className="px-3 py-2 rounded-md transition-colors duration-300 text-gray-700 hover:text-[#1D7B61]"
        >
          Quem somos
        </a>


        <NavLink
          to="/parceiro"
          onClick={onClose}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition-colors duration-300 ${isActive ? 'text-[#1D7B61] font-semibold' : 'text-gray-700 hover:text-[#1D7B61]'
            }`
          }
        >
          Seja parceiro
        </NavLink>

        <NavLink
          to="/planos"
          onClick={onClose}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition-colors duration-300 ${isActive ? 'text-[#1D7B61] font-semibold' : 'text-gray-700 hover:text-[#1D7B61]'
            }`
          }
        >
          Contatos
        </NavLink>

        {/* Botão de logout */}
        <Link
          to="/login"
          onClick={onClose}
          className="flex items-center gap-2 text-[#E15A1A] hover:text-red-600 transition pt-4 border-t border-gray-200"
        >
          <HiOutlineLogout className="h-5 w-5" />
          Sair
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
