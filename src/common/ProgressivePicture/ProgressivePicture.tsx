import { useState } from 'react';

interface ProgressivePictureProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

export const ProgressivePicture: React.FC<ProgressivePictureProps> = ({
  width,
  height,
  loading,
  className,
  src,
  srcSet,
  alt,
}) => {
  const [isLoading, setLoading] = useState(true);

  const handleOnLoadPicture = () => {
    console.log('here');
    setLoading(false);
  };

  return (
    <>
      <img
        loading={loading}
        className={className}
        onLoad={handleOnLoadPicture}
        src={src}
        srcSet={srcSet}
        style={{
          opacity: isLoading ? 0 : 1,
        }}
        alt={alt}
      />
      {isLoading && <div>loading</div>}
    </>
  );
};
