import styled from "styled-components";
import Title from "../texts/Title";
import Button from "../buttons/Button";
import Lines from "../patterns/Lines";

const Card = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    height: auto;
    width: 100%;
    background-color: ${(props) => props.theme.color.white[100]};
    border-radius: 26px;
    padding: 8px;
    gap: 18px;

    & button {
        width: 100%;
        justify-content: space-between;
    }
`

const Content = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    height: auto;
    width: 100%;
    gap: 22px;
    padding: 18px;
    border-radius: 22px;
    position: relative;
    overflow: hidden;
    background-color: ${({ bgColor }) => bgColor || '#fff'};
    min-height: 320px;

    & .company {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;

        & img {
            width: 48px;
            height: 48px;
            object-fit: contain;
            border-radius: 12px;
            background-color: #fff;
        }

        & h3 {
            font-size: 16px;
            font-weight: 400;
            color: ${(props) => props.theme.color.white[100]};
        }
    }

    & h1 {
        font-size: 24px;
        color: ${(props) => props.theme.color.white[100]};
        font-weight: 400;
        line-height: 1.1;
    }

    & ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        gap: 6px;

        & li {
            padding: 6px 12px;
            border-radius: 50px;
            background-color: ${(props) => props.theme.color.white[100]};
            color: ${(props) => props.theme.color.black[500]};
            font-size: 14px;
        }
    }
`

const BG = styled.div`
    width: 120%;
    height: 120%;
    position: absolute;
    z-index: 1;
    left: -10%;
    top: -10%;
`

export default function CompaniesCard({
    list = [],
    companyImg,
    companyName = 'Company Name',
    description = 'Company Description',
    bgColor = 'rgb(29, 83, 124)'
}) {

    return (
        <>
            <Card>
                <Content bgColor={bgColor}>
                    <BG>
                        <Lines 
                            spacing={8} 
                            color="#ffffff15" 
                            lineWidth={1} 
                            angle={45} 
                            bg="transparent"
                            style={{ height: '800px' }}
                        />
                    </BG>
                    <div className="company">
                        <img src={companyImg} alt={companyName} loading="lazy" title={companyName}/>
                        <h3>{companyName}</h3>
                    </div>
                    <Title 
                        children={description}
                    />
                    <ul>
                        {list.map((item, i) => (
                            <li key={i}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </Content>
                <Button 
                    children="Participar da Steel Conecta"
                    borderColor="rgba(77, 77, 77, .65)"
                    colorText="#fff"
                    bgColor="rgb(51, 51, 51)"
                    borderIconColor="rgba(77,77, 77, .65)"
                    bgIconColor="rgb(26, 26, 26)"
                    svgcolor="#fff"
                />
            </Card>
        </>
    )
}