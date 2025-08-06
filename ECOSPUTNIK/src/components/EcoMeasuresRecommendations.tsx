'use client';

import React, { useState } from 'react';
import { 
  LightBulbIcon, 
  BoltIcon, 
  CloudIcon, 
  TrashIcon, 
  TruckIcon, 
  StarIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';

interface EcoMeasure {
  id: number;
  title: string;
  description: string;
  category: 'energy' | 'water' | 'waste' | 'transport' | 'food';
  priority: 'high' | 'medium' | 'low';
  estimatedCost: number;
  potentialSavings: number;
  implementationTime: string;
  status: 'proposed' | 'approved' | 'implemented' | 'rejected';
  region: string;
  impactScore: number;
  location?: string;
  coordinates?: string;
  touristCapacity: number; // Максимальное количество туристов, которое может обслужить мера
  environmentalImpact: number; // Снижение антропогенной нагрузки (в %)
  businessBenefit: number; // Выгода для бизнеса (в %)
  paybackPeriod: number; // Срок окупаемости в месяцах
}

interface Location {
  id: number;
  name: string;
  type: 'hotel' | 'guesthouse' | 'glamping' | 'resort';
  region: string;
  coordinates: string;
  ecoMeasures: number[];
  status: 'active' | 'planned' | 'completed';
  description: string;
  rating: number;
  capacity: number;
  priceRange: 'budget' | 'mid-range' | 'luxury';
  imageUrl?: string;
  currentTourists: number; // Текущее количество туристов
  peakTourists: number; // Пиковое количество туристов
  averageStay: number; // Средняя продолжительность пребывания (дни)
  monthlyRevenue: number; // Месячный доход
  environmentalLoad: number; // Текущая антропогенная нагрузка (в %)
}

interface EcoMeasuresRecommendationsProps {
  filter?: 'all' | 'energy' | 'water' | 'waste' | 'transport' | 'food';
}

export default function EcoMeasuresRecommendations({ filter }: EcoMeasuresRecommendationsProps) {
  const { language } = useLanguage();
  const [selectedMeasure, setSelectedMeasure] = useState<EcoMeasure | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'energy' | 'water' | 'waste' | 'transport' | 'food'>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showFundingNeeded, setShowFundingNeeded] = useState(false);

  // Mock data for locations
  const mockLocations: Location[] = [
    {
      id: 1,
      name: language === 'ru' ? 'Эко-отель "Алматы Центр"' : 'Eco Hotel "Almaty Center"',
      type: 'hotel',
      region: language === 'ru' ? 'Алматы' : 'Almaty',
      coordinates: '43.2°N, 76.9°E',
      ecoMeasures: [1, 2, 3, 4],
      status: 'active',
      description: language === 'ru' 
        ? 'Центральный эко-отель с высоким углеродным следом (1.8 т CO2). Требует мер по снижению выбросов.'
        : 'Central eco-hotel with high carbon footprint (1.8 t CO2). Requires emission reduction measures.',
      rating: 4.8,
      capacity: 200,
      priceRange: 'luxury',
      currentTourists: 180,
      peakTourists: 250,
      averageStay: 2.5,
      monthlyRevenue: 75000000,
      environmentalLoad: 85
    },
    {
      id: 2,
      name: language === 'ru' ? 'Глэмпинг "Алматинская область"' : 'Glamping "Almaty Region"',
      type: 'glamping',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      coordinates: '43.2°N, 79.1°E',
      ecoMeasures: [5, 6, 7, 8],
      status: 'active',
      description: language === 'ru'
        ? 'Глэмпинг в регионе с самым высоким углеродным следом (3.2 т CO2). Критически важны эко-меры.'
        : 'Glamping in region with highest carbon footprint (3.2 t CO2). Eco-measures critically important.',
      rating: 4.6,
      capacity: 60,
      priceRange: 'mid-range',
      currentTourists: 45,
      peakTourists: 80,
      averageStay: 3.0,
      monthlyRevenue: 25000000,
      environmentalLoad: 95
    },
    {
      id: 3,
      name: language === 'ru' ? 'Курорт "Бурабай Эко"' : 'Resort "Burabay Eco"',
      type: 'resort',
      region: language === 'ru' ? 'Акмолинская область' : 'Akmola Region',
      coordinates: '53.1°N, 70.3°E',
      ecoMeasures: [7, 8, 9],
      status: 'completed',
      description: language === 'ru'
        ? 'Экологический курорт с ветрогенераторами и органическим рестораном'
        : 'Eco-resort with wind turbines and organic restaurant',
      rating: 4.9,
      capacity: 200,
      priceRange: 'luxury',
      currentTourists: 150,
      peakTourists: 200,
      averageStay: 4.0,
      monthlyRevenue: 60000000,
      environmentalLoad: 45
    },
    {
      id: 4,
      name: language === 'ru' ? 'Гостевой дом "Алтай"' : 'Guesthouse "Altai"',
      type: 'guesthouse',
      region: language === 'ru' ? 'Восточно-Казахстанская область' : 'East Kazakhstan Region',
      coordinates: '49.0°N, 87.0°E',
      ecoMeasures: [10, 11, 12],
      status: 'active',
      description: language === 'ru'
        ? 'Уютный гостевой дом в горах с защитой биоразнообразия и возобновляемой энергией'
        : 'Cozy guesthouse in the mountains with biodiversity protection and renewable energy',
      rating: 4.7,
      capacity: 25,
      priceRange: 'budget',
      currentTourists: 20,
      peakTourists: 30,
      averageStay: 2.0,
      monthlyRevenue: 8000000,
      environmentalLoad: 35
    },
    {
      id: 5,
      name: language === 'ru' ? 'Отель "Астана Грин"' : 'Hotel "Astana Green"',
      type: 'hotel',
      region: language === 'ru' ? 'Астана' : 'Astana',
      coordinates: '51.1°N, 71.4°E',
      ecoMeasures: [1, 5, 8],
      status: 'active',
      description: language === 'ru'
        ? 'Зеленый отель в центре столицы с системой мониторинга качества воздуха'
        : 'Green hotel in the capital center with air quality monitoring system',
      rating: 4.5,
      capacity: 150,
      priceRange: 'mid-range',
      currentTourists: 120,
      peakTourists: 180,
      averageStay: 2.5,
      monthlyRevenue: 45000000,
      environmentalLoad: 60
    },
    {
      id: 6,
      name: language === 'ru' ? 'Глэмпинг "Алаколь"' : 'Glamping "Alakol"',
      type: 'glamping',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      coordinates: '46.1°N, 81.6°E',
      ecoMeasures: [2, 6, 9],
      status: 'planned',
      description: language === 'ru'
        ? 'Экологический глэмпинг на берегу озера Алаколь с органическим питанием'
        : 'Eco-glamping on the shores of Lake Alakol with organic food',
      rating: 4.4,
      capacity: 30,
      priceRange: 'mid-range',
      currentTourists: 0,
      peakTourists: 25,
      averageStay: 3.5,
      monthlyRevenue: 15000000,
      environmentalLoad: 75
    }
  ];

  // Mock data for eco measures
  const mockEcoMeasures: EcoMeasure[] = [
    {
      id: 1,
      title: language === 'ru' ? 'Установка солнечных панелей' : 'Solar Panel Installation',
      description: language === 'ru' 
        ? 'Установка солнечных панелей для генерации чистой энергии и снижения зависимости от ископаемого топлива'
        : 'Installation of solar panels for clean energy generation and reducing fossil fuel dependency',
      category: 'energy',
      priority: 'high',
      estimatedCost: 50000000,
      potentialSavings: 15000000,
      implementationTime: '6-8 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 9.2,
      location: language === 'ru' ? 'Озеро Балхаш' : 'Lake Balkhash',
      coordinates: '46.8°N, 75.0°E',
      touristCapacity: 150,
      environmentalImpact: 25,
      businessBenefit: 30,
      paybackPeriod: 18
    },
    {
      id: 2,
      title: language === 'ru' ? 'Система сбора дождевой воды' : 'Rainwater Harvesting System',
      description: language === 'ru'
        ? 'Система сбора и фильтрации дождевой воды для использования в орошении и технических целях'
        : 'Rainwater collection and filtration system for irrigation and technical purposes',
      category: 'water',
      priority: 'medium',
      estimatedCost: 15000000,
      potentialSavings: 5000000,
      implementationTime: '3-4 месяца',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 7.8,
      location: language === 'ru' ? 'Озеро Балхаш' : 'Lake Balkhash',
      coordinates: '46.8°N, 75.0°E',
      touristCapacity: 80,
      environmentalImpact: 15,
      businessBenefit: 20,
      paybackPeriod: 12
    },
    {
      id: 3,
      title: language === 'ru' ? 'Система переработки органических отходов' : 'Organic Waste Recycling System',
      description: language === 'ru'
        ? 'Компостирование и переработка органических отходов для производства удобрений'
        : 'Composting and recycling of organic waste for fertilizer production',
      category: 'waste',
      priority: 'high',
      estimatedCost: 25000000,
      potentialSavings: 8000000,
      implementationTime: '4-5 месяцев',
      status: 'implemented',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 8.5,
      location: language === 'ru' ? 'Озеро Балхаш' : 'Lake Balkhash',
      coordinates: '46.8°N, 75.0°E',
      touristCapacity: 100,
      environmentalImpact: 20,
      businessBenefit: 25,
      paybackPeriod: 15
    },
    {
      id: 4,
      title: language === 'ru' ? 'Электромобили для туристических маршрутов' : 'Electric Vehicles for Tourist Routes',
      description: language === 'ru'
        ? 'Замена дизельных автобусов на электромобили для экологических туристических маршрутов'
        : 'Replacing diesel buses with electric vehicles for eco-friendly tourist routes',
      category: 'transport',
      priority: 'medium',
      estimatedCost: 80000000,
      potentialSavings: 20000000,
      implementationTime: '8-12 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 8.9,
      location: language === 'ru' ? 'Чарынский каньон' : 'Charyn Canyon',
      coordinates: '43.2°N, 79.1°E',
      touristCapacity: 200,
      environmentalImpact: 30,
      businessBenefit: 35,
      paybackPeriod: 24
    },
    {
      id: 5,
      title: language === 'ru' ? 'Система очистки сточных вод' : 'Wastewater Treatment System',
      description: language === 'ru'
        ? 'Современная система очистки сточных вод для защиты водных ресурсов'
        : 'Modern wastewater treatment system for water resource protection',
      category: 'water',
      priority: 'high',
      estimatedCost: 35000000,
      potentialSavings: 12000000,
      implementationTime: '5-7 месяцев',
      status: 'approved',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 9.1,
      location: language === 'ru' ? 'Чарынский каньон' : 'Charyn Canyon',
      coordinates: '43.2°N, 79.1°E',
      touristCapacity: 150,
      environmentalImpact: 25,
      businessBenefit: 30,
      paybackPeriod: 18
    },
    {
      id: 6,
      title: language === 'ru' ? 'Экологические тропы' : 'Eco Trails',
      description: language === 'ru'
        ? 'Создание экологических троп с минимальным воздействием на природу'
        : 'Creation of eco trails with minimal environmental impact',
      category: 'transport',
      priority: 'low',
      estimatedCost: 8000000,
      potentialSavings: 3000000,
      implementationTime: '2-3 месяца',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 7.2,
      location: language === 'ru' ? 'Чарынский каньон' : 'Charyn Canyon',
      coordinates: '43.2°N, 79.1°E',
      touristCapacity: 80,
      environmentalImpact: 15,
      businessBenefit: 20,
      paybackPeriod: 10
    },
    {
      id: 7,
      title: language === 'ru' ? 'Ветрогенераторы' : 'Wind Turbines',
      description: language === 'ru'
        ? 'Установка ветрогенераторов для производства экологически чистой энергии'
        : 'Installation of wind turbines for clean energy production',
      category: 'energy',
      priority: 'high',
      estimatedCost: 120000000,
      potentialSavings: 35000000,
      implementationTime: '10-12 месяцев',
      status: 'implemented',
      region: language === 'ru' ? 'Акмолинская область' : 'Akmola Region',
      impactScore: 9.5,
      location: language === 'ru' ? 'Бурабай (Боровое)' : 'Burabay (Borovoe)',
      coordinates: '53.1°N, 70.3°E',
      touristCapacity: 300,
      environmentalImpact: 40,
      businessBenefit: 45,
      paybackPeriod: 30
    },
    {
      id: 8,
      title: language === 'ru' ? 'Система мониторинга качества воды' : 'Water Quality Monitoring System',
      description: language === 'ru'
        ? 'Автоматическая система мониторинга качества воды в озерах'
        : 'Automated water quality monitoring system for lakes',
      category: 'water',
      priority: 'medium',
      estimatedCost: 12000000,
      potentialSavings: 4000000,
      implementationTime: '3-4 месяца',
      status: 'implemented',
      region: language === 'ru' ? 'Акмолинская область' : 'Akmola Region',
      impactScore: 8.3,
      location: language === 'ru' ? 'Бурабай (Боровое)' : 'Burabay (Borovoe)',
      coordinates: '53.1°N, 70.3°E',
      touristCapacity: 120,
      environmentalImpact: 18,
      businessBenefit: 22,
      paybackPeriod: 12
    },
    {
      id: 9,
      title: language === 'ru' ? 'Органическое земледелие' : 'Organic Farming',
      description: language === 'ru'
        ? 'Внедрение методов органического земледелия для производства экологически чистой продукции'
        : 'Implementation of organic farming methods for eco-friendly food production',
      category: 'food',
      priority: 'medium',
      estimatedCost: 20000000,
      potentialSavings: 8000000,
      implementationTime: '6-8 месяцев',
      status: 'implemented',
      region: language === 'ru' ? 'Акмолинская область' : 'Akmola Region',
      impactScore: 8.7,
      location: language === 'ru' ? 'Бурабай (Боровое)' : 'Burabay (Borovoe)',
      coordinates: '53.1°N, 70.3°E',
      touristCapacity: 150,
      environmentalImpact: 22,
      businessBenefit: 28,
      paybackPeriod: 15
    },
    {
      id: 10,
      title: language === 'ru' ? 'Защита биоразнообразия' : 'Biodiversity Protection',
      description: language === 'ru'
        ? 'Создание охраняемых природных территорий для защиты редких видов животных и растений'
        : 'Creation of protected natural areas for rare animal and plant species protection',
      category: 'waste',
      priority: 'high',
      estimatedCost: 30000000,
      potentialSavings: 10000000,
      implementationTime: '4-6 месяцев',
      status: 'implemented',
      region: language === 'ru' ? 'Восточно-Казахстанская область' : 'East Kazakhstan Region',
      impactScore: 9.8,
      location: language === 'ru' ? 'Алтайские горы' : 'Altai Mountains',
      coordinates: '49.0°N, 87.0°E',
      touristCapacity: 80,
      environmentalImpact: 35,
      businessBenefit: 40,
      paybackPeriod: 18
    },
    {
      id: 11,
      title: language === 'ru' ? 'Экологический транспорт' : 'Eco Transport',
      description: language === 'ru'
        ? 'Внедрение экологически чистого транспорта для туристических маршрутов'
        : 'Implementation of eco-friendly transport for tourist routes',
      category: 'transport',
      priority: 'medium',
      estimatedCost: 45000000,
      potentialSavings: 15000000,
      implementationTime: '6-8 месяцев',
      status: 'implemented',
      region: language === 'ru' ? 'Восточно-Казахстанская область' : 'East Kazakhstan Region',
      impactScore: 8.4,
      location: language === 'ru' ? 'Алтайские горы' : 'Altai Mountains',
      coordinates: '49.0°N, 87.0°E',
      touristCapacity: 120,
      environmentalImpact: 28,
      businessBenefit: 32,
      paybackPeriod: 20
    },
    {
      id: 12,
      title: language === 'ru' ? 'Возобновляемые источники энергии' : 'Renewable Energy Sources',
      description: language === 'ru'
        ? 'Комплексное внедрение возобновляемых источников энергии в горных регионах'
        : 'Comprehensive implementation of renewable energy sources in mountain regions',
      category: 'energy',
      priority: 'high',
      estimatedCost: 90000000,
      potentialSavings: 25000000,
      implementationTime: '8-10 месяцев',
      status: 'implemented',
      region: language === 'ru' ? 'Восточно-Казахстанская область' : 'East Kazakhstan Region',
      impactScore: 9.3,
      location: language === 'ru' ? 'Алтайские горы' : 'Altai Mountains',
      coordinates: '49.0°N, 87.0°E',
      touristCapacity: 200,
      environmentalImpact: 45,
      businessBenefit: 50,
      paybackPeriod: 25
    },
    // Новые меры для энергетики
    {
      id: 13,
      title: language === 'ru' ? 'Геотермальная система отопления для отелей' : 'Geothermal Heating System for Hotels',
      description: language === 'ru'
        ? 'Использование геотермальной энергии для отопления и горячего водоснабжения отелей и глэмпингов'
        : 'Using geothermal energy for heating and hot water supply for hotels and glamping',
      category: 'energy',
      priority: 'high',
      estimatedCost: 75000000,
      potentialSavings: 20000000,
      implementationTime: '6-8 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 8.8,
      location: language === 'ru' ? 'Озеро Иссык-Куль' : 'Lake Issyk-Kul',
      coordinates: '42.5°N, 78.4°E',
      touristCapacity: 180,
      environmentalImpact: 35,
      businessBenefit: 40,
      paybackPeriod: 22
    },
    {
      id: 14,
      title: language === 'ru' ? 'Биогазовые установки' : 'Biogas Plants',
      description: language === 'ru'
        ? 'Производство биогаза из органических отходов для генерации энергии'
        : 'Biogas production from organic waste for energy generation',
      category: 'energy',
      priority: 'medium',
      estimatedCost: 45000000,
      potentialSavings: 12000000,
      implementationTime: '4-6 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Жамбылская область' : 'Zhambyl Region',
      impactScore: 7.9,
      location: language === 'ru' ? 'Тараз' : 'Taraz',
      coordinates: '42.9°N, 71.4°E',
      touristCapacity: 120,
      environmentalImpact: 25,
      businessBenefit: 30,
      paybackPeriod: 18
    },
    {
      id: 15,
      title: language === 'ru' ? 'Микро-ГЭС для туристических объектов' : 'Micro-Hydro for Tourist Facilities',
      description: language === 'ru'
        ? 'Установка микро-гидроэлектростанций на горных реках для автономного энергоснабжения'
        : 'Installation of micro-hydroelectric stations on mountain rivers for autonomous power supply',
      category: 'energy',
      priority: 'high',
      estimatedCost: 60000000,
      potentialSavings: 18000000,
      implementationTime: '8-10 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 8.6,
      location: language === 'ru' ? 'Большое Алматинское озеро' : 'Big Almaty Lake',
      coordinates: '43.1°N, 77.1°E',
      touristCapacity: 150,
      environmentalImpact: 30,
      businessBenefit: 35,
      paybackPeriod: 20
    },
    // Новые меры для воды
    {
      id: 16,
      title: language === 'ru' ? 'Система умного орошения для курортов' : 'Smart Irrigation System for Resorts',
      description: language === 'ru'
        ? 'Автоматизированная система орошения с датчиками влажности для отелей и курортов'
        : 'Automated irrigation system with humidity sensors for hotels and resorts',
      category: 'water',
      priority: 'medium',
      estimatedCost: 25000000,
      potentialSavings: 8000000,
      implementationTime: '3-4 месяца',
      status: 'proposed',
      region: language === 'ru' ? 'Южно-Казахстанская область' : 'South Kazakhstan Region',
      impactScore: 7.5,
      location: language === 'ru' ? 'Шымкент' : 'Shymkent',
      coordinates: '42.3°N, 69.6°E',
      touristCapacity: 100,
      environmentalImpact: 20,
      businessBenefit: 25,
      paybackPeriod: 15
    },
    {
      id: 17,
      title: language === 'ru' ? 'Система очистки питьевой воды' : 'Drinking Water Purification System',
      description: language === 'ru'
        ? 'Многоступенчатая система очистки и фильтрации питьевой воды'
        : 'Multi-stage drinking water purification and filtration system',
      category: 'water',
      priority: 'high',
      estimatedCost: 30000000,
      potentialSavings: 10000000,
      implementationTime: '4-5 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 8.2,
      location: language === 'ru' ? 'Малый Алматы' : 'Small Almaty',
      coordinates: '43.2°N, 76.9°E',
      touristCapacity: 200,
      environmentalImpact: 25,
      businessBenefit: 30,
      paybackPeriod: 18
    },
    {
      id: 18,
      title: language === 'ru' ? 'Система повторного использования воды' : 'Water Reuse System',
      description: language === 'ru'
        ? 'Система сбора и повторного использования серых вод для технических нужд'
        : 'Greywater collection and reuse system for technical needs',
      category: 'water',
      priority: 'medium',
      estimatedCost: 20000000,
      potentialSavings: 6000000,
      implementationTime: '3-4 месяца',
      status: 'proposed',
      region: language === 'ru' ? 'Акмолинская область' : 'Akmola Region',
      impactScore: 7.8,
      location: language === 'ru' ? 'Кокшетау' : 'Kokshetau',
      coordinates: '53.3°N, 69.4°E',
      touristCapacity: 120,
      environmentalImpact: 18,
      businessBenefit: 22,
      paybackPeriod: 16
    },
    // Новые меры для отходов
    {
      id: 19,
      title: language === 'ru' ? 'Система раздельного сбора отходов для отелей' : 'Waste Separation System for Hotels',
      description: language === 'ru'
        ? 'Комплексная система раздельного сбора и сортировки отходов для отелей и глэмпингов'
        : 'Comprehensive waste separation and sorting system for hotels and glamping',
      category: 'waste',
      priority: 'high',
      estimatedCost: 15000000,
      potentialSavings: 5000000,
      implementationTime: '2-3 месяца',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 8.0,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      coordinates: '43.2°N, 76.9°E',
      touristCapacity: 300,
      environmentalImpact: 22,
      businessBenefit: 28,
      paybackPeriod: 12
    },
    {
      id: 20,
      title: language === 'ru' ? 'Плазменная переработка отходов' : 'Plasma Waste Processing',
      description: language === 'ru'
        ? 'Инновационная технология плазменной переработки твердых отходов'
        : 'Innovative plasma processing technology for solid waste',
      category: 'waste',
      priority: 'high',
      estimatedCost: 120000000,
      potentialSavings: 35000000,
      implementationTime: '10-12 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Астана' : 'Astana',
      impactScore: 9.1,
      location: language === 'ru' ? 'Астана' : 'Astana',
      coordinates: '51.1°N, 71.4°E',
      touristCapacity: 500,
      environmentalImpact: 45,
      businessBenefit: 50,
      paybackPeriod: 28
    },
    {
      id: 21,
      title: language === 'ru' ? 'Система утилизации пластика' : 'Plastic Recycling System',
      description: language === 'ru'
        ? 'Специализированная система переработки пластиковых отходов'
        : 'Specialized plastic waste recycling system',
      category: 'waste',
      priority: 'medium',
      estimatedCost: 35000000,
      potentialSavings: 12000000,
      implementationTime: '4-6 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 7.6,
      location: language === 'ru' ? 'Талдыкорган' : 'Taldykorgan',
      coordinates: '45.0°N, 78.4°E',
      touristCapacity: 150,
      environmentalImpact: 20,
      businessBenefit: 25,
      paybackPeriod: 14
    },
    // Новые меры для транспорта
    {
      id: 22,
      title: language === 'ru' ? 'Водородные автобусы для отелей' : 'Hydrogen Buses for Hotels',
      description: language === 'ru'
        ? 'Внедрение водородных автобусов для экологически чистого туристического транспорта отелей'
        : 'Implementation of hydrogen buses for eco-friendly tourist transport for hotels',
      category: 'transport',
      priority: 'high',
      estimatedCost: 150000000,
      potentialSavings: 40000000,
      implementationTime: '12-15 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 9.4,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      coordinates: '43.2°N, 76.9°E',
      touristCapacity: 400,
      environmentalImpact: 50,
      businessBenefit: 55,
      paybackPeriod: 30
    },
    {
      id: 23,
      title: language === 'ru' ? 'Велосипедная инфраструктура' : 'Bicycle Infrastructure',
      description: language === 'ru'
        ? 'Создание велосипедных дорожек и пунктов проката для экологического туризма'
        : 'Creation of bicycle paths and rental points for eco-tourism',
      category: 'transport',
      priority: 'medium',
      estimatedCost: 25000000,
      potentialSavings: 8000000,
      implementationTime: '4-6 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Акмолинская область' : 'Akmola Region',
      impactScore: 7.3,
      location: language === 'ru' ? 'Бурабай' : 'Burabay',
      coordinates: '53.1°N, 70.3°E',
      touristCapacity: 200,
      environmentalImpact: 15,
      businessBenefit: 20,
      paybackPeriod: 12
    },
    {
      id: 24,
      title: language === 'ru' ? 'Канатные дороги' : 'Cable Cars',
      description: language === 'ru'
        ? 'Установка экологически чистых канатных дорог для туристических маршрутов'
        : 'Installation of eco-friendly cable cars for tourist routes',
      category: 'transport',
      priority: 'medium',
      estimatedCost: 80000000,
      potentialSavings: 25000000,
      implementationTime: '8-10 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 8.5,
      location: language === 'ru' ? 'Медео' : 'Medeo',
      coordinates: '43.1°N, 77.1°E',
      touristCapacity: 300,
      environmentalImpact: 25,
      businessBenefit: 35,
      paybackPeriod: 20
    },
    // Новые меры для питания
    {
      id: 25,
      title: language === 'ru' ? 'Вертикальные фермы для отелей' : 'Vertical Farms for Hotels',
      description: language === 'ru'
        ? 'Создание вертикальных ферм для круглогодичного производства свежих овощей для отелей'
        : 'Creation of vertical farms for year-round fresh vegetable production for hotels',
      category: 'food',
      priority: 'medium',
      estimatedCost: 40000000,
      potentialSavings: 15000000,
      implementationTime: '6-8 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 8.1,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      coordinates: '43.2°N, 76.9°E',
      touristCapacity: 250,
      environmentalImpact: 28,
      businessBenefit: 35,
      paybackPeriod: 16
    },
    {
      id: 26,
      title: language === 'ru' ? 'Аквапоника' : 'Aquaponics',
      description: language === 'ru'
        ? 'Комбинированная система выращивания рыбы и растений в замкнутом цикле'
        : 'Combined system of fish and plant cultivation in a closed cycle',
      category: 'food',
      priority: 'high',
      estimatedCost: 30000000,
      potentialSavings: 12000000,
      implementationTime: '5-7 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Акмолинская область' : 'Akmola Region',
      impactScore: 8.7,
      location: language === 'ru' ? 'Бурабай' : 'Burabay',
      coordinates: '53.1°N, 70.3°E',
      touristCapacity: 180,
      environmentalImpact: 30,
      businessBenefit: 38,
      paybackPeriod: 15
    },
    {
      id: 27,
      title: language === 'ru' ? 'Система местного питания' : 'Local Food System',
      description: language === 'ru'
        ? 'Создание системы снабжения местными продуктами питания для туристических объектов'
        : 'Creation of a local food supply system for tourist facilities',
      category: 'food',
      priority: 'medium',
      estimatedCost: 20000000,
      potentialSavings: 8000000,
      implementationTime: '4-5 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Восточно-Казахстанская область' : 'East Kazakhstan Region',
      impactScore: 7.4,
      location: language === 'ru' ? 'Усть-Каменогорск' : 'Ust-Kamenogorsk',
      coordinates: '49.9°N, 82.6°E',
      touristCapacity: 150,
      environmentalImpact: 20,
      businessBenefit: 25,
      paybackPeriod: 12
    },
    // Дополнительные меры для энергетики
    {
      id: 28,
      title: language === 'ru' ? 'Тепловые насосы' : 'Heat Pumps',
      description: language === 'ru'
        ? 'Установка тепловых насосов для эффективного отопления и кондиционирования'
        : 'Installation of heat pumps for efficient heating and air conditioning',
      category: 'energy',
      priority: 'high',
      estimatedCost: 55000000,
      potentialSavings: 18000000,
      implementationTime: '5-7 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 8.3,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      coordinates: '43.2°N, 76.9°E',
      touristCapacity: 200,
      environmentalImpact: 32,
      businessBenefit: 38,
      paybackPeriod: 18
    },
    {
      id: 29,
      title: language === 'ru' ? 'Система аккумулирования энергии' : 'Energy Storage System',
      description: language === 'ru'
        ? 'Установка батарейных систем для аккумулирования возобновляемой энергии'
        : 'Installation of battery systems for renewable energy storage',
      category: 'energy',
      priority: 'medium',
      estimatedCost: 35000000,
      potentialSavings: 12000000,
      implementationTime: '4-6 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Акмолинская область' : 'Akmola Region',
      impactScore: 7.8,
      location: language === 'ru' ? 'Бурабай' : 'Burabay',
      coordinates: '53.1°N, 70.3°E',
      touristCapacity: 120,
      environmentalImpact: 25,
      businessBenefit: 30,
      paybackPeriod: 14
    },
    // Дополнительные меры для воды
    {
      id: 30,
      title: language === 'ru' ? 'Система опреснения воды' : 'Water Desalination System',
      description: language === 'ru'
        ? 'Установка системы опреснения морской воды для питьевых нужд'
        : 'Installation of seawater desalination system for drinking needs',
      category: 'water',
      priority: 'high',
      estimatedCost: 80000000,
      potentialSavings: 25000000,
      implementationTime: '8-10 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Мангистауская область' : 'Mangystau Region',
      impactScore: 8.9,
      location: language === 'ru' ? 'Актау' : 'Aktau',
      coordinates: '43.6°N, 51.2°E',
      touristCapacity: 300,
      environmentalImpact: 35,
      businessBenefit: 40,
      paybackPeriod: 20
    },
    {
      id: 31,
      title: language === 'ru' ? 'Система очистки сточных вод с мембранами' : 'Membrane Wastewater Treatment',
      description: language === 'ru'
        ? 'Передовая система очистки сточных вод с использованием мембранных технологий'
        : 'Advanced wastewater treatment system using membrane technologies',
      category: 'water',
      priority: 'medium',
      estimatedCost: 45000000,
      potentialSavings: 15000000,
      implementationTime: '6-8 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 8.1,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      coordinates: '43.2°N, 76.9°E',
      touristCapacity: 250,
      environmentalImpact: 28,
      businessBenefit: 32,
      paybackPeriod: 16
    },
    // Дополнительные меры для отходов
    {
      id: 32,
      title: language === 'ru' ? 'Система пиролиза отходов' : 'Waste Pyrolysis System',
      description: language === 'ru'
        ? 'Термическая переработка отходов без кислорода для получения топлива'
        : 'Thermal waste processing without oxygen to produce fuel',
      category: 'waste',
      priority: 'high',
      estimatedCost: 95000000,
      potentialSavings: 30000000,
      implementationTime: '10-12 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Астана' : 'Astana',
      impactScore: 8.7,
      location: language === 'ru' ? 'Астана' : 'Astana',
      coordinates: '51.1°N, 71.4°E',
      touristCapacity: 400,
      environmentalImpact: 40,
      businessBenefit: 45,
      paybackPeriod: 22
    },
    {
      id: 33,
      title: language === 'ru' ? 'Система компостирования пищевых отходов' : 'Food Waste Composting System',
      description: language === 'ru'
        ? 'Автоматизированная система компостирования пищевых отходов для отелей'
        : 'Automated food waste composting system for hotels',
      category: 'waste',
      priority: 'medium',
      estimatedCost: 25000000,
      potentialSavings: 8000000,
      implementationTime: '3-4 месяца',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 7.5,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      coordinates: '43.2°N, 76.9°E',
      touristCapacity: 180,
      environmentalImpact: 18,
      businessBenefit: 22,
      paybackPeriod: 12
    },
    // Дополнительные меры для транспорта
    {
      id: 34,
      title: language === 'ru' ? 'Электрические лодки для озер' : 'Electric Boats for Lakes',
      description: language === 'ru'
        ? 'Замена дизельных лодок на электрические для экологического туризма на озерах'
        : 'Replacing diesel boats with electric boats for eco-tourism on lakes',
      category: 'transport',
      priority: 'medium',
      estimatedCost: 60000000,
      potentialSavings: 18000000,
      implementationTime: '6-8 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Акмолинская область' : 'Akmola Region',
      impactScore: 8.2,
      location: language === 'ru' ? 'Бурабай' : 'Burabay',
      coordinates: '53.1°N, 70.3°E',
      touristCapacity: 150,
      environmentalImpact: 30,
      businessBenefit: 35,
      paybackPeriod: 18
    },
    {
      id: 35,
      title: language === 'ru' ? 'Система каршеринга электромобилей' : 'Electric Car Sharing System',
      description: language === 'ru'
        ? 'Внедрение системы аренды электромобилей для туристов'
        : 'Implementation of electric car rental system for tourists',
      category: 'transport',
      priority: 'medium',
      estimatedCost: 40000000,
      potentialSavings: 15000000,
      implementationTime: '5-7 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 7.9,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      coordinates: '43.2°N, 76.9°E',
      touristCapacity: 200,
      environmentalImpact: 25,
      businessBenefit: 30,
      paybackPeriod: 15
    },
    // Дополнительные меры для питания
    {
      id: 36,
      title: language === 'ru' ? 'Система гидропоники' : 'Hydroponics System',
      description: language === 'ru'
        ? 'Выращивание овощей без почвы в питательном растворе'
        : 'Growing vegetables without soil in nutrient solution',
      category: 'food',
      priority: 'medium',
      estimatedCost: 30000000,
      potentialSavings: 12000000,
      implementationTime: '4-6 месяцев',
      status: 'proposed',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      impactScore: 7.8,
      location: language === 'ru' ? 'Алматы' : 'Almaty',
      coordinates: '43.2°N, 76.9°E',
      touristCapacity: 160,
      environmentalImpact: 22,
      businessBenefit: 28,
      paybackPeriod: 13
    },
    {
      id: 37,
      title: language === 'ru' ? 'Система выращивания грибов' : 'Mushroom Cultivation System',
      description: language === 'ru'
        ? 'Создание системы выращивания экологически чистых грибов'
        : 'Creation of eco-friendly mushroom cultivation system',
      category: 'food',
      priority: 'low',
      estimatedCost: 15000000,
      potentialSavings: 6000000,
      implementationTime: '3-4 месяца',
      status: 'proposed',
      region: language === 'ru' ? 'Восточно-Казахстанская область' : 'East Kazakhstan Region',
      impactScore: 6.8,
      location: language === 'ru' ? 'Усть-Каменогорск' : 'Ust-Kamenogorsk',
      coordinates: '49.9°N, 82.6°E',
      touristCapacity: 100,
      environmentalImpact: 15,
      businessBenefit: 20,
      paybackPeriod: 10
    }
  ];

  // Filter measures based on active filter
  const filteredMeasures = mockEcoMeasures.filter(measure => 
    activeFilter === 'all' || measure.category === activeFilter
  );

  // Get measures for selected location
  const getLocationMeasures = (locationId: number) => {
    const location = mockLocations.find(loc => loc.id === locationId);
    if (!location) return [];
    return mockEcoMeasures.filter(measure => location.ecoMeasures.includes(measure.id));
  };

  // Helper functions
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'energy': return <BoltIcon className="w-5 h-5" />;
      case 'water': return <CloudIcon className="w-5 h-5" />;
      case 'waste': return <TrashIcon className="w-5 h-5" />;
      case 'transport': return <TruckIcon className="w-5 h-5" />;
      case 'food': return <StarIcon className="w-5 h-5" />;
      default: return <LightBulbIcon className="w-5 h-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'energy': return language === 'ru' ? 'Энергетика' : 'Energy';
      case 'water': return language === 'ru' ? 'Вода' : 'Water';
      case 'waste': return language === 'ru' ? 'Отходы' : 'Waste';
      case 'transport': return language === 'ru' ? 'Транспорт' : 'Transport';
      case 'food': return language === 'ru' ? 'Питание' : 'Food';
      default: return category;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proposed': return 'text-blue-600 bg-blue-100';
      case 'approved': return 'text-yellow-600 bg-yellow-100';
      case 'implemented': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'proposed': return language === 'ru' ? 'Предложено' : 'Proposed';
      case 'approved': return language === 'ru' ? 'Одобрено' : 'Approved';
      case 'implemented': return language === 'ru' ? 'Реализовано' : 'Implemented';
      case 'rejected': return language === 'ru' ? 'Отклонено' : 'Rejected';
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

  const getImpactColor = (score: number) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleViewDetails = (measure: EcoMeasure) => {
    setSelectedMeasure(measure);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMeasure(null);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const getLocationStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'planned': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLocationStatusText = (status: string) => {
    switch (status) {
      case 'active': return language === 'ru' ? 'Активно' : 'Active';
      case 'planned': return language === 'ru' ? 'Планируется' : 'Planned';
      case 'completed': return language === 'ru' ? 'Завершено' : 'Completed';
      default: return status;
    }
  };

  const getLocationTypeText = (type: string) => {
    switch (type) {
      case 'hotel': return language === 'ru' ? 'Отель' : 'Hotel';
      case 'guesthouse': return language === 'ru' ? 'Гостевой дом' : 'Guesthouse';
      case 'glamping': return language === 'ru' ? 'Глэмпинг' : 'Glamping';
      case 'resort': return language === 'ru' ? 'Курорт' : 'Resort';
      default: return type;
    }
  };

  const getPriceRangeText = (priceRange: string) => {
    switch (priceRange) {
      case 'budget': return language === 'ru' ? 'Эконом' : 'Budget';
      case 'mid-range': return language === 'ru' ? 'Средний' : 'Mid-range';
      case 'luxury': return language === 'ru' ? 'Люкс' : 'Luxury';
      default: return priceRange;
    }
  };

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case 'budget': return 'text-green-600 bg-green-100';
      case 'mid-range': return 'text-yellow-600 bg-yellow-100';
      case 'luxury': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Функции для анализа нагрузки и рекомендаций
  const calculateLoadAnalysis = (location: Location, measures: EcoMeasure[]) => {
    const locationMeasures = measures.filter(m => location.ecoMeasures.includes(m.id));
    const totalTouristCapacity = locationMeasures.reduce((sum, m) => sum + m.touristCapacity, 0);
    const currentLoad = location.currentTourists;
    const peakLoad = location.peakTourists;
    
    const loadRatio = currentLoad / totalTouristCapacity;
    const peakLoadRatio = peakLoad / totalTouristCapacity;
    
    return {
      currentLoad,
      peakLoad,
      totalCapacity: totalTouristCapacity,
      loadRatio,
      peakLoadRatio,
      needsFunding: loadRatio > 1 || peakLoadRatio > 1,
      recommendedMeasures: locationMeasures.filter(m => m.status === 'proposed')
    };
  };

  const calculateFundingRecommendation = (location: Location, measures: EcoMeasure[]) => {
    const analysis = calculateLoadAnalysis(location, measures);
    const recommendedMeasures = analysis.recommendedMeasures;
    
    const totalFunding = recommendedMeasures.reduce((sum, m) => sum + m.estimatedCost, 0);
    const totalSavings = recommendedMeasures.reduce((sum, m) => sum + m.potentialSavings, 0);
    const totalEnvironmentalImpact = recommendedMeasures.reduce((sum, m) => sum + m.environmentalImpact, 0);
    const totalBusinessBenefit = recommendedMeasures.reduce((sum, m) => sum + m.businessBenefit, 0);
    
    return {
      totalFunding,
      totalSavings,
      totalEnvironmentalImpact,
      totalBusinessBenefit,
      paybackPeriod: recommendedMeasures.length > 0 ? Math.max(...recommendedMeasures.map(m => m.paybackPeriod)) : 0,
      measures: recommendedMeasures
    };
  };

  const getLoadStatusColor = (ratio: number) => {
    if (ratio <= 0.7) return 'text-green-600 bg-green-100';
    if (ratio <= 1.0) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getLoadStatusText = (ratio: number) => {
    if (ratio <= 0.7) return language === 'ru' ? 'Низкая' : 'Low';
    if (ratio <= 1.0) return language === 'ru' ? 'Средняя' : 'Medium';
    return language === 'ru' ? 'Высокая' : 'High';
  };

  // Функция для расчета объектов, нуждающихся в зеленом финансировании


  const handleAutoCalculation = () => {
    setShowFundingNeeded(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-green-800">
          {language === 'ru' ? 'Рекомендации по эко-мерам' : 'Eco Measures Recommendations'}
        </h2>
        <button 
          onClick={handleAutoCalculation}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <LightBulbIcon className="w-5 h-5" />
          <span>{language === 'ru' ? 'Автоматический расчет' : 'Auto Calculation'}</span>
        </button>
      </div>



      {/* Auto Calculation Report Section */}
      {showFundingNeeded && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <LightBulbIcon className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {language === 'ru' ? 'Автоматический расчет эко-мер на основе отчетов администратора' : 'Auto Calculation of Eco Measures Based on Admin Reports'}
            </h3>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium">
                {language === 'ru' ? 'Всего проектов' : 'Total Projects'}
              </div>
              <div className="text-2xl font-bold text-blue-800">12</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm text-green-600 font-medium">
                {language === 'ru' ? 'Общее финансирование' : 'Total Funding'}
              </div>
              <div className="text-2xl font-bold text-green-800">425M ₸</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-sm text-yellow-600 font-medium">
                {language === 'ru' ? 'Ожидающие финансирование' : 'Awaiting Funding'}
              </div>
              <div className="text-2xl font-bold text-yellow-800">3</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-sm text-orange-600 font-medium">
                {language === 'ru' ? 'В процессе реализации' : 'In Progress'}
              </div>
              <div className="text-2xl font-bold text-orange-800">3</div>
            </div>
          </div>

          {/* Priority Projects Based on Admin Reports */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              {language === 'ru' ? 'Приоритетные проекты на основе отчетов' : 'Priority Projects Based on Reports'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* High Priority - Awaiting Funding */}
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    {language === 'ru' ? 'Высокий приоритет' : 'High Priority'}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                    {language === 'ru' ? 'Ожидает финансирование' : 'Awaiting'}
                  </span>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">
                  {language === 'ru' ? 'Геотермальная станция в Алатау' : 'Geothermal Station in Alatau'}
                </h5>
                <p className="text-sm text-gray-600 mb-3">
                  {language === 'ru' 
                    ? 'Критически важный проект для отелей Алматинской области'
                    : 'Critically important project for hotels in Almaty Region'
                  }
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Требуемое финансирование:' : 'Required Funding:'}</span>
                    <span className="font-medium text-red-600">120,000,000 ₸</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Экологическое влияние:' : 'Environmental Impact:'}</span>
                    <span className="font-medium text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Регион:' : 'Region:'}</span>
                    <span className="font-medium">{language === 'ru' ? 'Алматинская область' : 'Almaty Region'}</span>
                  </div>
                </div>
              </div>

              {/* Medium Priority - In Progress */}
              <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                    {language === 'ru' ? 'Средний приоритет' : 'Medium Priority'}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                    {language === 'ru' ? 'В процессе' : 'In Progress'}
                  </span>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">
                  {language === 'ru' ? 'Ветровая электростанция в Астане' : 'Wind Power Plant in Astana'}
                </h5>
                <p className="text-sm text-gray-600 mb-3">
                  {language === 'ru' 
                    ? 'Проект в процессе реализации для отелей столицы'
                    : 'Project in progress for hotels in the capital'
                  }
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Требуемое финансирование:' : 'Required Funding:'}</span>
                    <span className="font-medium text-red-600">75,000,000 ₸</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Прогресс:' : 'Progress:'}</span>
                    <span className="font-medium text-blue-600">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Регион:' : 'Region:'}</span>
                    <span className="font-medium">{language === 'ru' ? 'Астана' : 'Astana'}</span>
                  </div>
                </div>
              </div>

              {/* Low Priority - Implemented */}
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {language === 'ru' ? 'Низкий приоритет' : 'Low Priority'}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {language === 'ru' ? 'Реализован' : 'Implemented'}
                  </span>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">
                  {language === 'ru' ? 'Эко-отель "Зеленые горы"' : 'Eco Hotel "Green Mountains"'}
                </h5>
                <p className="text-sm text-gray-600 mb-3">
                  {language === 'ru' 
                    ? 'Успешно реализованный проект для туристических объектов'
                    : 'Successfully implemented project for tourist facilities'
                  }
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Полученное финансирование:' : 'Received Funding:'}</span>
                    <span className="font-medium text-green-600">25,000,000 ₸</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Экологическое влияние:' : 'Environmental Impact:'}</span>
                    <span className="font-medium text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Регион:' : 'Region:'}</span>
                    <span className="font-medium">{language === 'ru' ? 'Алматинская область' : 'Almaty Region'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Distribution */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              {language === 'ru' ? 'Распределение по регионам' : 'Regional Distribution'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Алматинская область' : 'Almaty Region'}</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Проектов:' : 'Projects:'}</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Финансирование:' : 'Funding:'}</span>
                    <span className="font-medium">145,000,000 ₸</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Статус:' : 'Status:'}</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {language === 'ru' ? 'Активный' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Астана' : 'Astana'}</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Проектов:' : 'Projects:'}</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Финансирование:' : 'Funding:'}</span>
                    <span className="font-medium">85,000,000 ₸</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Статус:' : 'Status:'}</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {language === 'ru' ? 'Развитие' : 'Development'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Шымкент' : 'Shymkent'}</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Проектов:' : 'Projects:'}</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Финансирование:' : 'Funding:'}</span>
                    <span className="font-medium">60,000,000 ₸</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Статус:' : 'Status:'}</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      {language === 'ru' ? 'Планирование' : 'Planning'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Funding Recommendations */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              {language === 'ru' ? 'Рекомендации по финансированию' : 'Funding Recommendations'}
            </h4>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">48.2%</div>
                  <div className="text-sm text-gray-600">
                    {language === 'ru' ? 'Ожидают финансирование' : 'Awaiting Funding'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">27.1%</div>
                  <div className="text-sm text-gray-600">
                    {language === 'ru' ? 'В процессе реализации' : 'In Progress'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">23.5%</div>
                  <div className="text-sm text-gray-600">
                    {language === 'ru' ? 'Получили финансирование' : 'Received Funding'}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {language === 'ru' 
                    ? 'Рекомендуется приоритетное финансирование проектов в Алматинской области и Астане'
                    : 'Priority funding recommended for projects in Almaty Region and Astana'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-4">
                          <BoltIcon className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {language === 'ru' ? 'Фильтр по категориям' : 'Filter by Categories'}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'energy', 'water', 'waste', 'transport', 'food'].map((filter) => (
            <button
              key={filter}
                              onClick={() => setActiveFilter(filter as 'all' | 'energy' | 'water' | 'waste' | 'transport' | 'food')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === filter
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter === 'all' 
                ? (language === 'ru' ? 'Все' : 'All')
                : getCategoryName(filter)
              }
            </button>
          ))}
        </div>
      </div>

      {/* Accommodation Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
                          <StarIcon className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {language === 'ru' ? 'Отели и размещение' : 'Hotels & Accommodation'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockLocations.map((location) => (
            <div
              key={location.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedLocation?.id === location.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
              onClick={() => handleLocationSelect(location)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{location.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLocationStatusColor(location.status)}`}>
                  {getLocationStatusText(location.status)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-600">{getLocationTypeText(location.type)}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">{location.region}</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{location.rating}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriceRangeColor(location.priceRange)}`}>
                  {getPriceRangeText(location.priceRange)}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{location.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{language === 'ru' ? 'Вместимость:' : 'Capacity:'} {location.capacity}</span>
                <span>{language === 'ru' ? 'Эко-меры:' : 'Eco measures:'} {location.ecoMeasures.length}</span>
              </div>
              
              <div className="text-xs text-gray-400 mt-1">{location.coordinates}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Location Measures */}
      {selectedLocation && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'ru' ? 'Эко-меры для' : 'Eco measures for'} {selectedLocation.name}
              </h3>
              <p className="text-sm text-gray-600">
                {getLocationTypeText(selectedLocation.type)} • {selectedLocation.region}
              </p>
            </div>
            <button
              onClick={() => setSelectedLocation(null)}
              className="text-gray-500 hover:text-gray-700"
            >
                              <StarIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Load Analysis */}
          {(() => {
            const analysis = calculateLoadAnalysis(selectedLocation, mockEcoMeasures);
            const funding = calculateFundingRecommendation(selectedLocation, mockEcoMeasures);
            
            return (
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-800 mb-3">
                  {language === 'ru' ? 'Анализ нагрузки' : 'Load Analysis'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">{language === 'ru' ? 'Текущая нагрузка' : 'Current Load'}</div>
                    <div className="text-lg font-semibold">{analysis.currentLoad} / {analysis.totalCapacity}</div>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${getLoadStatusColor(analysis.loadRatio)}`}>
                      {getLoadStatusText(analysis.loadRatio)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">{language === 'ru' ? 'Пиковая нагрузка' : 'Peak Load'}</div>
                    <div className="text-lg font-semibold">{analysis.peakLoad} / {analysis.totalCapacity}</div>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${getLoadStatusColor(analysis.peakLoadRatio)}`}>
                      {getLoadStatusText(analysis.peakLoadRatio)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">{language === 'ru' ? 'Среднее пребывание' : 'Average Stay'}</div>
                    <div className="text-lg font-semibold">{selectedLocation.averageStay} {language === 'ru' ? 'дней' : 'days'}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {language === 'ru' ? 'Доход:' : 'Revenue:'} {formatCurrency(selectedLocation.monthlyRevenue)}
                    </div>
                  </div>
                </div>

                {/* Funding Recommendations */}
                {analysis.needsFunding && funding.measures.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="text-md font-semibold text-green-800 mb-3">
                      {language === 'ru' ? 'Рекомендации по финансированию' : 'Funding Recommendations'}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">{language === 'ru' ? 'Требуемое финансирование' : 'Required Funding'}</div>
                        <div className="text-lg font-bold text-green-600">{formatCurrency(funding.totalFunding)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">{language === 'ru' ? 'Потенциальная экономия' : 'Potential Savings'}</div>
                        <div className="text-lg font-bold text-blue-600">{formatCurrency(funding.totalSavings)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">{language === 'ru' ? 'Снижение нагрузки' : 'Load Reduction'}</div>
                        <div className="text-lg font-bold text-purple-600">{funding.totalEnvironmentalImpact}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">{language === 'ru' ? 'Выгода для бизнеса' : 'Business Benefit'}</div>
                        <div className="text-lg font-bold text-orange-600">{funding.totalBusinessBenefit}%</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">
                      {language === 'ru' 
                        ? `Срок окупаемости: ${funding.paybackPeriod} месяцев. Рекомендуется финансирование для снижения антропогенной нагрузки и повышения эффективности.`
                        : `Payback period: ${funding.paybackPeriod} months. Funding recommended to reduce anthropogenic load and improve efficiency.`
                      }
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getLocationMeasures(selectedLocation.id).map((measure) => (
              <div key={measure.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(measure.category)}
                    <span className="text-sm font-medium text-gray-600">
                      {getCategoryName(measure.category)}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(measure.priority)}`}>
                    {measure.priority}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{measure.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{measure.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Стоимость:' : 'Cost:'}</span>
                    <span className="font-medium">{formatCurrency(measure.estimatedCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Экономия:' : 'Savings:'}</span>
                    <span className="font-medium text-green-600">{formatCurrency(measure.potentialSavings)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Время:' : 'Time:'}</span>
                    <span className="font-medium">{measure.implementationTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{language === 'ru' ? 'Влияние:' : 'Impact:'}</span>
                    <span className={`font-medium ${getImpactColor(measure.impactScore)}`}>
                      {measure.impactScore}/10
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(measure.status)}`}>
                    {getStatusText(measure.status)}
                  </span>
                  <button
                    onClick={() => handleViewDetails(measure)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {language === 'ru' ? 'Подробнее' : 'Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Measures Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {language === 'ru' ? 'Все эко-меры' : 'All Eco Measures'} 
          {activeFilter !== 'all' && ` - ${getCategoryName(activeFilter)}`}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMeasures.map((measure) => (
            <div key={measure.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(measure.category)}
                  <span className="text-sm font-medium text-gray-600">
                    {getCategoryName(measure.category)}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(measure.priority)}`}>
                  {measure.priority}
                </span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{measure.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{measure.description}</p>
              {measure.location && (
                <div className="mb-3 p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <StarIcon className="w-4 h-4" />
                    <span>{measure.location}</span>
                  </div>
                  <div className="text-xs text-gray-500 ml-5">{measure.coordinates}</div>
                </div>
              )}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'ru' ? 'Стоимость:' : 'Cost:'}</span>
                  <span className="font-medium">{formatCurrency(measure.estimatedCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'ru' ? 'Экономия:' : 'Savings:'}</span>
                  <span className="font-medium text-green-600">{formatCurrency(measure.potentialSavings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'ru' ? 'Время:' : 'Time:'}</span>
                  <span className="font-medium">{measure.implementationTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'ru' ? 'Влияние:' : 'Impact:'}</span>
                  <span className={`font-medium ${getImpactColor(measure.impactScore)}`}>
                    {measure.impactScore}/10
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(measure.status)}`}>
                  {getStatusText(measure.status)}
                </span>
                <button
                  onClick={() => handleViewDetails(measure)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {language === 'ru' ? 'Подробнее' : 'Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detailed view */}
      {showModal && selectedMeasure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-800">{selectedMeasure.title}</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <StarIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Описание' : 'Description'}</h4>
                <p className="text-gray-600">{selectedMeasure.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Категория' : 'Category'}</h4>
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(selectedMeasure.category)}
                    <span>{getCategoryName(selectedMeasure.category)}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Приоритет' : 'Priority'}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedMeasure.priority)}`}>
                    {selectedMeasure.priority}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Статус' : 'Status'}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedMeasure.status)}`}>
                    {getStatusText(selectedMeasure.status)}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Влияние' : 'Impact'}</h4>
                  <span className={`font-medium text-lg ${getImpactColor(selectedMeasure.impactScore)}`}>
                    {selectedMeasure.impactScore}/10
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Стоимость' : 'Cost'}</h4>
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(selectedMeasure.estimatedCost)}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Потенциальная экономия' : 'Potential Savings'}</h4>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(selectedMeasure.potentialSavings)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Время реализации' : 'Implementation Time'}</h4>
                  <p className="text-gray-600">{selectedMeasure.implementationTime}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Регион' : 'Region'}</h4>
                  <p className="text-gray-600">{selectedMeasure.region}</p>
                </div>
              </div>
              
              {selectedMeasure.location && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{language === 'ru' ? 'Местоположение' : 'Location'}</h4>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="font-medium">{selectedMeasure.location}</p>
                    <p className="text-sm text-gray-600">{selectedMeasure.coordinates}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 