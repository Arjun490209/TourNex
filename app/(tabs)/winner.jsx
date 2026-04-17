import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { COLORS } from "../src/constants/theme.js";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  { id: "1", name: "Arjun Gamer", kills: 10, prize: 300 },
  { id: "2", name: "Pro Killer", kills: 8, prize: 200 },
  { id: "3", name: "Headshot King", kills: 6, prize: 100 },
  { id: "4", name: "NoobMaster", kills: 4, prize: 50 },
];

const Winner = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Header */}
      <View className="px-4 py-4">
        <Text className="text-white text-2xl font-bold">🏆 Results</Text>
      </View>

      {/* Top Winner */}
      <View className="items-center mt-4">
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          className="w-24 h-24 rounded-full"
        />

        <Text className="text-yellow-400 text-lg font-bold mt-3">
          🥇 {data[0].name}
        </Text>

        <Text className="text-gray-400 text-sm">
          {data[0].kills} Kills • ₹{data[0].prize}
        </Text>
      </View>

      {/* Top 3 */}
      <View className="flex-row justify-around mt-6 mx-4">
        <View className="items-center">
          <Text className="text-gray-300">🥈</Text>
          <Text className="text-white">{data[1].name}</Text>
          <Text className="text-gray-400 text-xs">₹{data[1].prize}</Text>
        </View>

        <View className="items-center">
          <Text className="text-gray-300">🥉</Text>
          <Text className="text-white">{data[2].name}</Text>
          <Text className="text-gray-400 text-xs">₹{data[2].prize}</Text>
        </View>
      </View>

      {/* Leaderboard */}
      <View className="mx-4 mt-6">
        <Text className="text-white font-bold mb-2">Leaderboard</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View className="flex-row justify-between bg-[#1e293b] p-3 rounded-xl mb-2">
              <Text className="text-white">
                {index + 1}. {item.name}
              </Text>

              <Text className="text-gray-400">
                {item.kills} K • ₹{item.prize}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Winner;
