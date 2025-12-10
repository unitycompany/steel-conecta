import { useEffect, useMemo } from "react";
import services from "@/db/services";
import logo from "@/assets/logotipo/logotipo-steelconecta-black.svg";

// Perguntas do FAQ exibidas na página, mantidas aqui para refletir o conteúdo real
const faqItems = [
    {
        question: "É possível obter financiamento para Steel Frame?",
        response: "Sim. CAIXA Econômica Federal, bancos privados e financeiras especializadas aprovam projetos Steel Frame regularmente. Fornecemos documentação técnica completa para facilitar o processo."
    },
    {
        question: "Qual a durabilidade real da estrutura Steel Frame?",
        response: "Garantia estrutural de 10 anos, certificação PBQP-H e resistência comprovada contra intempéries, pragas e desgaste temporal. Performance superior à alvenaria tradicional."
    },
    {
        question: "O prazo de 4 meses é factível?",
        response: "Sim. Construção industrializada com cronograma controlado, independente de fatores climáticos. Tecnologia CNC garante precisão e agilidade executiva."
    },
    {
        question: "Como funciona o isolamento termoacústico?",
        response: "Certificação Rw 45dB com isolamento em lã de vidro. Redução média de 24% no consumo energético, proporcionando conforto superior aos hóspedes."
    },
    {
        question: "A manutenção é complexa?",
        response: "Estrutura modular facilita manutenções pontuais quando necessárias. Sistema construtivo elimina problemas recorrentes como fissuras e infiltrações."
    }
];

export default function StructuredData() {
    // Resolve a URL canônica mesmo em ambientes sem window (ex.: SSR)
    const canonicalUrl = useMemo(() => {
        if (typeof window === "undefined") {
            return "https://steelconecta.com.br";
        }
        const { origin, pathname } = window.location;
        return `${origin}${pathname || "/"}`;
    }, []);

    const structuredData = useMemo(() => {
        const faqMainEntity = faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.response,
            },
        }));

        const serviceItems = services.map((service) => ({
            "@type": "Service",
            name: service.title,
            description: service.description,
            image: service.image,
            url: canonicalUrl,
            provider: {
                "@type": "Organization",
                name: "Steel Conecta",
                url: canonicalUrl,
            },
        }));

        return [
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Steel Conecta",
                url: canonicalUrl,
                logo: logo,
                description: "Ecossistema completo de construção a seco com supply, engenharia e suporte comercial.",
            },
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Steel Conecta",
                url: canonicalUrl,
                potentialAction: {
                    "@type": "ContactAction",
                    name: "Fale com um consultor",
                    target: `${canonicalUrl}#form`,
                },
            },
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Steel Conecta | 2025",
                url: canonicalUrl,
                description: "Uma obra com margem vale mais que dez no prejuízo. Steel Conecta oferece suporte, supply e vendas para operações em steel frame.",
                isPartOf: { "@id": canonicalUrl },
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqMainEntity,
            },
            {
                "@context": "https://schema.org",
                "@type": "ItemList",
                name: "Serviços Steel Conecta",
                itemListOrder: "http://schema.org/ItemListUnordered",
                itemListElement: serviceItems.map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item,
                })),
            },
        ];
    }, [canonicalUrl]);

    useEffect(() => {
        const scriptId = "steelconecta-structured-data";
        const existing = document.getElementById(scriptId);
        if (existing && existing.parentNode) {
            existing.parentNode.removeChild(existing);
        }

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = scriptId;
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [structuredData]);

    return null;
}
