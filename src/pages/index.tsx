import { useState } from 'react';
import { HeadContent } from '@/components/Head';
import { metaElementsForHomePage } from '@/config/meta/metaHomePage';
import { ImageService } from '@/services';
import { useQuery } from 'react-query';
import { Loader, Picture } from '@/common';
import { v4 as uuidv4 } from 'uuid';
import { ProgressivePicture } from '@/common/ProgressivePicture/ProgressivePicture';
import { VirtuosoGrid } from 'react-virtuoso';
import styled from 'styled-components';
import AutoSizer from 'react-virtualized-auto-sizer';

const ItemContainer = styled.div`
  padding: 0.5rem;
  width: 20%;
  display: flex;
  flex: none;
  align-content: stretch;
  box-sizing: border-box;
  position: relative;
  gap: 20px;
  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 300px) {
    width: 100%;
  }
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  text-align: center;
  font-size: 80%;
  padding: 1rem 1rem;
  border: 1px solid var(gray);
  white-space: nowrap;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Footer = () => {
  return (
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const Home = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<any[]>([]);

  useQuery(
    [ImageService.uniqueName, page],
    () =>
      ImageService.getAllImages({
        page,
      }),
    {
      onSuccess: (data) => setImages((prev) => prev.concat(data)),
      select: (data) =>
        data.map((imageData) => ({ ...imageData, handleId: uuidv4() })),
    }
  );

  const nextPage = () => {
    setTimeout(() => {
      setPage((prev) => (prev += 1));
    }, 2000);
  };

  return (
    <>
      <HeadContent title="Title" metaElements={metaElementsForHomePage} />
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <VirtuosoGrid
              style={{ height, width }}
              totalCount={images.length}
              data={images}
              overscan={200}
              endReached={nextPage}
              components={{
                Item: ItemContainer,
                List: ListContainer,
                Footer: Footer,
              }}
              itemContent={(index, image) => {
                // const image = images[index];
                console.log('image', image);
                return (
                  <ItemWrapper>
                    <Picture
                      width={200}
                      height={200}
                      style={{
                        borderTopRightRadius: '20px',
                        borderBottomLeftRadius: '20px',
                      }}
                      src={image.urls.small}
                    />
                  </ItemWrapper>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>
    </>
  );
};

export default Home;
