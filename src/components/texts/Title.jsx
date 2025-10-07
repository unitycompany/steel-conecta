import styled from "styled-components";

export default function Title({
    children = "default",
}) {
    return (
        <>
            <h1 data-aos="fade-up">{children}</h1>
        </>
    )
}