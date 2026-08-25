import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

// ==================== 3D ROBOT COMPONENT ====================
function RobotHead() {
    const headRef = useRef();

    useFrame((state) => {
        if (!headRef.current) return;
        const { x, y } = state.pointer;
        headRef.current.rotation.y = x * 0.8;
        headRef.current.rotation.x = -y * 0.5;
    });

    return (
        // 👈 تصغير حجم الروبوت باستخدام scale
        <group ref={headRef} scale={0.75} position={[0, -0.2, 0]}>
            {/* رأس الروبوت */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 1.6, 1.5]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* عين الروبوت المضيئة */}
            <mesh position={[0, 0, 0.76]}>
                <boxGeometry args={[1.4, 0.3, 0.1]} />
                <meshBasicMaterial color="#00f2ff" />
            </mesh>

            {/* الإنتينا / الأذن */}
            <mesh position={[0, 1.1, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.6]} />
                <meshStandardMaterial color="#64748b" />
            </mesh>
            <mesh position={[0, 1.4, 0]}>
                <sphereGeometry args={[0.15]} />
                <meshBasicMaterial color="#00f2ff" />
            </mesh>
        </group>
    );
}

// ==================== MAIN INTERACTIVE CHAT COMPONENT ====================
export default function InteractiveRobotChat() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'أهلاً بك! أنا مساعد زياد الذكي. يمكنك سؤالي عن خبراته، تقنياته، أو مشاريعه!' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    // التمرير التلقائي لأسفل الشات عند إضافة رسائل جديدة
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // محاكاة الرد الذكي (يمكن ربطها بـ Gemini API)
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages((prev) => [...prev, userMsg]);
        const query = input.toLowerCase();
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            let botReply = "أنا هنا لمساعدتك! يمكنك سؤالي عن خبرات زياد في React، Frontend، أو مشاريعه الحالية.";

            if (query.includes('من أنت') || query.includes('مين') || query.includes('اسمك')) {
                botReply = "أنا Bot تفاعلي مصمم لمساعدتك في استكشاف بورتفوليو زياد وليد ومشاريع الـ Web Development الخاصة به!";
            } else if (query.includes('مهارات') || query.includes('skills') || query.includes('تقنيات')) {
                botReply = "زياد متخصص في Frontend Web Development باستخدام React.js, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3, بالإضافة لخبرته في Node.js, PHP, C++, و SQL!";
            } else if (query.includes('مشريع') || query.includes('projects') || query.includes('اعمال')) {
                botReply = "زياد قام ببناء العديد من التطبيقات مثل Crypto Terminal Dashboard، أدوات الاختبار للـ Credit Cards، وتطبيقات React متكاملة ومستضافة على Vercel.";
            } else if (query.includes('تواصل') || query.includes('اميل') || query.includes('اتصال') || query.includes('شغل')) {
                botReply = "يمكنك التواصل مع زياد مباشرة عبر البريد الإلكتروني أو من خلال روابط التواصل الاجتماعي المتاحة في أسفل الصفحة!";
            }

            setMessages((prev) => [...prev, { id: Date.now(), sender: 'bot', text: botReply }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <section className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-[#04070d] border border-slate-900 rounded-3xl shadow-[0_0_50px_rgba(0,242,255,0.05)] relative overflow-hidden my-10">
            <div className="flex flex-col lg:flex-row gap-6 items-center">

                {/* 1. 3D ROBOT CANVAS CONTAINER (تصغير الارتفاع والـ Container) */}
                <div className="w-full lg:w-1/3 h-[220px] lg:h-[350px] relative flex flex-col items-center justify-center bg-[#020408]/60 rounded-2xl border border-emerald-500/10">
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <Sparkles className="w-3 h-3 animate-pulse" /> AI ASSISTANT
                    </div>

                    <Canvas camera={{ position: [0, 0, 4.5] }}>
                        <ambientLight intensity={0.8} />
                        <directionalLight position={[5, 5, 5]} intensity={1.5} />
                        <RobotHead />
                    </Canvas>

                    <p className="text-[11px] text-slate-500 font-mono pb-2">حرك الماوس للتفاعل مع الروبوت</p>
                </div>

                {/* 2. CHAT INTERFACE */}
                <div className="w-full lg:w-2/3 flex flex-col h-[350px] bg-[#020408] rounded-2xl border border-slate-900 overflow-hidden">

                    {/* Chat Messages Body */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                                    }`}>
                                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>

                                <div className={`p-3 rounded-2xl text-xs sm:text-sm max-w-[80%] leading-relaxed ${msg.sender === 'user'
                                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-tr-none'
                                    : 'bg-[#060b13] text-slate-200 border border-slate-800 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono p-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> جاري التفكير والرد...
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Chat Input Box */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-900 bg-[#04070d] flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="اسأل الروبوت أي سؤال..."
                            className="flex-1 bg-[#020408] border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                        <button
                            type="submit"
                            className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all active:scale-95 flex items-center justify-center"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>

                </div>

            </div>
        </section>
    );
}