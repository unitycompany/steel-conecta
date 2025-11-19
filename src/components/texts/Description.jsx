import styled from "styled-components";

const P = styled.p`
    white-space: pre-line;
`;

export default function Description({
    children = "default",
}) {
    return (
        <>
            <P data-aos="fade-up" data-aos-delay="200">{children}</P>
        </>
    )
}