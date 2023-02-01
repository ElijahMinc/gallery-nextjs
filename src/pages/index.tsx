import { useState } from 'react';
import { HeadContent } from '@/components/Head';
import { metaElementsForHomePage } from '@/config/meta/metaHomePage';
import { ImageService } from '@/services';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@/common';
import { v4 as uuidv4 } from 'uuid';
import { ProgressivePicture } from '@/common/ProgressivePicture/ProgressivePicture';

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

  const nextPage = () => setPage((prev) => (prev += 1));

  return (
    <>
      <HeadContent title="Title" metaElements={metaElementsForHomePage} />
      <InfiniteScroll
        dataLength={images.length} //This is important field to render the next data
        style={{
          overflow: 'hidden',
        }}
        next={nextPage}
        hasMore={true}
        loader={<Loader />}
      >
        <ImageList
          variant="woven"
          cols={3}
          gap={8}
          sx={{
            overflow: 'hidden',
          }}
        >
          {!!images.length &&
            images.map((el) => (
              <ImageListItem key={el.handleId}>
                <ProgressivePicture
                  className="MuiImageListItem-img"
                  src={`${el.urls.full}?w=161&fit=crop&auto=format`}
                  srcSet={`${el.urls.full}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  loading="lazy"
                  alt={el.description}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </InfiniteScroll>
    </>
  );
};

export default Home;
