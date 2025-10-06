import styled from "styled-components";

import Logotipo from '@/assets/logotipo/logotipo-steelconecta-white.svg';
import Logoicon from '@/assets/icon/icon-steelconecta-white.svg';
import Button from "../buttons/Button";

const Container = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    height: auto;
    position: relative;
    height: 80px;
    padding: 0 5%;

    & .image {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        cursor: pointer;

        & img {
            width: auto;
            height: 48px;
            object-fit: contain;
            object-position: center;
        }
    }
`

export default function Header() {
    return (
        <>
            <Container>
                <picture className="image" onClick={() => window.location.reload()}>
                    <source 
                        srcSet={Logoicon}
                        type="image/svg+xml"
                        media="(max-width: 768px)"
                    />
                    <img 
                        src={Logotipo} 
                        alt="steelconecta-logo" 
                        title="Steel Conecta"
                        loading="eager"
                    />
                </picture>
                <Button 
                    children="Participar da Steel Conecta"
                    borderColor="rgba(102, 140, 173, .65)"
                    colorText="#fff"
                    bgColor="rgb(29, 83, 124)"
                    borderIconColor="rgba(29,83, 124, .65)"
                    bgIconColor="rgb(102, 140, 173)"
                    svgcolor="#fff"
                />
            </Container>
        </>
    )
}