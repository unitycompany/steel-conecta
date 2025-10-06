import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/free-mode';

import logoWhite from '../../../assets/icon/icon-steelconecta-gold.svg';

const Container = styled.section`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -12px;
    background: ${(props) => props.theme.color.black['basic']};
    overflow: hidden;

    @media (max-width: 768px){
        height: 60px;
    }
`;

const BrandWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
`;

const BrandText = styled.span`
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    white-space: nowrap;
`;

const BrandLogo = styled.img`
    height: 32px;
    width: auto;
    display: block;
`;

export default function Range() {
    return (
        <>
            <Container>
                <Swiper
                    modules={[FreeMode, Autoplay]}
                    autoplay={{ delay: 0, disableOnInteraction: false }}
                    speed={4000}
                    freeMode={true}
                    freeModeMomentum={true}
                    grabCursor={true}
                    minimumVelocity={0.2}
                    loop={true}
                    slidesPerView={'auto'}
                    spaceBetween={12}
                    style={{ width: '100%' }}
                >
                    {Array.from({ length: 12 }).map((_, i) => (
                        <SwiperSlide key={i} style={{ width: 'auto' }}>
                            <BrandWrapper>
                                <BrandText>Steel Conecta</BrandText>
                                <BrandLogo src={logoWhite} alt="Steel Conecta" />
                            </BrandWrapper>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </>
    )
}