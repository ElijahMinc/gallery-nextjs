import { Skeleton, styled } from '@mui/material';

export const SkeletonProgress = styled(Skeleton)({
  zIndex: 10000,
  position: 'absolute',
  top: 0,
  left: 0,
  background: 'rgba(255,255,255, 0.4)',
});
