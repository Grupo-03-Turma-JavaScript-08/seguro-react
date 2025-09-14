import { HiOutlineX, HiOutlineLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={onClose}>
          <HiOutlineX className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Botão de Login no topo do menu */}
      <div className="p-4 border-b">
        <Link
          to="/login"
          className="block w-full text-center px-4 py-2 bg-[#FB7813] text-white rounded hover:bg-0range-100 transition"
          onClick={onClose}
        >
          Login
        </Link>
      </div>

      <nav className="flex flex-col p-4 space-y-4 font-[300] text-[20px] font-['DM_Sans']">
        <a href="#" className="text-[#000000] hover:text-green-800">
          Quem somos
        </a>
        <Link to="/perfil" className="text-[#000000] hover:text-green-800">
          Perfil do usuario
        </Link>
        <Link to="/Administrador" className="text-[#000000] hover:text-green-800">
          Administrador
        </Link>
        <Link to="/paravoce" className="text-[#0D572D] hover:text-green-800">
          Para você
        </Link>
        <Link to="/parceiro" className="text-[#000000] hover:text-green-800">
          Seja parceiro
        </Link>
        <Link to="/planos" className="text-[#000000] hover:text-green-800">
          Planos
        </Link>

        {/* Botão de logout */}
        <Link
          to="/login"
          className="flex items-center gap-2 text-[#E15A1A] hover:text-red-600 transition pt-4 border-t"
          onClick={onClose}
        >
          <HiOutlineLogout className="h-5 w-5" />
          Sair
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
