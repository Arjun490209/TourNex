import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../src/constants/theme.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔥 HEADER (Clean) */}
        <View className="items-center mt-6">
          <View className="w-24 h-24 rounded-full bg-[#1e293b] items-center justify-center border border-gray-700">
            <Text className="text-3xl font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Text>
          </View>

          <Text className="text-white text-xl font-bold mt-3">
            {user?.name || "Player"}
          </Text>

          <Text className="text-gray-400 text-sm">
            UID: {user?.gameUID || "000000"}
          </Text>
        </View>

        {/* 💰 WALLET (Clean Card) */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/wallet")}
          className="mx-4 mt-6 p-4 rounded-2xl bg-[#1e293b] flex-row justify-between items-center border border-gray-700"
        >
          <View>
            <Text className="text-gray-400 text-xs">Wallet Balance</Text>
            <Text className="text-white text-xl font-bold">
              ₹ {user?.wallet || 0}
            </Text>
          </View>

          <View className="w-10 h-10 rounded-full bg-[#f18e0b] items-center justify-center">
            <Ionicons name="add" size={20} color="white" />
          </View>
        </TouchableOpacity>

        {/* 📊 STATS */}
        <View className="mx-4 mt-6 p-4 rounded-2xl bg-[#1e293b] flex-row justify-between border border-gray-700">
          <View className="items-center flex-1">
            <Text className="text-white font-bold text-lg">25</Text>
            <Text className="text-gray-400 text-xs">Matches</Text>
          </View>

          <View className="items-center flex-1 border-x border-gray-700">
            <Text className="text-white font-bold text-lg">10</Text>
            <Text className="text-gray-400 text-xs">Wins</Text>
          </View>

          <View className="items-center flex-1">
            <Text className="text-white font-bold text-lg">80</Text>
            <Text className="text-gray-400 text-xs">Kills</Text>
          </View>
        </View>

        {/* ⚙️ ACTIONS */}
        <View className="mx-4 mt-6">
          <TouchableOpacity className="bg-[#1e293b] p-4 rounded-xl flex-row items-center gap-3 border border-gray-700 mb-3">
            <Ionicons name="time-outline" size={20} color="white" />
            <Text className="text-white">Match History</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#1e293b] p-4 rounded-xl flex-row items-center gap-3 border border-gray-700 mb-3">
            <Ionicons name="settings-outline" size={20} color="white" />
            <Text className="text-white">Settings</Text>
          </TouchableOpacity>

          {/* 🚪 LOGOUT */}
          <TouchableOpacity
            onPress={logout}
            className="bg-red-500 p-4 rounded-xl flex-row items-center justify-center gap-2"
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
