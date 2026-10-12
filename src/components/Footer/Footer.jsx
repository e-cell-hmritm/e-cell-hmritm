import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo/logo.png';
import { Globe, Share2, X, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-neutral-dark text-white pt-20 pb-10 px-6 lg:px-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <img src={Logo} alt="E-Cell Logo" className="h-8 w-auto" />
                        </div>
                        <h2 className="text-xl font-bold font-display">E-Cell HMRITM</h2>
                    </div>
                    <p className="text-neutral-muted text-sm leading-relaxed mb-6">
                        Promoting entrepreneurship and innovation across HMR Institute of Technology and Management.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="size-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-neutral-dark transition-all">
                            <Globe className="size-5" />
                        </a>
                        <a href="#" className="size-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-neutral-dark transition-all">
                            <Share2 className="size-5" />
                        </a>
                        <a href="#" className="size-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-neutral-dark transition-all">
                            <Linkedin className="size-5" />
                        </a>
                        <a href="#" className="size-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-neutral-dark transition-all">
                            <X className="size-5" />
                        </a>
                        <a href="#" className="size-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-neutral-dark transition-all">
                            <Instagram className="size-5" />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-6 font-display">Programs</h4>
                    <ul className="space-y-4 text-sm text-neutral-muted">
                        <li><Link to="/incubation" className="hover:text-primary transition-colors">Incubation Center</Link></li>
                        <li><Link to="/events" className="hover:text-primary transition-colors">Innovations Labs</Link></li>
                        <li><Link to="/gallery" className="hover:text-primary transition-colors">Event Gallery</Link></li>
                        <li><Link to="/team" className="hover:text-primary transition-colors">Team</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 font-display">Support</h4>
                    <ul className="space-y-4 text-sm text-neutral-muted">
                        <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        <li><Link to="/join" className="hover:text-primary transition-colors">Mentorship Program</Link></li>
                        <li><Link to="/join" className="hover:text-primary transition-colors">Grant Guidelines</Link></li>
                        <li><Link to="/join" className="hover:text-primary transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 font-display">Contact Us</h4>
                    <p className="text-sm text-neutral-muted mb-4">
                        HMR Institute of Technology & Management, Hamidpur, Delhi - 110036
                    </p>
                    <p className="text-sm text-primary font-medium underline">e-cell@hmritm.ac.in</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-neutral-muted">© 2026 E-Cell HMRITM. Designed for the builders of tomorrow.</p>
                <div className="flex gap-8 text-xs text-neutral-muted">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
