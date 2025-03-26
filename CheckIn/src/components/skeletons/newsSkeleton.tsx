import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions } from 'react-native';

const NewsSkeleton = () => (
  <ContentLoader style={{marginRight: 10, height: 300, marginBottom: 10}} speed={2} width={Dimensions.get('window').width} backgroundColor="#333">
    <Rect x="0" y="0" width={Dimensions.get('window').width} height="300" />
  </ContentLoader>
);

export default NewsSkeleton;
