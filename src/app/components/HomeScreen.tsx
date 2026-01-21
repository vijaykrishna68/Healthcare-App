import { motion } from 'motion/react';
import { 
  Brain, 
  FileText, 
  Bell, 
  Receipt, 
  FlaskConical, 
  Shield,
  Sparkles,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface HomeScreenProps {
  onNavigateToInsurance: () => void;
  onNavigateToRecords: () => void;
  onNavigateToTests: () => void;
  userName?: string;
}

interface StatusCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  status?: 'success' | 'warning' | 'neutral';
  onClick?: () => void;
}

function StatusCard({ title, value, subtitle, icon, status = 'neutral', onClick }: StatusCardProps) {
  const statusColors = {
    success: 'from-emerald-500 to-teal-500',
    warning: 'from-amber-500 to-orange-500',
    neutral: 'from-teal-500 to-cyan-500'
  };

  return (
    <motion.button
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all text-left w-full"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${statusColors[status]} flex items-center justify-center shadow-md`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isPrimary?: boolean;
  accentColor?: string;
  onClick?: () => void;
}

function FeatureCard({ icon, title, description, isPrimary, accentColor = 'teal', onClick }: FeatureCardProps) {
  const accentColors = {
    teal: 'from-teal-500 to-cyan-500',
    purple: 'from-purple-500 to-violet-500',
    blue: 'from-blue-500 to-indigo-500',
    pink: 'from-pink-500 to-rose-500',
    emerald: 'from-emerald-500 to-teal-500',
    orange: 'from-orange-500 to-amber-500'
  };

  const iconBgColors = {
    teal: 'bg-teal-50 text-teal-600',
    purple: 'bg-purple-50 text-purple-600',
    blue: 'bg-blue-50 text-blue-600',
    pink: 'bg-pink-50 text-pink-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative p-5 rounded-2xl text-left transition-all duration-300 ${
        isPrimary 
          ? `bg-gradient-to-br ${accentColors[accentColor as keyof typeof accentColors]} text-white shadow-lg shadow-${accentColor}-200/50` 
          : 'bg-white text-gray-900 shadow-md hover:shadow-lg'
      }`}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {isPrimary && (
        <motion.div 
          className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-3 h-3" />
          <span className="text-xs font-medium">AI-powered</span>
        </motion.div>
      )}
      
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
        isPrimary ? 'bg-white/20' : iconBgColors[accentColor as keyof typeof iconBgColors]
      }`}>
        <div className={isPrimary ? 'text-white' : ''}>
          {icon}
        </div>
      </div>
      
      <h3 className={`font-semibold mb-1 ${isPrimary ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      
      <p className={`text-sm ${isPrimary ? 'text-teal-50' : 'text-gray-600'}`}>
        {description}
      </p>
    </motion.button>
  );
}

export function HomeScreen({ onNavigateToInsurance, onNavigateToRecords, onNavigateToTests, userName = 'Guest' }: HomeScreenProps) {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI Insurance Policy Eligibility',
      description: 'Get personalized policy suggestions based on your profile',
      isPrimary: true,
      accentColor: 'teal',
      onClick: onNavigateToInsurance
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Medical Records Management',
      description: 'Store and access your medical history anytime',
      accentColor: 'blue',
      onClick: onNavigateToRecords
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Annual Health Checkup Reminders',
      description: 'Never miss your yearly health assessments',
      accentColor: 'purple',
    },
    {
      icon: <Receipt className="w-6 h-6" />,
      title: 'Medical Bills & Expense Analysis',
      description: 'Track healthcare spending with smart insights',
      accentColor: 'emerald',
    },
    {
      icon: <FlaskConical className="w-6 h-6" />,
      title: 'Lab Reports & Diagnostics',
      description: 'Organize test results and share with doctors',
      accentColor: 'pink',
      onClick: onNavigateToTests
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Free Government Insurance Check',
      description: 'Check eligibility for income-based programs',
      accentColor: 'orange',
    },
  ];

  return (
    <div className="size-full bg-gradient-to-br from-gray-50 to-teal-50/30 overflow-y-auto">
      <div className="max-w-md mx-auto px-6 pt-8 pb-8">
        {/* Header with Greeting */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-1">
            Welcome, {userName}
          </h1>
          <p className="text-gray-600">Your unified healthcare platform</p>
        </motion.div>

        {/* Dynamic Health & Insurance Snapshot */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Quick Overview
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <StatusCard
              title="Insurance Status"
              value="Not Covered"
              subtitle="Check eligibility"
              icon={<AlertCircle className="w-5 h-5" />}
              status="warning"
              onClick={onNavigateToInsurance}
            />
            <StatusCard
              title="Medical Records"
              value="12"
              subtitle="Documents stored"
              icon={<FileText className="w-5 h-5" />}
              status="neutral"
              onClick={onNavigateToRecords}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StatusCard
              title="Bills"
              value="₹8,450"
              subtitle="This month"
              icon={<Receipt className="w-5 h-5" />}
              status="neutral"
            />
            <StatusCard
              title="Labs & Tests"
              value="3"
              subtitle="Recent reports"
              icon={<FlaskConical className="w-5 h-5" />}
              status="success"
              onClick={onNavigateToTests}
            />
          </div>
        </motion.div>

        {/* Feature Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Features
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}