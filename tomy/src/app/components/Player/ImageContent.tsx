import React from 'react';

interface ImageContentProps {
  src?: string;
  scale: number;
}

const ImageContent: React.FC<ImageContentProps> = ({ src }) => {
  return (
    <img
      src={src}
      alt="Contenu visuel"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  );
};

export default ImageContent;
