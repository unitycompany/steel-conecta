import styled from "styled-components";

export default function Title({
    children = "default",
}) {
    return (
        <>
            <h1>{children}</h1>
        </>
    )
}