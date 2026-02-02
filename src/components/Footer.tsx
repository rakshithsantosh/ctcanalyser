import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="py-12 px-6 sm:px-12 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <Link to="/" className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors">Indian Payslip Analyzer</Link>
                    <p className="text-slate-500 text-sm mt-1">Built for transparency.</p>
                </div>

                <div className="flex space-x-6">
                    <Link to="/privacy" className="text-slate-400 hover:text-indigo-600 transition-colors">Privacy</Link>
                    <Link to="/about" className="text-slate-400 hover:text-indigo-600 transition-colors">About</Link>
                </div>

                <div className="mt-6 md:mt-0 text-slate-400 text-sm">
                    © {new Date().getFullYear()} CTC Analyzer.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
