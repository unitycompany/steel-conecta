import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import Title from "../../../components/texts/Title";
import Description from "../../../components/texts/Description";
import Lines from "../../../components/patterns/Lines";
import Badge from "../../../components/badges/Badge";
import { TrendUpIcon } from "@phosphor-icons/react";
import Button from "../../../components/buttons/Button";


const Container = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 5%;
    gap: 36px;
    border: 1px solid #ffffff20;
    border-left: none;
    border-right: none;
    position: relative;
    overflow: hidden;
    margin-top: 80px;

    @media (max-width: 768px) {
        gap: 24px;
        padding: 10% 5%;
    }
`

const Bg = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
`

const Texts = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px){
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    & h1 {
        font-size: 38px;
        width: 50%;
        color: ${(props) => props.theme.color.white[100]};
        line-height: 1;
        font-weight: 400;

        @media (max-width: 768px){
            width: 100%;
            font-size: 28px;
        }
    }

    & p {
        font-size: 18px;
        line-height: 1.2;
        color: ${(props) => props.theme.color.gray[300]};
        font-weight: 300;
        width: 50%;

        @media (max-width: 768px){
            width: 100%;
            font-size: 16px;
        }
    }
`

const Content = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 42px 0px;
    background: ${(props) => props.theme.color.white[300]};
    padding: 32px;
    gap: 32px;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 8px 0;
        gap: 16px;
    }
`

const ChartContainer = styled.div`
    width: 50%;
    height: 500px;

    @media (max-width: 768px) {
        width: 100%;
        height: 300px;    
        padding: 12px;
    }
`

const Infos = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 22px;

    @media (max-width: 768px) {
        width: 100%;    
        gap: 18px;
        padding: 18px;
    }

    & > h1 {
        font-size: 28px;
        line-height: 1;
        font-weight: 400;
        color: ${( props ) => props.theme.color.black[300]};

        @media (max-width: 768px) {
            font-size: 22px;
        }
    }

    & p {
        font-size: 18px;
        line-height: 1.2;
        color: ${( props ) => props.theme.color.black[500]};
        font-weight: 300;

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }

    & .badge {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;

        & .titles {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 6px;

            @media (max-width: 768px) {
                gap: 4px;
            }

            & h1 {
                font-size: 18px;
                color: ${( props ) => props.theme.color.black[300]};
                line-height: 1;
                font-weight: 500;

                @media (max-width: 768px) {
                    font-size: 14px;    
                }
            }

            & p {
                font-size: 14px;
                color: ${( props ) => props.theme.color.gray['basic']};
                line-height: 1;
                font-weight: 300;
                font-style: italic;

                @media (max-width: 768px) {
                    font-size: 10px;
                }
            }
        }
    }
`

export default function GraficSection() {
    const chartRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!chartRef.current) return;

        // Intersection Observer para detectar quando o gráfico está visível
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.3 } // Inicia a animação quando 30% do gráfico está visível
        );

        observer.observe(chartRef.current);

        return () => {
            if (chartRef.current) {
                observer.unobserve(chartRef.current);
            }
        };
    }, [isVisible]);

    useEffect(() => {
        if (!chartRef.current || !isVisible) return;

        const myChart = echarts.init(chartRef.current);
        
        const option = {
            backgroundColor: 'transparent',
            color: ['rgba(29, 83, 124, 0.85)'],
            // Configuração global de animação
            animation: true,
            animationDuration: 4000,
            animationEasing: 'cubicOut',
            animationDelay: 0,
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    var p = Array.isArray(params) ? params[0] : params;
                    var v = Number(p && p.value);
                    var isNum = typeof v === 'number' && !isNaN(v);
                    var val = isNum ? v.toFixed(1) : '—';
                    var axis = (p && p.axisValue) ? p.axisValue : '';
                    var name = (p && p.seriesName) ? p.seriesName : 'Série';
                    return axis + '<br/>' + val + ' milhoes em m²';
                }
            },
            grid: { left: 20, right: 20, top: 20, bottom: 20 },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine: { lineStyle: { color: '#9fb5c6' } },
                axisLabel: { color: '#3e5568' },
                data: ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025']
            },
            yAxis: {
                type: 'value',
                name: 'Milhões de m²',
                nameGap: 28,
                axisLine: { show: false },
                splitLine: { lineStyle: { color: 'rgba(29,83,124,0.15)' } },
                axisLabel: { color: '#3e5568' }
            },
            series: [{
                name: 'Valor em milhões de m²',
                type: 'line',
                smooth: false,
                connectNulls: true,
                symbol: 'circle',
                symbolSize: 10,
                showSymbol: true,
                lineStyle: { width: 5, color: 'rgba(29, 83, 124, 0.85)' },
                itemStyle: { 
                    color: 'rgba(29, 83, 124, 0.95)', 
                    borderColor: '#fff', 
                    borderWidth: 2 
                },
                areaStyle: {
                    opacity: 0.3,
                    color: { 
                        type: 'linear', 
                        x: 0, 
                        y: 0, 
                        x2: 0, 
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(29,83,124,1)' },
                            { offset: 1, color: 'rgba(29,83,124,0.00)' }
                        ]
                    }
                },
                data: [200, 220, 240, 264, 296, 328, 360, 392, 420, 440]
            }]
        };

        myChart.setOption(option);

        // Handle resize
        const handleResize = () => {
            myChart.resize();
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            myChart.dispose();
        };
    }, [isVisible]);

    return (
        <>
            <Container>
                <Bg>
                    <Lines 
                        spacing={8} 
                        color="#ffffff20" 
                        lineWidth={1} 
                        angle={25} 
                        bg="rgb(18, 18, 18)"
                        style={{ height: '1000px' }}
                    />
                </Bg>
                <Texts>
                    <Title 
                        children="Nosso sistema é o que mais cresce no mundo"
                    />
                    <Description 
                        children="Somos uma empresa que está dedicada a levar você a um novo nível no mercado da construção civil"
                    />
                </Texts>
                <Content>
                    <ChartContainer ref={chartRef} />
                    <Infos>
                        <aside className="badge">
                            <Badge 
                                children={<TrendUpIcon />}
                                color="rgb(102, 140, 173)"
                                bgColor="rgba(102, 140, 173, 0.1)"
                                borderColor="rgba(102, 140, 173, 0.2)"
                            />
                            <div className="titles">
                                <Title 
                                    children="Dados retirados de fontes oficiais"
                                />
                                <Description>
                                    <a href="https://www.maximizemarketresearch.com/market-report/global-dry-construction-market/24075/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">Dry Construction Market: Global Industry Analysis and Forecast.</a>
                                </Description>
                            </div>
                        </aside>
                        <Title 
                            children="O mercado dobra a cada 10 anos, a tendencia é aumentar ainda mais esse número"
                        />
                        <Description 
                            children="Somos uma empresa que está dedicada a levar você a um novo nível no mercado da construção civil"
                        />
                        <Button 
                            children="Participar da Steel Conecta"
                            borderColor="rgba(102, 140, 173, .65)"
                            colorText="#fff"
                            bgColor="rgb(29, 83, 124)"
                            borderIconColor="rgba(29,83, 124, .65)"
                            bgIconColor="rgb(102, 140, 173)"
                            svgcolor="#fff"
                            onClick={() => {
                                const scrollForm = document.getElementById('form');
                                if (scrollForm) {
                                    scrollForm.scrollIntoView({ behavior: 'smooth'})
                                }
                            }}
                        />
                    </Infos>
                </Content>
            </Container>
        </>
    )
}