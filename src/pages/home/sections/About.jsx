import styled, {
    keyframes
} from "styled-components";

import Title from "../../../components/texts/Title";
import Description from "../../../components/texts/Description";
import Button from "../../../components/buttons/Button";

import logotipo from '@/assets/logotipo/logotipo-steelconecta-black.svg';


const rotate = keyframes`
    from {
        transform: rotate(0deg) translateY(-8px);
    }
    to {
        transform: rotate(4deg) translateY(8px);
    }
`

const Container = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 5%;
    gap: 36px;
    position: relative;
    overflow: hidden;
    margin-top: -14px;
    background-color: ${(props) => props.theme.color.white['basic']};

    @media (max-width: 768px) {
        gap: 24px;
        padding: 10% 5%;
        flex-direction: column-reverse;
    }
`

const Texts = styled.div`
    width: 50%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 22px;

    @media (max-width: 768px){
        width: 100%;  
        gap: 16px;
        align-items: center;
    }

    & img {
        width: 280px;
        height: auto;
        object-fit: contain;
        object-position: center;

        @media (max-width: 768px){
            width: 180px;
        }
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

const Image = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    transition: all .6s ease-in-out;
    animation: ${rotate} 4s linear infinite alternate;
    
    @media (max-width: 768px){
        width: 100%;    
        position: relative;
        animation: ${rotate} 6s linear infinite alternate;
    }

    &:hover {
        filter: contrast(110%) saturate(110%);
    }

    & img {
        width: 100%;
        height: auto;
        object-fit: contain;
    }
`

export default function About() {
    return (
        <>
            <Container>
                <Texts>
                    <img src={logotipo} alt="logo-da-steel-conecta" />
                    <Title 
                        children="O primeiro ecossistema que une método, Logística de Materiais e oportunidades de negócios."
                    />
                    <Description 
                        children="Somos uma empresa que está dedicada a levar você a um novo nível no mercado da construção civil"
                    />
                    <Button 
                        children="Participar da Steel Conecta"
                        borderColor="rgba(102, 140, 173, .65)"
                        colorText="#fff"
                        bgColor="rgb(29, 83, 124)"
                        borderIconColor="rgba(29,83, 124, .65)"
                        bgIconColor="rgb(102, 140, 173)"
                        svgcolor="#fff"
                    />
                </Texts>
                <Image>
                    <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/1d5acb46-9a35-4301-e8b8-f095d5739700/public" alt="beneficios-entregues-pela-steel-conecta" loading="lazy"/>
                </Image>
            </Container>
        </>
    )
}