import React from 'react';
import { Moon, Sun, Globe, Bell, Shield, HelpCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { Language } from '../../types';

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useApp();

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' }
  ];

  const settingSections = [
    {
      title: 'Appearance',
      icon: theme === 'light' ? Sun : Moon,
      items: [
        {
          label: t('darkMode', language),
          description: 'Toggle between light and dark themes',
          component: (
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          )
        }
      ]
    },
    {
      title: t('language', language),
      icon: Globe,
      items: [
        {
          label: 'Interface Language',
          description: 'Choose your preferred language',
          component: (
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          )
        }
      ]
    },
    {
      title: t('notifications', language),
      icon: Bell,
      items: [
        {
          label: t('medicationReminders', language),
          description: 'Get reminded about medication times',
          component: (
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          )
        },
        {
          label: 'Push Notifications',
          description: 'Receive notifications on your device',
          component: (
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
            </button>
          )
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        {
          label: 'Data Backup',
          description: 'Automatically backup your prescriptions',
          component: (
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          )
        },
        {
          label: 'Analytics',
          description: 'Help improve the app with usage data',
          component: (
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
            </button>
          )
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t('settings', language)}
      </h2>

      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <div
              key={sectionIndex}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {item.label}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <div className="ml-4">
                      {item.component}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <HelpCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Help & Support
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              User Guide
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learn how to use MedPrompt effectively
            </p>
          </button>
          
          <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              Contact Support
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get help from our support team
            </p>
          </button>
        </div>
      </div>

      {/* App Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          About MedPrompt
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>Version 1.0.0</p>
          <p>© 2024 MedPrompt. All rights reserved.</p>
          <p>Revolutionizing healthcare communication through AI-powered voice prescriptions.</p>
        </div>
      </div>
    </div>
  );
}