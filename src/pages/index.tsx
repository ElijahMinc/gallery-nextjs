import { useState, useRef } from 'react';
import { HeadContent } from '@/components/Head';
import { metaElementsForHomePage } from '@/config/meta/metaHomePage';
import { ImageService } from '@/services';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { OverviewListImage } from '@/components/OverviewList/OverviewListImage';

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

export const Loader = () => {
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
  const containerRef = useRef<any>();
  const [isEndList, setEndList] = useState(false);
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
      // select: (data) =>
      //   data.map((imageData) => ({ ...imageData, handleId: uuidv4() })),
      select: (data) => {
        const ROW_HEIGHTS = [50, 75, 100, 150];

        return data.map((imageData) => ({
          ...imageData,
          size: ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)],
          handleId: uuidv4(),
        }));
      },
    }
  );

  const nextPage = async () => {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        setPage((prev) => (prev += 1));
        resolve();
      }, 2000);
    });

    return promise;
  };

  return (
    <>
      <HeadContent title="Title" metaElements={metaElementsForHomePage} />
      {/* <div id="scroll-wrapper"  ref={containerRef}> */}
      {/* <div className={"artwork"} />
        <div className={"header-sticky"}>List of profiles</div> */}
      <OverviewListImage loadMore={nextPage} items={images} />
      {/* </div> */}
    </>
  );
};

export default Home;
