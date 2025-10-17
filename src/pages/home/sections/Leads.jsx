import styled, {keyframes} from "styled-components";
import Lines from "../../../components/patterns/Lines";
import Title from "../../../components/texts/Title";
import Description from "../../../components/texts/Description";
import Button from "../../../components/buttons/Button";

import { rgba } from "polished";

const pulse = keyframes`
    0% {
        transform: translate(-50%, -50%) scale(0.85);
        opacity: 1;
    }
    50% {
        transform: translate(-50%, -50%) scale(1.05);
        opacity: 0.7;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.85);
        opacity: 1;
    }
`

const moviment = keyframes`
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(16px) rotate(4deg);
    }
    100% {
        transform: translateY(0px);
    }
`   

const Container = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 5% 5%;
    gap: 36px;
    border: 1px solid #00000040;
    border-left: none;
    border-right: none;
    position: relative;
    overflow: hidden;
    margin-top: -16px;

    @media (max-width: 768px) {
        gap: 24px;
        padding: 10% 5%;
    }
`

const Bg = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
`

const Content = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    @media (max-width: 768px){
        flex-direction: column;
        gap: 34px;
    }
`

const Image = styled.div`
    width: 50%;
    position: relative;
    height: 500px;

    @media (max-width: 768px){
        width: 100%;    
        height: 350px;
    }

    &::before {
        content: '';
        width: 400px;
        height: 400px;
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        z-index: -1;
        background: ${(props) => rgba(props.theme.color.secoundary['basic'], 0.1)};
        animation-delay: 1000ms;
        animation: ${pulse} 4s ease-in-out infinite alternate;

        @media (max-width: 768px){
            width: 300px;
            height: 300px;    
        }
    }

    &::after {
        content: '';
        width: 300px;
        height: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        z-index: -1;
        animation: ${pulse} 4s ease-in-out infinite alternate;
        background: ${(props) => rgba(props.theme.color.secoundary['basic'], 0.2)};

        @media (max-width: 768px){
            width: 200px;
            height: 200px;
        }
    }

    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        animation: ${moviment} 3s ease-in-out infinite alternate;
        filter: contrast(110%) brightness(110%);
    }
`

const Texts = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 24px;

    @media (max-width: 768px){
        width: 100%;
        align-items: center;
        gap: 16px;
    }

    & h1 {
        font-size: 38px;
        color: ${(props) => props.theme.color.black[100]};
        line-height: 1;
        font-weight: 400;

        @media (max-width: 768px){
            width: 100%;
            text-align: center;
            font-size: 28px;
        }
    }

    & p {
        font-size: 18px;
        line-height: 1.2;
        color: ${(props) => props.theme.color.black[500]};
        font-weight: 300;

        @media (max-width: 768px){
            width: 100%;
            text-align: center;
            font-size: 16px;
        }
    }
`

export default function Leads() {
    return (
        <>
            <Container>
                <Bg>
                    <Lines 
                        spacing={8} 
                        color="#00000010" 
                        lineWidth={1} 
                        angle={-15} 
                        bg="rgb(248, 248, 248)"
                        style={{ height: '800px' }}
                    />
                </Bg>
                <Content>
                    <Image>
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/e1b422b8-f063-4e1b-fe3f-2e96fe453800/public" alt="" loading="lazy"/>
                    </Image>
                    <Texts>
                        <Title 
                            children="Receba leads que viram contratos de verdade"
                        />
                        <Description 
                            children="A SteelConecta gera oportunidades reais para que você foque no que faz de melhor: Construir."
                        />
                        <Button 
                            children="Quero reservar minha vaga"
                            borderColor="rgba(77, 77, 77, .65)"
                            colorText="#fff"
                            bgColor="rgb(51, 51, 51)"
                            borderIconColor="rgba(77,77, 77, .65)"
                            bgIconColor="rgb(26, 26, 26)"
                            svgcolor="#fff"
                            onClick={() => {
                                const scrollForm = document.getElementById('form');
                                if (scrollForm) {
                                    scrollForm.scrollIntoView({ behavior: 'smooth'});
                                }
                            }}
                        />
                    </Texts>
                </Content>
            </Container>
        </>
    )
}