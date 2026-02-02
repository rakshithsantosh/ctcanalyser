import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-indigo-600';
    };

    return (
        <nav className="sticky top-4 z-50 w-[95%] mx-auto bg-white/70 backdrop-blur-md border border-indigo-100/50 shadow-sm transition-all duration-300 rounded-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Home Link */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            to="/"
                            className="flex items-center gap-3 group"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <img
                                className="h-10 w-10 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                                src="/app-icon.jpg"
                                alt="CTC Analyzer"
                            />
                            <span className="font-bold text-xl tracking-tight text-slate-800 group-hover:text-indigo-700 transition-colors">
                                CTC Analyzer
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/about" className={`text-sm transition-colors duration-200 ${isActive('/about')}`}>
                            About
                        </Link>
                        <Link to="/contact" className={`text-sm transition-colors duration-200 ${isActive('/contact')}`}>
                            Contact
                        </Link>
                        <Link to="/privacy" className={`text-sm transition-colors duration-200 ${isActive('/privacy')}`}>
                            Privacy
                        </Link>
                    </div>

                    {/* Mobile Menu Button (Placeholder for future) */}
                    <div className="flex md:hidden">
                        {/* We can add a mobile menu here later if needed, for now just keeping it simple */}
                        <div className="flex space-x-4">
                            <Link to="/about" className={`text-sm ${isActive('/about')}`}>About</Link>
                            <Link to="/contact" className={`text-sm ${isActive('/contact')}`}>Contact</Link>
                            <Link to="/privacy" className={`text-sm ${isActive('/privacy')}`}>Privacy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
