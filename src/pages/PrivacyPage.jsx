import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react';

const PrivacyPage = () => {
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
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
              <p className="text-slate-500 dark:text-slate-400">Last updated: December 2024</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-500" />
                1. Information We Collect
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We collect information you provide directly to us when you create an account, including:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-3 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, and password</li>
                <li><strong>Learning Data:</strong> Progress, completed lessons, and XP earned</li>
                <li><strong>Usage Data:</strong> How you interact with our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-500" />
                2. How We Use Your Information
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-3 space-y-2">
                <li>Provide, maintain, and improve our Services</li>
                <li>Track your learning progress and maintain streaks</li>
                <li>Send you notifications about your progress (if enabled)</li>
                <li>Respond to your questions and support requests</li>
                <li>Protect against fraud and unauthorized access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-500" />
                3. Data Security
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-3 space-y-2">
                <li>Passwords are encrypted using industry-standard hashing</li>
                <li>All data is transmitted over secure HTTPS connections</li>
                <li>We use Firebase's secure infrastructure for data storage</li>
                <li>Regular security audits and updates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-500" />
                4. Your Rights
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-3 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct your information</li>
                <li><strong>Deletion:</strong> Delete your account and all associated data</li>
                <li><strong>Portability:</strong> Export your learning data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                5. Cookies and Tracking
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We use essential cookies to maintain your session and remember your preferences 
                (like dark mode). We do not use third-party tracking cookies for advertising purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                6. Third-Party Services
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We use the following third-party services to operate our platform:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-3 space-y-2">
                <li><strong>Firebase:</strong> Authentication and database services (Google)</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-300 mt-3">
                These services have their own privacy policies governing the use of your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                7. Children's Privacy
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                ZeroToCode is intended for users of all ages interested in learning programming. 
                If you are under 13 years old, please have a parent or guardian create an account on your behalf.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                8. Changes to This Policy
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-500" />
                9. Contact Us
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@zerotocode.com" className="text-emerald-500 hover:text-emerald-600">
                  privacy@zerotocode.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
