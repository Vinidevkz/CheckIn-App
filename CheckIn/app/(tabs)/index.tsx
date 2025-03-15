import { useRef, useEffect } from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import {Octicons, MaterialIcons, AntDesign} from '@expo/vector-icons'
import colors from '@/src/styles/colors';
import texts from '@/src/styles/texts';

//components
import Header from '@/src/components/header';
import Button from '@/src/components/button';

export default function Index() {

  const Movies = [
    {
      "idMovie": 1,
      "titleMovie": "The Batman",
      "moviePoster": "https://cdn.awsli.com.br/2500x2500/1610/1610163/produto/177680691/poster-the-batman-j-4033ffcb.jpg",
      "movieDesc": "Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City.",
      "dateLanc": "01/01/2026"
    },
    {
      "idMovie": 2,
      "titleMovie": "Capitão América: Admirável Mundo Novo",
      "moviePoster": "https://br.web.img2.acsta.net/img/56/0c/560c72bf877f88472877898cebe00ff0.jpg",
      "movieDesc": "Sam se vê no meio de um incidente internacional após se encontrar com o Presidente Thaddeus Ross.",
      "dateLanc": "01/01/2026"
    } 
  ]

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Header
        element1={(
          <TouchableOpacity activeOpacity={0.7}>
            <MaterialIcons name="menu" size={30} color={colors.white} />
          </TouchableOpacity>
        )}
        element2={(
            <Image
              source={require('@/src/img/iconPNG.png')}
              resizeMode='contain'
              style={{width: 50, height: 50}}
            />
        )}
        element3={(
          <View>
            <Octicons name="person-fill" size={24} color={colors.white} />
          </View>
        )}
      />

      <ScrollView>
        <View style={s.container}>
          <View style={s.titleCont}>
            <Text style={[texts.title, {color: colors.white}]}>Filmes do momento:</Text>
          </View>

          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingLeft: 10, alignSelf: 'flex-start'}}
            data={Movies}
            renderItem={({item}) => (
              <View style={s.movieContainer}>
                <View style={s.moviePosterCont}>
                  <Image
                    source={{uri: item.moviePoster}}
                    resizeMode='cover'
                    style={{width: '100%', height: '100%'}}
                  />
                </View>

                <View style={{justifyContent: 'space-between', margin: 10, flex: 1}}>
                  <View style={s.movieInfo}>
                    <Text style={[texts.subtitle2, {color: colors.white}]} numberOfLines={1}>{item.titleMovie}</Text>
                    <Text style={[texts.text, {color: colors.white}]} numberOfLines={2}>{item.movieDesc}</Text>
                  </View>

                  <View >
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <Text style={[texts.legend, {color: colors.white}]}>{item.dateLanc}</Text>
                      <Text style={[texts.legend, {color: colors.white}]}><AntDesign name="star" size={24} color="#ffd86b" /> 45</Text>
                    </View>
                    <Button
                        bgColor={colors.white}
                        title='Ver Mais'
                        borderR={20}
                        width={'100%'}
                        height={40}
                        padding={10}
                    />
                  </View>
                </View>

              </View>
            )}
            keyExtractor={item => item.idMovie.toString()}
          />
        </View>




      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleCont: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15
  },

  movieContainer: {
    flexDirection: 'row',
    width: 350,

    borderRadius: 15,
    backgroundColor: colors.darkGray,
    overflow: 'hidden',
    marginRight: 15,
  },

  moviePosterCont: {
    width: '40%',
    height: '100%',
    backgroundColor: colors.gray,
    overflow: 'hidden'
  },

  movieInfo: {
    gap: 5,
  }
});