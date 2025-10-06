import React from 'react';

/**
 * Lines Pattern Component
 * 
 * @param {number} spacing - Espaçamento entre as linhas (px) - default: 10
 * @param {string} color - Cor das linhas - default: '#ffffff'
 * @param {number} lineWidth - Espessura das linhas (px) - default: 1
 * @param {number} angle - Ângulo de rotação das linhas (deg) - default: 45
 * @param {string} bg - Cor de fundo - default: 'transparent'
 * @param {string} className - Classes CSS adicionais
 * @param {object} style - Estilos inline adicionais
 */
const Lines = ({ 
  spacing = 10, 
  color = '#ffffff', 
  lineWidth = 1, 
  angle = 45,
  bg = 'transparent',
  className = '',
  style = {},
  children
}) => {
  // Cria o padrão SVG das linhas
  const patternId = `lines-pattern-${Math.random().toString(36).substr(2, 9)}`;
  
  // Calcula o tamanho do pattern baseado no espaçamento
  const patternSize = spacing;
  
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: bg,
    overflow: 'hidden',
    ...style
  };

  const overlayStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '200vw',
    height: '200vh',
    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
    transformOrigin: 'center',
    backgroundImage: `repeating-linear-gradient(
      0deg,
      transparent,
      transparent ${spacing - lineWidth}px,
      ${color} ${spacing - lineWidth}px,
      ${color} ${spacing}px
    )`,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
  };

  return (
    <div className={`lines-pattern ${className}`} style={containerStyle}>
      <div style={overlayStyle} />
      {children && <div style={contentStyle}>{children}</div>}
    </div>
  );
};

export default Lines;
