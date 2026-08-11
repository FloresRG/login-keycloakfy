import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Label } from "@/components/ui/label";
import { WebAuthnConditionalUI } from '@/login/components/WebAuthnConditionalUi';
import { useKcContext } from "@/login/KcContext";
import { kcSanitize } from "@keycloakify/login-ui/kcSanitize";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { useState } from "react";
import { assert } from "tsafe/assert";
import { PasswordVisibilityButton } from "../../components/PasswordVisibilityButton";
import { useI18n } from "../../i18n";
import { User, Lock, ArrowRight } from "lucide-react";

export function Form() {
    const { kcContext } = useKcContext();

    assert(kcContext.pageId === "login.ftl");

    const { msg, msgStr } = useI18n();

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const showPlaceholder = kcContext.properties.SHADCN_THEME_PLACEHOLDER === "true";

    const { kcClsx } = useKcClsx();

    const usernameLabel = !kcContext.realm.loginWithEmailAllowed
        ? msg("username")
        : !kcContext.realm.registrationEmailAsUsername
            ? msg("usernameOrEmail")
            : msg("email");

    const usernamePlaceholderText = showPlaceholder
        ? !kcContext.realm.loginWithEmailAllowed
            ? msgStr("usernamePlaceholder")
            : !kcContext.realm.registrationEmailAsUsername
                ? msgStr("usernameOrEmailPlaceholder")
                : msgStr("emailPlaceholder")
        : usernameLabel;

    return (
        <>
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {/* Encabezado con Icono e Interfaz de la imagen */}
                    <div className="flex flex-col items-center mb-6 text-center">
                        <div className="relative flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-blue-500/10 text-[#1E4883] border border-blue-200/50 shadow-sm">
                            <div className="absolute inset-0 rounded-full border border-blue-400/20 scale-125 pointer-events-none" />
                            <div className="absolute inset-0 rounded-full border border-blue-400/30 scale-110 pointer-events-none" />
                            <User className="w-8 h-8 text-[#1E4883]" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Inicia sesión
                        </h2>
                        <div className="w-8 h-0.5 bg-amber-400/80 my-2 rounded-full" />
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                            Accede a tu cuenta institucional
                        </p>
                    </div>

                    {kcContext.realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={kcContext.url.loginAction}
                            method="post"
                            className="space-y-4"
                        >
                            {/* Campo Usuario / Correo */}
                            {!kcContext.usernameHidden && (
                                <Field>
                                    <FieldLabel htmlFor="username" className="sr-only">
                                        {usernameLabel}
                                    </FieldLabel>
                                    
                                    <InputGroup className="bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/20 rounded-2xl h-12 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                                        <InputGroupAddon align="inline-start" className="pl-4 text-slate-500">
                                            <User className="w-5 h-5" />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            type="text"
                                            id="username"
                                            defaultValue={kcContext.login.username ?? ""}
                                            name="username"
                                            autoFocus
                                            placeholder={usernamePlaceholderText}
                                            autoComplete={kcContext.enableWebAuthnConditionalUI ? "username webauthn" : "username"}
                                            aria-invalid={kcContext.messagesPerField.existsError(
                                                "username",
                                                "password"
                                            )}
                                            className="bg-transparent border-0 focus:ring-0 focus-visible:ring-0 text-sm placeholder:text-slate-400"
                                        />
                                    </InputGroup>

                                    {kcContext.messagesPerField.existsError(
                                        "username",
                                        "password"
                                    ) && (
                                        <FieldError>
                                            <span
                                                id="input-error-username"
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(
                                                        kcContext.messagesPerField.getFirstError(
                                                            "username",
                                                            "password"
                                                        )
                                                    )
                                                }}
                                            />
                                        </FieldError>
                                    )}
                                </Field>
                            )}

                            {/* Campo Contraseña */}
                            <Field>
                                <FieldLabel htmlFor="password" className="sr-only">
                                    {msg("password")}
                                </FieldLabel>
                                <InputGroup className="bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/20 rounded-2xl h-12 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                                    <InputGroupAddon align="inline-start" className="pl-4 text-slate-500">
                                        <Lock className="w-5 h-5" />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        type="password"
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        placeholder={showPlaceholder ? msgStr("passwordPlaceholder") : msg("password")}
                                        aria-invalid={kcContext.messagesPerField.existsError(
                                            "username",
                                            "password"
                                        )}
                                        className="bg-transparent border-0 focus:ring-0 focus-visible:ring-0 text-sm placeholder:text-slate-400"
                                    />
                                    <InputGroupAddon align="inline-end" className="pr-2">
                                        {/* Ondas concéntricas sobre el botón de ver contraseña */}
                                        <div className="relative flex items-center justify-center p-1">
                                            <div className="absolute inset-0 rounded-full border border-blue-400/20 scale-125 pointer-events-none" />
                                            <div className="absolute inset-0 rounded-full border border-blue-400/30 scale-110 pointer-events-none" />
                                            <PasswordVisibilityButton passwordInputId="password" />
                                        </div>
                                    </InputGroupAddon>
                                </InputGroup>

                                {kcContext.messagesPerField.existsError(
                                    "username",
                                    "password"
                                ) && (
                                    <FieldError>
                                        <span
                                            id="input-error-password"
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(
                                                    kcContext.messagesPerField.getFirstError(
                                                        "username",
                                                        "password"
                                                    )
                                                )
                                            }}
                                        />
                                    </FieldError>
                                )}
                            </Field>

                            {/* Recordar Sesión & Olvidaste tu contraseña */}
                            <div className="flex items-center justify-between text-xs pt-1">
                                {kcContext.realm.rememberMe &&
                                    !kcContext.usernameHidden && (
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="rememberMe"
                                                name="rememberMe"
                                                defaultChecked={
                                                    !!kcContext.login.rememberMe
                                                }
                                                className="rounded-md border-blue-600 data-[state=checked]:bg-[#2D61A6] data-[state=checked]:border-[#2D61A6]"
                                            />
                                            <Label
                                                htmlFor="rememberMe"
                                                className="text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer select-none"
                                            >
                                                {msg("rememberMe")}
                                            </Label>
                                        </div>
                                    )}

                                <div className="link-style ml-auto">
                                    {kcContext.realm.resetPasswordAllowed && (
                                        <a
                                            href={kcContext.url.loginResetCredentialsUrl}
                                            className="text-amber-700 dark:text-amber-500 font-medium hover:underline"
                                        >
                                            <Label className="text-xs font-semibold cursor-pointer text-amber-700 dark:text-amber-500">
                                                {msg("doForgotPassword")}
                                            </Label>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Input oculto y Botón Principal */}
                            <div className={kcClsx("kcFormGroupClass")}>
                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    value={kcContext.auth.selectedCredential}
                                />

                                <Button
                                    disabled={isLoginButtonDisabled}
                                    className="w-full h-12 bg-gradient-to-r from-[#2B60A5] to-[#1E4883] hover:from-[#234F88] hover:to-[#173766] text-white font-medium shadow-lg rounded-2xl px-6 flex items-center justify-between transition-all duration-200"
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                >
                                    <span className="w-full text-center pl-6 font-semibold text-base">
                                        {msgStr("doLogIn")}
                                    </span>
                                    <ArrowRight className="w-5 h-5 shrink-0" />
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {kcContext.enableWebAuthnConditionalUI && (
                <WebAuthnConditionalUI
                    isUserIdentified={kcContext.isUserIdentified}
                    challenge={kcContext.challenge}
                    rpId={kcContext.rpId}
                    userVerification={kcContext.userVerification}
                    createTimeout={kcContext.createTimeout}
                    authenticators={kcContext.authenticators?.authenticators}
                    loginAction={kcContext.url.loginAction}
                />
            )}
        </>
    );
}