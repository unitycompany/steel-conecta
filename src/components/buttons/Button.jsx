import { ArrowUpRight } from "phosphor-react";
import styled from "styled-components";

const ButtonStyled = styled.button`
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 4px 4px 4px 18px;
    background-color: ${({ bgColor }) => bgColor || "transparent"};
    border: 2px solid ${({ borderColor }) => borderColor || "transparent"};
    border-radius: 48px;
    transition: all 0.3s ease;

    &:hover {
        scale: 0.98;
        box-shadow: -2px 2px 0px ${({ borderColor }) => borderColor || "transparent"};
    }

    &:hover .icon {
        scale: 0.96;
    }

    &:hover > .icon svg {
        transform: translateY(-50px) translateX(50px);
    }

    &:hover .icon .isHover {
        transform: translateY(0px);
    }

    & .text {
        font-size: 16px;
        font-weight: 500;
        color: ${({ $colorText }) => $colorText || "#fff" };
    }

    & .icon {
        border: 3px solid ${({ $borderIconColor }) => $borderIconColor || "transparent"};
        background-color: ${({ $bgIconColor }) => $bgIconColor || "transparent"};
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 48px;
        overflow: hidden;
        position: relative;
        transition: all 0.3s ease;

        @media (max-width: 768px){
            width: 34px;
            height: 34px;
        }

        & svg {
            font-size: 22px;
            color: ${({ $svgcolor }) => $svgcolor || "transparent"};
            transition: all 0.3s ease;

            @media (max-width: 768px){
                font-size: 18px;
            }
        }

        & .isHover {
            transform: translateY(50px) translateX(-50px);
            transition: all 0.3s ease;
            position: absolute;
        }

    }
`

export default function Button({
    children = "Falar com um consultor",
    onClick,
    bgColor,
    borderColor,
    borderIconColor,
    bgIconColor,
    svgcolor,
    colorText
}) {
    return (
        <>
            <ButtonStyled 
                onClick={onClick} 
                bgColor={bgColor} 
                borderColor={borderColor}
                $borderIconColor={borderIconColor}
                $bgIconColor={bgIconColor}
                $svgcolor={svgcolor}
                $colorText={colorText}
            >
                <span className="text">{children}</span>
                <div className="icon">
                    <ArrowUpRight weight="regular" />
                    <ArrowUpRight weight="regular" className="isHover" />
                </div>
            </ButtonStyled>
        </>
    )
}