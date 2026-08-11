import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import type { ReactNode } from "react";
import { useEffect } from "react";
import defaultLogo from "../../assets/img/logo_2.png";

// Importación directa de tus imágenes desde assets/login/
// NOTA: Si tus archivos tienen otra extensión (ej: .png en vez de .jpg), cámbiala aquí
import bgLightImg from "../../assets/login/login_blanco.png";
import bgDarkImg from "../../assets/login/login_negro.png";
import posgradoLogoLight from "../../assets/login/posgrado_logo_blanco.png";
import posgradoLogoDark from "../../assets/login/posgrado_logo_negro.png";

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
                            cardClassName="border border-border/40 bg-card rounded-3xl shadow-xl p-8 max-w-sm w-full mx-auto"
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
                    // Pasamos los logos de posgrado al layout
                    posgradoLogoLightUrl={posgradoLogoLight}
                    posgradoLogoDarkUrl={posgradoLogoDark}
                    content={
                        <TemplateContent
                            {...props}
                            logoWhiteUrl={logoWhiteUrl}
                            logoDarkUrl={logoDarkUrl}
                            brandingVisibilityClassName="lg:hidden"
                               />
                    }
                />
            );
    }
}