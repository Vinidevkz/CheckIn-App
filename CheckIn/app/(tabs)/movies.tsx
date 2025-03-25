import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
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

export default function Movies() {
  const [token, setToken] = useState<string>("");
  const [latestMovies, setLatestMovies] = useState();

  const [isLoading, setIsLoading] = useState<boolean>(true);

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

      const url = MovieURLs.latest
      try {
        const response = await axios.post(url, null, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { movies } = response.data;
        setLatestMovies(movies);
        setIsLoading(false)
      } catch (error) {
        console.log("Houve um erro ao buscar os últimos lançamentos.", error);
      }
    };

    getLatestMovies();
  }, [token]);

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

      <ScrollView>
        <View style={s.titleCont}>
          <Text style={[texts.subtitle1, { color: colors.white }]}>
            Lançamentos:
          </Text>
        </View>

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
                        style={[texts.ultraB, { color: colors.white }]}
                        numberOfLines={2}
                      >
                        {item.titleMovie}
                      </Text>
                      <Text
                        style={[texts.legend, { color: colors.gray, fontSize: 13 }]}
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
                      numberOfLines={3}
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
    height: 500,
    width: 200,
    borderRadius: 15,
    elevation: 20,
    backgroundColor: colors.darkGray,
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
});
