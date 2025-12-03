import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Title from "../texts/Title";
import Input from "../others/Input";
import Description from "../texts/Description";


const Container = styled.section`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    height: auto;
    padding: 32px 26px;
    border-radius: 24px 24px 0px 0;
    width: 100%;
    max-width: 800px;
    gap: 22px;
    flex: 1;
    background: linear-gradient(-45deg, ${(props) => props.theme.color.white[100]}, ${(props) => props.theme.color.gray[100]});

    & h1 {
        font-size: 38px;
        width: 100%;
        color: ${(props) => props.theme.color.black[100]};
        line-height: 1;
        font-weight: 400;

        @media (max-width: 768px){
            width: 100%;
            font-size: 28px;
        }
    }

    @media (max-width: 768px){
        padding: 22px 18px;
        max-width: 100%;
    }
`

const ContactForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & p {
        font-size: 14px;
        color: ${(props) => props.theme.color.black[500]};

        & a {
            color: ${(props) => props.theme.color.primary['light']};
        }
    }
`

const Submit = styled.button`
    border: none;
    width: 100%;
    padding: 16px 12px;
    background-color: ${(props) => props.theme.color.primary['basic']};
    color: ${(props) => props.theme.color.white[100]};
    font-size: 18px;
    font-weight: 500;
    border-radius: 12px;
    margin-bottom: 12px;
    cursor: pointer;

    @media (max-width: 768px){
        font-size: 16px;
    }
`

export default function Form() {
    const [values, setValues] = useState({ name: "", email: "", tel: "", state: "", city: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sent, setSent] = useState(false);
    const [step, setStep] = useState(1); // current active input (1-based)
    const startedRef = useRef(false);

    // Helper for safe dataLayer push
    const dlPush = (event, data = {}) => {
        try {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event, ...data });
        } catch (err) {
            // ignore
        }
    };

    // fire form_start once when user first focuses the form
    const handleFormStart = () => {
        if (!startedRef.current) {
            startedRef.current = true;
            dlPush("form_start", { form_id: "contactForm" });
        }
    };

    const firstName = values.name.trim().split(" ")[0] || "";

    const formatPhone = (value) => {
        if (!value) return "";
        // remove tudo que não for dígito
        const digits = value.replace(/\D/g, "").slice(0, 11); // DDD (2) + number (9)
        if (digits.length === 0) return "";
        const ddd = digits.slice(0, 2);
        const rest = digits.slice(2);
        if (rest.length === 0) return `(${ddd}) `;
        if (rest.length <= 5) return `(${ddd}) ${rest}`;
        return `(${ddd}) ${rest.slice(0,5)}-${rest.slice(5)}`;
    };

    const handleChange = (field) => (e) => {
        const raw = e.target.value;
        if (field === "tel") {
            const formatted = formatPhone(raw);
            setValues((prev) => ({ ...prev, [field]: formatted }));
        } else {
            setValues((prev) => ({ ...prev, [field]: raw }));
        }
    };

    const focusNext = (nextStep, nextId) => {
        setStep(nextStep);
        // focus after render
        setTimeout(() => {
            const el = document.getElementById(nextId);
            if (el) {
                el.focus();
                // move caret to end
                if (typeof el.setSelectionRange === "function") {
                    const len = el.value ? el.value.length : 0;
                    el.setSelectionRange(len, len);
                }
            }
        }, 0);
    };

    const handleFinish = () => {
        setStep(5);
        // When finishing via the UI button or per-field 'Enviar', trigger a native form submit
        // using requestSubmit so that analytics / GTM / listeners receive the native submit event.
        // Fallback to direct send if requestSubmit is not available.
        const form = document.getElementById("contactForm");
        if (form && typeof form.requestSubmit === "function") {
            try {
                dlPush("form_submit_attempt", { form_id: "contactForm" });
                form.requestSubmit();
                return;
            } catch (err) {
                // fall through to fallback
            }
        }

        // Fallback: mark as sent and call background webhook
        dlPush("form_submit_attempt", { form_id: "contactForm", mode: "fallback" });
        setSent(true);
        sendToWebhook(values);
    };

    const handleSubmit = (e) => {
        // prevent default full form submit for now
        e.preventDefault();
        if (submitting) return;
        // if on last step and valid, send values to webhook
        if (isNameValid(values.name) && isEmailValid(values.email) && isTelValid(values.tel) && isStateValid(values.state) && isCityValid(values.city)) {
            // show simple sent UI immediately, then send
            setSent(true);
            dlPush("form_submit", {
                form_id: "contactForm",
                name_id: "contactForm-name",
                email_id: "contactForm-email",
                tel_id: "contactForm-tel",
                state_id: "contactForm-state",
                city_id: "contactForm-city",
                name_value: values.name,
                email_value: values.email,
                tel_value: values.tel,
                state_value: values.state,
                city_value: values.city,
            });
            sendToWebhook(values);
            return;
        }
        // otherwise move to first invalid step
        if (!isNameValid(values.name)) setStep(1);
        else if (!isEmailValid(values.email)) setStep(2);
        else if (!isTelValid(values.tel)) setStep(3);
        else if (!isStateValid(values.state)) setStep(4);
        else setStep(5);
    };

    // Validation helpers
    const isNameValid = (name) => {
        return name && name.toString().trim().length > 0;
    };

    const isEmailValid = (email) => {
        if (!email) return false;
        // simples regex de email
        return /^\S+@\S+\.\S+$/.test(email);
    };

    const isTelValid = (tel) => {
        if (!tel) return false;
        const digits = tel.replace(/\D/g, "");
        return digits.length === 11;
    };

    const isStateValid = (state) => {
        return state && state.toString().trim().length > 0;
    };

    const isCityValid = (city) => {
        return city && city.toString().trim().length > 0;
    };

    // Helper: parse utm params from current location
    const getUtmParams = () => {
        try {
            const url = typeof window !== "undefined" ? window.location.href : "";
            const params = new URL(url).searchParams;
            const utm = {};
            [
                "utm_source",
                "utm_medium",
                "utm_campaign",
                "utm_term",
                "utm_content",
                "gclid"
            ].forEach((k) => {
                const v = params.get(k);
                if (v) utm[k] = v;
            });
            // also capture the full source url
            utm.utm_source_url = url;
            utm.utm_captured_at = new Date().toISOString();
            return utm;
        } catch (err) {
            return {};
        }
    };

    const formatRawDigits = (tel) => tel ? tel.replace(/\D/g, "").slice(0, 11) : "";

    const sendToWebhook = async (formValues) => {
        if (submitting) return;
        setSubmitting(true);
        const utm = getUtmParams();
        const referrer = typeof document !== "undefined" ? document.referrer || "" : "";
        const submittedAt = new Date().toISOString();

        const whatsapp_raw = formatRawDigits(formValues.tel);
        const whatsapp_masked = formValues.tel;

        const payload = {
            name: formValues.name || "",
            email: formValues.email || "",
            state: formValues.state || "",
            city: formValues.city || "",
            whatsapp: whatsapp_raw || "",
            whatsapp_raw: whatsapp_raw || "",
            whatsapp_masked: whatsapp_masked || "",
            referrer,
            submittedAt,
            source: typeof window !== "undefined" ? window.location.origin + window.location.pathname : "",
            ...utm,
            webhookUrl: "https://n8n.unitycompany.com.br/webhook/form-steelconecta-lp",
            executionMode: "production",
        };

        try {
            const res = await fetch("https://n8n.unitycompany.com.br/webhook/form-steelconecta-lp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                console.error("Webhook responded with error", res.status, await res.text());
            } else {
                console.log("Form submitted to webhook", payload);
                setSubmitted(true);
                dlPush("form_submit_success", { form_id: "contactForm" });
            }
        } catch (err) {
            console.error("Error sending to webhook:", err);
            dlPush("form_submit_error", { form_id: "contactForm", message: String(err && err.message || err) });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Container>
                <Title 
                    children="Pronto para estruturar sua operação e lucrar de verdade?"
                />
                <Description 
                    children="Você garante a obra, nós garantimos o negócio. Preencha o formulário e descubra como entrar para o time que lidera o mercado."
                />
                {sent ? (
                    <div style={{ padding: 0, textAlign: 'left', color: 'var(--color--black)' }}>Obrigado por enviar o formulário, em breve nosso time entrará em contato com você!</div>
                ) : (
                    <ContactForm id="contactForm" onSubmit={handleSubmit} data-aos="fade-up">
                    <Input 
                        questionNumber="1."
                        children={`Olá, para inicar, qual o seu nome?`}
                        questionData="Nome"
                        typeInput="text"
                        placeholderInput="Jane"
                        idInput="contactForm-name"
                        nameInput="name"
                        value={values.name}
                        onChange={(e) => {
                            handleFormStart();
                            handleChange("name")(e);
                        }}
                        onFocus={() => {
                            handleFormStart();
                            dlPush("form_field_focus", { form_id: "contactForm", field_id: "contactForm-name" });
                        }}
                        locked={false}
                        isCurrent={step === 1}
                        onNext={() => {
                            dlPush("form_field_complete", { form_id: "contactForm", field_id: "contactForm-name", value: values.name });
                            focusNext(2, "contactForm-email");
                        }}
                    />
                    <Input 
                        questionNumber="2."
                        children={`${firstName || ""}, qual é o seu melhor e-mail?`}
                        questionData="E-mail"
                        typeInput="email"
                        placeholderInput={firstName ? `${firstName}@example.com` : "seu@exemplo.com"}
                        idInput="contactForm-email"
                        nameInput="email"
                        value={values.email}
                        onChange={(e) => {
                            handleFormStart();
                            handleChange("email")(e);
                        }}
                        onFocus={() => {
                            handleFormStart();
                            dlPush("form_field_focus", { form_id: "contactForm", field_id: "contactForm-email" });
                        }}
                        // locked until user advances to step 2 (presses Enter or Enviar on step 1)
                        locked={step < 2}
                        isCurrent={step === 2}
                        onNext={() => {
                            dlPush("form_field_complete", { form_id: "contactForm", field_id: "contactForm-email", value: values.email });
                            focusNext(3, "contactForm-tel");
                        }}
                    />
                    <Input 
                        questionNumber="3."
                        children={`Boa${firstName ? ", " + firstName : ""}! Falta só o seu WhatsApp`}
                        questionData="WhatsApp"
                        typeInput="tel"
                        placeholderInput="(24) 98111-1111"
                        idInput="contactForm-tel"
                        nameInput="tel"
                        value={values.tel}
                        onChange={(e) => {
                            handleFormStart();
                            handleChange("tel")(e);
                        }}
                        onFocus={() => {
                            handleFormStart();
                            dlPush("form_field_focus", { form_id: "contactForm", field_id: "contactForm-tel" });
                        }}
                        // locked until user advances to step 3 (presses Enter or Enviar on step 2)
                        locked={step < 3}
                        isCurrent={step === 3}
                        onNext={() => {
                            dlPush("form_field_complete", { form_id: "contactForm", field_id: "contactForm-tel", value: values.tel });
                            focusNext(4, "contactForm-state");
                        }}
                    />
                    {step >= 4 && (
                        <Input 
                            questionNumber="4."
                            children={`Em qual estado você mora, ${firstName ? ", " + firstName : ""}?`}
                            questionData="Estado"
                            typeInput="text"
                            placeholderInput="RJ"
                            idInput="contactForm-state"
                            nameInput="state"
                            value={values.state}
                            onChange={(e) => {
                                handleFormStart();
                                handleChange("state")(e);
                            }}
                            onFocus={() => {
                                handleFormStart();
                                dlPush("form_field_focus", { form_id: "contactForm", field_id: "contactForm-state" });
                            }}
                            locked={step < 4}
                            isCurrent={step === 4}
                            onNext={() => {
                                dlPush("form_field_complete", { form_id: "contactForm", field_id: "contactForm-state", value: values.state });
                                focusNext(5, "contactForm-city");
                            }}
                        />
                    )}
                    {step >= 5 && (
                        <Input 
                            questionNumber="5."
                            children={`E em qual cidade?`}
                            questionData="Cidade"
                            typeInput="text"
                            placeholderInput="Rio de Janeiro"
                            idInput="contactForm-city"
                            nameInput="city"
                            value={values.city}
                            onChange={(e) => {
                                handleFormStart();
                                handleChange("city")(e);
                            }}
                            onFocus={() => {
                                handleFormStart();
                                dlPush("form_field_focus", { form_id: "contactForm", field_id: "contactForm-city" });
                            }}
                            locked={step < 5}
                            isCurrent={step === 5}
                            onNext={() => {
                                dlPush("form_field_complete", { form_id: "contactForm", field_id: "contactForm-city", value: values.city });
                                handleFinish();
                            }}
                        />
                    )}
                    {isNameValid(values.name) && isEmailValid(values.email) && isTelValid(values.tel) && isStateValid(values.state) && isCityValid(values.city) ? (
                        <Submit type="submit" disabled={submitting || submitted}>
                            {submitting ? "Enviando..." : "Enviar e falar com o consultor"}
                        </Submit>
                    ) : null}
                    <p>*Ao entrar em contato você concorda com a nossa <a href="#">Politica de Privacidade</a>.</p>
                </ContactForm>
                )}
            </Container>
        </>
    )
}