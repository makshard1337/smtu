'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-white font-semibold' : 'text-blue-100 hover:text-white';
  };

  return (
    <header className="fixed w-full bg-blue-500 shadow-lg z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Image
              src="/icon.ico"
              alt="ГМТУ Логотип"
              width={48}
              height={48}
              className="rotate-[15deg]"
            />
          </div>
          
          <div className="flex items-center space-x-8">
            <Link href="/" className={isActive('/')}>
              Главная
            </Link>
            <Link href="/events" className={isActive('/events')}>
              Мероприятия
            </Link>
            <Link href="/about" className={isActive('/about')}>
              О Совете
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
