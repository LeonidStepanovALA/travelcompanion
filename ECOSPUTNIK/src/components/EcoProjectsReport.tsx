'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

interface EcoProject {
  id: number;
  name: string;
  status: 'awaiting' | 'received' | 'implemented' | 'in-progress';
  fundingAmount: number;
  progress: number;
  completionDate?: string;
  ecoImpact: number;
  category: string;
  region: string;
}

interface EcoProjectsReportProps {
  filter?: 'awaiting' | 'received' | 'implemented' | 'in-progress' | 'all';
}

export default function EcoProjectsReport({ filter = 'all' }: EcoProjectsReportProps) {
  const { language } = useLanguage();
  const t = translations[language];

  // Mock eco projects with bilingual support
  const mockEcoProjects: EcoProject[] = [
    // Ожидающие зеленое финансирование (3 примера)
    {
      id: 1,
      name: language === 'ru' ? 'Солнечная электростанция в Алматы' : 'Solar Power Plant in Almaty',
      status: 'awaiting',
      fundingAmount: 50000000,
      progress: 0,
      category: language === 'ru' ? 'Энергетика' : 'Energy',
      region: language === 'ru' ? 'Алматы' : 'Almaty',
      ecoImpact: 0
    },
    {
      id: 2,
      name: language === 'ru' ? 'Геотермальная станция в Алатау' : 'Geothermal Station in Alatau',
      status: 'awaiting',
      fundingAmount: 120000000,
      progress: 0,
      category: language === 'ru' ? 'Энергетика' : 'Energy',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      ecoImpact: 0
    },
    {
      id: 3,
      name: language === 'ru' ? 'Эко-комплекс "Зеленый оазис"' : 'Eco Complex "Green Oasis"',
      status: 'awaiting',
      fundingAmount: 35000000,
      progress: 0,
      category: language === 'ru' ? 'Туризм' : 'Tourism',
      region: language === 'ru' ? 'Астана' : 'Astana',
      ecoImpact: 0
    },
    
    // Получившие зеленое финансирование (3 примера)
    {
      id: 4,
      name: language === 'ru' ? 'Эко-отель "Зеленые горы"' : 'Eco Hotel "Green Mountains"',
      status: 'received',
      fundingAmount: 25000000,
      progress: 65,
      category: language === 'ru' ? 'Туризм' : 'Tourism',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      ecoImpact: 85
    },
    {
      id: 5,
      name: language === 'ru' ? 'Система переработки отходов в Актау' : 'Waste Recycling System in Aktau',
      status: 'received',
      fundingAmount: 30000000,
      progress: 30,
      category: language === 'ru' ? 'Переработка' : 'Recycling',
      region: language === 'ru' ? 'Актау' : 'Aktau',
      ecoImpact: 75
    },
    {
      id: 6,
      name: language === 'ru' ? 'Биогазовая установка в Шымкенте' : 'Biogas Plant in Shymkent',
      status: 'received',
      fundingAmount: 45000000,
      progress: 55,
      category: language === 'ru' ? 'Энергетика' : 'Energy',
      region: language === 'ru' ? 'Шымкент' : 'Shymkent',
      ecoImpact: 82
    },
    
    // Реализованные проекты (3 примера)
    {
      id: 7,
      name: language === 'ru' ? 'Система очистки воды в Шымкенте' : 'Water Purification System in Shymkent',
      status: 'implemented',
      fundingAmount: 15000000,
      progress: 100,
      completionDate: '2024-06-15',
      category: language === 'ru' ? 'Водоснабжение' : 'Water Supply',
      region: language === 'ru' ? 'Шымкент' : 'Shymkent',
      ecoImpact: 92
    },
    {
      id: 8,
      name: language === 'ru' ? 'Эко-ферма "Органик"' : 'Eco Farm "Organic"',
      status: 'implemented',
      fundingAmount: 8000000,
      progress: 100,
      completionDate: '2024-03-20',
      category: language === 'ru' ? 'Сельское хозяйство' : 'Agriculture',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      ecoImpact: 88
    },
    {
      id: 9,
      name: language === 'ru' ? 'Солнечная панель на крыше ТРЦ' : 'Solar Panel on Shopping Center Roof',
      status: 'implemented',
      fundingAmount: 12000000,
      progress: 100,
      completionDate: '2024-01-10',
      category: language === 'ru' ? 'Энергетика' : 'Energy',
      region: language === 'ru' ? 'Алматы' : 'Almaty',
      ecoImpact: 78
    },
    
    // Проекты в стадии реализации (3 примера)
    {
      id: 10,
      name: language === 'ru' ? 'Ветровая электростанция в Астане' : 'Wind Power Plant in Astana',
      status: 'in-progress',
      fundingAmount: 75000000,
      progress: 45,
      category: language === 'ru' ? 'Энергетика' : 'Energy',
      region: language === 'ru' ? 'Астана' : 'Astana',
      ecoImpact: 78
    },
    {
      id: 11,
      name: language === 'ru' ? 'Эко-лагерь "Лесная сказка"' : 'Eco Camp "Forest Tale"',
      status: 'in-progress',
      fundingAmount: 18000000,
      progress: 70,
      category: language === 'ru' ? 'Туризм' : 'Tourism',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      ecoImpact: 85
    },
    {
      id: 12,
      name: language === 'ru' ? 'Система умного освещения в Уральске' : 'Smart Lighting System in Uralsk',
      status: 'in-progress',
      fundingAmount: 22000000,
      progress: 85,
      category: language === 'ru' ? 'Инфраструктура' : 'Infrastructure',
      region: language === 'ru' ? 'Уральск' : 'Uralsk',
      ecoImpact: 90
    }
  ];

  const filteredProjects = filter === 'all' 
    ? mockEcoProjects 
    : mockEcoProjects.filter(project => project.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'awaiting': return 'bg-yellow-100 text-yellow-800';
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'awaiting': return t.awaitingGreenFinancing;
      case 'received': return t.receivedGreenFinancing;
      case 'implemented': return t.implementedProjects;
      case 'in-progress': return t.projectsInProgress;
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          {t.ecoProjectsReport}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800">{t.awaitingGreenFinancing}</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {mockEcoProjects.filter(p => p.status === 'awaiting').length}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800">{t.receivedGreenFinancing}</h3>
            <p className="text-2xl font-bold text-blue-600">
              {mockEcoProjects.filter(p => p.status === 'received').length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">{t.implementedProjects}</h3>
            <p className="text-2xl font-bold text-green-600">
              {mockEcoProjects.filter(p => p.status === 'implemented').length}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-orange-800">{t.projectsInProgress}</h3>
            <p className="text-2xl font-bold text-orange-600">
              {mockEcoProjects.filter(p => p.status === 'in-progress').length}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.category} • {project.region}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600">{t.fundingAmount}</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(project.fundingAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.projectProgress}</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.ecoImpact}</p>
                  <p className="font-semibold text-gray-900">{project.ecoImpact}%</p>
                </div>
              </div>
              
              {project.completionDate && (
                <p className="text-sm text-gray-600">
                  {t.completed}: {new Date(project.completionDate).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 