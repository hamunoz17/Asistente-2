import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PlanView from './components/PlanView';
import RegionalIntel from './components/RegionalIntel';
import Assistant from './components/Assistant';
import { APP_DATA } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    const saved = localStorage.getItem('logiplan_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  // For passing AI prompt from PlanView to Assistant
  const [aiPrompt, setAiPrompt] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('logiplan_tasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => 
      prev.includes(id) 
        ? prev.filter(taskId => taskId !== id) 
        : [...prev, id]
    );
  };

  const openAssistantWithPrompt = (prompt: string) => {
    setAiPrompt(prompt);
    setActiveTab('assistant');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard data={APP_DATA} completedTasks={completedTasks} />;
      case 'plan':
        return (
          <PlanView 
            data={APP_DATA} 
            completedTasks={completedTasks} 
            toggleTask={toggleTask}
            openAssistant={openAssistantWithPrompt}
          />
        );
      case 'regions':
        return <RegionalIntel data={APP_DATA} />;
      case 'assistant':
        return <Assistant initialPrompt={aiPrompt} />;
      default:
        return <Dashboard data={APP_DATA} completedTasks={completedTasks} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-64 overflow-y-auto h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;