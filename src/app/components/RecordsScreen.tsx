import { motion } from 'motion/react';
import { FileText, Download, Eye, Upload, Search, Filter } from 'lucide-react';

interface RecordsScreenProps {
  onBack?: () => void;
}

interface MedicalRecord {
  id: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
  hospital: string;
  size: string;
}

const mockRecords: MedicalRecord[] = [
  {
    id: '1',
    title: 'Annual Health Checkup Report',
    type: 'Health Checkup',
    date: 'Jan 15, 2026',
    doctor: 'Dr. Priya Sharma',
    hospital: 'Apollo Hospital',
    size: '2.4 MB'
  },
  {
    id: '2',
    title: 'Prescription - Respiratory Infection',
    type: 'Prescription',
    date: 'Jan 10, 2026',
    doctor: 'Dr. Amit Kumar',
    hospital: 'Fortis Healthcare',
    size: '156 KB'
  },
  {
    id: '3',
    title: 'Dental X-Ray Report',
    type: 'X-Ray',
    date: 'Dec 28, 2025',
    doctor: 'Dr. Meera Desai',
    hospital: 'Smile Dental Clinic',
    size: '1.8 MB'
  },
  {
    id: '4',
    title: 'Blood Test - Lipid Profile',
    type: 'Lab Report',
    date: 'Dec 20, 2025',
    doctor: 'Dr. Rajesh Verma',
    hospital: 'Max Healthcare',
    size: '324 KB'
  },
  {
    id: '5',
    title: 'Vaccination Record - COVID Booster',
    type: 'Vaccination',
    date: 'Nov 15, 2025',
    doctor: 'Dr. Sneha Patel',
    hospital: 'Government Hospital',
    size: '89 KB'
  },
  {
    id: '6',
    title: 'MRI Scan - Lower Back',
    type: 'MRI',
    date: 'Nov 5, 2025',
    doctor: 'Dr. Arun Reddy',
    hospital: 'Medanta Hospital',
    size: '12.5 MB'
  }
];

function RecordCard({ record }: { record: MedicalRecord }) {
  return (
    <motion.div
      className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-teal-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">{record.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded-full font-medium">
              {record.type}
            </span>
            <span className="text-xs text-gray-500">{record.size}</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{record.doctor}</p>
          <p className="text-xs text-gray-500">{record.hospital} • {record.date}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors">
          <Eye className="w-4 h-4" />
          View
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </motion.div>
  );
}

export function RecordsScreen({ onBack }: RecordsScreenProps) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Medical Records</h1>
          <p className="text-gray-600">Your health documents in one place</p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search records..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
            />
          </div>
          <button className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-teal-600">12</p>
            <p className="text-xs text-gray-600 mt-1">Total Records</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-teal-600">4</p>
            <p className="text-xs text-gray-600 mt-1">This Month</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-teal-600">18MB</p>
            <p className="text-xs text-gray-600 mt-1">Storage Used</p>
          </div>
        </div>

        {/* Upload Button */}
        <motion.button
          className="w-full mb-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-teal-200/50 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload className="w-5 h-5" />
          Upload New Record
        </motion.button>

        {/* Records List */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Recent Records
          </h2>
          <div className="space-y-3">
            {mockRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <RecordCard record={record} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
