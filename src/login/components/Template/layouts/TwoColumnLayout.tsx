import type { ReactNode } from "react";
import { TemplateTopBar } from "../TemplateTopBar";

export function TwoColumnLayout(props: {
    content: ReactNode;
    logoUrl?: string;
    lightBgUrl: string;
    darkBgUrl: string;
}) {
    const { content, logoUrl, lightBgUrl, darkBgUrl } = props;

    return (
        <div className="relative min-h-svh w-full overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">

            {/* 1. Topbar flotante */}
            <div className="absolute top-4 left-4 z-20">
                <TemplateTopBar />
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

            {/* 5. Logo institucional flotante */}
            {logoUrl && (
                <div className="absolute bottom-8 left-8 z-20 hidden lg:block">
                    <img
                        src={logoUrl}
                        alt="Logo"
                        className="h-16 object-contain drop-shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}