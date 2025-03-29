import { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
  ImageBackground,
} from "react-native";

//styles
import { LinearGradient } from "expo-linear-gradient";
import {
  Entypo,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import colors from "@/src/styles/colors";
import texts from "@/src/styles/texts";

//components
import Header from "@/src/components/header";
import Button from "@/src/components/button";
import IconBox from "@/src/components/iconBox";
import PromoSkeleton from "@/src/components/skeletons/promoSkeleton";
import NewsSkeleton from "@/src/components/skeletons/newsSkeleton";

export default function Index() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //news dots
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth); 
    setActiveIndex(index);
  };

  const News = [
    {
      idNews: 1,
      titleNews: "Primeiro Trailer de Novocaine é liberado!",
      newsImage:
        "https://static01.nyt.com/images/2025/03/10/multimedia/novocaine1-gbzl/novocaine1-gbzl-videoSixteenByNine3000.jpg",
      newsDesc: "Assista agora!",
      newsButtonIcon: "play",
      newsButtonTitle: null,
    },
    {
      idNews: 2,
      titleNews: "Vazamentos de Avengers: Doomsday",
      newsImage:
        "https://i.ytimg.com/vi/05wFjE7D5Vw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDGrQ4KwNZKCNC5-6EGtPaYwe-UEg",
      newsDesc: "Artes conceituais foram vazadas na internet. Confira!",
      newsButtonTitle: "Ver Mais",
    },
    {
      idNews: 3,
      titleNews: "Primeiro Trailer de Lilo e Stitch!",
      newsImage:
        "https://f.i.uol.com.br/fotografia/2025/03/12/174180724867d1de9050243_1741807248_3x2_md.jpg",
      newsDesc: "Assista agora!",
      newsButtonIcon: "play",
      newsButtonTitle: null,
    },
  ];

  const CinemasPromos = [
    {
      idPromo: 1,
      nameCinema: "Cinemark",
      cinemaPic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfCCwaQj1QalRQtxv4x35v7RjHn5hQ5t47Lu8e07uEbS1afanHdZ8_4tinrxTltzIbv6A&usqp=CAU",
      promoDesc: "1 Combo Família + 1 Balde de Pipoca Tamanho Família por: ",
      promoValue: 24.9,
    },
    {
      idPromo: 2,
      nameCinema: "Moviecom",
      cinemaPic:
        "https://play-lh.googleusercontent.com/-VjKmen7V2c79dbPZqLjaVrAx8ethkWzBMfS7It4ZfbaNMg8ygoZrp3bNU9DsSJMo7e5",
      promoDesc: "2 Combo Família + 1 Refrigerante Tamanho Família por: ",
      promoValue: 22.9,
    },
    {
      idPromo: 3,
      nameCinema: "Cinépolis",
      cinemaPic:
        "https://gsobmidia.com.br/uploads/lojas/1345/logo-cinepolis-nuevo-png_1710440866.png",
      promoDesc: "2 Combo Família + 1 Refrigerante Tamanho Família por: ",
      promoValue: 22.9,
    },
  ];

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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Header
        element1={
          <TouchableOpacity activeOpacity={0.7} onPress={toggleDrawer}>
            <MaterialIcons name="menu" size={40} color={colors.white} />
          </TouchableOpacity>
        }
        element3={
          <Image
            source={require("@/src/img/logo.png")}
            resizeMode="contain"
            style={{ width: 120 }}
          />
        }
      />

      {isOpen && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleDrawer}
          style={s.closeDrawerCont}
        />
      )}

      <Animated.View
        style={[s.drawer, { transform: [{ translateX: slideAnim }] }]}
      >
        <Text style={[texts.title, { color: colors.white }]}>Menu</Text>
        <View style={{ gap: 25, paddingVertical: 20 }}>
          <TouchableOpacity
            onPress={toggleDrawer}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Entypo name="ticket" size={24} color={colors.white} />
            <Text style={[texts.legend, { color: colors.white }]}>
              Meus Ingressos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleDrawer}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <MaterialIcons name="payments" size={24} color={colors.white} />
            <Text style={[texts.legend, { color: colors.white }]}>Compras</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleDrawer}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <FontAwesome6 name="gear" size={24} color={colors.white} />
            <Text style={[texts.legend, { color: colors.white }]}>
              Configurações
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("@/src/img/iconPNG.png")}
          resizeMode="contain"
          style={{ opacity: 0.1, width: "180%", right: 20 }}
        />

        <View style={{ position: "absolute", bottom: 20, left: 10, right: 10 }}>
          <Text style={[texts.legend, { color: colors.gray }]}>
            Leia atentamente os{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              Termos de política e privacidade.
            </Text>
          </Text>
        </View>
      </Animated.View>

      <ScrollView>
        <View>
          {isLoading ? (
            <FlatList
              data={Array(1).fill(0)}
              renderItem={({ index }) => <NewsSkeleton key={index} />}
              keyExtractor={(_, index) => `skeleton-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToAlignment="center"
              data={News}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              keyExtractor={(item) => item.idNews.toString()}
              renderItem={({ item }) => (
                <View style={[s.newsContainer]}>
                  
                  <View style={s.newsPosterCont}>
                    <ImageBackground
                      source={{ uri: item.newsImage }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </View>


                  <View style={s.newsInfo}>
                  <LinearGradient
                      colors={["transparent", '#0a0a0a', "#0a0a0a"]}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 1 }}
                      locations={[0, 0.9, 1]}
                      style={s.background}
                    />
                    <Text style={[texts.title, { color: colors.white }]}>
                      {item.titleNews}
                    </Text>

                    <Text style={[texts.text, { color: colors.white }]}>
                      {item.newsDesc}
                    </Text>

                    <View
                      style={{
                        marginVertical: 10,
                        alignSelf: "center",
                        width: "100%",
                      }}
                    >
                      <Button
                        title={item.newsButtonTitle ? item.newsButtonTitle : ""}
                        icon={item.newsButtonIcon}
                        bgColor={colors.white}
                        borderR={10}
                        iconLib={FontAwesome6}
                        iconC={colors.background}
                        width={"50%"}
                      />
                    </View>

                  </View>

                </View>
              )}
            />
          )}

          <View style={s.dotsContainer}>
            {News.map((_, index) => (
              <View
                key={index}
                style={[
                  s.dot,
                  {
                    backgroundColor:
                      activeIndex === index ? colors.white : colors.darkGray,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={s.container}>
          <View style={s.titleCont}>
            <Text style={[texts.title, { color: colors.white }]}>
              Promoções:
            </Text>
          </View>

          {isLoading ? (
            <FlatList
              data={Array(6).fill(0)}
              renderItem={({ index }) => <PromoSkeleton key={index} />}
              keyExtractor={(_, index) => `skeleton-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToAlignment="center"
              data={CinemasPromos}
              keyExtractor={(item) => item.idPromo.toString()}
              renderItem={({ item }) => (
                <View style={[s.promoCont]}>
                  <View style={{ width: 80, height: 70 }}>
                    <IconBox
                      image={item.cinemaPic}
                      width={"100%"}
                      height={"100%"}
                    />
                  </View>

                  <Text style={[texts.ultraB, { color: colors.white }]}>
                    {item.nameCinema}
                  </Text>

                  <View style={{ gap: 10 }}>
                    <Text
                      style={[
                        texts.text,
                        { color: colors.white, textAlign: "center" },
                      ]}
                      numberOfLines={4}
                    >
                      {item.promoDesc}
                    </Text>
                    <View
                      style={{
                        borderWidth: 2,
                        borderColor: colors.yellow,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                      }}
                    >
                      <Text style={[texts.ultraB, { color: colors.white }]}>
                        R${item.promoValue}
                      </Text>
                    </View>
                  </View>

                  <Button
                    bgColor={colors.white}
                    borderR={50}
                    height={30}
                    padding={5}
                    title="Ver +"
                    icon="plus"
                    iconLib={FontAwesome6}
                  />
                </View>
              )}
            />
          )}
        </View>

        <View style={s.container}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  titleCont: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  newsContainer: {
    width: Dimensions.get("window").width,
    height: 300,
    backgroundColor: colors.darkGray,
    overflow: "hidden",
    marginHorizontal: 5,
    alignItems: "baseline",
    borderLeftWidth: 10,
    borderColor: colors.white,
  },

  newsPosterCont: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },

  newsInfo: {
    gap: 5,
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: 0,
  },

  cinemaContainer: {
    width: 300,
    height: 450,
    borderRadius: 15,
    backgroundColor: colors.darkGray,
    overflow: "hidden",
    marginRight: 15,
    marginBottom: 20,
  },

  cinemaPicCont: {
    width: "100%",
    height: "50%",
    backgroundColor: colors.gray,
    overflow: "hidden",
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
    overflow: "hidden",
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
    marginVertical: 15
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
    alignItems: "center",
    justifyContent: "space-around",
    gap: 15,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: "100%",
  },
});
