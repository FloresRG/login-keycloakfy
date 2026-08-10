import { cn } from "@/components/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { kcSanitize } from "@keycloakify/login-ui/kcSanitize";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { RotateCcw, User } from "lucide-react";
import { type ReactNode } from "react";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import type { TemplateProps } from "./Template";

type TemplateContentProps = TemplateProps & {
    logoWhiteUrl: string;
    logoDarkUrl: string;
    cardClassName?: string;
    brandingVisibilityClassName?: string;
};

export function TemplateContent(props: TemplateContentProps) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        children,
        cardClassName
    } = props;

    const { kcContext } = useKcContext();
    const { auth, url, message, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = useI18n();
    const { kcClsx } = useKcClsx();

    const titleNode: ReactNode = !(
        auth !== undefined &&
        auth.showUsername &&
        !auth.showResetCredentials
    ) ? (
        <h1 className="text-2xl font-bold text-[#0c2340] dark:text-white tracking-tight text-center">
            {headerNode || "Inicia sesión"}
        </h1>
    ) : (
        <div id="kc-username" className="flex items-center justify-between gap-2">
            <div className="flex gap-4 items-center">
                <User className="text-muted-foreground size-6" />

                <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-normal text-muted-foreground">
                        {msgStr("attemptedUsernameLoggingInAs")}
                    </span>
                    <span className="font-semibold text-lg" id="kc-attempted-username">
                        {auth.attemptedUsername}
                    </span>
                </div>
            </div>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" asChild>
                            <a
                                id="reset-login"
                                href={url.loginRestartFlowUrl}
                                aria-label={msgStr("restartLoginTooltip")}
                            >
                                <RotateCcw className="size-4" />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{msg("restartLoginTooltip")}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );

    return (
        <Card
            className={cn(
                /* Tarjeta Glassmorphism Ultra Fina */
                "backdrop-blur-xl bg-white/45 dark:bg-slate-900/40",
                "rounded-[2.5rem] px-8 py-8",
                "border border-white/70 dark:border-white/20",
                "shadow-[0_20px_50px_rgba(15,23,42,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)]",
                "w-full max-w-md mx-auto transition-all",
                cardClassName
            )}
        >
            {/* Avatar Central con Ondas Concéntricas */}
            <div className="flex justify-center mb-4">
                <div className="relative flex items-center justify-center p-3">
                    {/* Anillos de ondas suaves detrás del avatar */}
                    <div className="absolute inset-0 rounded-full border border-blue-400/20 scale-125" />
                    <div className="absolute inset-0 rounded-full border border-blue-400/30 scale-110" />

                    {/* Círculo blanco translúcido principal */}
                    <div className="relative z-10 w-20 h-20 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md border border-white flex items-center justify-center text-[#1d4ed8]">
                        <User className="w-10 h-10 stroke-[2.2]" />
                    </div>
                </div>
            </div>

            <CardHeader className="p-0 text-center mb-6">
                <div className="flex flex-col items-center">
                    {titleNode}
                    {/* Línea decorativa dorada inferior */}
                    <div className="w-8 h-[3px] bg-[#d97706] rounded-full mt-2 mb-2" />
                </div>

                <p className="text-xs font-normal text-slate-600 dark:text-slate-300">
                    Accede a tu cuenta institucional
                </p>
            </CardHeader>

            <CardContent className="p-0">
                <div id="kc-content" className="flex flex-col gap-4">
                    {displayMessage &&
                        message !== undefined &&
                        (message.type !== "warning" || !isAppInitiatedAction) && (
                            <Alert 
                                variant={message.type} 
                                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/80 rounded-2xl"
                            >
                                <AlertDescription>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(message.summary)
                                        }}
                                    />
                                </AlertDescription>
                            </Alert>
                        )}

                    {socialProvidersNode}
                    
                    {/* Contenido del Formulario (Inputs, Remember Me, Botón Submit) */}
                    {children}

                    {auth !== undefined && auth.showTryAnotherWayLink && (
                        <form
                            id="kc-select-try-another-way-form"
                            action={url.loginAction}
                            method="post"
                        >
                            <div className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" name="tryAnotherWay" value="on" />
                                <Button
                                    type="button"
                                    className="w-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 hover:bg-white/70 shadow-sm rounded-xl"
                                    variant="outline"
                                    asChild
                                >
                                    <a
                                        href="#"
                                        id="try-another-way"
                                        onClick={event => {
                                            document.forms[
                                                "kc-select-try-another-way-form" as never
                                            ].submit();
                                            event.preventDefault();
                                            return false;
                                        }}
                                    >
                                        {msg("doTryAnotherWay")}
                                    </a>
                                </Button>
                            </div>
                        </form>
                    )}

                    {displayInfo && (
                        <div className="text-center text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                            {infoNode}
                        </div>
                    )}

                    {/* Enlaces al Pie de la Tarjeta */}
                    <div className="flex items-center justify-center gap-2 pt-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                        <a href="#" className="hover:underline hover:text-blue-700">Ver Tutoriales</a>
                        <span>|</span>
                        <a href="#" className="hover:underline hover:text-blue-700">Manual de Usuario</a>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}