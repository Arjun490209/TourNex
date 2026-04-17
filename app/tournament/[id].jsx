import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API, AuthContext } from "@/context/AuthContext";
import { COLORS } from "../src/constants/theme.js";
import Toast from "react-native-toast-message";

// 🔥 Small reusable box
const InfoBox = ({ label, value }) => {
  return (
    <View
      style={{
        backgroundColor: "#1e293b",
        padding: 10,
        borderRadius: 10,
        width: "30%",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#94a3b8", fontSize: 12 }}>{label}</Text>
      <Text style={{ color: "white", fontWeight: "bold" }}>{value}</Text>
    </View>
  );
};

const TournamentDetails = () => {
  const { user } = useContext(AuthContext);

  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [data, setData] = useState(null);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  // 🔥 Fetch details
  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");

        const res = await axios.get(`${API}/tournaments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tournament = res.data;

        // 🔥 check joined
        const isJoined = tournament.participants?.some(
          (p) => String(p.user) === String(user?._id),
        );

        setJoined(isJoined);
        setData(tournament);
      } catch (err) {
        console.log("ERROR:", err.response?.data || err.message);
      }
    };

    fetchDetails();
  }, [id]);

  // 🔥 Join
  const handleJoin = async () => {
    if (joined || joining) return;

    try {
      setJoining(true);

      const token = await SecureStore.getItemAsync("token");

      await axios.post(
        `${API}/tournaments/${id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setJoined(true);

      // 🔥 update players count locally
      setData((prev) => ({
        ...prev,
        participants: [...prev.participants, { user: user._id }],
      }));

      Toast.show({
        type: "success",
        text1: "Joined 🎮",
        text2: "You joined the tournament",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Failed ❌",
        text2: err.response?.data?.message || "Join failed",
      });
    } finally {
      setJoining(false);
    }
  };

  // 🔥 Loading
  if (!data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: "white", marginTop: 10 }}>
          Loading tournament...
        </Text>
      </View>
    );
  }

  // 🔥 Format time
  const startTime = new Date(data.startTime).toLocaleString();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* 🔥 Banner */}
      <Image
        source={{
          uri: "https://wallpaperaccess.com/full/3305271.jpg",
        }}
        style={{ width: "100%", height: 220 }}
      />

      {/* 🔥 Content */}
      <View style={{ padding: 16 }}>
        {/* Title */}
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          {data.title}
        </Text>

        {/* Status */}
        <Text style={{ color: "#22c55e", marginTop: 4 }}>
          {data.status.toUpperCase()}
        </Text>

        {/* Info */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <InfoBox label="Entry" value={`₹${data.entryFee}`} />
          <InfoBox label="Prize" value={`₹${data.prizePool}`} />
          <InfoBox label="Type" value={data.gameType} />
        </View>

        {/* Players */}
        <Text style={{ color: "#94a3b8", marginTop: 16 }}>
          Players: {data.participants.length}/{data.maxPlayers}
        </Text>

        {/* Start Time */}
        <Text style={{ color: "#94a3b8", marginTop: 6 }}>
          Start: {startTime}
        </Text>

        {/* Description */}
        <Text style={{ color: "#cbd5f5", marginTop: 16 }}>
          {data.description}
        </Text>

        {/* 🔥 Prize Breakdown */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            🏆 Prizes
          </Text>

          {data.prizes?.map((p, index) => (
            <Text key={index} style={{ color: "#cbd5f5", marginTop: 4 }}>
              {p.position} → ₹{p.amount}
            </Text>
          ))}
        </View>

        {/* 🔥 Join Button */}
        <TouchableOpacity
          onPress={handleJoin}
          disabled={joining || joined}
          style={{
            backgroundColor: joined ? "#16a34a" : COLORS.primary,
            marginTop: 24,
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          {joining ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              {joined ? "Joined ✅" : "Join Tournament"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TournamentDetails;
