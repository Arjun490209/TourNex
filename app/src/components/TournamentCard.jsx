import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS } from "../constants/theme.js";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API, AuthContext } from "@/context/AuthContext";

const TournamentCard = ({ data }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [joining, setJoining] = useState(false);

  const [joined, setJoined] = useState(
    data.participants?.some((p) => String(p.user) === String(user?._id)),
  );

  const isKillBased = data.gameType === "kill_based";

  const handleCardPress = () => {
    router.push(`/tournament/${data._id}`);
  };

  const handleJoin = async () => {
    if (joined || joining) return;

    try {
      setJoining(true);

      const token = await SecureStore.getItemAsync("token");

      await axios.post(
        `${API}/tournaments/${data._id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setJoined(true);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setJoining(false);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleCardPress}>
      <View
        style={{
          backgroundColor: "#1e293b",
          borderColor: isKillBased ? "#ef4444" : "#facc15",
          borderWidth: 1,
        }}
        className="rounded-2xl p-4 mb-4 mx-3 shadow-lg w-[300px]"
      >
        {/* 🔥 Top */}
        <View className="flex-row justify-between items-center">
          <Text style={{ color: COLORS.primary }} className="text-lg font-bold">
            {data.title}
          </Text>

          {/* Type Badge */}
          <Text
            style={{
              color: isKillBased ? "#ef4444" : "#facc15",
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            {isKillBased ? "KILL BASED" : "RANK BASED"}
          </Text>
        </View>

        {/* Image */}
        <Image
          source={{
            uri: "https://wallpaperaccess.com/full/3305271.jpg",
          }}
          className="w-full h-32 rounded-xl mt-3"
        />

        {/* 🔥 Info */}
        <View className="flex-row justify-between mt-3">
          <View>
            <Text className="text-gray-400 text-xs">Entry Fee</Text>
            <Text className="text-white font-bold">₹{data.entryFee}</Text>
          </View>

          <View>
            <Text className="text-gray-400 text-xs">Prize</Text>
            <Text className="text-white font-bold">₹{data.prizePool}</Text>
          </View>

          <View>
            <Text className="text-gray-400 text-xs">
              {isKillBased ? "Per Kill" : "Top Prize"}
            </Text>

            <Text className="text-white font-bold">
              {isKillBased
                ? `₹${data.prizes?.[0]?.amount || 0}`
                : `₹${data.prizes?.[0]?.amount || 0}`}
            </Text>
          </View>
        </View>

        {/* 🔥 Bottom */}
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-gray-400 text-xs">
            {data.participants?.length || 0}/{data.maxPlayers}
          </Text>

          <TouchableOpacity
            onPress={handleJoin}
            disabled={joining || joined}
            style={{
              backgroundColor: joined
                ? "#16a34a"
                : isKillBased
                  ? "#ef4444"
                  : COLORS.primary,
            }}
            className="px-4 py-2 rounded-lg"
          >
            {joining ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold">
                {joined ? "Joined" : "Join"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TournamentCard;
