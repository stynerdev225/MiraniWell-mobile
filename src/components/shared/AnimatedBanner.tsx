import React, { useEffect, useRef } from 'react';
import { Heart, Wind, Droplets, Mountain, Users, Search, Compass, Share2, Globe, Bookmark, BookmarkCheck, Library, Save, Archive } from 'lucide-react';

interface AnimatedBannerProps {
    children: React.ReactNode;
    imageSrc: string;
    height?: string;
    showElementIcons?: boolean;
    iconSet?: 'elements' | 'explore' | 'saved';
}

const AnimatedBanner: React.FC<AnimatedBannerProps> = ({
    children,
    imageSrc,
    height = 'h-52',
    showElementIcons = false,
    iconSet = 'elements'
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const particles: {
            x: number;
            y: number;
            radius: number;
            color: string;
            speedX: number;
            speedY: number;
        }[] = [];

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;

            // Re-create particles when resizing
            createParticles();
        };

        // Create particles
        const createParticles = () => {
            particles.length = 0;
            const particleCount = Math.floor(canvas.width * canvas.height / 9000);

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 0.5,
                    color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
                    speedX: Math.random() * 0.5 - 0.25,
                    speedY: Math.random() * 0.5 - 0.25
                });
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        // Initialize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div ref={containerRef} className={`relative w-full overflow-hidden shadow-xl rounded-b-xl ${height}`}>
            <img
                src={imageSrc}
                alt="Banner Background"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105`}
            />
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-10"
            />

            {showElementIcons && (
                <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                    {iconSet === 'elements' ? (
                        <>
                            {/* Element icons with animations */}
                            <div className="absolute top-[15%] right-[10%] animate-float-slow opacity-30">
                                <Mountain size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-[20%] right-[30%] animate-float-medium opacity-30">
                                <Droplets size={28} className="text-white" />
                            </div>
                            <div className="absolute top-[40%] left-[15%] animate-float-fast opacity-30">
                                <Heart size={26} className="text-white" />
                            </div>
                            <div className="absolute bottom-[25%] left-[25%] animate-float-slow opacity-30">
                                <Wind size={30} className="text-white" />
                            </div>
                        </>
                    ) : iconSet === 'explore' ? (
                        <>
                            {/* Explore icons with animations */}
                            <div className="absolute top-[15%] right-[10%] animate-float-slow opacity-30">
                                <Compass size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-[20%] right-[30%] animate-float-medium opacity-30">
                                <Search size={28} className="text-white" />
                            </div>
                            <div className="absolute top-[40%] left-[15%] animate-float-fast opacity-30">
                                <Users size={26} className="text-white" />
                            </div>
                            <div className="absolute bottom-[25%] left-[25%] animate-float-slow opacity-30">
                                <Globe size={30} className="text-white" />
                            </div>
                            <div className="absolute top-[25%] left-[40%] animate-float-medium opacity-30">
                                <Share2 size={24} className="text-white" />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Saved icons with animations */}
                            <div className="absolute top-[15%] right-[10%] animate-float-slow opacity-30">
                                <Bookmark size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-[20%] right-[30%] animate-float-medium opacity-30">
                                <BookmarkCheck size={28} className="text-white" />
                            </div>
                            <div className="absolute top-[40%] left-[15%] animate-float-fast opacity-30">
                                <Save size={26} className="text-white" />
                            </div>
                            <div className="absolute bottom-[25%] left-[25%] animate-float-slow opacity-30">
                                <Library size={30} className="text-white" />
                            </div>
                            <div className="absolute top-[25%] left-[40%] animate-float-medium opacity-30">
                                <Archive size={24} className="text-white" />
                            </div>
                        </>
                    )}
                </div>
            )}

            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 bg-gradient-to-r from-dark-1/80 to-transparent">
                {children}
            </div>
        </div>
    );
};

export default AnimatedBanner;
