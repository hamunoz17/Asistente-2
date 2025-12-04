import React, { useState } from 'react';
import { PlanData, Task } from '../types';
import { Check, Bot, ChevronDown, ChevronUp } from 'lucide-react';

interface PlanViewProps {
  data: PlanData;
  completedTasks: string[];
  toggleTask: (id: string) => void;
  openAssistant: (prompt: string) => void;
}

const PlanView: React.FC<PlanViewProps> = ({ data, completedTasks, toggleTask, openAssistant }) => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>("phase-1");

  return (
    <div className="p-8 max-w-5xl mx-auto pb-20">
       <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Plan de Ejecución</h1>
        <p className="text-slate-500 mt-2">Lista maestra de tareas dividida por fases estratégicas.</p>
      </header>

      <div className="space-y-6">
        {data.phases.map((phase) => {
          const isExpanded = expandedPhase === phase.id;
          const completedCount = phase.tasks.filter(t => completedTasks.includes(t.id)).length;
          
          return (
            <div key={phase.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    completedCount === phase.tasks.length 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {phase.id.split('-')[1]}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-slate-900">{phase.title}</h3>
                    <p className="text-sm text-slate-500">{phase.objective}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-slate-400">
                    {completedCount} / {phase.tasks.length} Tareas
                  </span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400"/> : <ChevronDown className="w-5 h-5 text-slate-400"/>}
                </div>
              </button>

              {isExpanded && (
                <div className="p-6 pt-0 bg-slate-50/50 border-t border-slate-100">
                  <div className="space-y-4 mt-4">
                    {phase.tasks.map((task) => (
                      <TaskItem 
                        key={task.id} 
                        task={task} 
                        isCompleted={completedTasks.includes(task.id)}
                        onToggle={() => toggleTask(task.id)}
                        onAiAssist={() => openAssistant(task.aiPrompt || "")}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TaskItem: React.FC<{ 
  task: Task; 
  isCompleted: boolean; 
  onToggle: () => void;
  onAiAssist: () => void;
}> = ({ task, isCompleted, onToggle, onAiAssist }) => {
  return (
    <div className={`group flex items-start p-4 rounded-lg border transition-all duration-200 ${
      isCompleted 
        ? 'bg-slate-50 border-slate-200 opacity-75' 
        : 'bg-white border-slate-200 shadow-sm hover:border-blue-300'
    }`}>
      <button 
        onClick={onToggle}
        className={`mt-1 w-6 h-6 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
          isCompleted 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'border-slate-300 hover:border-blue-500 text-transparent'
        }`}
      >
        <Check className="w-4 h-4" />
      </button>
      
      <div className="ml-4 flex-1">
        <h4 className={`font-medium ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
          {task.title}
        </h4>
        <p className={`text-sm mt-1 ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
          {task.description}
        </p>
      </div>

      {task.actionable && !isCompleted && (
        <button 
          onClick={onAiAssist}
          className="ml-4 p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg flex items-center space-x-2 transition-colors text-sm font-medium"
          title="Usar IA para esta tarea"
        >
          <Bot className="w-4 h-4" />
          <span className="hidden sm:inline">Generar</span>
        </button>
      )}
    </div>
  );
};

export default PlanView;