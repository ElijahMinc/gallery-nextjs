import { useState } from 'react';
import { HeadContent } from '@/components/Head';
import { metaElementsForHomePage } from '@/config/meta/metaHomePage';
import { ImageService } from '@/services';
import { useQuery, dehydrate, QueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { OverviewListImage } from '@/components/OverviewList/OverviewListImage';
import { GetStaticProps } from 'next';

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

const DEFAULT_IMAGES_PAGE = 1;

const Home = () => {
  const [page, setPage] = useState(DEFAULT_IMAGES_PAGE);
  const [images, setImages] = useState<any[]>([]);

  useQuery(
    [ImageService.uniqueName, page],
    () =>
      ImageService.getAllImages({
        page,
      }),
    {
      onSuccess: (data) => setImages((prev) => prev.concat(data)),
      select: (data) => {
        const ROW_HEIGHTS = [50, 75, 100, 150];

        return data.map((imageData) => ({
          ...imageData,
          size: ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)],
          handleId: uuidv4(),
          isSelected: false,
        }));
      },
    }
  );

  const onSelect = (index: number) => {
    setImages((prevState) => {
      const item = prevState[index];
      const items = prevState.concat();
      items[index] = {
        ...item,
        isSelected: !item.isSelected,
      };
      return items;
    });
  };

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
      <OverviewListImage
        loadMore={nextPage}
        onSelect={onSelect}
        items={images}
      />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(
    [ImageService.uniqueName, DEFAULT_IMAGES_PAGE],
    () =>
      ImageService.getAllImages({
        DEFAULT_IMAGES_PAGE,
      })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => { // for dynamic routes
//   return {
//     paths: [],
//     fallback: "blocking"
//   };
// };
