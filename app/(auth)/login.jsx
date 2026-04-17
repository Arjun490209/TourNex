import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState, useContext } from "react";
import { COLORS } from "../src/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Email and password required");
    }

    setLoading(true);

    const res = await login(email.toLowerCase(), password);

    setLoading(false);

    if (res.success) {
      router.push("/home");
    } else {
      alert(res.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Top */}
      <View className="items-center mt-16">
        <Image source={logo} className="w-36 h-16" />
        <Text className="text-2xl font-bold text-white mt-4">GameHub</Text>
        <Text className="text-gray-400 mt-2">Login to continue 🎮</Text>
      </View>

      {/* Form */}
      <View className="mt-10 px-6">
        {/* Email */}
        <Text className="text-gray-400 mb-1">Email</Text>
        <TextInput
          value={email}
          onChangeText={(v) => setEmail(v.toLowerCase())} // 🔥 fix
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
          placeholderTextColor="#94a3b8"
          className="bg-[#1e293b] text-white p-4 rounded-xl mb-4"
        />

        {/* Password */}
        <Text className="text-gray-400 mb-1">Password</Text>
        <View className="flex-row items-center bg-[#1e293b] rounded-xl px-3">
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            placeholder="Enter your password"
            placeholderTextColor="#94a3b8"
            className="flex-1 text-white py-4"
          />

          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off" : "eye"}
              size={22}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity
          disabled={loading}
          onPress={handleLogin}
          style={{
            backgroundColor: loading ? "#999" : COLORS.primary,
          }}
          className="mt-6 py-4 rounded-xl items-center"
        >
          <Text className="text-white font-bold text-lg">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Signup */}
        <TouchableOpacity
          onPress={() => router.push("/register")}
          className="mt-4 items-center"
        >
          <Text className="text-gray-400">
            Don't have an account?{" "}
            <Text className="text-[#ec8b0c] font-bold">Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
