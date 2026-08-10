import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import type { ReactNode } from "react";
import { useEffect } from "react";
import defaultLogo from "../../assets/img/logo_2.png";

// Importación directa de imágenes locales desde tu carpeta de assets
import bgLightImg from "../../assets/login/login_blanco.png"; // Ajusta la extensión (.png/.jpg) según tu archivo
import bgDarkImg from "../../assets/login/login_negro.jpeg";   // Ajusta la extensión (.png/.jpg) según tu archivo

import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import { CenteredCardLayout } from "./layouts/CenteredCardLayout";
import { ImageAsideLayout } from "./layouts/ImageAsideLayout";
import { TwoColumnLayout } from "./layouts/TwoColumnLayout";
import { TemplateContent } from "./TemplateContent";
import { useApplyThemePreset } from "./theme/useApplyThemePreset";
import { useInitializeTemplate } from "./useInitializeTemplate";
import { resolveAssetUrl } from "@/login/shared/resolveAssetUrl";

export type TemplateProps = {
    displayInfo?: boolean;
    displayMessage?: boolean;
    displayRequiredFields?: boolean;
    headerNode: ReactNode;
    socialProvidersNode?: ReactNode;
    infoNode?: ReactNode;
    documentTitle?: string;
    bodyClassName?: string;
    children: ReactNode;
};

export function Template(props: TemplateProps) {
    const { documentTitle, bodyClassName } = props;

    const { kcContext } = useKcContext();
    const { msgStr } = useI18n();
    const { kcClsx } = useKcClsx();

    const logoWhiteUrl =
        resolveAssetUrl(kcContext.properties?.SHADCN_THEME_LOGO_WHITE_URL) || defaultLogo;

    const logoDarkUrl =
        resolveAssetUrl(kcContext.properties?.SHADCN_THEME_LOGO_DARK_URL) || defaultLogo;

    const layout = kcContext.properties?.SHADCN_THEME_LAYOUT;

    useEffect(() => {
        document.title =
            documentTitle ??
            msgStr("loginTitle", kcContext.realm.displayName || kcContext.realm.name);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    useInitializeTemplate();
    useApplyThemePreset();

    switch (layout) {
        case "centered-card":
            return (
                <CenteredCardLayout
                    content={
                        <TemplateContent
                            {...props}
                            logoWhiteUrl={logoWhiteUrl}
                            logoDarkUrl={logoDarkUrl}
                            // En Template.tsx -> case "two-column":
cardClassName="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-800/50 w-full"
                        />
                    }
                />
            );
        case "image-aside":
            return (
                <ImageAsideLayout
                    content={
                        <TemplateContent
                            {...props}
                            logoWhiteUrl={logoWhiteUrl}
                            logoDarkUrl={logoDarkUrl}
                            brandingVisibilityClassName="md:hidden"
                            cardClassName="border-none bg-transparent shadow-sm h-full"
                        />
                    }
                    imageUrl={bgLightImg}
                />
            );
        case "two-column":
        default:
            return (
                <TwoColumnLayout
                    lightBgUrl={bgLightImg}
                    darkBgUrl={bgDarkImg}
                    logoUrl={logoDarkUrl}
                    content={
                        <TemplateContent
                            {...props}
                            logoWhiteUrl={logoWhiteUrl}
                            logoDarkUrl={logoDarkUrl}
                            brandingVisibilityClassName="lg:hidden"
                            /* Tarjeta blanca/oscura de Shadcn perfectamente limpia */
                            cardClassName="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800 w-full"
                        />
                    }
                />
            );
    }
}