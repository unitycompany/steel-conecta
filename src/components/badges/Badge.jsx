import styled from "styled-components";

const BadgeStyled = styled.div`
    border: 1px solid ${({ borderColor }) => borderColor || "#000"};
    background: ${({ bgColor }) => bgColor || "#FFF"};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 14px;
    color: ${({ color }) => color || "#000" };
    padding: 6px;

    @media (max-width: 768px) {
        width: 42px;
        height: 42px;                
    }

    & svg {
        font-size: 26px;

        @media (max-width: 768px) {
            font-size: 22px;
        }
    }
`

export default function Badge({
    children = "default",
    color,
    borderColor,
    bgColor
}) {
    return (
        <>
            <BadgeStyled color={color} borderColor={borderColor} bgColor={bgColor}>
                {children}
            </BadgeStyled>
        </>
    )
}