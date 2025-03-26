import ContentLoader, { Rect } from 'react-content-loader/native';

const PromoSkeleton = () => (
  <ContentLoader style={{marginRight: 10}} speed={2} width={200} height={550} backgroundColor="#333">
    <Rect x="0" y="0" rx="10" ry="10" width="200" height="300" />
  </ContentLoader>
);

export default PromoSkeleton;
