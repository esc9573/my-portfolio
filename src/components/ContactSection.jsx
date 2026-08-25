import { useState, useEffect } from 'react';
import { Terminal, Send, Copy, Check, Cpu, Loader2, CheckCircle2, AlertCircle, Code, Layers, HelpCircle, TerminalSquare } from 'lucide-react';

// مكون منفصل للوقت لمنع إعادة رندر الصفحة كاملة كل ثانية
function LiveClock() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return <span className="text-slate-500 font-mono text-xs">{time}</span>;
}

export default function ContactSection() {
    const [status, setStatus] = useState('idle');
    const [requestType, setRequestType] = useState('run --collab');
    const [subject, setSubject] = useState('Collaboration Request');
    const [copiedField, setCopiedField] = useState(null);

    // أوامر Terminal واضحة ومباشرة بدلاً من الـ Endpoints المعقدة
    const commands = [
        { cmd: 'run --collab', label: 'Collaboration Request', category: 'Project', icon: <Code className="w-3.5 h-3.5 text-emerald-400" /> },
        { cmd: 'npm test --freelance', label: 'Freelance Project', category: 'Hire', icon: <Layers className="w-3.5 h-3.5 text-teal-400" /> },
        { cmd: 'cat --consultation', label: 'Tech Consultation', category: 'Advice', icon: <TerminalSquare className="w-3.5 h-3.5 text-green-400" /> },
        { cmd: 'help --general', label: 'General Inquiry', category: 'Other', icon: <HelpCircle className="w-3.5 h-3.5 text-lime-400" /> }
    ];

    const handleCommandSelect = (item) => {
        setRequestType(item.cmd);
        setSubject(item.label);
    };

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const form = e.target;
        const data = new FormData(form);
        data.append('Command_Executed', requestType);

        try {
            const response = await fetch('https://formspree.io/f/mvkpjoza', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="relative w-full min-h-screen py-16 bg-[#0A0C108C] text-slate-300 flex items-center justify-center font-mono">

            {/* Ambient Background Grid & Glow */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="flex flex-col mb-8 border-b border-slate-800/80 pb-5">
                    <div className="flex items-center justify-between mb-2 text-emerald-400 text-xs">
                        <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 animate-pulse" />
                            <span>SYS.CONNECTION_ESTABLISHED</span>
                        </div>
                        <LiveClock />
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-100 uppercase">
                        Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Handshake</span>
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-lg font-sans">
                        Select a CLI command or fill in your details to transmit a message directly to my inbox.
                    </p>
                </div>

                {/* Console Window */}
                <div className="rounded-xl bg-[#0d1117] border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

                    {/* Left Pane: Interactive CLI Controls */}
                    <div className="lg:col-span-4 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800 bg-[#05070a] flex flex-col justify-between space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Mode: Interactive CLI</span>

                            </div>

                            {/* Command Selector */}
                            <div className="space-y-3 mb-6">
                                <span className="text-xs text-slate-400 block border-b border-slate-800 pb-1.5">Select Action Command</span>
                                <div className="space-y-2">
                                    {commands.map((item) => (
                                        <button
                                            key={item.cmd}
                                            type="button"
                                            onClick={() => handleCommandSelect(item)}
                                            className={`w-full text-left px-3 py-2.5 rounded border text-xs transition-all flex flex-col gap-1 ${requestType === item.cmd
                                                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                                                : 'bg-transparent border-slate-800/60 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 font-mono font-semibold">
                                                    {item.icon}
                                                    <span>$ {item.cmd}</span>
                                                </div>
                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Environment Variables & Contact Info */}
                        <div className="space-y-2.5">
                            <span className="text-xs text-slate-400 block border-b border-slate-800 pb-1.5">System Config</span>

                            <div
                                onClick={() => handleCopy('zyadwled71@gmail.com', 'email')}
                                className="group flex items-center justify-between p-2 rounded bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-colors"
                            >
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-slate-500">EMAIL_VAR</span>
                                    <span className="text-xs text-slate-300 group-hover:text-emerald-300">zyadwled71@gmail.com</span>
                                </div>
                                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                            </div>

                            <div
                                onClick={() => handleCopy('+201033007891', 'phone')}
                                className="group flex items-center justify-between p-2 rounded bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-colors"
                            >
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-slate-500">PHONE_VAR</span>
                                    <span className="text-xs text-slate-300 group-hover:text-emerald-300">+20 103 300 7891</span>
                                </div>
                                {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                            </div>
                        </div>
                    </div>

                    {/* Right Pane: Form Output */}
                    <div className="lg:col-span-8 p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-4 text-xs text-slate-400 bg-slate-900/50 px-3 py-1.5 rounded border border-slate-800 w-fit">
                            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Payload Configuration</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-500 uppercase">"client_name":</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Enter name..."
                                        className="w-full px-3 py-2 rounded bg-[#0a0c10] border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-xs font-mono"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-500 uppercase">"client_email":</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Enter email..."
                                        className="w-full px-3 py-2 rounded bg-[#0a0c10] border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-xs font-mono"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] text-slate-500 uppercase">"subject":</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 rounded bg-[#0a0c10] border border-slate-800 text-emerald-300 focus:outline-none focus:border-emerald-500 text-xs font-mono"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] text-slate-500 uppercase">"payload_message":</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    placeholder="Define project scope or query details here..."
                                    className="w-full px-3 py-2 rounded bg-[#0a0c10] border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-xs font-mono resize-none min-h-[100px]"
                                />
                            </div>

                            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    {status === 'success' && (
                                        <div className="text-emerald-400 text-xs flex items-center gap-1.5">
                                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                                            <span>200 OK: Payload delivered.</span>
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className="text-rose-400 text-xs flex items-center gap-1.5">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <span>500 ERROR: Transmission failed.</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="px-5 py-2.5 rounded bg-emerald-500 hover:bg-emerald-400 text-[#0a0c10] font-bold text-xs transition-colors flex items-center gap-2 disabled:opacity-50 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            <span>EXECUTING...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-3.5 h-3.5" />
                                            <span>EXECUTE_REQ</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}