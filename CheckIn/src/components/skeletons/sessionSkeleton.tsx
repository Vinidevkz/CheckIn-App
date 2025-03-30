import ContentLoader, { Rect } from 'react-content-loader/native';

const SessionSkeleton = () => (
  <ContentLoader style={{marginRight: 10,}} speed={2} width={'100%'} height={150} backgroundColor="#333">
    <Rect x="0" y="0" rx="10" ry="10" width={'100%'}  height="100" />
  </ContentLoader>
);

export default SessionSkeleton;
