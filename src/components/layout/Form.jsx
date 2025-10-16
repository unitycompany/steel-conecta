import React, { useState } from "react";
import styled from "styled-components";
import Title from "../texts/Title";
import Input from "../others/Input";


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
    const [values, setValues] = useState({ name: "", email: "", tel: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sent, setSent] = useState(false);
    const [step, setStep] = useState(1); // current active input (1-based)

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
        setStep(3);
        // finalize: submit the form to webhook
        // set UI to sent immediately and send in background
        setSent(true);
        sendToWebhook(values);
    };

    const handleSubmit = (e) => {
        // prevent default full form submit for now
        e.preventDefault();
        if (submitting) return;
        // if on last step and valid, send values to webhook
        if (isNameValid(values.name) && isEmailValid(values.email) && isTelValid(values.tel)) {
            // show simple sent UI immediately, then send
            setSent(true);
            sendToWebhook(values);
            return;
        }
        // otherwise move to first invalid step
        if (!isNameValid(values.name)) setStep(1);
        else if (!isEmailValid(values.email)) setStep(2);
        else setStep(3);
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
            }
        } catch (err) {
            console.error("Error sending to webhook:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Container>
                <Title 
                    children="Garanta a sua vaga no pré-lançamento"
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
                        onChange={handleChange("name")}
                        locked={false}
                        isCurrent={step === 1}
                        onNext={() => focusNext(2, "contactForm-email")}
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
                        onChange={handleChange("email")}
                        // locked until user advances to step 2 (presses Enter or Enviar on step 1)
                        locked={step < 2}
                        isCurrent={step === 2}
                        onNext={() => focusNext(3, "contactForm-tel")}
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
                        onChange={handleChange("tel")}
                        // locked until user advances to step 3 (presses Enter or Enviar on step 2)
                        locked={step < 3}
                        isCurrent={step === 3}
                        onNext={handleFinish}
                    />
                    {isNameValid(values.name) && isEmailValid(values.email) && isTelValid(values.tel) ? (
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