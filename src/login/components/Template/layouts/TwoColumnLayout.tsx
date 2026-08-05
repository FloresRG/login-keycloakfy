import type { ReactNode } from "react";
import { TemplateTopBar } from "../TemplateTopBar";

type TwoColumnLayoutProps = {
    content: ReactNode;
};

export function TwoColumnLayout({ content }: TwoColumnLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col bg-background text-foreground">
            <TemplateTopBar />

            <main className="flex flex-1 items-center justify-center px-4 py-6 sm:px-6 md:px-10">
                <div className="w-full max-w-xl">{content}</div>
            </main>
        </div>
    );
}