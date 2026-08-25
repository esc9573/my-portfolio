import { useEffect, useRef } from "react";

export default function ThreeBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (!gl) return;

        // Vertex Shader: Rolls-Royce Starlight Physics & Smooth Displacement
        const vsSource = `
      attribute vec3 aPosition;
      attribute float aSize;
      attribute float aPhase;
      
      uniform vec2 uMouse;
      uniform float uTime;
      uniform vec2 uResolution;
      
      varying float vAlpha;
      varying float vDist;

      void main() {
        vec3 pos = aPosition;
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        
        // Distance from smooth cursor
        float d = distance(pos.xy * aspect, uMouse * aspect);
        
        // Starlight twinkling simulation (زدنا الحد الأدنى للإضاءة قليلاً)
        float twinkle = sin(uTime * 2.0 + aPhase) * 0.25 + 0.85; 
        
        // Dynamic push away from cursor with smooth dropoff
        float force = smoothstep(0.45, 0.0, d);
        vec2 dir = normalize((pos.xy * aspect) - (uMouse * aspect));
        pos.xy += dir * force * 0.05;
        
        // Depth parallax
        pos.z += sin(d * 8.0 - uTime * 2.0) * force * 0.08;

        // زيادة الشفافية الأساسية للنجوم البعيدة من 0.2 إلى 0.45
        vAlpha = mix(0.45, 1.0, force) * twinkle;
        vDist = force;

        vec4 mvPosition = vec4(pos, 1.0);
        gl_Position = mvPosition;
        
        // Starlight point sizes
        gl_PointSize = (aSize + (force * 5.0)) * (1.0 / -mvPosition.z);
      }
    `;

        // Fragment Shader: Elegant Cyan/Cyan-White Glowing Stars
        const fsSource = `
      precision mediump float;
      varying float vAlpha;
      varying float vDist;

      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float r = length(uv);
        if (r > 0.5) discard;

        // تنعيم التوهج الداخلي لنواة النجمة لتظهر بشكل أوضح
        float core = pow(smoothstep(0.5, 0.0, r), 1.2);
        
        // الألوان الأساسية للنجم (رفعنا سطوع درجات اللون بشكل بسيط)
        vec3 baseStar = vec3(0.1, 0.95, 0.90); 
        vec3 activeStar = vec3(0.85, 1.0, 0.98);
        vec3 color = mix(baseStar, activeStar, vDist);

        gl_FragColor = vec4(color, core * vAlpha);
      }
    `;

        const compileShader = (type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const program = gl.createProgram();
        gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vsSource));
        gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fsSource));
        gl.linkProgram(program);
        gl.useProgram(program);

        // Starlight Random Field Generation
        const count = 1200;
        const positions = [];
        const sizes = [];
        const phases = [];

        for (let i = 0; i < count; i++) {
            positions.push(
                (Math.random() - 0.5) * 2.6,
                (Math.random() - 0.5) * 2.6,
                -0.5 - Math.random() * 0.3
            );
            // تكبير حجم النجوم قليلاً جداً لتكون أسطع (من 2.0 إلى 5.5)
            sizes.push(Math.random() * 3.5 + 2.0);
            phases.push(Math.random() * Math.PI * 2);
        }

        // Attributes setup
        const posBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        const aPosition = gl.getAttribLocation(program, "aPosition");
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

        const sizeBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sizes), gl.STATIC_DRAW);
        const aSize = gl.getAttribLocation(program, "aSize");
        gl.enableVertexAttribArray(aSize);
        gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

        const phaseBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, phaseBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(phases), gl.STATIC_DRAW);
        const aPhase = gl.getAttribLocation(program, "aPhase");
        gl.enableVertexAttribArray(aPhase);
        gl.vertexAttribPointer(aPhase, 1, gl.FLOAT, false, 0, 0);

        const uMouse = gl.getUniformLocation(program, "uMouse");
        const uTime = gl.getUniformLocation(program, "uTime");
        const uResolution = gl.getUniformLocation(program, "uResolution");

        let mousePos = [0, 0];
        let targetMouse = [0, 0];

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            targetMouse = [x, y];
        };

        window.addEventListener("pointermove", handleMouseMove);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        let animationId;
        let startTime = performance.now();

        const render = () => {
            mousePos[0] += (targetMouse[0] - mousePos[0]) * 0.05;
            mousePos[1] += (targetMouse[1] - mousePos[1]) * 0.05;

            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                gl.viewport(0, 0, width, height);
            }

            gl.clearColor(0.02, 0.03, 0.05, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform2fv(uMouse, mousePos);
            gl.uniform2f(uResolution, width, height);
            gl.uniform1f(uTime, (performance.now() - startTime) * 0.001);

            gl.drawArrays(gl.POINTS, 0, count);
            animationId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("pointermove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ background: "#020305" }}
        />
    );
}