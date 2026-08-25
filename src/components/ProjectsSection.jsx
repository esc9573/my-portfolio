import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projectsData';
import { ChevronRight, ChevronLeft, ExternalLink, Circle, X, Eye } from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    );
}

export default function ProjectsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const nextProject = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const prevProject = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };

    const currentProject = projects[currentIndex];

    const techColors = {
        react: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        tailwind: 'bg-green-500/10 text-green-400 border border-green-500/20',
        nextjs: 'bg-white/10 text-white border border-white/20',
        nodejs: 'bg-emerald-600/10 text-emerald-300 border border-emerald-600/20',
        mongodb: 'bg-green-600/10 text-green-300 border border-green-600/20',
        firebase: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        redux: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
        'framer-motion': 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
    };

    return (
        <section id="projects" className="relative w-full min-h-screen py-24 bg-[#0A0C108C] text-slate-300 font-mono overflow-hidden">
            {/* Ambient Background Grid & Green Glow */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">

                    <h2 className="text-4xl sm:text-5xl font-black text-slate-100 leading-tight uppercase tracking-tight">
                        Dev Journey: Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">{projects.length}</span> Projects
                    </h2>
                    <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm font-sans">
                        From raw concepts to fully responsive web applications, every project represents a step forward in my software development engineering path.
                    </p>
                </div>

                {/* Main Project Card */}
                <div className="relative bg-[#0d1117] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden group">
                    {/* Window Controls Top Bar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#05070a]">
                        <div className="flex items-center gap-1.5">
                            <Circle className="w-3 h-3 text-rose-500 fill-rose-500" />
                            <Circle className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <Circle className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                        </div>
                        <div className="flex-1 max-w-sm mx-4">
                            <div className="bg-[#0a0c10] border border-slate-800 text-slate-500 text-xs rounded-lg px-3 py-1.5 text-center truncate tracking-wide font-mono">
                                ziad-web.esc/projects/{currentProject.title.toLowerCase().replace(/ /g, '-')}
                            </div>
                        </div>
                        <div className="w-12"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                        {/* Left Side: Image */}
                        <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden aspect-[16/10]">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentProject.id}
                                    src={currentProject.image}
                                    alt={currentProject.title}
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        {/* Right Side: Details */}
                        <div className="lg:col-span-2 p-8 sm:p-10 flex flex-col justify-between bg-[#0d1117]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentProject.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, delay: 0.1, ease: 'easeInOut' }}
                                    className="space-y-6 text-left"
                                >
                                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 leading-tight">
                                        {currentProject.title}
                                    </h3>

                                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                                        {currentProject.description}
                                    </p>

                                    <div className="pt-2">
                                        <h4 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">Tech Stack:</h4>
                                        <div className="flex flex-wrap gap-2 justify-start">
                                            {currentProject.tech.map((techItem) => (
                                                <span
                                                    key={techItem}
                                                    className={`px-3 py-1 rounded-md text-xs font-mono font-medium ${techColors[techItem] || 'bg-slate-900 text-slate-300 border border-slate-800'}`}
                                                >
                                                    {techItem}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 pt-8 border-t border-slate-800 mt-8 justify-start">
                                <a
                                    href={currentProject.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono transition-all"
                                >
                                    <GithubIcon className="w-4 h-4" />
                                    <span>GitHub</span>
                                </a>

                                <button
                                    onClick={() => setIsPreviewOpen(true)}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#0a0c10] text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 font-mono"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Live Preview</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <button
                        onClick={prevProject}
                        className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-100 transition-all backdrop-blur-sm lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-x-1"
                        title="Previous Project"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextProject}
                        className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-100 transition-all backdrop-blur-sm lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:-translate-x-1"
                        title="Next Project"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Counter Footer */}
                <div className="text-center mt-8 text-slate-500 text-xs font-mono tracking-widest uppercase">
                    Project <span className="text-emerald-400 font-bold">{currentIndex + 1}</span> of <span className="text-slate-300 font-bold">{projects.length}</span>
                </div>
            </div>

            {/* Interactive iFrame Modal */}
            <AnimatePresence>
                {isPreviewOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-6xl h-[88vh] bg-[#0d1117] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Modal Header Bar */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#05070a]">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-200 font-bold text-xs sm:text-sm">{currentProject.title}</span>
                                    <span className="text-xs text-emerald-400 font-mono hidden sm:inline">({currentProject.liveUrl})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={currentProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all text-xs flex items-center gap-1.5 border border-slate-800"
                                        title="Open in new tab"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline font-mono">New Tab</span>
                                    </a>
                                    <button
                                        onClick={() => setIsPreviewOpen(false)}
                                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
                                        title="Close Preview"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* iFrame Viewport */}
                            <div className="relative flex-1 w-full bg-slate-950">
                                <iframe
                                    src={currentProject.liveUrl}
                                    title={currentProject.title}
                                    className="w-full h-full border-none"
                                    loading="lazy"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}