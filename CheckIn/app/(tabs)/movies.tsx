import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Animated,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";

//styles
import texts from "@/src/styles/texts";
import colors from "@/src/styles/colors";
import { AntDesign } from "@expo/vector-icons";

//components
import Header from "@/src/components/header";
import Input from "@/src/components/input";
import Button from "@/src/components/button";
import MovieSkeleton from "@/src/components/skeletons/movieSkeleton";

import { FontAwesome } from "@expo/vector-icons";

//services
import MovieURLs from "@/src/services/urls/movieUrls";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMovieContext } from "@/src/contexts/movieContext";
import SessionURLs from "@/src/services/urls/sessionUrls";
import SessionSkeleton from "@/src/components/skeletons/sessionSkeleton";

export default function Movies() {
  const { movie, setMovie } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState<any>({});

  const [sessions, setSessions] = useState<any>();

  const [token, setToken] = useState<string>("");
  const [latestMovies, setLatestMovies] = useState();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);

  //drawer animation
  const screenHeight = Dimensions.get("window").height;
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  const toggleDrawer = () => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
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

  useEffect(() => {
    const getToken = async () => {
      const tokenStr = await AsyncStorage.getItem("token");

      if (tokenStr) {
        const tokenParsed = JSON.parse(tokenStr);
        setToken(tokenParsed);
        console.log("Token do usuário:", tokenParsed);
      } else {
        console.log("Nenhum token encontrado.");
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    const getLatestMovies = async () => {
      if (!token) return;

      const url = MovieURLs.latest;
      try {
        const response = await axios.post(url, null, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { movies } = response.data;
        setLatestMovies(movies);
        setIsLoading(false);
      } catch (error) {
        console.log("Houve um erro ao buscar os últimos lançamentos.", error);
      }
    };

    getLatestMovies();
  }, [token]);

  useEffect(() => {
    const getMovieSessions = async () => {
      const url = SessionURLs.moveSessions;
      //console.log(url, selectedMovie.idMovie);

      try {
        const response = await axios.post(url, {
          idMovie: selectedMovie.idMovie,
        });

        if (response.data.sessions && response.data.sessions.length > 0) {
          setSessions(response.data.sessions);
          console.log("State: ", response.data.sessions);
        } else {
          setSessions([]);
        }
      } catch (error) {
        console.log("State: ", sessions);
        console.error("Erro ao buscar sessões:", error);
        setSessions([]);
      } finally {
        setIsLoadingSession(false);
      }
    };

    getMovieSessions();
  }, [selectedMovie]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        element1={
          <View style={{ width: "80%" }}>
            <Input
              placeholder="Pesquise por filmes"
              height={50}
              paddingH={10}
              paddingV={0}
            />
          </View>
        }
        element3={
          <Button
            icon="search"
            iconLib={FontAwesome}
            iconC={colors.background}
            width={50}
            height={50}
            borderR={15}
            bgColor={colors.white}
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
        style={[s.drawer, { transform: [{ translateY: slideAnim }] }]}
      >
        <Text style={[texts.title, { color: colors.white }]}>
          Ver Sessões Disponíveis:
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
            paddingVertical: 20,
            width: "100%",
          }}
        >
          <View
            style={{
              width: 150,
              height: 200,
              backgroundColor: colors.darkGray,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: selectedMovie.moviePoster }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
              <Text style={[texts.subtitle1, { color: colors.white }]}>
                {selectedMovie.titleMovie}
              </Text>
              <Text style={[texts.legend, { color: colors.gray }]}>
                {selectedMovie.creators}
              </Text>
              <Text style={[texts.legend, { color: colors.white }]}>
                {selectedMovie.descMovie}
              </Text>
            </View>

            <View>
            <View
              style={{
                
                alignSelf: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                height: 30,
              }}
            >
              <Image
                source={require("@/src/img/tomatoIcon.png")}
                resizeMode="cover"
                style={{ width: 20, height: 20 }}
              />
              <Text
                style={[texts.ultraB, { color: colors.white, paddingTop: 5 }]}
              >
                78
              </Text>
            </View>
            <View
              style={{
                
                alignSelf: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                height: 30,
              }}
            >
              <FontAwesome name="star" size={24} color={colors.yellow} />
              <Text
                style={[texts.ultraB, { color: colors.white, paddingTop: 5 }]}
              >
                26
              </Text>
            </View>
            </View>
          </View>
        </View>

        {isLoadingSession ? (
          <FlatList
            data={Array(6).fill(0)}
            renderItem={({ index }) => <SessionSkeleton key={index} />}
            keyExtractor={(_, index) => `skeleton-${index}`}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={sessions}
            keyExtractor={(item) => item.idSession.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: colors.gray,
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <View>
                  <Text style={[texts.subtitle2, { color: colors.white }]}>
                    {item.cinemaSession}
                  </Text>
                  <Text style={[texts.legend, { color: colors.white }]}>
                    {item.dateSession
                      ? new Date(item.dateSession).toLocaleDateString("pt-BR")
                      : "Data não disponível"}
                  </Text>
                  <Text style={[texts.legend, { color: colors.white }]}>
                    Assentos disponíveis:{" "}
                    <Text style={[texts.ultraB, { color: colors.white }]}>
                      {item.availableSeats}
                    </Text>
                  </Text>
                  <Text style={[texts.legend, { color: colors.white }]}>
                    Valor do ingresso:{" "}
                    <Text style={[texts.ultraB, { color: colors.white }]}>
                      R${item.priceTicket.toFixed(2).replace(".", ",")}
                    </Text>
                  </Text>
                </View>

                <View style={{alignSelf: 'flex-end'}}>
                  <Button
                    title="Comprar Ingresso"
                    width={"100%"}
                    borderR={10}
                    titleC={colors.white}
                    borderC={colors.yellow}
                    borderW={2}
                    padding={8}
                  />
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View
                style={{ alignItems: "center", marginTop: 20, width: "100%" }}
              >
                <Image
                  source={require("@/src/img/unksessionsimg.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: 200 }}
                />
                <Text style={[texts.subtitle2, { color: colors.white }]}>
                  Nenhuma sessão disponível para este filme.
                </Text>
              </View>
            }
          />
        )}
      </Animated.View>

      <ScrollView>
        <View style={s.titleCont}>
          <Text style={[texts.title, { color: colors.white }]}>Em cartaz:</Text>
        </View>

        <Text style={[texts.subtitle1, { color: colors.white }]}>
          {selectedMovie.idMovie}
        </Text>

        {isLoading ? (
          <FlatList
            data={Array(6).fill(0)}
            renderItem={({ index }) => <MovieSkeleton key={index} />}
            keyExtractor={(_, index) => `skeleton-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={latestMovies}
            keyExtractor={(item) => item.idMovie.toString()}
            renderItem={({ item }) => (
              <View style={s.movieCont}>
                <View style={s.posterCont}>
                  <Image
                    source={{ uri: item.moviePoster }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>

                <View style={s.movieInfos}>
                  <View style={{ gap: 5 }}>
                    <View>
                      <Text
                        style={[
                          texts.ultraB,
                          { color: colors.white, fontSize: 17 },
                        ]}
                        numberOfLines={1}
                      >
                        {item.titleMovie}
                      </Text>
                      <Text
                        style={[
                          texts.legend,
                          { color: colors.gray, fontSize: 13 },
                        ]}
                        numberOfLines={2}
                      >
                        {item.creators}
                      </Text>
                    </View>
                    <Text
                      style={[
                        texts.text,
                        { color: colors.white, fontSize: 12 },
                      ]}
                      numberOfLines={2}
                    >
                      {item.descMovie}
                    </Text>
                  </View>

                  <View style={{ gap: 10 }}>
                    <View
                      style={{
                        alignSelf: "flex-start",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        height: 30,
                      }}
                    >
                      <Image
                        source={require("@/src/img/tomatoIcon.png")}
                        resizeMode="cover"
                        style={{ width: 20, height: 20 }}
                      />
                      <Text
                        style={[
                          texts.ultraB,
                          { color: colors.white, paddingTop: 5 },
                        ]}
                      >
                        78
                      </Text>
                    </View>

                    <Button
                      title="Ver Sessões"
                      bgColor={colors.white}
                      borderR={50}
                      height={30}
                      padding={5}
                      onPress={() => {
                        toggleDrawer(),
                          setIsLoadingSession(true),
                          setSelectedMovie(item);
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  titleCont: {
    margin: 15,
  },
  movieCont: {
    height: 400,
    width: 200,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 15,
    elevation: 20,
    alignItems: "center",
    overflow: "hidden",
    marginHorizontal: 10,
  },
  posterCont: {
    width: "100%",
    height: "55%",
  },
  movieInfos: {
    flex: 1,
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
  },
  rowMovieCont: {},
  drawer: {
    zIndex: 1,
    position: "absolute",
    bottom: -100,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: Dimensions.get("window").height * 0.8,
    backgroundColor: "#222",
    paddingHorizontal: 20,
    paddingTop: 50,
    overflow: "hidden",
    marginBottom: 90,
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
});
