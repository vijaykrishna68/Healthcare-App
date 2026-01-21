import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Shield, Check } from 'lucide-react';

interface EligibilityFormScreenProps {
  onBack: () => void;
  onSubmit: (data: FormData) => void;
}

export interface FormData {
  // Basic Profile
  age: string;
  gender: string;
  city: string;
  state: string;
  maritalStatus: string;
  dependents: string;
  insureWho: string[];
  
  // Income & Affordability
  employmentType: string;
  annualIncome: string;
  existingInsurance: string;
  coverageAmount: string;
  premiumPayment: string;
  
  // Health Information
  preExistingConditions: string[];
  hospitalization5Years: string;
  height: string;
  weight: string;
  smoking: string;
  alcohol: string;
  regularMedication: string;
  activityLevel: string;
  
  // Family Medical History
  hereditaryConditions: string[];
  
  // Coverage Preferences
  preferredCoverage: string;
  hospitalType: string;
  roomPreference: string;
  cashlessHospitalization: string;
  
  // Add-ons
  addOns: string[];
  
  // Policy Priorities
  priorities: string[];
  
  // Risk & Waiting Period
  waitingPeriod: string;
  coPay: string;
  
  // Consent
  consent: boolean;
}

const TOTAL_STEPS = 9;

export function EligibilityFormScreen({ onBack, onSubmit }: EligibilityFormScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    city: '',
    state: '',
    maritalStatus: '',
    dependents: '',
    insureWho: [],
    employmentType: '',
    annualIncome: '',
    existingInsurance: '',
    coverageAmount: '',
    premiumPayment: '',
    preExistingConditions: [],
    hospitalization5Years: '',
    height: '',
    weight: '',
    smoking: '',
    alcohol: '',
    regularMedication: '',
    activityLevel: '',
    hereditaryConditions: [],
    preferredCoverage: '',
    hospitalType: '',
    roomPreference: '',
    cashlessHospitalization: '',
    addOns: [],
    priorities: [],
    waitingPeriod: '',
    coPay: '',
    consent: false,
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      updateField(field, currentArray.filter(item => item !== value));
    } else {
      updateField(field, [...currentArray, value]);
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="size-full bg-gradient-to-br from-gray-50 to-teal-50/30 overflow-y-auto pb-8">
      <div className="max-w-md mx-auto px-6 pt-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-200/50">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Policy Eligibility</h1>
              <p className="text-sm text-gray-600">Step {currentStep} of {TOTAL_STEPS}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-md mb-6"
          >
            {currentStep === 1 && <Step1BasicProfile formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />}
            {currentStep === 2 && <Step2IncomeAffordability formData={formData} updateField={updateField} />}
            {currentStep === 3 && <Step3HealthInformation formData={formData} updateField={updateField} toggleArrayField={toggleArrayField} />}
            {currentStep === 4 && <Step4FamilyHistory formData={formData} toggleArrayField={toggleArrayField} />}
            {currentStep === 5 && <Step5CoveragePreferences formData={formData} updateField={updateField} />}
            {currentStep === 6 && <Step6AddOns formData={formData} toggleArrayField={toggleArrayField} />}
            {currentStep === 7 && <Step7Priorities formData={formData} toggleArrayField={toggleArrayField} />}
            {currentStep === 8 && <Step8RiskTolerance formData={formData} updateField={updateField} />}
            {currentStep === 9 && <Step9Consent formData={formData} updateField={updateField} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mb-8">
          {currentStep > 1 && (
            <motion.button
              onClick={handlePrevious}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Previous
            </motion.button>
          )}
          <motion.button
            onClick={handleNext}
            className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-teal-200/50 hover:shadow-xl hover:shadow-teal-300/50 transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentStep === TOTAL_STEPS ? 'Analyze My Eligibility' : 'Next'}
            {currentStep < TOTAL_STEPS && <ArrowRight className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Step Components
function Step1BasicProfile({ formData, updateField, toggleArrayField }: any) {
  const insureOptions = ['Self', 'Spouse', 'Parents', 'Children'];
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Profile</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateField('age', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
            placeholder="28"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => updateField('gender', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-white"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateField('city', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
            placeholder="Mumbai"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => updateField('state', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
            placeholder="Maharashtra"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Marital Status</label>
        <div className="grid grid-cols-2 gap-2">
          {['Single', 'Married'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('maritalStatus', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.maritalStatus === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Dependents</label>
        <input
          type="number"
          value={formData.dependents}
          onChange={(e) => updateField('dependents', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
          placeholder="2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Who to insure?</label>
        <div className="grid grid-cols-2 gap-2">
          {insureOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleArrayField('insureWho', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                formData.insureWho.includes(option)
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {formData.insureWho.includes(option) && <Check className="w-4 h-4" />}
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step2IncomeAffordability({ formData, updateField }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Income & Affordability</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
        <div className="grid grid-cols-2 gap-2">
          {['Salaried', 'Self-Employed', 'Freelancer', 'Student'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('employmentType', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.employmentType === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Annual Income (₹)</label>
        <input
          type="text"
          value={formData.annualIncome}
          onChange={(e) => updateField('annualIncome', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
          placeholder="800000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Existing Health Insurance</label>
        <div className="grid grid-cols-3 gap-2">
          {['None', 'Employer', 'Personal'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('existingInsurance', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.existingInsurance === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {formData.existingInsurance !== 'None' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Existing Coverage Amount (₹)</label>
          <input
            type="text"
            value={formData.coverageAmount}
            onChange={(e) => updateField('coverageAmount', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
            placeholder="500000"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Premium Payment</label>
        <div className="grid grid-cols-3 gap-2">
          {['Monthly', 'Quarterly', 'Yearly'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('premiumPayment', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.premiumPayment === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3HealthInformation({ formData, updateField, toggleArrayField }: any) {
  const conditions = ['Diabetes', 'Blood Pressure', 'Thyroid', 'Asthma', 'Heart Condition', 'None'];
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Pre-existing Conditions</label>
        <div className="grid grid-cols-2 gap-2">
          {conditions.map((condition) => (
            <button
              key={condition}
              type="button"
              onClick={() => toggleArrayField('preExistingConditions', condition)}
              className={`py-2.5 px-3 rounded-xl font-medium transition-all text-sm flex items-center justify-center gap-2 ${
                formData.preExistingConditions.includes(condition)
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {formData.preExistingConditions.includes(condition) && <Check className="w-3 h-3" />}
              {condition}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hospitalization in last 5 years?</label>
        <div className="grid grid-cols-2 gap-2">
          {['Yes', 'No'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('hospitalization5Years', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.hospitalization5Years === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Height (cm)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => updateField('height', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
            placeholder="170"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Weight (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => updateField('weight', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
            placeholder="70"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Smoking</label>
          <div className="flex gap-2">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateField('smoking', option)}
                className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
                  formData.smoking === option
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alcohol</label>
          <div className="flex gap-2">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateField('alcohol', option)}
                className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
                  formData.alcohol === option
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Regular Medication</label>
        <div className="grid grid-cols-2 gap-2">
          {['Yes', 'No'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('regularMedication', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.regularMedication === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
        <div className="grid grid-cols-3 gap-2">
          {['Low', 'Moderate', 'Active'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('activityLevel', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.activityLevel === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4FamilyHistory({ formData, toggleArrayField }: any) {
  const conditions = ['Diabetes', 'Heart Disease', 'Cancer', 'None'];
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Family Medical History</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hereditary Conditions
        </label>
        <p className="text-sm text-gray-500 mb-3">Select all that apply in your immediate family</p>
        <div className="grid grid-cols-2 gap-2">
          {conditions.map((condition) => (
            <button
              key={condition}
              type="button"
              onClick={() => toggleArrayField('hereditaryConditions', condition)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                formData.hereditaryConditions.includes(condition)
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {formData.hereditaryConditions.includes(condition) && <Check className="w-4 h-4" />}
              {condition}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step5CoveragePreferences({ formData, updateField }: any) {
  const coverageAmounts = ['₹5L', '₹10L', '₹25L', '₹50L'];
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Coverage Preferences</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Coverage Amount</label>
        <div className="grid grid-cols-2 gap-2">
          {coverageAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => updateField('preferredCoverage', amount)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.preferredCoverage === amount
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {amount}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Hospital Type</label>
        <div className="grid grid-cols-3 gap-2">
          {['Private', 'Government', 'Any'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('hospitalType', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.hospitalType === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Room Type Preference</label>
        <div className="space-y-2">
          {['General Ward', 'Shared Room', 'Single Private Room'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('roomPreference', option)}
              className={`w-full py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.roomPreference === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cashless Hospitalization Preference</label>
        <div className="grid grid-cols-2 gap-2">
          {['Yes', 'No'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('cashlessHospitalization', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.cashlessHospitalization === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step6AddOns({ formData, toggleArrayField }: any) {
  const addOns = [
    'Maternity Coverage',
    'OPD Coverage',
    'Mental Health Coverage',
    'Critical Illness Rider',
    'No Claim Bonus Benefit'
  ];
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Add-On Preferences</h2>
      <p className="text-sm text-gray-600 mb-3">Select additional coverage you'd like</p>
      
      <div className="space-y-2">
        {addOns.map((addOn) => (
          <button
            key={addOn}
            type="button"
            onClick={() => toggleArrayField('addOns', addOn)}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-between ${
              formData.addOns.includes(addOn)
                ? 'bg-teal-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{addOn}</span>
            {formData.addOns.includes(addOn) && <Check className="w-5 h-5" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step7Priorities({ formData, toggleArrayField }: any) {
  const priorities = [
    'Lowest Premium',
    'Highest Coverage',
    'Short Waiting Period',
    'High Claim Settlement Ratio',
    'Large Hospital Network'
  ];
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Policy Priorities</h2>
      <p className="text-sm text-gray-600 mb-3">What matters most to you? (Select top 3)</p>
      
      <div className="space-y-2">
        {priorities.map((priority, index) => (
          <button
            key={priority}
            type="button"
            onClick={() => toggleArrayField('priorities', priority)}
            disabled={!formData.priorities.includes(priority) && formData.priorities.length >= 3}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-between ${
              formData.priorities.includes(priority)
                ? 'bg-teal-500 text-white shadow-md'
                : formData.priorities.length >= 3
                ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{priority}</span>
            {formData.priorities.includes(priority) && (
              <div className="flex items-center gap-2">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  #{formData.priorities.indexOf(priority) + 1}
                </span>
                <Check className="w-5 h-5" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step8RiskTolerance({ formData, updateField }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk & Waiting Period Tolerance</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Waiting Period Acceptance</label>
        <p className="text-sm text-gray-500 mb-3">Can you wait 2-4 years for certain conditions to be covered?</p>
        <div className="grid grid-cols-2 gap-2">
          {['Yes', 'No'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('waitingPeriod', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.waitingPeriod === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Co-Pay Acceptance</label>
        <p className="text-sm text-gray-500 mb-3">Willing to pay a percentage of claims to lower premiums?</p>
        <div className="grid grid-cols-2 gap-2">
          {['Yes', 'No'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField('coPay', option)}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all ${
                formData.coPay === option
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step9Consent({ formData, updateField }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Consent & Disclaimer</h2>
      
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 space-y-3">
        <p className="text-sm text-gray-700">
          <strong>Important:</strong> This platform provides AI-powered insurance recommendations based on the information you provide.
        </p>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>We are not an insurance provider</li>
          <li>Recommendations are for informational purposes only</li>
          <li>Final eligibility is determined by insurers</li>
          <li>Your data is encrypted and secure</li>
        </ul>
      </div>

      <button
        type="button"
        onClick={() => updateField('consent', !formData.consent)}
        className={`w-full p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
          formData.consent
            ? 'border-teal-500 bg-teal-50'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
          formData.consent
            ? 'border-teal-500 bg-teal-500'
            : 'border-gray-300'
        }`}>
          {formData.consent && <Check className="w-3 h-3 text-white" />}
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-gray-900">I consent to use my health and financial data</p>
          <p className="text-xs text-gray-600 mt-1">
            I understand this is a recommendation platform and agree to the terms of service
          </p>
        </div>
      </button>
    </div>
  );
}