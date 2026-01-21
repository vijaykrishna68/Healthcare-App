import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SignInScreen } from '@/app/components/SignInScreen';
import { SplashScreen } from '@/app/components/SplashScreen';
import { HomeScreen } from '@/app/components/HomeScreen';
import { EligibilityFormScreen, FormData } from '@/app/components/EligibilityFormScreen';
import { RecommendationsScreen } from '@/app/components/RecommendationsScreen';
import { RecordsScreen } from '@/app/components/RecordsScreen';
import { TestsScreen } from '@/app/components/TestsScreen';
import { ProfileScreen } from '@/app/components/ProfileScreen';
import { VerticalNavigation } from '@/app/components/VerticalNavigation';

type Screen = 'signin' | 'splash' | 'home' | 'eligibility-form' | 'recommendations' | 'records' | 'tests' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userName, setUserName] = useState<string>('Guest');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const handleSignInContinue = () => {
    setUserName('Sarah'); // Mock user name
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleExploreAsGuest = () => {
    setUserName('Guest');
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleGetStarted = () => {
    setCurrentScreen('signin');
  };

  const handleNavigateToInsurance = () => {
    setCurrentScreen('eligibility-form');
    setActiveTab('insurance');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setCurrentScreen('recommendations');
  };

  const handleBackFromRecommendations = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    } else if (tab === 'insurance') {
      setCurrentScreen('eligibility-form');
    } else if (tab === 'records') {
      setCurrentScreen('records');
    } else if (tab === 'tests') {
      setCurrentScreen('tests');
    } else if (tab === 'profile') {
      setCurrentScreen('profile');
    }
  };

  // Determine if bottom navigation should be shown
  const showBottomNav = !['signin', 'splash'].includes(currentScreen);

  return (
    <div className="size-full bg-white overflow-hidden flex">
      {/* Vertical Navigation - Shown on main app screens */}
      {showBottomNav && (
        <VerticalNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {/* Main Content Area */}
      <motion.div
        className="flex-1"
        initial={{ marginLeft: 0 }}
        animate={{ marginLeft: showBottomNav ? (isNavCollapsed ? 60 : 200) : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          {currentScreen === 'signin' && (
            <motion.div
              key="signin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="size-full"
            >
              <SignInScreen 
                onContinue={handleSignInContinue}
                onExploreAsGuest={handleExploreAsGuest}
              />
            </motion.div>
          )}

          {currentScreen === 'splash' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="size-full"
            >
              <SplashScreen onGetStarted={handleGetStarted} />
            </motion.div>
          )}

          {currentScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="size-full"
            >
              <HomeScreen 
                onNavigateToInsurance={handleNavigateToInsurance}
                onNavigateToRecords={() => {
                  setCurrentScreen('records');
                  setActiveTab('records');
                }}
                onNavigateToTests={() => {
                  setCurrentScreen('tests');
                  setActiveTab('tests');
                }}
                userName={userName}
              />
            </motion.div>
          )}

          {currentScreen === 'eligibility-form' && (
            <motion.div
              key="eligibility-form"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="size-full"
            >
              <EligibilityFormScreen 
                onBack={handleBackToHome}
                onSubmit={handleFormSubmit}
              />
            </motion.div>
          )}

          {currentScreen === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="size-full"
            >
              <RecommendationsScreen onBack={handleBackFromRecommendations} />
            </motion.div>
          )}

          {currentScreen === 'records' && (
            <motion.div
              key="records"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="size-full"
            >
              <RecordsScreen onBack={handleBackToHome} />
            </motion.div>
          )}

          {currentScreen === 'tests' && (
            <motion.div
              key="tests"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="size-full"
            >
              <TestsScreen onBack={handleBackToHome} />
            </motion.div>
          )}

          {currentScreen === 'profile' && (
            <motion.div
              key="profile"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="size-full"
            >
              <ProfileScreen onBack={handleBackToHome} userName={userName} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}