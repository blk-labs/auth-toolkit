import React from 'react';
import { SidebarLayout } from './SidebarLayout';
import { Container } from './Container';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const NavRoutes = [
  { to: '/', label: 'Dashboard' },
  { to: '/admin', label: 'Admin' },
];


export default function AppLayout({ children }: AppLayoutProps) {

  return (
    <SidebarLayout
      sidebar={
        <div className="p-6 space-y-4">
          <figure className="w-full border-b gap-2 p-3 border-b-gray justify-start!  flex-center">
            <img src="/favicon-32x32.png" alt="logo" />
            <p className="font-bold text-white">AuthToolKit</p>
          </figure>
          <nav className="w-full h-full  mt-5 flex flex-col gap-3">
            {NavRoutes.map((route) => (
              <NavLink
                key={route.to}
                to={route.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {route.label}
              </NavLink>
            ))}

            <button  className="p-3 text-danger bg-red-700/10 rounded-md hover:bg-red-700/30 font-semibold text-left flex-center justify-start! gap-2 cursor-pointer mt-auto">
              <Icon icon={'mdi:logout'} fontSize={21} /> Logout
            </button>
          </nav>
        </div>
      }
    >
      <Container>{children}</Container>
    </SidebarLayout>
  );
}
