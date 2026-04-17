import { View, Text, ScrollView, StatusBar } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../src/constants/theme.js";
import Header from "../src/components/Header";
import TournamentCard from "../src/components/TournamentCard";
import HeroSection from "../src/components/HeroSection";
import { API, AuthContext } from "@/context/AuthContext";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const Home = () => {
  const [tournaments, setTournaments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");

        const res = await axios.get(`${API}/tournaments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTournaments(res.data.tournaments || res.data);
      } catch (err) {
        console.log("ERROR:", err.response?.data || err.message);
      }
    };

    if (user) fetchTournaments();
  }, [user]);

  // 🔥 Filter (temporary logic)
  const solo = tournaments.filter((t) => t.gameType === "kill_based");
  const duo = tournaments.filter((t) => t.gameType === "rank_based");
  const squad = tournaments;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroSection />

        {/* SOLO */}
        <View className="mt-4">
          <Text className="text-white text-2xl font-bold px-4 mb-2">
            💀 Kill Based Matches
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-4"
          >
            {solo.map((item) => (
              <TournamentCard key={item._id} data={item} />
            ))}
          </ScrollView>
        </View>

        {/* DUO */}
        <View className="mt-4">
          <Text className="text-white text-2xl font-bold px-4 mb-2">
            🏆 Rank Based Matches
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-4"
          >
            {duo.map((item) => (
              <TournamentCard key={item._id} data={item} />
            ))}
          </ScrollView>
        </View>

        {/* SQUAD
        <View className="mt-4 mb-6">
          <Text className="text-white text-2xl font-bold px-4 mb-2">
            🔥 Squad Matches
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-4"
          >
            {squad.map((item) => (
              <TournamentCard key={item._id} data={item} />
            ))}
          </ScrollView>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default Home;
