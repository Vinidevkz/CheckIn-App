import { useRef, useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, StyleSheet, StatusBar, Animated, Dimensions } from 'react-native';

import {Entypo, MaterialIcons, AntDesign, Feather, FontAwesome6} from '@expo/vector-icons'
import colors from '@/src/styles/colors';
import texts from '@/src/styles/texts';

//components
import Header from '@/src/components/header';
import Button from '@/src/components/button';
import IconBox from '@/src/components/iconBox';

export default function Index() {

  //news dots
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth); // screenWidth é a largura da tela
    setActiveIndex(index);
  };

  const News = [
    {
      "idNews": 1,
      "titleNews": "Primeiro Trailer de Novocaine é liberado!",
      "newsImage": "https://static01.nyt.com/images/2025/03/10/multimedia/novocaine1-gbzl/novocaine1-gbzl-videoSixteenByNine3000.jpg",
      "newsDesc": "Assista agora!",
      "newsButtonIcon": "play",
      "newsButtonTitle": null,
    },
    {
      "idNews": 2,
      "titleNews": "Primeiro Trailer de Novocaine é liberado!",
      "newsImage": "https://static01.nyt.com/images/2025/03/10/multimedia/novocaine1-gbzl/novocaine1-gbzl-videoSixteenByNine3000.jpg",
      "newsDesc": "Assista agora!",
      "newsButtonIcon": "play",
      "newsButtonTitle": null,
    },
    {
      "idNews": 3,
      "titleNews": "Primeiro Trailer de Novocaine é liberado!",
      "newsImage": "https://static01.nyt.com/images/2025/03/10/multimedia/novocaine1-gbzl/novocaine1-gbzl-videoSixteenByNine3000.jpg",
      "newsDesc": "Assista agora!",
      "newsButtonIcon": "play",
      "newsButtonTitle": null,
    },
  ]

  const CinemasPromos = [
    {
      "idPromo": 1,
      "nameCinema": "Cinemark",
      "cinemaPic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfCCwaQj1QalRQtxv4x35v7RjHn5hQ5t47Lu8e07uEbS1afanHdZ8_4tinrxTltzIbv6A&usqp=CAU",
      "promoDesc": "1 Combo Família + 1 Balde de Pipoca Tamanho Família por: ",
      "promoValue": 24.90
    },
    {
      "idPromo": 2,
      "nameCinema": "Moviecom",
      "cinemaPic": "https://play-lh.googleusercontent.com/-VjKmen7V2c79dbPZqLjaVrAx8ethkWzBMfS7It4ZfbaNMg8ygoZrp3bNU9DsSJMo7e5",
      "promoDesc": "2 Combo Família + 1 Refrigerante Tamanho Família por: ",
      "promoValue": 22.90
    },
    {
      "idPromo": 3,
      "nameCinema": "Cinépolis",
      "cinemaPic": "https://gsobmidia.com.br/uploads/lojas/1345/logo-cinepolis-nuevo-png_1710440866.png",
      "promoDesc": "2 Combo Família + 1 Refrigerante Tamanho Família por: ",
      "promoValue": 22.90
    },
  ]

  //drawer animation
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
              <Text style={[texts.legend, {color: colors.white}]}>Meus Ingressos</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={toggleDrawer} style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <MaterialIcons name="payments" size={24} color={colors.white} />
              <Text style={[texts.legend, {color: colors.white}]}>Compras</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDrawer} style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <FontAwesome6 name="gear" size={24} color={colors.white} />
              <Text style={[texts.legend, {color: colors.white}]}>Configurações</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("@/src/img/iconPNG.png")}
            resizeMode='contain'
            style={{ opacity: 0.1, width: '180%', right: 20 }}
          />

          <View style={{position: 'absolute', bottom: 20, left: 10, right: 10}}>
            <Text style={[texts.legend, {color: colors.gray}]}>Leia atentamente os <Text style={{textDecorationLine: 'underline'}}>Termos de política e privacidade.</Text></Text>
          </View>
        </Animated.View>

      <ScrollView >

        <View style={s.titleCont}>
          <Text style={[texts.title, {color: colors.white}]}>Notícias:</Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          data={News}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item)=> item.idNews.toString()} 
          renderItem={({item}) => (
            <View style={[s.newsContainer]}>
              <View style={s.newsPosterCont}>
                <Image
                  source={{uri: item.newsImage}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode='cover'
                />
              </View>

              <View style={s.newsInfo}>
                <Text style={[texts.title, {color: colors.white}]}>{item.titleNews}</Text>

                <Text style={[texts.text, {color: colors.white}]}>{item.newsDesc}</Text>

                <Button
                  title={item.newsButtonTitle ? item.newsButtonTitle : ""}
                  icon={item.newsButtonIcon}
                  bgColor={colors.white}
                  borderR={50}
                  iconLib={FontAwesome6}
                  iconC={colors.background}
                />
              </View>
            </View>
          )}
        />

        <View style={s.dotsContainer}>
          {News.map((_, index) => (
            <View
              key={index}
              style={[
                s.dot,
                { backgroundColor: activeIndex === index ? colors.white : colors.darkGray },
              ]}
            />
          ))}
        </View>

        <View style={s.titleCont}>
          <Text style={[texts.title, {color: colors.white}]}>Promoções:</Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          data={CinemasPromos}
          keyExtractor={(item)=> item.idPromo.toString()} 
          renderItem={({item}) => (
            <View style={[s.promoCont]}>
              <View style={{width: 80, height: 70}}>
                <IconBox
                  image={item.cinemaPic}
                  width={'100%'}
                  height={'100%'}
                />
              </View>

              <Text style={[texts.ultraB, {color: colors.white}]}>{item.nameCinema}</Text>

              <View style={{gap: 10}}>
                <Text style={[texts.text, {color: colors.white, textAlign: 'center'}]} numberOfLines={4}>{item.promoDesc}</Text>
                <View style={{borderWidth: 2, borderColor: colors.yellow, alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
                  <Text style={[texts.ultraB, {color: colors.white}]}>R${item.promoValue}</Text>
                </View>
              </View>
              
              <Button
              bgColor={colors.white}
              borderR={50}
              height={30}
              padding={5}
              title='Ver +'
              icon='plus'
              iconLib={FontAwesome6}
              />
            </View>
          )}
        />

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

  newsContainer: {
    width: 400,
    height: 380,
    borderRadius: 15,
    backgroundColor: colors.darkGray,
    overflow: 'hidden',
    marginHorizontal: 5
  },

  newsPosterCont: {
    width: '100%',
    height: '50%',
    backgroundColor: colors.gray,
    overflow: 'hidden'
  },

  newsInfo: {
    gap: 5,
    justifyContent: 'space-around',
    padding: 10,
    flex: 1
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
    paddingTop: 50,
    overflow: 'hidden'
  },

  closeDrawerCont: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },

  promoCont: {
    width: 180,
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.darkGray,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 15
  }
});