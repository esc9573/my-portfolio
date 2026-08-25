import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import { Bot, X, Send, User, Sparkles, Lightbulb, BookOpen, Code, Share2 } from 'lucide-react';
import * as THREE from 'three';

import droneUrl from '../assets/Squidbot.glb?url';

function RobotModel({ setScrollProgress }) {
    const { scene } = useGLTF(droneUrl);
    const robotRef = useRef();
    const targetRotation = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const progress = totalScroll > 0 ? currentScroll / totalScroll : 0;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setScrollProgress]);

    useFrame((state) => {
        if (!robotRef.current) return;
        const { x, y } = state.pointer;
        targetRotation.current.y = x * 1.2;
        targetRotation.current.x = -y * 0.8;
        robotRef.current.rotation.y = THREE.MathUtils.lerp(robotRef.current.rotation.y, targetRotation.current.y, 0.1);
        robotRef.current.rotation.x = THREE.MathUtils.lerp(robotRef.current.rotation.x, targetRotation.current.x, 0.1);
    });

    return <primitive ref={robotRef} object={scene} scale={0.55} position={[0, -0.2, 0]} />;
}


const generateSmartReply = (input) => {
    const text = input.toLowerCase().trim();

    if (text.includes('ازيك') || text.includes('عامل ايه') || text.includes('اخبارك') || text.includes('تمام') || text.includes('فينك')) {
        const greetings = [
            "الحمد لله كلو تمام! جاهز أساعدك في أي حاجة محتاجها، أخبارك إيه أنت؟",
            "بخير الحمد لله! يسعدني جداً الكلام معاك، حابب تسأل عن إيه النهاردة؟",
            "زي الفل! معاك المساعد الذكي لزياد، قولي أقدر أساعدك إزاي؟"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (text.includes('هلا') || text.includes('مرحبا') || text.includes('سلام') || text.includes('هاي') || text.includes('hi') || text.includes('hello') || text.includes('صباح') || text.includes('مساء')) {
        return "أهلاً بك! نورت الموقع، تفضل اسألني عن زياد ومشاريعه، أو النصائح البرمجية وتنظيم الوقت.";
    }

    if (
        text.includes('تواصل') || text.includes('اتصل') || text.includes('ارقام') ||
        text.includes('تليفون') || text.includes('فون') || text.includes('واتس') ||
        text.includes('حساب') || text.includes('لينك') || text.includes('رابط') ||
        text.includes('سوشيال') || text.includes('social') || text.includes('contact') ||
        text.includes('ايميل') || text.includes('اميل') || text.includes('email') ||
        text.includes('طريقه التواصل') || text.includes('حسابات') || text.includes('ازاي اقدر اوصل لي ')
    ) {
        return `تقدر تتواصل مع زياد مباشرة من خلال الطرق التالية:

📧 الإيميل:
zyadwled71@gmail.com

📱 الهاتف / واتساب:
+20 103 300 7891

💼 LinkedIn:
https://www.linkedin.com/in/ziad-waleed-051975306/

💻 GitHub:
https://github.com/esc9573

أو تقدر تبعت رسالة مباشرة من خلال قسم (Initiate Handshake) في أسفل الصفحة!`;
    }


    if (text.includes('مين زياد') || text.includes('مين انت') || text.includes('صاحب الموقع') || text.includes('تعرف زياد') || text.includes('من هو')) {
        return "زياد وليد هو مطور واجهات مستخدم (Frontend Developer) ومطور ويب مستقل. لديه خبرة في بناء تطبيقات ويب حديثة وسريعة باستخدام React وTailwind CSS، وحاصل على دبلومة Frontend من معهد ITI.";
    }


    if (text.includes('فاريلانس') || text.includes('مستقل') || text.includes('خمسات') || text.includes('نفذلي') || text.includes('شغل') || text.includes('توظيف') || text.includes('مشروع خاص') || text.includes('شغلك')) {
        return `زياد يقدم خدمات تطوير الويب والـ Frontend على منصات العمل الحر المختلفة:

• مستقل (Mostaql)
• خمسات (Khamsat)
• نفذلي (Nafezly)
• Freelance Yard

لو عندك مشروع حابب تنفذه أو فكرة حابب تحولها لموقع تفاعلي سريح، تقدر تتواصل معاه فوراً عبر الواتساب (+201033007891) أو الإيميل!`;
    }


    if (text.includes('مهار') || text.includes('تقن') || text.includes('skills') || text.includes('بتشتغل ب ايه') || text.includes('لغات') || text.includes('خبرة')) {
        return `التقنيات والمهارات التي يتقنها زياد:

⚡ Frontend Core:
• HTML5 / CSS3 / JavaScript (ES6+)
• React.js & Vite
• Tailwind CSS & Bootstrap

🛠 Tools & Backend Scripting:
• Git & GitHub
• Node.js / PHP / Python / C++
• Streamlit & Data Visualization

🚀 Deployment & Hosting:
• Vercel & Cloudflare`;
    }

    if (text.includes('تعليم') || text.includes('جامع') || text.includes('معهد') || text.includes('كلية') || text.includes('بتدرس') || text.includes('دراسة') || text.includes('تخرج')) {
        return "زياد طالب في السنة النهائية بكلية الحاسبات وتكنولوجيا المعلومات، وحاصل على شهادة ودبلومة تطوير الواجهات من معهد تكنولوجيا المعلومات (ITI).";
    }

    if (text.includes('مشروع') || text.includes('مشاريع') || text.includes('اعمال') || text.includes('projects') || text.includes('جيت هاب') || text.includes('github')) {
        return "تقدر تتطلع على كافة مشاريع زياد وأكوادها المفتوحة المصدر عبر حسابه على GitHub:\nhttps://github.com/esc9573\n\nأو تصفح قسم المشاريع في هذا البورتفوليو لترى العروض التفاعلية!";
    }

    if (text.includes('برمج') || text.includes('كود') || text.includes('تعلم') || text.includes('نصيحة برمجة')) {
        const devTips = [
            "أهم نصيحة في البرمجة: لا تكتفِ بالمشاهدة! افهم المفهوم ثم أكتب الكود بيدك وواجه الأخطاء (Debugging)، فهذا هو السر الحقيقي للتطور.",
            "عند بناء أي مشروع، قسم المشكلة الكبيرة إلى وظائف صغيرة (Break it down) وابدأ بتنفيذ كل جزء على حدة.",
            "ركز جيداً على الأساسيات (JS Fundamentals & DOM Manipulation) قبل التعمق في المكتبات مثل React."
        ];
        return devTips[Math.floor(Math.random() * devTips.length)];
    }

    if (text.includes('مذاكر') || text.includes('اذاكر') || text.includes('تشتت') || text.includes('تركيز') || text.includes('وقت') || text.includes('تنظيم') || text.includes('جدول')) {
        return "لتجنب التشتت أثناء المذاكرة والعمل:\n1. استخدم تقنية البومودورو (25 دقيقة عمل مركز + 5 دقائق استراحة).\n2. أبعد الهاتف تماماً عن مكتبك أثناء ساعات التركيز.\n3. حدد قائمة المهام اليومية (To-Do List) بحد أقصى 3 مهام رئيسية لكل يوم.";
    }


    if (text.includes('شكرا') || text.includes('تسلم') || text.includes('حبيبي') || text.includes('متشكر') || text.includes('thanks') || text.includes('thank you')) {
        return "العفو! تحت أمرك في أي وقت. لو عندك أي استفسار تاني أنا جاهز دائماً!";
    }


    const generalReplies = [
        "فكرة ممتازة وموضوع مهم! لو حابب تستفسر أكتر عن خدمات زياد أو تتواصل معاه مباشرة تقدر تستخدم قسم التواصل أسفل الصفحة.",
        "تمام جداً! أقدر أساعدك كمان في معرفة مهارات زياد، مشاريعه، أو إعطائك نصائح في البرمجة وتنظيم الوقت.",
        "مفهوم تماماً. هل تحب تزور حساب زياد على LinkedIn أو تشوف مشاريعه على GitHub؟"
    ];
    return generalReplies[Math.floor(Math.random() * generalReplies.length)];
};

export default function FloatingRobot() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef(null);

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: 'أهلاً بك! أنا المساعد الذكي لزياد وليد. يمكنك الاستفسار عن وسائل التواصل، المشاريع، المهارات البرمجية، أو النصائح العامة!'
        }
    ]);

    const translateX = -scrollProgress * 10;
    const translateY = -scrollProgress * 30;

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isThinking, isOpen]);

    const handleSend = (e) => {
        e?.preventDefault();
        if (!input.trim() || isThinking) return;

        const userText = input;
        setInput('');

        setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: userText }]);
        setIsThinking(true);

        setTimeout(() => {
            const botReply = generateSmartReply(userText);
            setMessages((prev) => [...prev, { id: Date.now(), sender: 'bot', text: botReply }]);
            setIsThinking(false);
        }, 400);
    };

    const handleTopicClick = (topicText) => {
        setInput(topicText);
    };

    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end transition-transform duration-300 ease-out font-sans"
            style={{ transform: `translate(${translateX}px, ${translateY}px)` }}
        >
            {/* 1. نافذة الشات */}
            {isOpen && (
                <div className="w-[320px] sm:w-[380px] h-[490px] bg-[#070c14]/95 border border-cyan-500/30 rounded-3xl shadow-[0_0_40px_rgba(0,242,255,0.15)] backdrop-blur-2xl flex flex-col mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">

                    {/* Header */}
                    <div className="p-3.5 bg-[#0d1527] border-b border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                                <Bot className="w-4 h-4" />
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full"></span>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-100 font-mono">
                                    Ziad's AI Assistant
                                </h4>
                                <span className="text-[9px] text-emerald-400 font-mono">100% Active & Responsive</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 text-slate-400 hover:text-white rounded-xl transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>


                    <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 scrollbar-thin">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                <div className={`flex items-start gap-2 max-w-[88%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] mt-0.5 ${msg.sender === 'user'
                                        ? 'bg-emerald-500 text-black font-bold'
                                        : 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                                        }`}>
                                        {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                                    </div>

                                    <div className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${msg.sender === 'user'
                                        ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 rounded-tr-none'
                                        : 'bg-[#0f172a] text-slate-200 border border-slate-800 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isThinking && (
                            <div className="flex items-center gap-2 text-cyan-400 text-[11px] font-mono p-1">
                                <Sparkles className="w-3.5 h-3.5 animate-spin" /> جاري التحليل والرد...
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="px-3 py-1.5 bg-[#080d17] border-t border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                        <button onClick={() => handleTopicClick('وسائل التواصل مع زياد')} className="text-[10px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 px-2 py-1 rounded-lg flex items-center gap-1 shrink-0 transition-all">
                            <Share2 className="w-3 h-3" /> حسابات التواصل
                        </button>
                        <button onClick={() => handleTopicClick('إزاي أذاكر بدون تشتت؟')} className="text-[10px] bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 px-2 py-1 rounded-lg flex items-center gap-1 shrink-0 transition-all">
                            <BookOpen className="w-3 h-3" /> نصيحة مذاكرة
                        </button>
                        <button onClick={() => handleTopicClick('نصيحة في البرمجة')} className="text-[10px] bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 px-2 py-1 rounded-lg flex items-center gap-1 shrink-0 transition-all">
                            <Code className="w-3 h-3" /> نصيحة برمجة
                        </button>
                    </div>

                    <form onSubmit={handleSend} className="p-2.5 border-t border-slate-800 bg-[#0a101d] flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="اكتب سؤالك أو اختر موضوعاً..."
                            className="flex-1 bg-[#04070d] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
                        />
                        <button
                            type="submit"
                            disabled={isThinking}
                            className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 transition-all flex items-center justify-center disabled:opacity-50"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}


            <div className="flex flex-col items-end cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
                {!isOpen && (
                    <div className="mb-2 p-3 rounded-2xl bg-[#0b1220]/90 border border-cyan-500/30 text-white shadow-xl backdrop-blur-md max-w-[210px]">
                        <div className="flex items-center justify-between text-cyan-400 font-bold text-[10px] mb-1 font-mono">
                            <span className="flex items-center gap-1"><Bot className="w-3 h-3" /> SMART BUDDY</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">
                            دردش معايا للتعرف على زياد، مشاريعه، أو حسابات التواصل!
                        </p>
                    </div>
                )}

                <div className="w-28 h-28 sm:w-36 sm:h-36 relative">
                    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[5, 5, 5]} intensity={2.5} />
                        <Suspense fallback={null}>
                            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                                <RobotModel setScrollProgress={setScrollProgress} />
                            </Float>
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </div>
    );
}

useGLTF.preload(droneUrl);