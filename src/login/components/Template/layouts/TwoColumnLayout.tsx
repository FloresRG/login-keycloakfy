import type { ReactNode } from "react";
import { TemplateTopBar } from "../TemplateTopBar";

export function TwoColumnLayout(props: { content: ReactNode; logoUrl?: string }) {
    const { content } = props;

    return (
        <div className="flex min-h-svh flex-col bg-slate-100 dark:bg-slate-950">
            <TemplateTopBar />

            <div className="flex flex-1 items-center justify-center p-6 md:p-10">
                <main className="w-full max-w-md">{content}</main>
            </div>
        </div>
    );
}