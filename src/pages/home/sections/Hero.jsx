import styled, {keyframes} from "styled-components";
import Badge from "@components/badges/Badge";
import Title from "@components/texts/Title";
import Description from "@components/texts/Description";
import Button from "@components/buttons/Button";

import logoIcon from '@/assets/icon/icon-steelconecta-white.svg';

const Container = styled.section`
    width: 100%;
    padding: 0 5%;
    background: ${( props ) => props.theme.color.white[300]};
    border-radius: 0px 0px 28px 28px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: -12px;
    gap: 42px;

    @media (max-width: 768px) {
        flex-direction: column-reverse; 
        border-radius: 0 0 18px 18px;   
    }
`

const Texts = styled.aside`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 24px;
    width: 55%;
    position: relative;

    @media (max-width: 768px) {
        width: 100%;    
        z-index: 99999;
        margin-top: -6vh;
        padding-bottom: 26px;
        gap: 22px;
    }

    & .badge {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        gap: 10px;

        & .infos {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            gap: 4px;

            & h1 {
                font-size: 18px;
                color: ${( props ) => props.theme.color.black[300]};
                line-height: 1;
                font-weight: 500;

                @media (max-width: 768px) {
                    font-size: 14px;    
                }
            }

            & p {
                font-size: 14px;
                color: ${( props ) => props.theme.color.gray['basic']};
                line-height: 1;
                font-weight: 300;
                font-style: italic;

                @media (max-width: 768px) {
                    font-size: 12px;
                }
            }
        }
    }

    & h1 {
        font-size: 38px;
        line-height: 1;
        font-weight: 400;
        color: ${( props ) => props.theme.color.black[300]};

        @media (max-width: 768px) {
            font-size: 28px;            
        }
    }

    & p {
        font-size: 18px;
        line-height: 1.2;
        font-weight: 400;
        color: ${( props ) => props.theme.color.black[500]};

        @media (max-width: 768px) {
            font-size: 16px;            
        }
    }
`

const moviment = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-60px); }
    100% { transform: translateY(0); }
`

const movimentReverse = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(60px); }
    100% { transform: translateY(0); }
`

const Images = styled.aside`
    width: 45%;
    height: calc(90vh - 92px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 12px;
    position: relative;

    @media (max-width: 768px) {
        gap: 8px;
    }

    &::before{
        display: none;
        content: '';
        width: 100%;
        height: 100px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(242, 242, 242, 0) 0%, rgba(242, 242, 242, 1) 100%);
        z-index: 2;

        @media (max-width: 768px) {
            display: block;
            bottom: 0;
            top: auto;
            background: linear-gradient(180deg, rgba(242, 242, 242, 0) 0%, rgba(242, 242, 242, 1) 100%);
        }
    }

    &::after {
        display: none;
        content: '';
        width: 100%;
        height: 100px;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(0deg, rgba(242, 242, 242, 0) 0%, rgba(242, 242, 242, 1) 100%);
        z-index: 2;

        @media (max-width: 768px) {
            display: block;
            bottom: 0;
            top: auto;
            background: linear-gradient(180deg, rgba(242, 242, 242, 0) 0%, rgba(242, 242, 242, 1) 100%);
        }
    }

    @media (max-width: 768px) {
        width: 100%; 
        height: 400px;
        overflow: hidden;
    }
`

const Content = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    animation: ${moviment} 8s ease-in-out infinite;
    position: relative;

    @media (max-width: 768px) {
        gap: 8px;
    }

    & .item {
        border-radius: 8px;
        overflow: hidden;
        transition: all .3s ease-in-out;
        position: relative;
        z-index: 1;

        @media (max-width: 768px) {
            border-radius: 8px;
        }

        &:hover {
            transform: translateY(-6px);
            border-radius: 12px;
        }

        &:nth-child(1){

            img {
                height: 48vh;

                @media (max-width: 768px) {
                    height: 28vh;
                }
            }
        }

        &:nth-child(2){
            
            img {
                height: 38vh;

                @media (max-width: 768px) {
                    height: 22vh;
                }
            }
        }

        &:nth-child(3){
            
            img {
                height: 28vh;

                @media (max-width: 768px) {
                    height: 18vh;
                }
            }
        }

        & img {
            object-fit: cover;
        }
    }

    &:nth-child(2) {
        margin-top: 20vh;
        animation: ${movimentReverse} 6s ease-in-out infinite;
        flex-direction: column-reverse;

        @media (max-width: 768px) {
            margin-top: 8vh;
        }
    }

    &:nth-child(3) {
        margin-top: -20vh;
        animation: ${moviment} 10s ease-in-out infinite;

        @media (max-width: 768px) {
            margin-top: -8vh;
        }
    }
`

export default function Hero () {
    return (
        <>
            <Container>
                <Texts>
                    <div className="badge">
                        <Badge 
                            children={<img src={logoIcon} alt="steelconecta-icon" title="Steel Conecta" />}
                            borderColor="rgb(77, 77, 77)"
                            bgColor="rgb(26, 26, 26)"
                        />
                        <div className="infos">
                            <Title 
                                children="O Steel Frame não é o futuro, já é o presente"
                            />
                            <Description 
                                children="Steel Conecta | 2025"
                            />
                        </div>
                    </div>
                    <Title 
                        children="Aprenda a trabalhar com Steel Frame e seja pioneiro na sua região!"
                    />
                    <Description 
                        children="Fazer parte da SteelConecta, integrante da FAST Franchising, é ter acesso a um modelo validado, com condições especiais e um sistema completo para empreender no Steel Frame com segurança e rentabilidade."
                    />
                    <Button 
                        children="Quero reservar minha vaga"
                        borderColor="rgba(102, 140, 173, .65)"
                        colorText="#fff"
                        bgColor="rgb(29, 83, 124)"
                        borderIconColor="rgba(29,83, 124, .65)"
                        bgIconColor="rgb(102, 140, 173)"
                        svgcolor="#fff"
                        onClick={() => {
                            const scrollForm = document.getElementById('form');
                            if (scrollForm) {
                                scrollForm.scrollIntoView({ behavior: 'smooth'});
                            }
                        }}
                    />
                </Texts>
                <Images>
                    <Content>
                        <div className="item">
                            <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/81eeb305-1198-4f8a-29cd-05bf0fcc8600/public" alt="" />
                        </div>
                        <div className="item">
                            <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/743ad582-bfed-4984-1453-789580724900/public" alt="" />
                        </div>
                        <div className="item">
                            <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/5a1c9de9-558a-440c-70d9-ee0ca113fe00/public" alt="" />
                        </div>
                    </Content>
                    <Content>
                        <div className="item">
                            <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/5a1c9de9-558a-440c-70d9-ee0ca113fe00/public" alt="" />
                        </div>
                        <div className="item">
                            <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/3c497268-5ebc-4f6e-aa8e-617d5ccd5300/public" alt="" />
                        </div>
                        <div className="item">
                            <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/5a1c9de9-558a-440c-70d9-ee0ca113fe00/public" alt="" />
                        </div>
                    </Content>
                    <Content>
                        <div className="item">
                            <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/99c2fa33-a17c-477c-944d-cbcb573c2300/public" alt="" />
                        </div>
                        <div className="item">
                            <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/e14f8819-d6f8-480b-9fa3-d9e36e67b900/public" alt="" />
                        </div>
                        <div className="item">
                            <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/5a1c9de9-558a-440c-70d9-ee0ca113fe00/public" alt="" />
                        </div>
                    </Content>
                </Images>
            </Container>
        </>
    )
}