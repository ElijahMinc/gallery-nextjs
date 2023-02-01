import Image from 'next/image';
import React from 'react';

interface PictureProps {
  src: string;
  srcSet: string;
  alt: string;
  width?: number;
  height?: number;
}

const Picture: React.FC<any> = ({ src, srcSet, alt, width, height }) => (
  <div
    style={{
      position: 'relative',
    }}
  >
    <Image
      // width={width}
      // height={height}
      //  placeholder="blur"
      // srcSet={srcSet}
      // srcSet
      // fill
      // res
      // layout="responsive"
      loader={() => src}
      src={src}
      alt={alt ?? 'picture'}
    />
  </div>
);

export default Picture;
