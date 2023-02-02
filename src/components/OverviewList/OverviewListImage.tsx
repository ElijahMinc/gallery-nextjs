import { useRef, useState, forwardRef, useEffect } from 'react';
import createCellPositioner from '@/utils/createCellPositioner';
import {
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  WindowScroller,
  Masonry,
  Positioner,
  MasonryCellProps,
  InfiniteLoader,
  IndexRange,
} from 'react-virtualized';
import { Loader } from '@/pages';
import { Picture } from '@/common';

interface OverviewListImageProps {
  items: any[];
  loadMore: () => Promise<void>;
}

const state = {
  columnWidth: 250,
  height: 500,
  gutterSize: 10,
};

const limit = 300;

const _cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 200,
  fixedWidth: true,
});

export const OverviewListImage: React.FC<OverviewListImageProps> = ({
  items,
  loadMore,
}) => {
  const [isLoading, setLoading] = useState(false);
  const masonryRef = useRef<Masonry>(null);
  const [width, setWidth] = useState(0);
  const [columnCount, setColumnCount] = useState(
    Math.floor(width / (state.columnWidth + state.gutterSize)) || 4
  );
  const [cellPositioner, setCellPositioner] = useState<Positioner>(
    createCellPositioner({
      cellMeasurerCache: _cache,
      columnCount,
      columnWidth: state.columnWidth,
      spacer: state.gutterSize,
    })
  );

  const _calculateColumnCount = () => {
    const { columnWidth, gutterSize } = state;

    setColumnCount(Math.floor(width / (columnWidth + gutterSize)));
  };

  const _resetCellPositioner = () => {
    setCellPositioner(
      createCellPositioner({
        cellMeasurerCache: _cache,
        columnCount,
        columnWidth: state.columnWidth,
        spacer: state.gutterSize,
      })
    );
  };

  const _onResize = ({ width }: { width: number }) => setWidth(width);

  const _cellRenderer = ({ index, key, parent, style }: MasonryCellProps) => {
    const { columnWidth } = state;

    const datum = items[index % items.length];
    return (
      <CellMeasurer cache={_cache} index={index} key={key} parent={parent}>
        {({ registerChild }: any) => (
          <div
            className={'cell'}
            ref={registerChild}
            style={{
              ...style,
              width: columnWidth,
            }}
          >
            <div>
              <Picture
                style={{
                  borderRadius: '0.5rem',
                  height: datum.size * 3,
                  marginBottom: '0.5rem',
                  width: '100%',
                  objectFit: 'cover',
                }}
                width={columnWidth}
                height={datum.size * 3}
                src={datum.urls.small}
              />
            </div>
          </div>
        )}
      </CellMeasurer>
    );
  };

  const isRowLoaded = ({ index }: { index: number }) => items[index];

  useEffect(() => {
    _calculateColumnCount();
    _resetCellPositioner();
    masonryRef?.current?.recomputeCellPositions();
  }, [width]);

  const hasMore = items.length < limit;

  const loadMoreRow: (params: IndexRange) => Promise<any> = async () => {
    setLoading(true);
    await loadMore();
    setLoading(false);
  };

  return (
    <>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRow}
        rowCount={hasMore ? items.length + 1 : items.length}
      >
        {({ registerChild, onRowsRendered }) => (
          <WindowScroller>
            {({ height, isScrolling, registerChild, scrollTop }: any) => (
              <AutoSizer
                disableHeight
                ref={registerChild}
                onResize={_onResize}
                overscanByPixels={0}
                scrollTop={scrollTop}
              >
                {({ width }) => (
                  <Masonry
                    autoHeight
                    cellCount={items.length}
                    cellMeasurerCache={_cache}
                    onCellsRendered={onRowsRendered}
                    cellPositioner={cellPositioner}
                    cellRenderer={_cellRenderer}
                    height={height}
                    overscanByPixels={0}
                    ref={masonryRef}
                    scrollTop={scrollTop}
                    width={width}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
      {isLoading && <Loader />}
    </>
  );
};
