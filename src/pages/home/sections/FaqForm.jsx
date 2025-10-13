import styled from "styled-components";
import FAQ from "../../../components/layout/FAQ";
import Form from "../../../components/layout/Form";

const Container = styled.section`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 32px;
    padding: 5%;

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
        position: relative;
        gap: 26px;
        padding: 5%;
    }
`

export default function FaqForm() {
    return (
        <>
            <Container id="form">
                {/* <FAQ /> */}
                <Form />    
            </Container>  
        </>
    )
}