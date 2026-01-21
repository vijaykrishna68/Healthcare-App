import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Phone, Mail, Shield } from 'lucide-react';

interface SignInScreenProps {
  onContinue: () => void;
  onExploreAsGuest: () => void;
}

export function SignInScreen({ onContinue, onExploreAsGuest }: SignInScreenProps) {
  const [signInMethod, setSignInMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue();
  };

  return (
    <div className="size-full bg-gradient-to-br from-teal-50 via-white to-cyan-50 overflow-y-auto">
      <div className="max-w-md mx-auto px-6 min-h-screen flex flex-col justify-center py-12">
        
        {/* Logo & Brand */}
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-teal-200/50">
              <div className="relative">
                <Heart className="w-10 h-10 text-white fill-white" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-4 h-4 text-cyan-200 fill-cyan-200" />
                </motion.div>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">HealthSync</h1>
          <p className="text-gray-600 text-center max-w-xs">
            Smart health records. Smarter insurance decisions.
          </p>
        </motion.div>

        {/* Sign In Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Method Toggle */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setSignInMethod('phone')}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  signInMethod === 'phone'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                <Phone className="w-4 h-4" />
                Phone
              </button>
              <button
                type="button"
                onClick={() => setSignInMethod('email')}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  signInMethod === 'email'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>

            {/* Input Field */}
            {signInMethod === 'phone' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="w-16 px-3 py-3.5 bg-gray-100 rounded-xl text-center font-medium text-gray-700">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-4 py-3.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                  placeholder="Enter email address"
                />
              </div>
            )}

            {/* Primary CTA */}
            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-teal-200/50 hover:shadow-xl hover:shadow-teal-300/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue
            </motion.button>

            {/* Guest Option */}
            <button
              type="button"
              onClick={onExploreAsGuest}
              className="w-full text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              Explore as Guest
            </button>
          </form>

          {/* Trust Message */}
          <div className="mt-8 flex items-start gap-3 p-4 bg-teal-50/50 rounded-xl border border-teal-100">
            <Shield className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              Your health data stays private and secure. We use bank-grade encryption.
            </p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-teal-200/20 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}
