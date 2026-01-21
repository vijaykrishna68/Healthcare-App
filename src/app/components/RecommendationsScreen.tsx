import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Clock,
  BadgeCheck,
  Star
} from 'lucide-react';

interface RecommendationsScreenProps {
  onBack: () => void;
}

interface PolicyRecommendation {
  id: string;
  insurerName: string;
  planName: string;
  eligibilityStatus: 'Eligible' | 'Likely Eligible' | 'Needs Review';
  coverageAmount: string;
  monthlyPremium: string;
  yearlyPremium: string;
  claimSettlementRatio: string;
  aiMatchScore: number;
  keyBenefits: string[];
  waitingPeriods: { condition: string; period: string }[];
  majorExclusions: string[];
  recommendedAddOns: string[];
  whySuitable: string;
}

const mockRecommendations: PolicyRecommendation[] = [
  {
    id: '1',
    insurerName: 'Star Health',
    planName: 'Comprehensive Plus',
    eligibilityStatus: 'Eligible',
    coverageAmount: '₹10,00,000',
    monthlyPremium: '₹2,450',
    yearlyPremium: '₹27,500',
    claimSettlementRatio: '92.3%',
    aiMatchScore: 94,
    keyBenefits: [
      'Cashless hospitalization at 12,000+ hospitals',
      'No room rent capping',
      'Pre & post hospitalization coverage (60/180 days)',
      'Automatic sum insured restoration',
      'Maternity coverage available'
    ],
    waitingPeriods: [
      { condition: 'Pre-existing diseases', period: '36 months' },
      { condition: 'Specific diseases', period: '24 months' }
    ],
    majorExclusions: [
      'Self-inflicted injuries',
      'Cosmetic procedures',
      'Experimental treatments'
    ],
    recommendedAddOns: [
      'Critical Illness Rider',
      'No Claim Bonus Super',
      'OPD Coverage'
    ],
    whySuitable: 'Perfect match for your income bracket and family size. High claim settlement ratio and comprehensive coverage without room rent caps align with your preferences.'
  },
  {
    id: '2',
    insurerName: 'HDFC ERGO',
    planName: 'Optima Secure',
    eligibilityStatus: 'Eligible',
    coverageAmount: '₹10,00,000',
    monthlyPremium: '₹2,680',
    yearlyPremium: '₹30,000',
    claimSettlementRatio: '95.1%',
    aiMatchScore: 91,
    keyBenefits: [
      'Best-in-class claim settlement ratio',
      'No pre-policy medical checkup up to 55 years',
      'Sum insured up to ₹50 lakhs',
      'Worldwide coverage for emergencies',
      'Health return benefit'
    ],
    waitingPeriods: [
      { condition: 'Pre-existing diseases', period: '48 months' },
      { condition: 'Specific diseases', period: '24 months' }
    ],
    majorExclusions: [
      'War-related injuries',
      'Dental procedures (unless from accident)',
      'Alternative therapies'
    ],
    recommendedAddOns: [
      'Global Coverage Extension',
      'Personal Accident Cover',
      'Mental Health Support'
    ],
    whySuitable: 'Industry-leading claim settlement ratio and global coverage make this ideal for frequent travelers. Slightly higher premium but superior service quality.'
  },
  {
    id: '3',
    insurerName: 'Care Health',
    planName: 'Care Advantage',
    eligibilityStatus: 'Likely Eligible',
    coverageAmount: '₹10,00,000',
    monthlyPremium: '₹2,290',
    yearlyPremium: '₹25,500',
    claimSettlementRatio: '89.7%',
    aiMatchScore: 86,
    keyBenefits: [
      'Unlimited automatic restoration',
      'Health check-up every year',
      'Modern treatment coverage (robotic surgery, etc.)',
      'Waiver of pre-policy checkup',
      'Loyalty benefits'
    ],
    waitingPeriods: [
      { condition: 'Pre-existing diseases', period: '36 months' },
      { condition: 'Specific diseases', period: '24 months' }
    ],
    majorExclusions: [
      'Non-allopathic treatments',
      'Obesity treatment',
      'Congenital diseases (some conditions apply)'
    ],
    recommendedAddOns: [
      'Super NCB',
      'OPD Expenses',
      'Home Care Treatment'
    ],
    whySuitable: 'Most affordable option with good coverage. Ideal if you prioritize lower premiums while maintaining comprehensive benefits. Modern treatment coverage is a plus.'
  }
];

function PolicyCard({ policy }: { policy: PolicyRecommendation }) {
  const statusConfig = {
    'Eligible': { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
    'Likely Eligible': { color: 'text-teal-600', bg: 'bg-teal-50', icon: AlertCircle },
    'Needs Review': { color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock }
  };

  const config = statusConfig[policy.eligibilityStatus];
  const StatusIcon = config.icon;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with AI Match Score */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold mb-1">{policy.insurerName}</h3>
              <p className="text-teal-100">{policy.planName}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">AI Match</span>
              </div>
              <div className="text-3xl font-bold">{policy.aiMatchScore}%</div>
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg} ${config.color}`}>
            <StatusIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{policy.eligibilityStatus}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Coverage & Premium */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-600 mb-1">Coverage Amount</p>
            <p className="text-2xl font-bold text-gray-900">{policy.coverageAmount}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-600 mb-1">Yearly Premium</p>
            <p className="text-2xl font-bold text-teal-600">{policy.yearlyPremium}</p>
            <p className="text-xs text-gray-500 mt-0.5">{policy.monthlyPremium}/month</p>
          </div>
        </div>

        {/* Claim Settlement Ratio */}
        <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-gray-900">Claim Settlement Ratio</span>
          </div>
          <span className="text-lg font-bold text-emerald-600">{policy.claimSettlementRatio}</span>
        </div>

        {/* Why Suitable */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
          <div className="flex items-start gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <h4 className="text-sm font-semibold text-gray-900">Why this policy suits you</h4>
          </div>
          <p className="text-sm text-gray-700">{policy.whySuitable}</p>
        </div>

        {/* Key Benefits */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Star className="w-4 h-4 text-teal-600" />
            Key Benefits
          </h4>
          <ul className="space-y-1.5">
            {policy.keyBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Waiting Periods */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            Waiting Periods
          </h4>
          <div className="space-y-1.5">
            {policy.waitingPeriods.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{item.condition}</span>
                <span className="font-medium text-gray-900">{item.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Major Exclusions */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-600" />
            Major Exclusions
          </h4>
          <ul className="space-y-1.5">
            {policy.majorExclusions.map((exclusion, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-600 flex-shrink-0">•</span>
                <span>{exclusion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Add-Ons */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Best Add-Ons for You</h4>
          <div className="flex flex-wrap gap-2">
            {policy.recommendedAddOns.map((addon, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-full"
              >
                {addon}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.button
          className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get This Policy
        </motion.button>
      </div>
    </motion.div>
  );
}

export function RecommendationsScreen({ onBack }: RecommendationsScreenProps) {
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
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-200/50">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Best-Fit Plans</h1>
              <p className="text-sm text-gray-600">AI-powered recommendations</p>
            </div>
          </div>

          {/* Analysis Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Analysis Complete</h3>
                <p className="text-sm text-gray-600">
                  We've analyzed {mockRecommendations.length} policies based on your profile and preferences. 
                  These recommendations are ranked by AI match score and suitability.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Government Insurance Eligibility */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Government Insurance Eligibility</h3>
                <p className="text-sm text-emerald-50 mb-3">
                  Based on your income, you may qualify for Ayushman Bharat or state-sponsored programs.
                </p>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-all">
                  Check Eligibility
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Policy Recommendations */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Top Recommendations
          </h2>
          
          {mockRecommendations.map((policy, index) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <PolicyCard policy={policy} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-6 bg-white rounded-2xl p-5 shadow-md text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm text-gray-600 mb-3">
            Need help choosing? Our experts can guide you through the best option.
          </p>
          <button className="px-6 py-2.5 border-2 border-teal-500 text-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-all">
            Consult an Expert
          </button>
        </motion.div>

        {/* Bottom spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}