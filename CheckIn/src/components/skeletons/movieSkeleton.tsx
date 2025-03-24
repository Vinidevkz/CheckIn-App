import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { LinearGradient } from 'expo-linear-gradient'; 
import colors from '@/src/styles/colors';

const MovieSkeleton = () => {
  return (
    <SkeletonPlaceholder
      highlightColor={colors.gray}
      backgroundColor={colors.darkGray}
    >
      <View style={s.movieCont}>
        {/* Esqueleto da imagem do poster */}
        <View style={s.posterCont}>
          <View style={{ width: '100%', height: '100%', backgroundColor: colors.darkGray }} />
        </View>

        {/* Esqueleto do título e descrição */}
        <View style={s.movieInfos}>
          <View style={{ gap: 5 }}>
            <View style={{ width: 150, height: 20, borderRadius: 5, backgroundColor: colors.gray }} />
            <View style={{ width: 180, height: 12, borderRadius: 5, backgroundColor: colors.gray }} />
            <View style={{ width: 180, height: 12, borderRadius: 5, backgroundColor: colors.gray }} />
          </View>

          {/* Esqueleto dos ícones e botão */}
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, height: 30 }}>
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: colors.gray }} />
              <View style={{ width: 30, height: 15, borderRadius: 5, backgroundColor: colors.gray }} />
            </View>
            <View style={{ width: '100%', height: 40, borderRadius: 50, backgroundColor: colors.gray }} />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const s = StyleSheet.create({
  movieCont: {
    height: 550,
    width: 200,
    borderRadius: 15,
    elevation: 20,
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  posterCont: {
    width: '100%',
    height: '65%',
  },
  movieInfos: {
    flex: 1,
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
  },
});

export default MovieSkeleton;