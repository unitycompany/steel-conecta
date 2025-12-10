import styled from "styled-components";
import Header from "@components/layout/Header";
import Hero from "./sections/Hero";
import Range from "./sections/Range";
import Proposal from "./sections/Proposal";
import Grafic from "./sections/Grafic";
import About from "./sections/About";
import Companies from "./sections/Companies";
import Leads from "./sections/Leads";
import FaqForm from "./sections/FaqForm";
import Footer from "@components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";

const Container = styled.section`
    width: 100%;
    max-width: 1420px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    height: auto;
    position: relative;
`

export default function Home() {
    return (
        <>
            <StructuredData />
            <Container>
                <Header />
                    <Grafic />
                        <Range />
                            <About />
                                <Proposal />    
                                    <Range />
                                        <Companies />  
                                            {/* <Leads /> */}
                                                <Hero />
                                                    <FaqForm />
                                                        <Footer />
            </Container>
        </>
    )
}