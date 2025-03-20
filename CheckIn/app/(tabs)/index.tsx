import { useRef, useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, StyleSheet, StatusBar, Animated, Dimensions } from 'react-native';

import {Entypo, MaterialIcons, AntDesign, Feather, FontAwesome6} from '@expo/vector-icons'
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

  const Cinemas = [
    {
      "idCinema": 1,
      "picCinema": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/94/55/42/cinemark.jpg?w=1200&h=-1&s=1",
      "nameCinema": "Cinemark",
      "descCinema": "Líder mundial em venda de ingressos, a Rede Cinemark representa cerca de 30% do mercado brasileiro de cinema e tem a missão de proporcionar uma experiência cinematográfica inesquecível para cada um de seus clientes.",
      "localCinema": "Cinemark Internacional Shopping - Guarulhos",
      "avalCinema": "87%"
    },
    {
      "idCinema": 2,
      "picCinema": "https://lh3.googleusercontent.com/p/AF1QipOvH80WIjXHXrCqwjbPJ1-Lc2IceEW2F1RWeXGR=s680-w680-h510",
      "nameCinema": "Cine Itaim",
      "descCinema": "Cinema moderno com os últimos lançamentos nacionais e internacionais, tanto em 2D quanto 3D.",
      "localCinema": "Cine Itaim - Itaim",
      "avalCinema": "97%"
    },
  ]

  const screenWidth = Dimensions.get("window").width;
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  
  const toggleDrawer = () => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="light-content"
          />
      <Header
        element1={(
          <TouchableOpacity activeOpacity={0.7} onPress={toggleDrawer} >
            <MaterialIcons name="menu" size={40} color={colors.white} />
          </TouchableOpacity>
        )}

        element3={(
          <Image
            source={require('@/src/img/logo.png')}
            resizeMode='contain'
            style={{width: 120}}
          />
        )}
      />

      {isOpen && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleDrawer}
          style={s.closeDrawerCont}
        />
      )}

      <Animated.View
        style={[s.drawer, {transform: [{ translateX: slideAnim }]}]}
      >
        <Text style={[texts.title, {color: colors.white}]}>Menu</Text>
        <View style={{gap: 25, paddingVertical: 20}}>
          <TouchableOpacity onPress={toggleDrawer} style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Entypo name="ticket" size={24} color={colors.white} />
            <Text style={[texts.text, {color: colors.white}]}>Meus Ingressos</Text>
          </TouchableOpacity >
          <TouchableOpacity onPress={toggleDrawer} style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialIcons name="payments" size={24} color={colors.white} />
            <Text style={[texts.text, {color: colors.white}]}>Compras</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDrawer} style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <FontAwesome6 name="gear" size={24} color={colors.white} />
            <Text style={[texts.text, {color: colors.white}]}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView >
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
                    <Text style={[texts.legend, {color: colors.white}]} numberOfLines={4}>{item.movieDesc}</Text>
                  </View>

                  <View style={{gap: 5, marginVertical: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <Text style={[texts.legend, {color: colors.white}]}>{item.dateLanc}</Text>
                      <Text style={[texts.legend, {color: colors.white}]}><AntDesign name="star" size={24} color="#ffd86b" /> 45</Text>
                    </View>
                    <View style={{width: '100%', alignItems: 'center'}}>
                      <Button
                          bgColor={colors.white}
                          title='Ver Mais'
                          borderR={20}
                          width={'80%'}
                          height={30}
                          padding={5}
                      />
                    </View> 
                  </View>
                </View>

              </View>
            )}
            keyExtractor={item => item.idMovie.toString()}
          />
        </View>

        <View style={s.container}>
          <View style={s.titleCont}>
            <Text style={[texts.title, {color: colors.white}]}>Cinemas:</Text>
          </View>

          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingLeft: 10, alignSelf: 'flex-start'}}
            data={Cinemas}
            renderItem={({item}) => (
              <View style={s.cinemaContainer}>
                <View style={s.cinemaPicCont}>
                  <Image
                    source={{uri: item.picCinema}}
                    resizeMode='cover'
                    style={{width: '100%', height: '100%'}}
                  />
                </View>

                <View style={{justifyContent: 'space-between', margin: 10, flex: 1}}>
                  <View style={s.movieInfo}>
                    <Text style={[texts.subtitle2, {color: colors.white}]} numberOfLines={1}>{item.nameCinema}</Text>
                    <Text style={[texts.legend, {color: colors.white}]} numberOfLines={3}>{item.descCinema}</Text>
                  </View>

                  <View style={{gap: 5, marginVertical: 10}}>
                    <View style={{  justifyContent: 'space-between'}}>
                      <Text style={[texts.legend, {alignItems: 'center', color: colors.white}]}><Feather name="map-pin" size={20} color={colors.white} /> {item.localCinema}</Text>
                      <Text style={[texts.legend, {color: colors.white}]}><AntDesign name="star" size={24} color="#ffd86b" /> {item.avalCinema}</Text>
                    </View>
                    <View style={{width: '100%', alignItems: 'center'}}>
                      <Button
                          bgColor={colors.white}
                          title='Ver Mais'
                          borderR={20}
                          width={'80%'}
                          height={30}
                          padding={5}
                      />
                    </View> 
                  </View>
                </View>

              </View>
            )}
            keyExtractor={item => item.idCinema.toString()}
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
    width: 380,
    height: 230,
    borderRadius: 15,
    backgroundColor: colors.darkGray,
    overflow: 'hidden',
    marginRight: 15,
  },

  moviePosterCont: {
    width: '45%',
    height: '100%',
    backgroundColor: colors.gray,
    overflow: 'hidden'
  },

  movieInfo: {
    gap: 5,
  },

  cinemaContainer: {
    width: 300,
    height: 450,
    borderRadius: 15,
    backgroundColor: colors.darkGray,
    overflow: 'hidden',
    marginRight: 15,
    marginBottom: 20
  },

  cinemaPicCont: {
    width: '100%',
    height: '50%',
    backgroundColor: colors.gray,
    overflow: 'hidden'
  },

  drawer: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#222",
    paddingHorizontal: 20,
    paddingTop: 50
  },

  closeDrawerCont: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  }
});