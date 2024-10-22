import React from 'react';

interface TextContentProps {
  src?: string;
  scale: number;
}

const TextContent: React.FC<TextContentProps> = ({ src }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '20px',
        overflowY: 'auto',
      }}
    >
      {/* Vous pouvez personnaliser l'affichage du texte */}
      <p>{src}</p>
    </div>
  );
};

export default TextContent;
