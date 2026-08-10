import type { ReactNode } from "react";
import { TemplateTopBar } from "../TemplateTopBar";

export function TwoColumnLayout(props: {
    content: ReactNode;
    logoUrl?: string;
    lightBgUrl: string;
    darkBgUrl: string;
    posgradoLogoLightUrl: string; // Logo posgrado modo claro
    posgradoLogoDarkUrl: string;  // Logo posgrado modo oscuro
}) {
    const { 
        content, 
        logoUrl, 
        lightBgUrl, 
        darkBgUrl,
        posgradoLogoLightUrl,
        posgradoLogoDarkUrl
    } = props;

    return (
        <div className="relative min-h-svh w-full overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">

            {/* 1. Topbar flotante (Se mantiene arriba a la izquierda) */}
            <div className="absolute top-4 left-4 z-20">
                <TemplateTopBar />
            </div>

            {/* Logo Posgrado FLOTANTE (Arriba a la Izquierda, debajo del Topbar) */}
            <div className="absolute top-32 left-4 z-20  md:left-8">
                <img
                    src={posgradoLogoLightUrl}
                    alt="Logo Posgrado"
                    className="h-60 w-xl object-contain drop-shadow-md dark:hidden"
                />
                <img
                    src={posgradoLogoDarkUrl}
                    alt="Logo Posgrado"
                    className="h-60 w-xl object-contain drop-shadow-md hidden dark:block"
                />
            </div>

            {/* 2. Imagen de fondo MODO CLARO */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 dark:hidden"
                style={{ backgroundImage: `url(${lightBgUrl})` }}
            />

            {/* 3. Imagen de fondo MODO OSCURO */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 hidden dark:block"
                style={{ backgroundImage: `url(${darkBgUrl})` }}
            />

            <div className="relative z-10 flex min-h-svh w-full items-center justify-center p-4 md:p-8 lg:justify-end lg:pr-32 xl:pr-96">
                <main className="w-full max-w-md">
                    {content}
                </main>
            </div>

            {/* 5. Logo institucional flotante (Abajo Izquierda) */}
            {logoUrl && (
                <div className="absolute bottom-8 left-8 z-20 hidden lg:block">
                    <img
                        src={logoUrl}
                        alt="Logo"
                        className="h-16 object-contain drop-shadow-lg"
                    />
                </div>
            )}

            {/* TEXTO FLOTANTE (Abajo a la Izquierda, justo encima del logo institucional) */}
            <div className="absolute bottom-28 left-32 z-20 hidden lg:block max-w-xs">
                <p className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 drop-shadow-md leading-tight">
                    Educación de Posgrado
                </p>
                <p className="text-base md:text-lg font-light text-slate-700 dark:text-slate-300 drop-shadow-sm mt-1 leading-snug">
                    es la llave que abre las puertas <br />
                    de tu futuro
                </p>
            </div>
        </div>
    );
}