import React from 'react';
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

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Truck className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">LogiPlan Pro</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Estado del Sistema</p>
          <div className="flex items-center space-x-2 text-sm text-green-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>API Conectada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;