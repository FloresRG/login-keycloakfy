import type { ReactNode } from "react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import * as THREE from "three";
import VantaNet from "vanta/dist/vanta.net.min";

import { TemplateTopBar } from "../TemplateTopBar";

export function TwoColumnLayout(props: {
    content: ReactNode;
    logoUrl?: string;
    lightBgUrl: string;
    darkBgUrl: string;
    posgradoLogoLightUrl: string;
    posgradoLogoDarkUrl: string;
}) {
    const {
        content,
        posgradoLogoLightUrl,
        posgradoLogoDarkUrl
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const vantaRef = useRef<HTMLDivElement>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);

    useEffect(() => {
        if (!vantaEffect && vantaRef.current) {
            // Resuelve la función de inicialización si viene como default export o CJS module
            const initNet = typeof VantaNet === "function" ? VantaNet : (VantaNet as any).default;

            if (typeof initNet === "function") {
                const effect = initNet({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x3b82f6,
                    backgroundColor: 0x0f172a,
                    points: 10.00,
                    maxDistance: 22.00,
                    spacing: 16.00,
                    showDots: true
                });
                setVantaEffect(effect);
            }
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                ".gsap-posgrado-logo",
                { opacity: 0, y: -25, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8 }
            );

            tl.fromTo(
                ".gsap-welcome-title",
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.5"
            );

            tl.fromTo(
                ".gsap-quote-container",
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.8 },
                "-=0.4"
            );
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="relative min-h-svh w-full overflow-hidden bg-slate-950 text-slate-100"
        >
            <div
                ref={vantaRef}
                className="absolute inset-0 z-0 pointer-events-auto opacity-70"
            />

            <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

            <div className="absolute top-4 right-4 z-30 sm:top-6 sm:right-6">
                <TemplateTopBar />
            </div>

            <div className="gsap-posgrado-logo absolute top-10 z-20 sm:top-20 sm:left-6 md:top-2 md:max-w-md lg:max-w-lg xl:max-w-xl pl-4 xl:pl-1">
                <img
                    src={posgradoLogoLightUrl}
                    alt="Logo Posgrado"
                    className="h-auto max-h-20 w-auto object-contain drop-shadow-md transition-all duration-300 dark:hidden sm:max-h-32 md:max-h-40 lg:max-h-32"
                />
                <img
                    src={posgradoLogoDarkUrl}
                    alt="Logo Posgrado"
                    className="hidden h-auto max-h-20 w-auto object-contain drop-shadow-md transition-all duration-300 dark:block sm:max-h-32 md:max-h-40 lg:max-h-32"
                />
            </div>

            <div className="relative z-10 flex min-h-svh w-full flex-col items-center justify-center p-4 pt-6 sm:pt-52 md:pt-60 lg:items-end lg:p-8 lg:pr-20 xl:pr-32 2xl:pr-72">
                <div className="w-full max-w-md space-y-4">
                    <div className="gsap-welcome-title hidden sm:block w-full text-center px-2">
                        <h1 className="text-3xl font-normal text-slate-100 drop-shadow-md leading-snug">
                            Bienvenido al{" "}
                            <span className="font-bold text-white block sm:inline">
                                Sistema Integral de Posgrado UPEA
                            </span>
                        </h1>
                    </div>

                    <main className="w-full">
                        {content}
                    </main>
                </div>
            </div>

            <div className="gsap-quote-container absolute bottom-5 z-20 hidden lg:block max-w-sm left-20">
                <div className="relative pl-12">
                    <span className="absolute -top-5 -left-5 select-none font-serif text-8xl font-extrabold text-amber-400 leading-none pointer-events-none">
                        “
                    </span>

                    <div>
                        <p className="font-semibold text-3xl text-slate-100">
                            Educación de Posgrado
                        </p>
                        <p className="font-light text-2xl text-slate-300 drop-shadow-sm leading-relaxed mt-1">
                            es la llave que abre las puertas <br />
                            <span className="font-semibold text-amber-500 dark:text-amber-400">del futuro</span>
                        </p>
                    </div>

                    <span className="absolute -bottom-12 -right-12 select-none font-serif text-8xl font-extrabold text-amber-400 leading-none pointer-events-none">
                        ”
                    </span>
                </div>
            </div>
        </div>
    );
}