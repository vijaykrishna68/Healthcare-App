import { motion, AnimatePresence } from 'motion/react';
import { Home, Shield, FileText, User, FlaskConical, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface VerticalNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function VerticalNavigation({ activeTab, onTabChange }: VerticalNavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'records', label: 'Records', icon: FileText },
    { id: 'tests', label: 'Tests', icon: FlaskConical },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 shadow-lg z-50 flex flex-col py-8"
      initial={{ width: 80 }}
      animate={{ width: isCollapsed ? 60 : 200 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Collapse Toggle Button */}
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-600 transition-colors z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col gap-3 mt-8 px-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-3 transition-all rounded-xl overflow-hidden ${
                isCollapsed ? 'justify-center' : 'justify-start'
              }`}
            >
              <motion.div
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-200/50' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-sm font-medium whitespace-nowrap ${
                        isActive ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  className="absolute right-0 top-1/2 w-1 h-8 bg-teal-500 rounded-l-full"
                  layoutId="activeIndicator"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{ y: '-50%' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}