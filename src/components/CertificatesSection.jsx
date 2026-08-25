import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, ExternalLink } from 'lucide-react';

const TechIcon = ({ type }) => {
    switch (type) {
        case 'react':
            return (
                <svg className="w-9 h-9 text-[#61DAFB] animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                    <ellipse cx="50" cy="50" rx="42" ry="16" stroke="currentColor" strokeWidth="6" transform="rotate(0 50 50)" />
                    <ellipse cx="50" cy="50" rx="42" ry="16" stroke="currentColor" strokeWidth="6" transform="rotate(60 50 50)" />
                    <ellipse cx="50" cy="50" rx="42" ry="16" stroke="currentColor" strokeWidth="6" transform="rotate(120 50 50)" />
                    <circle cx="50" cy="50" r="8" fill="currentColor" />
                </svg>
            );
        case 'js':
            return (
                <div className="w-9 h-9 bg-[#F7DF1E] text-black font-black text-lg flex items-end justify-end p-1 rounded-md transform -rotate-3 select-none">
                    JS
                </div>
            );
        case 'tailwind':
            return (
                <svg className="w-9 h-9 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.33 8.33 11 9C11.95 9.38 12.67 10.11 13.48 10.93C14.8 12.27 16.35 13.84 20 13.84C22.67 13.84 24.33 12.51 25 9.84C24 11.17 22.67 11.51 21 10.84C20.05 10.46 19.33 9.73 18.52 8.91C17.2 7.57 15.65 6 12 6ZM7 13.84C4.33 13.84 2.67 15.17 2 17.84C3 16.51 4.33 16.17 6 16.84C6.95 17.22 7.67 17.95 8.48 18.77C9.8 20.11 11.35 21.68 15 21.68C17.67 21.68 19.33 20.35 20 17.68C19 19.01 17.67 19.35 16 18.68C15.05 18.3 14.33 17.57 13.52 16.75C12.2 15.41 10.65 13.84 7 13.84Z" />
                </svg>
            );
        case 'html':
            return (
                <div className="w-9 h-9 font-extrabold text-white bg-gradient-to-br from-[#E34F26] to-[#F06529] flex items-center justify-center rounded-lg select-none">
                    5
                </div>
            );
        case 'css':
            return (
                <div className="w-9 h-9 font-extrabold text-white bg-gradient-to-br from-[#1572B6] to-[#33A9DC] flex items-center justify-center rounded-lg select-none">
                    3
                </div>
            );
        case 'cpp':
            return (
                <div className="w-9 h-9 font-mono font-black text-xs bg-[#00599C] text-white flex items-center justify-center rounded-lg select-none">
                    C++
                </div>
            );
        case 'csharp':
            return (
                <div className="w-9 h-9 font-mono font-black text-xs bg-[#9B4F96] text-white flex items-center justify-center rounded-lg select-none">
                    C#
                </div>
            );
        case 'sql':
            return (
                <div className="w-9 h-9 font-mono font-bold text-[10px] bg-[#CC292B] text-white flex items-center justify-center rounded-lg select-none">
                    SQL
                </div>
            );
        case 'php':
            return (
                <div className="w-9 h-9 font-mono font-bold text-[10px] bg-[#777BB4] text-white flex items-center justify-center rounded-lg select-none">
                    PHP
                </div>
            );
        case 'python':
            return (
                <div className="w-9 h-9 font-mono font-bold text-[10px] bg-[#3776AB] text-amber-300 flex items-center justify-center rounded-lg select-none">
                    Py
                </div>
            );
        default:
            return <div className="w-8 h-8 bg-slate-900 rounded-full" />;
    }
};

export default function CertificatesSection() {
    const skills = [
        { id: 1, name: 'React.js', category: 'Frontend', iconType: 'react', level: 'Expert', desc: 'Component Architecture, Custom Hooks, State Management' },
        { id: 2, name: 'JavaScript', category: 'Language', iconType: 'js', level: 'Expert', desc: 'ES6+, Async/Await, DOM, Functional Programming' },
        { id: 3, name: 'Tailwind CSS', category: 'Styling', iconType: 'tailwind', level: 'Expert', desc: 'Responsive Design, Utility-First Layouts, Animations' },
        { id: 4, name: 'HTML5', category: 'Markup', iconType: 'html', level: 'Expert', desc: 'Semantic Structure, SEO & Web Accessibility (a11y)' },
        { id: 5, name: 'CSS3', category: 'Styling', iconType: 'css', level: 'Advanced', desc: 'Flexbox, Grid, Keyframes, Custom Properties' },
        { id: 6, name: 'C++', category: 'Systems', iconType: 'cpp', level: 'Advanced', desc: 'Basic knowledge of C++ programming, including syntax, variables, conditions, loops, functions, arrays, and fundamental OOP concepts' },
        { id: 7, name: 'C#', category: 'Backend / .NET', iconType: 'csharp', level: 'Basic', desc: 'Basic knowledge of C# programming, including syntax, variables, conditions, loops, functions, and fundamental programming concepts.' },
        { id: 8, name: 'SQL Server', category: 'Database', iconType: 'sql', level: 'Advanced', desc: 'Strong knowledge of SQL with the ability to write complex queries, manage databases, retrieve and manipulate data, and work with database relationships.' },
        { id: 9, name: 'PHP', category: 'Backend', iconType: 'php', level: 'Basic', desc: 'Basic knowledge of PHP, including syntax, variables, conditions, loops, functions, forms, and server-side programming fundamentals.' },
        { id: 10, name: 'Python', category: 'Scripting', iconType: 'python', level: 'Intermediate', desc: 'Good understanding of Python programming and its core concepts, with the ability to write scripts, solve programming problems, and apply Python in practical development tasks.' },
    ];

    const [activeSkillIndex, setActiveSkillIndex] = useState(0);
    const itemRefs = useRef([]);
    const isFirstRender = useRef(true); // 👈 حارس لمنع السكرول عند تحميل الصفحة لأول مرة

    useEffect(() => {
        // تجاهل أول Render لتجنب السحب عند التحميل
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (itemRefs.current[activeSkillIndex]) {
            itemRefs.current[activeSkillIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    }, [activeSkillIndex]);

    const handlePrevSkill = () => {
        setActiveSkillIndex((prev) => (prev === 0 ? skills.length - 1 : prev - 1));
    };

    const handleNextSkill = () => {
        setActiveSkillIndex((prev) => (prev === skills.length - 1 ? 0 : prev + 1));
    };

    const certificates = [
        {
            id: 1,
            title: 'Web Technologis',
            issuer: 'ITI (Information Technology Institute)',
            date: '2025',
            badge: 'Verified',
            pdfUrl: 'https://drive.google.com/file/d/1ge1Ax2bp4cQHnxRC_f2QndBvuhdjxeuX/view?usp=drive_link'
        },
        {
            id: 2,
            title: 'Front-end Python',
            issuer: 'Sprints/Microsoft',
            date: '2025',
            badge: 'Certified',
            pdfUrl: 'https://drive.google.com/file/d/14i2ZKSmy2HCEPbrDpA91o2keOy2YVYC4/view?usp=drive_link'
        },
        {
            id: 3,
            title: 'SQL Server Database Administration',
            issuer: 'Mahara Tech',
            date: '2024',
            badge: 'Verified',
            pdfUrl: 'https://drive.google.com/file/d/1X8wCYdcGe3obgprF2UeBM3wcwRV6TOJW/view?usp=drive_link'
        },
        {
            id: 4,
            title: 'Building Web Applications using PHP & MYSQL ',
            issuer: 'Mahara Tech',
            date: '2025',
            badge: 'Certified',
            pdfUrl: 'https://drive.google.com/file/d/1Oci-AAimsM7Qu2qNlQNR9UTls6X1LHas/view?usp=drive_link'
        },
        {
            id: 5,
            title: 'Modern JavaScript (ES6+) Foundations',
            issuer: 'Cisco Academy',
            date: '2025',
            badge: 'Verified',
            pdfUrl: 'https://drive.google.com/file/d/173Uv8u-aKHFPBcqzQQVCR6fA3CDalVG2/view?usp=drive_link'
        },
        {
            id: 6,
            title: 'Full-Stack Web Learn HTML &CSS',
            issuer: 'Mahara Tech',
            date: '2024',
            badge: 'Achievement',
            pdfUrl: 'https://drive.google.com/file/d/1rhNrZpZBY8DgsH3lYNgwiy0U3u5ydrHG/view?usp=drive_link'
        }, {
            id: 7,
            title: 'Python',
            issuer: 'Mahara Tech',
            date: '2024',
            badge: 'Achievement',
            pdfUrl: 'https://drive.google.com/file/d/1AHcx9hShXTvVt595d6O7hCXbg5SgC0Kv/view?usp=drive_link'
        }, {
            id: 8,
            title: 'JavaScript',
            issuer: 'Mahara Tech',
            date: '2024',
            badge: 'Achievement',
            pdfUrl: 'https://drive.google.com/file/d/1QnBmFTqPdXRfYSYYV7mtCiCAKJHArD24/view?usp=drive_link'
        }, {
            id: 9,
            title: 'Learn the basics of web accessibility',
            issuer: 'Microsft',
            date: '2025',
            badge: 'Achievement',
            pdfUrl: 'https://drive.google.com/file/d/14sx66K1mf7vkBiwsjNOq0Xlp9pMWFGue/view?usp=drive_link'
        },
    ];

    const [showAllCerts, setShowAllCerts] = useState(false);
    const visibleCertificates = showAllCerts ? certificates : certificates.slice(0, 3);

    return (
        <section className="relative w-full min-h-screen bg-[#02040869] text-white py-20 px-4 overflow-hidden select-none">
            <div className="max-w-5xl mx-auto space-y-24 relative z-10">

                {/* SKILLS SECTION */}
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-200">
                        TECHNICAL <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">SKILLS</span>
                    </h2>

                    <div className="relative pt-8 pb-4 flex flex-col items-center justify-center">

                        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 md:px-0 z-30 pointer-events-none">
                            <button
                                onClick={handlePrevSkill}
                                className="pointer-events-auto p-3 rounded-full bg-[#05080e]/90 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:scale-110 transition-all active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleNextSkill}
                                className="pointer-events-auto p-3 rounded-full bg-[#05080e]/90 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:scale-110 transition-all active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 md:gap-6 w-full max-w-3xl min-h-[160px] overflow-x-auto scroll-smooth [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4 px-16">
                            {skills.map((skill, index) => {
                                const isActive = index === activeSkillIndex;

                                return (
                                    <div
                                        key={skill.id}
                                        ref={(el) => (itemRefs.current[index] = el)}
                                        onClick={() => setActiveSkillIndex(index)}
                                        className={`cursor-pointer transition-all duration-500 ease-out shrink-0 flex flex-col items-center justify-center ${isActive
                                            ? 'scale-125 z-20 opacity-100 -translate-y-2'
                                            : 'scale-75 opacity-30 grayscale brightness-50 hover:opacity-60 z-10'
                                            }`}
                                    >
                                        <div className="relative flex items-center justify-center">
                                            {isActive && (
                                                <div className="absolute -inset-3 rounded-full border-2 border-dashed border-emerald-500/60 animate-[spin_15s_linear_infinite]" />
                                            )}

                                            <div
                                                className={`w-16 h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center transition-all duration-500 ${isActive
                                                    ? 'bg-[#030e14] border-2 border-emerald-400 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                                                    : 'bg-[#05080e] border border-slate-800 text-slate-500'
                                                    }`}
                                            >
                                                <TechIcon type={skill.iconType} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 p-6 rounded-2xl bg-[#050911] border border-emerald-500/30 max-w-lg w-full text-center shadow-[0_0_35px_rgba(0,0,0,0.8)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.06] to-transparent pointer-events-none" />

                            <div className="relative z-10 space-y-2">
                                <div className="flex justify-between items-center text-[11px] font-mono text-emerald-400 border-b border-slate-800/80 pb-2">
                                    <span className="opacity-90">CATEGORY: {skills[activeSkillIndex].category}</span>
                                    <span className="opacity-90">LEVEL: {skills[activeSkillIndex].level}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-white tracking-wide pt-1">
                                    {skills[activeSkillIndex].name}
                                </h3>

                                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                                    {skills[activeSkillIndex].desc}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* CERTIFICATES SECTION */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 border-b border-slate-900 pb-5">
                        <div>
                            <div className="inline-flex items-center gap-2 text-emerald-400/80 text-xs font-mono uppercase tracking-widest mb-1">
                                <Award className="w-4 h-4" /> Credentials
                            </div>
                            <h2 className="text-2xl font-extrabold text-slate-100">
                                CERTIFICATIONS & <span className="text-emerald-400">DIPLOMAS</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {visibleCertificates.map((cert) => (
                            <div
                                key={cert.id}
                                className="group p-5 rounded-xl bg-[#04070d] border border-slate-900 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="p-2 rounded-lg bg-emerald-500/5 text-emerald-400 border border-emerald-500/10">
                                            <Award className="w-4 h-4" />
                                        </div>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                                            {cert.badge}
                                        </span>
                                    </div>

                                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-2">
                                        {cert.title}
                                    </h3>
                                    <p className="text-slate-400 text-xs mt-1.5">{cert.issuer}</p>
                                </div>

                                <div className="mt-5 pt-3 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                                    <span>{cert.date}</span>

                                    <a
                                        href={cert.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity hover:underline cursor-pointer"
                                    >
                                        View <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {certificates.length > 3 && (
                        <div className="flex justify-center pt-2">
                            <button
                                onClick={() => setShowAllCerts(!showAllCerts)}
                                className="px-6 py-2 rounded-full bg-[#04070d] border border-slate-800 text-slate-400 hover:text-white font-medium text-xs transition-all active:scale-95"
                            >
                                {showAllCerts ? 'عرض أقل' : `عرض المزيد (+${certificates.length - 3})`}
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
