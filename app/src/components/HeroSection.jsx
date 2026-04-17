import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

const data = [
  {
    id: 1,
    title: "🔥 Squad Tournament",
    subtitle: "Prize ₹5000 • Entry ₹50",
    image: "https://wallpaperaccess.com/full/3305271.jpg",
  },
  {
    id: 2,
    title: "🎮 Solo Battle",
    subtitle: "Prize ₹1000 • Entry ₹20",
    image: "https://wallpaperaccess.com/full/3063067.jpg",
  },
  {
    id: 3,
    title: "👥 Duo Match",
    subtitle: "Prize ₹2000 • Entry ₹30",
    image: "https://wallpaperaccess.com/full/3311161.jpg",
  },
];

const HeroSection = () => {
  const scrollRef = useRef(null);
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % data.length;

      scrollRef.current?.scrollTo({
        x: index * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="mt-1">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item) => (
          <ImageBackground
            key={item.id}
            source={{ uri: item.image }}
            style={{
              width: width,
              height: 140,
            }}
          >
            <View className="flex-1 flex-row items-end justify-between px-4 bg-black/50 p-3">
              {/* LEFT - Text */}
              <View>
                <Text className="text-white font-bold text-base">
                  {item.title}
                </Text>
                <Text className="text-gray-300 text-xs">{item.subtitle}</Text>
              </View>

              {/* RIGHT - Button */}
              <TouchableOpacity
                style={{ backgroundColor: "#ff6b00" }} // या COLORS.primary
                className="px-4 py-2 w-24 rounded-lg"
              >
                <Text className="text-white text-center text-sm font-semibold">
                  Join
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </View>
  );
};

export default HeroSection;
