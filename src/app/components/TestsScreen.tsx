import { motion } from 'motion/react';
import { FlaskConical, Calendar, TrendingUp, TrendingDown, Minus, Download, Eye } from 'lucide-react';

interface TestsScreenProps {
  onBack?: () => void;
}

interface LabTest {
  id: string;
  testName: string;
  date: string;
  status: 'Normal' | 'Abnormal' | 'Critical';
  result: string;
  normalRange: string;
  trend?: 'up' | 'down' | 'stable';
}

const mockTests: LabTest[] = [
  {
    id: '1',
    testName: 'Blood Glucose (Fasting)',
    date: 'Jan 15, 2026',
    status: 'Normal',
    result: '92 mg/dL',
    normalRange: '70-100 mg/dL',
    trend: 'stable'
  },
  {
    id: '2',
    testName: 'Total Cholesterol',
    date: 'Jan 15, 2026',
    status: 'Abnormal',
    result: '215 mg/dL',
    normalRange: '<200 mg/dL',
    trend: 'up'
  },
  {
    id: '3',
    testName: 'Hemoglobin',
    date: 'Jan 15, 2026',
    status: 'Normal',
    result: '14.2 g/dL',
    normalRange: '12-16 g/dL',
    trend: 'up'
  },
  {
    id: '4',
    testName: 'Vitamin D',
    date: 'Dec 20, 2025',
    status: 'Abnormal',
    result: '18 ng/mL',
    normalRange: '30-100 ng/mL',
    trend: 'down'
  },
  {
    id: '5',
    testName: 'TSH (Thyroid)',
    date: 'Dec 20, 2025',
    status: 'Normal',
    result: '2.1 mIU/L',
    normalRange: '0.5-5.0 mIU/L',
    trend: 'stable'
  },
  {
    id: '6',
    testName: 'Creatinine',
    date: 'Nov 10, 2025',
    status: 'Normal',
    result: '0.9 mg/dL',
    normalRange: '0.6-1.2 mg/dL',
    trend: 'stable'
  }
];

function TestCard({ test }: { test: LabTest }) {
  const statusConfig = {
    Normal: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    Abnormal: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    Critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
  };

  const config = statusConfig[test.status];

  const TrendIcon = test.trend === 'up' ? TrendingUp : test.trend === 'down' ? TrendingDown : Minus;
  const trendColor = test.trend === 'up' ? 'text-emerald-600' : test.trend === 'down' ? 'text-red-600' : 'text-gray-400';

  return (
    <motion.div
      className={`bg-white rounded-xl p-4 shadow-md border-l-4 ${config.border} hover:shadow-lg transition-all`}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{test.testName}</h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 ${config.bg} ${config.text} rounded-full font-medium`}>
              {test.status}
            </span>
            <span className="text-xs text-gray-500">{test.date}</span>
          </div>
        </div>
        {test.trend && (
          <TrendIcon className={`w-5 h-5 ${trendColor}`} />
        )}
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Result</span>
          <span className="text-sm font-semibold text-gray-900">{test.result}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Normal Range</span>
          <span className="text-sm text-gray-500">{test.normalRange}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-100">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors">
          <Eye className="w-4 h-4" />
          View Report
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </motion.div>
  );
}

export function TestsScreen({ onBack }: TestsScreenProps) {
  const normalCount = mockTests.filter(t => t.status === 'Normal').length;
  const abnormalCount = mockTests.filter(t => t.status === 'Abnormal').length;

  return (
    <div className="size-full bg-gradient-to-br from-gray-50 to-teal-50/30 overflow-y-auto pb-8">
      <div className="max-w-md mx-auto px-6 pt-8">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Lab Tests & Reports</h1>
          <p className="text-gray-600">Track your diagnostic results</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 text-center shadow-md">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-2">
              <FlaskConical className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockTests.length}</p>
            <p className="text-xs text-gray-600 mt-1">Total Tests</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">{normalCount}</p>
            <p className="text-xs text-gray-600 mt-1">Normal</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-md">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-2">
              <TrendingDown className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-600">{abnormalCount}</p>
            <p className="text-xs text-gray-600 mt-1">Flagged</p>
          </div>
        </div>

        {/* Next Checkup */}
        <motion.div
          className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-4 mb-6 text-white shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-start gap-3">
            <Calendar className="w-6 h-6 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Next Checkup Due</h3>
              <p className="text-sm text-teal-50 mb-3">
                Your annual health checkup is recommended in 6 months
              </p>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-all">
                Schedule Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tests List */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Recent Test Results
          </h2>
          <div className="space-y-3">
            {mockTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <TestCard test={test} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
