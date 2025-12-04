import React, { useState } from 'react';
import { LayoutDashboard, Map, ListTodo, Bot, Truck } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tablero Principal', icon: LayoutDashboard },
    { id: 'plan', label: 'Plan de Ejecución', icon: ListTodo },
    { id: 'regions', label: 'Intel Regional', icon: Map },
    { id: 'assistant', label: 'Asistente IA', icon: Bot },
  ];

  // IMPORTANTE: Reemplaza "/perfil-experto.jpg" con la ruta real de tu foto si es diferente.
  // He añadido un fallback a una imagen de Unsplash por si la imagen local no carga.
  const [imgSrc, setImgSrc] = useState("/perfil-experto.jpg");
  const fallbackUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150";

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 border-b border-slate-800">
        {/* Diseño personalizado: Foto + Marca Personal */}
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-200 blur-[2px]"></div>
            <img 
              src={imgSrc}
              onError={() => setImgSrc(fallbackUrl)}
              alt="Experto Logístico" 
              className="relative w-14 h-14 rounded-full border-2 border-slate-900 object-cover shadow-sm"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full z-10" title="Disponible 24/7"></div>
          </div>
          
          <div className="flex flex-col justify-center">
            <span className="text-lg font-bold tracking-tight leading-none text-white">
              LogiPlan <span className="text-blue-400">Pro</span>
            </span>
            <span className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
              Modo Experto
            </span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">Estado Operativo</p>
          <div className="flex items-center space-x-2 text-xs text-green-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Sistema 24/7 Activo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;