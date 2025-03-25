import ContentLoader, { Rect } from 'react-content-loader/native';

const NewsSkeleton = () => (
  <ContentLoader style={{marginRight: 10}} speed={2} width={200} height={550} backgroundColor="#333">
    <Rect x="0" y="0" rx="10" ry="10" width="200" height="300" />
    <Rect x="10" y="320" rx="5" ry="5" width="150" height="20" />
    <Rect x="10" y="350" rx="5" ry="5" width="180" height="12" />
    <Rect x="10" y="370" rx="5" ry="5" width="180" height="12" />
  </ContentLoader>
);

export default NewsSkeleton;
