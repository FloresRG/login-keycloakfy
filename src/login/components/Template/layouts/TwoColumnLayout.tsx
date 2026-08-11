import type { ReactNode } from "react";
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
        logoUrl,
        lightBgUrl,
        darkBgUrl,
        posgradoLogoLightUrl,
        posgradoLogoDarkUrl
    } = props;

    return (
        <div className="relative min-h-svh w-full overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">

            {/* 1. Topbar flotante (Fijo arriba a la izquierda) */}
            <div className="absolute top-4 left-4 z-30 sm:top-6 sm:left-6">
                <TemplateTopBar />
            </div>

            {/* 2. Logo Posgrado RESPONSIVO (Arriba a la izquierda) */}
            <div className="absolute top-16 pl-36 z-20 sm:top-20 sm:left-6 md:top-24 md:max-w-md lg:max-w-lg xl:max-w-xl">
                <img
                    src={posgradoLogoLightUrl}
                    alt="Logo Posgrado"
                    className="h-auto max-h-24 w-auto object-contain drop-shadow-md transition-all duration-300 dark:hidden sm:max-h-32 md:max-h-40 lg:max-h-52"
                />
                <img
                    src={posgradoLogoDarkUrl}
                    alt="Logo Posgrado"
                    className="hidden h-auto max-h-24 w-auto object-contain drop-shadow-md transition-all duration-300 dark:block sm:max-h-32 md:max-h-40 lg:max-h-52"
                />
            </div>

            {/* 3. Fondos (Modo Claro / Modo Oscuro) */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 dark:hidden"
                style={{ backgroundImage: `url(${lightBgUrl})` }}
            />
            <div
                className="absolute inset-0 bg-cover bg-center z-0 hidden dark:block"
                style={{ backgroundImage: `url(${darkBgUrl})` }}
            />

            {/* 4. Contenedor principal del Formulario */}
            <div className="relative z-10 flex min-h-svh w-full items-center justify-center p-4 pt-44 sm:pt-52 md:pt-60 lg:justify-end lg:p-8 lg:pr-20 xl:pr-32 2xl:pr-48">
                <main className="w-full max-w-md">
                    {content}
                </main>
            </div>

            {/* 5. Logo Institucional Inferior */}
            {logoUrl && (
                <div className="absolute bottom-6 left-6 z-20 hidden lg:block">
                    <img
                        src={logoUrl}
                        alt="Logo"
                        className="h-12 w-auto object-contain drop-shadow-lg lg:h-16"
                    />
                </div>
            )}

            {/* 6. Texto Flotante Inferior */}
            <div className="absolute bottom-20  z-20 hidden lg:block max-w-sm left-60">
                <div className="relative pl-12 ">

                    {/* Comilla de Apertura (Arriba a la Izquierda) */}
                    <span className="absolute -top-5 -left-5 select-none font-serif text-8xl font-extrabold text-amber-400 leading-none pointer-events-none">
                        “
                    </span>

                    {/* Bloque de Texto */}
                    <div>
                        <p className="font-semibold text-3xl text-slate-100 ">
                            Educación de Posgrado
                        </p>
                        <p className="font-light text-2xl text-slate-300 drop-shadow-sm leading-relaxed mt-1">
                            es la llave que abre las puertas <br />
                            <span className="font-semibold text-amber-500 dark:text-amber-400">del futuro</span>
                        </p>
                    </div>

                    {/* Comilla de Cierre (Abajo a la Derecha) */}
                    <span className="absolute -bottom-12 -right-12 select-none font-serif text-8xl font-extrabold text-amber-400 leading-none pointer-events-none">
                        ”
                    </span>

                </div>
            </div>
        </div>
    );
}