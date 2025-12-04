import React from 'react';
import { CheckCircle2, Circle, TrendingUp, AlertCircle, MapPin } from 'lucide-react';
import { PlanData } from '../types';

interface DashboardProps {
  data: PlanData;
  completedTasks: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ data, completedTasks }) => {
  const totalTasks = data.phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const progress = Math.round((completedTasks.length / totalTasks) * 100);

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Tablero de Control</h1>
        <p className="text-slate-500 mt-2">Visión general del plan de desarrollo de negocios logísticos.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Progreso General</p>
              <h3 className="text-4xl font-bold text-slate-900 mt-2">{progress}%</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Tareas Completadas</p>
              <h3 className="text-4xl font-bold text-slate-900 mt-2">{completedTasks.length} <span className="text-xl text-slate-400 font-normal">/ {totalTasks}</span></h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Mercados Activos</p>
              <h3 className="text-4xl font-bold text-slate-900 mt-2">3</h3>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <MapPin className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            {['CA', 'TX', 'FL'].map(st => (
              <span key={st} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                {st}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Phase Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-lg text-slate-800">Estado por Fases</h3>
          </div>
          <div className="p-6 space-y-6">
            {data.phases.map((phase) => {
              const phaseTaskIds = phase.tasks.map(t => t.id);
              const phaseCompleted = phaseTaskIds.filter(id => completedTasks.includes(id)).length;
              const phaseTotal = phaseTaskIds.length;
              const isDone = phaseCompleted === phaseTotal;

              return (
                <div key={phase.id} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${isDone ? 'text-slate-900' : 'text-slate-600'}`}>
                      {phase.title}
                    </span>
                    <span className="text-sm text-slate-500">{phaseCompleted}/{phaseTotal}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${isDone ? 'bg-green-500' : 'bg-blue-600'}`}
                      style={{ width: `${(phaseCompleted / phaseTotal) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions / Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-amber-50">
            <h3 className="font-bold text-lg text-amber-900 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Prioridades del Experto
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
              <div className="mt-1 min-w-[20px] h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Validar AB5 en California</p>
                <p className="text-slate-500 text-xs mt-1">Crítico antes de contactar clientes grandes en CA.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
              <div className="mt-1 min-w-[20px] h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Configurar Campaña de Email</p>
                <p className="text-slate-500 text-xs mt-1">La Fase 3 requiere preparación previa de secuencias.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
              <div className="mt-1 min-w-[20px] h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Backhaul desde Florida</p>
                <p className="text-slate-500 text-xs mt-1">Identificar cargas hacia el norte para optimizar márgenes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;