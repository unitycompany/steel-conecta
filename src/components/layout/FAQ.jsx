import React from "react";
import styled from "styled-components";
import Question from "../cards/Question";
import Title from "../texts/Title";

const Container = styled.section`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    height: auto;
    gap: 22px;
    width: 100%;
    flex: 1;

    @media (max-width: 768px){
        gap: 18px;
    }

    & h1 {
        font-size: 38px;
        width: 50%;
        color: ${(props) => props.theme.color.white[100]};
        line-height: 1;
        font-weight: 400;

        @media (max-width: 768px){
            width: 100%;
            font-size: 28px;
        }
    }
`

const Tasks = styled.ol`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`

export default function FAQ() {
    // accordion behavior: only one question open at a time
    // store the open question index (or null for none)
    const [openIndex, setOpenIndex] = React.useState(0);

    const handleToggle = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <>
            <Container>
                <Title 
                    children="FAQ"
                />
                <Tasks>
                    {[
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
                    ].map((q, idx) => (
                        <Question
                            key={idx}
                            questionText={q.question}
                            responseText={q.response}
                            isOpen={openIndex === idx}
                            onToggle={() => handleToggle(idx)}
                        />
                    ))}
                </Tasks>
            </Container>
        </>
    )
}