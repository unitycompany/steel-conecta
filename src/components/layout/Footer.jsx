import React from "react";
import styled from "styled-components";

import alephwebdev from "@/assets/icon/icon-black-aleph-desenvolvedor-web.svg";
import Lines from "../patterns/Lines";
import AlephsramosdevWidget from "../AlephsramosdevWidget";

const Container = styled.footer`
    width: 100%;
    padding: 18px 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.5% 5%;
    position: relative;
    overflow: hidden;

    @media (max-width: 768px){
        flex-direction: column;
        align-item: center;
        justify-content: center;
        text-align: center;
        gap: 20px;
        padding: 5%;
    }

    & > p {
        font-size: 16px;
        font-weight: 300;
        color: ${(props) => props.theme.color.white[300]};
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
`

const Bg = styled.div`
    width: 120%;
    height: 120%;
    position: absolute;
    z-index: -1;
    left: -10%;
    top: -10%;
`


export default function Footer () {
    return (
        <>
            <Container>
                <Bg>
                    <Lines 
                        spacing={8} 
                        color="#ffffff10" 
                        lineWidth={1} 
                        angle={25} 
                        bg="rgb(20, 58, 87)"
                        style={{ height: '800px' }}
                    />
                </Bg>
                <p>Todos os direitos reservados | Steel Conecta</p>
                <AlephsramosdevWidget />
            </Container>
        </>
    )
}