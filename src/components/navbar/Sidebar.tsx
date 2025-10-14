import { useContext, useEffect, useRef } from 'react';
import { HiOutlineX, HiOutlineLogout, HiOutlineLocationMarker } from 'react-icons/hi';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastAlerta } from '../../utils/ToastAlerta';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  isPinned: boolean;
  onTogglePin: (pinned: boolean) => void;
};

const Sidebar = ({ isOpen, onClose, isPinned, onTogglePin }: SidebarProps) => {
  const { usuario, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const isAuthenticated = usuario.token !== '';

  console.log(isAuthenticated)
  function closeSidebar() {
    if (isPinned) {
      onTogglePin(false);
    }
    onClose();
  }

  function handleNavItemClick() {
    if (!isPinned) {
      onClose();
    }
  }

  function logout() {
    handleLogout();
    ToastAlerta('Usuário desconectado com sucesso!', 'info');
    closeSidebar();
    setTimeout(() => {
      navigate('/login');
    }, 100);
  }

  useEffect(() => {
    if (!isOpen || isPinned) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isPinned, onClose]);

  return (
    <>
      {isOpen && !isPinned && (
        <div
          className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[1px]"
          onClick={isPinned ? undefined : onClose}
        />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-[70] ${
          isOpen || isPinned ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-[#072B28]">Menu</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onTogglePin(!isPinned)}
            className="hidden md:inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-[#1D7B61] transition"
          >
            <HiOutlineLocationMarker
              className={`h-5 w-5 ${isPinned ? 'text-[#1D7B61]' : 'text-gray-600'}`}
            />
          </button>
          <button onClick={closeSidebar}>
          <HiOutlineX className="h-6 w-6 text-gray-600 hover:text-[#1D7B61]" />
          </button>
        </div>
      </div>

      {/* Botão de Login - só aparece se NÃO estiver logado */}
      <div className="p-4 border-b border-gray-200" hidden={isAuthenticated}>
        <Link
          to="/login"
          className="block w-full text-center px-5 py-3 rounded-lg bg-[#FB7813] text-white font-medium shadow-md hover:bg-[#e66a0d] transition"
          onClick={handleNavItemClick}
        >
          Login
        </Link>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col p-4 space-y-3 font-['DM_Sans'] text-[18px]">
        {/* Link para o perfil - só aparece se ESTIVER logado */}
        <NavLink
          to="/perfil"
          onClick={handleNavItemClick}
          hidden={!isAuthenticated}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition-colors duration-300 ${
              isActive
                ? 'text-[#1D7B61] font-semibold'
                : 'text-gray-700 hover:text-[#1D7B61]'
            }`
          }
        >
          Perfil do usuário
        </NavLink>

        {/* Link para admin - só se for admin */}
        <NavLink
          to="/admin"
          onClick={handleNavItemClick}
          hidden={usuario.tipo !== 'ADMIN'}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition-colors duration-300 ${
              isActive
                ? 'text-[#1D7B61] font-semibold'
                : 'text-gray-700 hover:text-[#1D7B61]'
            }`
          }
        >
          Área Administrativa
        </NavLink>

        {/* Link para "Seja parceiro" - só aparece se NÃO estiver logado */}
        <NavLink
          to="/parceiro"
          onClick={handleNavItemClick}
          hidden={isAuthenticated}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition-colors duration-300 ${
              isActive
                ? 'text-[#1D7B61] font-semibold'
                : 'text-gray-700 hover:text-[#1D7B61]'
            }`
          }
        >
          Seja parceiro
        </NavLink>

        {/* Contatos - só aparece se NÃO estiver logado */}
        <NavLink
          to="/seguros"
          onClick={handleNavItemClick}
          hidden={isAuthenticated}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition-colors duration-300 ${
              isActive
                ? 'text-[#1D7B61] font-semibold'
                : 'text-gray-700 hover:text-[#1D7B61]'
            }`
          }
        >
          Contatos
        </NavLink>

        {/* Botão de logout - só aparece se ESTIVER logado */}
        <NavLink
          to="/"
          onClick={logout}
          hidden={!isAuthenticated}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition-colors duration-300 ${
              isActive
                ? "flex items-center gap-2 text-[#E15A1A] hover:text-red-600 transition pt-4 border-t border-gray-200 cursor-pointer"
                : 'flex items-center gap-2 text-[#E15A1A] hover:text-red-600 transition pt-4 border-t border-gray-200 cursor-pointer'
            }`
          }
        >
          <HiOutlineLogout className="h-5 w-5" />
          Sair
        </NavLink>
      </nav>
      </div>
    </>
  );
};

export default Sidebar;
