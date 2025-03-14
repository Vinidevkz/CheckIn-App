import { useRef, useEffect } from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import {Octicons, MaterialIcons} from '@expo/vector-icons'
import colors from '@/src/styles/colors';
import texts from '@/src/styles/texts';

//components
import Header from '@/src/components/header';
import Button from '@/src/components/button';

export default function Index() {

  const Movies = [{
    "idMovie": 1,
    "titleMovie": "Avengers: Doomsday",
    "movieDesc": "O destino está chegando.",
    "dateLanc": "01/01/2026"
  }]

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
            style={{paddingLeft: 10, alignSelf: 'flex-start'}}
            data={Movies}
            renderItem={({item}) => (
              <View style={s.movieContainer}>
                <View style={s.moviePosterCont}>
                  <Image
                    source={{uri:'https://br.web.img3.acsta.net/c_640_360/img/1c/95/1c95b87e952cabc95947d262a4ed4781.jpg'}}
                    resizeMode='cover'
                    style={{width: '100%', height: '100%'}}
                  />
                </View>

                <View style={s.movieInfo}>
                  <Text style={[texts.subtitle2, {color: colors.white}]} numberOfLines={1}>{item.titleMovie}</Text>
                  <Text style={[texts.text, {color: colors.white}]} numberOfLines={2}>{item.movieDesc}</Text>
                  <Text style={[texts.legend, {color: colors.white}]}>{item.dateLanc}</Text>


                  <Button
                    bgColor={colors.white}
                    title='Ver Mais'
                    borderR={20}
                  />

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
    height: 330,
    width: 230,
    borderRadius: 15,
    backgroundColor: colors.darkGray,
    overflow: 'hidden'
  },

  moviePosterCont: {
    width: '100%',
    height: '50%',
    backgroundColor: colors.gray
  },

  movieInfo: {
    padding: 10,
    gap: 5
  }
});