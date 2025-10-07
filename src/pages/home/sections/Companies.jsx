import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';

import styled from "styled-components";
import Title from "@/components/texts/Title";
import Description from "@/components/texts/Description";

import companies from '@/db/companies';
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import CompaniesCard from "../../../components/cards/Companies";

const Container = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 5% 5%;
    gap: 48px;
`

const Texts = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px){
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
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

    & p {
        font-size: 18px;
        line-height: 1.2;
        color: ${(props) => props.theme.color.gray[300]};
        font-weight: 300;
        width: 50%;

        @media (max-width: 768px){
            width: 100%;
            font-size: 16px;
        }
    }
`

const Carousel = styled.div`
    width: 100%;
    height: 100%;

    & swiper {
        width: 100%;
    }
`

const Controls = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 18px 0;

    & .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        & div {
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${(props) => props.theme.color.white[300]};
            color: ${(props) => props.theme.color.black[100]};
            font-size: 18px;
            border-radius: 12px;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.3s ease;

            & svg {
                transition: all 0.3s ease;
            }

            & .isHover {
                position: absolute;
                transform: translateX(40px);
                opacity: 0;
                transition: all 0.3s ease;
            }

            &:hover .isHover {
                transform: translateY(0px);
                opacity: 1;
            }

            &:hover {
                transform: scale(0.98);
                background: ${(props) => props.theme.color.white[0]};
            }

            &:hover svg {
                transform: translateX(-40px);
            }
        }
    }

    & .info {

        & span {
            font-size: 16px;
            color: ${(props) => props.theme.color.gray[500]};
            font-weight: 400;

            @media (max-width: 768px){
                font-size: 14px;
                line-height: 40%;
            }

            & strong {
                font-weight: 500;
                color: ${(props) => props.theme.color.white[100]};
            }
        }
    }
`

export default function Companies () {
    return (
        <>
            <Container>
                <Texts>
                    <Title 
                        children="Parcerias de alto nível, para te guiar e auxiliar"
                    />
                    <Description 
                        children="Somos uma empresa que está dedicada a levar você a um novo nível no mercado da construção civil"
                    />
                </Texts>
                <Carousel>
                    <Swiper 
                        modules={[Navigation]}
                        grabCursor={true}
                        loop={false}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        slidesPerView={1}
                        spaceBetween={12}
                        breakpoints={{
                            769: {
                                slidesPerView: 3,
                                spaceBetween: 12
                            }
                        }}
                    >
                        {companies.map((company, i) => (
                            <SwiperSlide key={i} className="swiper-slide">
                                <CompaniesCard 
                                    companyImg={company.companyImg}
                                    companyName={company.companyName}
                                    description={company.description}
                                    list={company.list}
                                    bgColor={company.bgColor}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Controls>
                        <aside className="info">
                            <span>Todos esses serviços serão entregues pela <strong>Steel Conecta</strong></span>
                        </aside>
                        <aside className="buttons">
                            <div className="swiper-button-prev">
                                <ArrowLeftIcon />
                                <ArrowLeftIcon className="isHover"/>
                            </div>
                            <div className="swiper-button-next">
                                <ArrowRightIcon />
                                <ArrowRightIcon className="isHover"/>
                            </div>
                        </aside>
                    </Controls>
                </Carousel>
            </Container>
        </>
    )
}