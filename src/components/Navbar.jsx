import { useState } from 'react';
import { Phone, Download, Menu, X, Copy, Check } from 'lucide-react';
import cvFile from '../../public/Cv_ZiadWaleed_Frontend.pdf';
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const phoneNumber = "+201033007891";

    const handleCopyPhone = () => {
        navigator.clipboard.writeText(phoneNumber);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-slate-800/80 font-sans">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="relative flex items-center justify-between h-20">


                    <div className="flex items-center">
                        <a
                            href="#hero"
                            className="text-xl font-extrabold tracking-wider text-slate-100 hover:text-emerald-400 transition-colors font-mono"
                        >
                            ZIAD<span className="text-emerald-400">.ESC</span>
                        </a>
                    </div>


                    <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">

                        <a
                            href="#hero"
                            className="hover:text-emerald-400 transition-colors whitespace-nowrap"
                        >
                            About
                        </a>

                        <a
                            href="#"
                            className="hover:text-emerald-400 transition-colors whitespace-nowrap"
                        >
                            Projects
                        </a>

                        <a
                            href="#CertificatesSection"
                            className="hover:text-emerald-400 transition-colors whitespace-nowrap"
                        >
                            Skills & Certificates
                        </a>

                        <a
                            href="#contact"
                            className="hover:text-emerald-400 transition-colors whitespace-nowrap"
                        >
                            Contact
                        </a>

                    </nav>


                    <div className="hidden lg:flex items-center gap-4">


                        <button
                            onClick={handleCopyPhone}
                            className="flex items-center gap-2 px-3.5 py-2 text-xs rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-all font-mono"
                            title="Click to copy number"
                        >
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />

                            <span>
                                {phoneNumber}
                            </span>

                            {copied ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                                <Copy className="w-3 h-3 text-slate-500" />
                            )}

                        </button>
<a
    href="/cv.pdf"
    download="Ziad_Waleed_CV.pdf"
    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all duration-200 text-sm flex items-center gap-2"
>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
    Download CV
</a>

                    </div>


                    <div className="md:hidden flex items-center">

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 rounded-lg bg-slate-900/80 text-slate-300 hover:text-slate-100 border border-slate-800 transition-colors"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>

                    </div>

                </div>

            </div>

            {isOpen && (
                <div className="md:hidden bg-[#0a0c10]/95 backdrop-blur-xl border-t border-slate-800/80">

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

                        {/* Links */}
                        <nav className="flex flex-col items-center gap-4 text-slate-300">

                            <a
                                href="#hero"
                                onClick={() => setIsOpen(false)}
                                className="hover:text-emerald-400 transition-colors py-1"
                            >
                                About
                            </a>

                            <a
                                href="#projects"
                                onClick={() => setIsOpen(false)}
                                className="hover:text-emerald-400 transition-colors py-1"
                            >
                                Projects
                            </a>

                            <a
                                href="#certificates"
                                onClick={() => setIsOpen(false)}
                                className="hover:text-emerald-400 transition-colors py-1"
                            >
                                Skills & Certificates
                            </a>

                            <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="hover:text-emerald-400 transition-colors py-1"
                            >
                                Contact
                            </a>

                        </nav>


                        <div className="mt-5 pt-5 border-t border-slate-800/80 flex flex-col items-center gap-3">


                            <button
                                onClick={handleCopyPhone}
                                className="flex items-center justify-center gap-2 w-full max-w-sm py-2.5 text-xs rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 font-mono"
                            >
                                <Phone className="w-3.5 h-3.5 text-emerald-400" />

                                <span>
                                    {phoneNumber}
                                </span>

                                {copied ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                    <Copy className="w-3 h-3 text-slate-500" />
                                )}

                            </button>


                            <a
                                href={cvFile}
                                download
                                className="flex items-center justify-center gap-2 w-full max-w-sm py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all duration-200"
                            >
                                <Download className="w-4 h-4" />

                                <span>
                                    Download CV
                                </span>
                            </a>

                        </div>

                    </div>

                </div>
            )}

        </header>
    );
}
