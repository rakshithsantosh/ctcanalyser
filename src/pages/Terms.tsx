import React from 'react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-indigo-50 p-8 sm:p-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms and Conditions</h1>

                <div className="prose prose-slate max-w-none text-slate-600">
                    <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Introduction</h2>
                    <p className="mb-4">
                        Welcome to Indian Payslip / CTC Analyzer. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. Use of Service</h2>
                    <p className="mb-4">
                        This service is provided for informational purposes only. While we strive for accuracy, the tax calculations and analyses provided are estimates based on the information you provide and general tax laws. They should not be considered as official financial or legal advice.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Privacy Policy</h2>
                    <p className="mb-4">
                        We value your privacy. We do not store your personal financial data on our servers. All calculations are performed properly, unless you voluntarily submit information through our contact forms. Please review our Privacy Policy for more details.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Disclaimer of Warranties</h2>
                    <p className="mb-4">
                        The service is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the service or the information, content, or materials included.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">5. Limitation of Liability</h2>
                    <p className="mb-4">
                        In no event shall CTC Analyzer be liable for any damages arising out of the use or inability to use the materials on this website, even if we have been notified of the possibility of such damage.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">6. Contact Information</h2>
                    <p className="mb-4">
                        If you have any questions about these Terms, please contact us via our <Link to="/contact" className="text-indigo-600 hover:underline">Contact Page</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
