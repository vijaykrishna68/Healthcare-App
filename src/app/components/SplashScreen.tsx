import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 overflow-hidden relative">
      <div className="relative w-full max-w-md mx-auto px-8 flex flex-col items-center justify-center min-h-screen">
        
        {/* Decorative background elements */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-teal-200/20 rounded-full blur-3xl"
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
        
        <motion.div
          className="absolute bottom-32 left-10 w-40 h-40 bg-cyan-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Main content */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Illustration */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Outer circle with gradient border */}
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 p-1 shadow-xl shadow-teal-200/50">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                {/* Heart icon with AI sparkle */}
                <div className="relative">
                  <Heart className="w-12 h-12 text-teal-500 fill-teal-500" />
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
                    <Sparkles className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Animated pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-teal-300"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.div>

          {/* App Name */}
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            HealthSync
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-gray-600 text-center max-w-xs mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            One place for your health, records, and insurance
          </motion.p>

          {/* Progress Indicator */}
          <motion.div
            className="flex gap-1.5 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-teal-500 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15
                }}
              />
            ))}
          </motion.div>

          {/* Get Started Button */}
          <motion.button
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full shadow-lg shadow-teal-200/50 hover:shadow-xl hover:shadow-teal-300/50 transition-all duration-300 font-semibold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Bottom decorative text */}
        <motion.div
          className="absolute bottom-8 text-xs text-gray-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Powered by AI-driven insights
        </motion.div>
      </div>
    </div>
  );
}