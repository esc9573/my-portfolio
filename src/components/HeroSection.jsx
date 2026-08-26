import ThreeBackground from './ThreeBackground';

import imgHero from '../assets/Zi.png';

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0a0c10] font-sans select-none"
        >
            
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <ThreeBackground />
            </div>

            
            <div
                className="absolute inset-0 z-[1] bg-center bg-no-repeat bg-contain opacity-[0.03] mix-blend-screen pointer-events-none filter blur-[1px]"
                style={{
                    backgroundImage: `url(${imgHero})`,
                    maskImage: 'radial-gradient(circle, #000000 30%, rgba(0,0,0,0) 70%)',
                    WebkitMaskImage: 'radial-gradient(circle, #0000007B 30%, rgba(0,0,0,0) 70%)',
                }}
            />

            {/* 3. Dark Gradient Overlay - تدرج خفيف جداً عشان ما يمسحش الـ 3D */}
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#0a0c10]/40 via-transparent to-[#0a0c10]/80 pointer-events-none" />

            {/* 4. Main Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 text-center py-12">

                {/* Refined Badge */}


                {/* Main Heading - Clean Metallic Text */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-100 leading-[1.05] mb-6">
                    Hi, I'm{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-emerald-400">
                        Ziad Waleed
                    </span>
                </h1>

                {/* Subtitle */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-300 tracking-tight mb-5">
                    I Build Modern Digital Experiences
                </h2>

                {/* Description */}
                <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal mb-9">
                    I'm a motivated web development student passionate about
                    building modern, user-friendly websites and interactive
                    digital experiences. Always learning, improving, and
                    exploring new technologies.
                </p>

                {/* Solid Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">

                    <a
                        href="#projects"
                        className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all duration-200 text-center text-sm"
                    >
                        Explore My Projects
                    </a>

                    <a
                        href="#contact"
                        className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-200 font-medium transition-all duration-200 backdrop-blur-md text-center text-sm"
                    >
                        Get In Touch
                    </a>

                </div>



            </div>
        </section>
    );
}
