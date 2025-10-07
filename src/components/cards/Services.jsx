import styled from "styled-components";
import Badge from "../badges/Badge";
import Title from "../texts/Title";
import Description from "../texts/Description";
import Button from "../buttons/Button";

const Card = styled.div`
    width: 100%;
    height: auto;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: linear-gradient(90deg, ${(props) => props.theme.color.white[300]}, ${(props) => props.theme.color.gray[100]});
    padding: 20px;
    border-radius: ${({borderRadius}) => borderRadius || "20px"};
    gap: 16px;

    & img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        object-position: center;
    }

    & h1 {
        font-size: 24px;
        line-height: 1;
        font-weight: 400;
        color: ${(props) => props.theme.color.black[300]};
    }

    & p {
        font-size: 16px;
        line-height: 1.2;
        font-weight: 300;
        color: ${(props) => props.theme.color.black[500]};
    }
`

export default function Services({
    icon: Icon,
    image,
    title,
    color,
    bgColor,
    borderColor,
    description,
    borderRadius
}) {
    return (
        <>
            <Card borderRadius={borderRadius}>
                <img 
                    src={image}
                    alt={title}
                    loading="lazy"
                    title={title}
                />
                <Badge 
                    color={color}
                    borderColor={borderColor}
                    bgColor={bgColor}
                >
                    {Icon && <Icon />}
                </Badge>
                <Title 
                    children={title}
                />
                <Description 
                    children={description}
                />
                <Button 
                    children="Participar da Steel Conecta"
                    borderColor="rgba(77, 77, 77, .65)"
                    colorText="#fff"
                    bgColor="rgb(51, 51, 51)"
                    borderIconColor="rgba(77,77, 77, .65)"
                    bgIconColor="rgb(26, 26, 26)"
                    svgcolor="#fff"
                    onClick={() => {
                        const scrollForm = document.getElementById('form');
                        if (scrollForm) {
                            scrollForm.scrollIntoView({ behavior: 'smooth'})
                        }
                    }}
                />
            </Card>
        </>
    )
}