import styled from "styled-components";

export default function Description({
    children = "default",
}) {
    return (
        <>
            <p>{children}</p>
        </>
    )
}