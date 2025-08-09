import styles from '../../constants/nav/nav.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../../constants/nav/';
import { AuthButton } from '../../ui/AuthButton';
import { Spinner } from '../../ui/Spiner';
import { useAuth } from '../AuthContext';

export const Nav = () => {
  const location = useLocation();
  const { user, loading, error } = useAuth();

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  return (
    <nav className="h-full flex flex-col">
      {navLinks
        .filter((link) => {
          // Показываем все ссылки для авторизованных пользователей
          if (user) return true;
          // Для неавторизованных скрываем Profile и Messages
          return link.label !== 'Profile' && link.label !== 'Messages';
        })
        .map((link) => {
          const isActive = link.href === '/' ? location.pathname === '/' : location.pathname.startsWith(link.href);

          return (
            <Link key={link.href} to={link.href} className="w-fit" aria-current={isActive ? 'page' : undefined}>
              <div
                className={`
                  h-[50px] flex items-center gap-[16px] p-[20px] rounded-full transition-colors
                  ${isActive ? styles.active : 'hover:bg-gray-200'}
                `}
              >
                {link.svg}
                <span className="text-2xl text-gray-400">{link.label}</span>
              </div>
            </Link>
          );
        })}

      <AuthButton />
    </nav>
  );
};
