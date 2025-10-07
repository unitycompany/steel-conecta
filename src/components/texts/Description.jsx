import styled from "styled-components";

export default function Description({
    children = "default",
}) {
    return (
        <>
            <p data-aos="fade-up" data-aos-delay="200">{children}</p>
        </>
    )
}