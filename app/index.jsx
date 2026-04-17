import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "./src/constants/theme";
import logo from "./../assets/images/logo.png";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";

// main file
const Index = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/home");
      }
    }
  }, [user, loading]);
  return (
    <SafeAreaView className={`bg-[${COLORS.background}] h-full w-full`}>
      <View
        className={`bg-[${COLORS.background}] text-white h-full w-full justify-center items-center`}
        style={{ backgroundColor: COLORS.background }}
      >
        <Image source={logo} className="w-24 h-24 mx-auto mb-4 " />
        <Text className={`text-white text-2xl font-bold text-center`}>
          Welcome to TOURNEX
        </Text>

        <TouchableOpacity
          onPress={() => {
            router.push("/register");
          }}
          className="text-center mb-4 bg-[#f18e0b] text-white w-1/2 rounded-xl flex mx-auto"
        >
          <Text className="text-center text-white font-semibold py-2 ">
            Sign Up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.push("/home");
          }}
          className="text-center border border-[#e48913] text-white w-1/2 rounded-xl flex mx-auto"
        >
          <Text className="text-center text-white font-semibold py-2 ">
            Guest User
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center mt-4 gap-1">
          <View className="border-b-2 border-[#e48913] w-24 " />
          <Text className="text-center text-white font-semibold py-2 ">Or</Text>
          <View className="border-b-2 border-[#e48913] w-24 " />
        </View>

        <TouchableOpacity
          className="flex flex-row items-center justify-center mt-4 gap-1"
          onPress={() => router.push("/login")}
        >
          <Text className="text-center text-white font-semibold py-2 ">
            Already have an account?
            <Text className="text-[#ec8b0c]"> Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Index;
