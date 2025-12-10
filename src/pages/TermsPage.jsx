import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Shield, Scale } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-violet-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
            <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
              <p className="text-slate-500 dark:text-slate-400">Last updated: December 2024</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-violet-500" />
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                By accessing and using ZeroToCode ("the Service"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                ZeroToCode is an educational platform designed to teach programming concepts through interactive 
                visualizations and hands-on coding exercises. The Service includes but is not limited to:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-3 space-y-2">
                <li>Interactive learning modules</li>
                <li>Code visualization tools</li>
                <li>Programming playground</li>
                <li>Progress tracking features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                3. User Accounts
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all 
                activities that occur under your account. You agree to notify us immediately of any unauthorized 
                use of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                4. Acceptable Use
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-3 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Distribute malicious code or attempt to hack the Service</li>
                <li>Share your account with others or create multiple accounts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                All content on ZeroToCode, including but not limited to text, graphics, logos, and software, 
                is the property of ZeroToCode or its content suppliers and is protected by intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                ZeroToCode shall not be liable for any indirect, incidental, special, consequential, or punitive 
                damages resulting from your use of or inability to use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                7. Changes to Terms
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of significant 
                changes via email or through the Service. Continued use after changes constitutes acceptance 
                of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                8. Contact Us
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:support@zerotocode.com" className="text-violet-500 hover:text-violet-600">
                  support@zerotocode.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
