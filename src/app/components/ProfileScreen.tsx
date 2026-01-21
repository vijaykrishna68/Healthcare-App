import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Shield, 
  Bell, 
  Settings,
  LogOut,
  ChevronRight,
  Heart
} from 'lucide-react';

interface ProfileScreenProps {
  onBack?: () => void;
  userName?: string;
}

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function ProfileItem({ icon, label, value }: ProfileItemProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
        <div className="text-teal-600">{icon}</div>
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  onClick?: () => void;
}

function SettingItem({ icon, label, subtitle, onClick }: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-4 px-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
    >
      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
        <div className="text-gray-600">{icon}</div>
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
}

export function ProfileScreen({ onBack, userName = 'Sarah' }: ProfileScreenProps) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{userName}</h2>
              <p className="text-sm text-gray-600 mb-2">Premium Member</p>
              <button className="flex items-center gap-2 text-sm text-teal-600 font-medium hover:text-teal-700">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-1">
            <ProfileItem 
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              value="sarah.johnson@email.com"
            />
            <ProfileItem 
              icon={<Phone className="w-5 h-5" />}
              label="Phone"
              value="+91 98765 43210"
            />
            <ProfileItem 
              icon={<MapPin className="w-5 h-5" />}
              label="Location"
              value="Mumbai, Maharashtra"
            />
            <ProfileItem 
              icon={<Calendar className="w-5 h-5" />}
              label="Date of Birth"
              value="March 15, 1995"
            />
          </div>
        </motion.div>

        {/* Health Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-3 text-center shadow-md">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-2">
              <Heart className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">28</p>
            <p className="text-xs text-gray-600 mt-1">Age</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-md">
            <p className="text-xl font-bold text-gray-900">165</p>
            <p className="text-xs text-gray-600 mt-1">Height (cm)</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-md">
            <p className="text-xl font-bold text-gray-900">62</p>
            <p className="text-xs text-gray-600 mt-1">Weight (kg)</p>
          </div>
        </motion.div>

        {/* Settings Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Settings & Preferences
          </h2>
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SettingItem
              icon={<Shield className="w-5 h-5" />}
              label="Privacy & Security"
              subtitle="Manage your data and security settings"
            />
            <SettingItem
              icon={<Bell className="w-5 h-5" />}
              label="Notifications"
              subtitle="Configure alerts and reminders"
            />
            <SettingItem
              icon={<Settings className="w-5 h-5" />}
              label="App Settings"
              subtitle="Language, theme, and preferences"
            />
          </motion.div>
        </div>

        {/* Logout */}
        <motion.button
          className="w-full mt-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>
      </div>
    </div>
  );
}
