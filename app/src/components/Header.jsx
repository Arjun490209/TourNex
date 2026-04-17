import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../../assets/images/logo.png";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";

const Header = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleWallet = () => {
    router.push("/(tabs)/profile"); // change if needed
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.background }}>
      <View className="h-20 flex-row items-center justify-between px-4 border-b border-gray-800">
        {/* 🔥 LEFT (Avatar) */}
        <View className="flex-row items-center gap-2">
          <View className="w-11 h-11 rounded-full bg-[#f18e0b] items-center justify-center">
            <Text className="text-white font-bold text-lg">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Text>
          </View>
        </View>

        {/* 🔥 CENTER (Logo) */}
        <View>
          <Image source={logo} className="w-20 h-16" resizeMode="contain" />
        </View>

        {/* 🔥 RIGHT (Wallet Button) */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleWallet}
          className="bg-gradient-to-r from-[#f18e0b] to-[#ffb347] border border-[#ffb347] px-3 py-1 rounded-xl flex-row items-center gap-2"
        >
          {/* Amount */}
          <Text className="text-white font-bold text-base">
            ₹ {user?.wallet || 0}
          </Text>

          {/* Plus Icon */}
          <View className="w-7 h-7 rounded-full bg-white/20 items-center justify-center">
            <Text className="text-white text-lg font-bold">+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;
