import React, { useState } from 'react';
import { PlanData, RegionalData } from '../types';
import { MapPin, AlertTriangle, ArrowRight } from 'lucide-react';

interface RegionalIntelProps {
  data: PlanData;
}

const RegionalIntel: React.FC<RegionalIntelProps> = ({ data }) => {
  const [activeRegionId, setActiveRegionId] = useState("ca");
  const activeRegion = data.regions.find(r => r.id === activeRegionId) || data.regions[0];

  return (
    <div className="p-8 h-full flex flex-col">
       <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Inteligencia Regional</h1>
        <p className="text-slate-500 mt-2">Detalles operativos y corredores estratégicos por estado.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
        {/* Navigation Tabs */}
        <div className="space-y-3">
          {data.regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveRegionId(region.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center ${
                activeRegionId === region.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="font-bold text-lg">{region.name}</span>
              <span className="text-sm opacity-60 font-mono">{region.code}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-700">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{activeRegion.name}</h2>
              <p className="text-slate-500">Mercado Objetivo</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Enfoque Estratégico</h3>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                {activeRegion.focus}
              </p>

              <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4 border-b pb-2">Corredores Principales (Lanes)</h3>
              <ul className="space-y-3">
                {activeRegion.lanes.map((lane, idx) => (
                  <li key={idx} className="flex items-center text-slate-700">
                    <ArrowRight className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                    <span>{lane}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-3 text-amber-800">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-bold">Notas del Experto</h3>
                </div>
                <p className="text-amber-900/80 text-sm leading-relaxed">
                  {activeRegion.notes}
                </p>
              </div>

              {/* Visual Placeholder for Map */}
              <div className="mt-6 bg-slate-100 rounded-xl h-48 flex items-center justify-center border-2 border-dashed border-slate-300">
                 <p className="text-slate-400 text-sm font-medium">Mapa de calor de {activeRegion.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalIntel;