import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { COLORS } from "../src/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useContext(AuthContext);

  const [secure, setSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gameUID: "",
  });

  const isMatch = form.password === form.confirmPassword;

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (!isMatch) return alert("Passwords do not match");

    setLoading(true);

    const { confirmPassword, ...data } = form;
    const res = await register(data);

    setLoading(false);

    if (res.success) {
      router.replace("/login");
    } else {
      alert(res.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="items-center mt-12">
            <Image source={logo} className="w-36 h-16" />
            <Text className="text-2xl font-bold text-white mt-4">GameHub</Text>
            <Text className="text-gray-400 mt-2">Create your account 🚀</Text>
          </View>

          <View className="mt-8 px-6 pb-10">
            {/* Name */}
            <TextInput
              placeholder="Full Name"
              value={form.name}
              onChangeText={(v) => handleChange("name", v)}
              className="bg-[#1e293b] text-white p-4 rounded-xl mb-4 placeholder:text-gray-400"
            />

            <TextInput
              placeholder="Game UID"
              value={form.gameUID}
              onChangeText={(v) => handleChange("gameUID", v)}
              className="bg-[#1e293b] text-white p-4 rounded-xl mb-4 placeholder:text-gray-400"
            />

            {/* Email */}
            <TextInput
              placeholder="Email"
              value={form.email}
              onChangeText={(v) => handleChange("email", v)}
              className="bg-[#1e293b] text-white p-4 rounded-xl mb-4 placeholder:text-gray-400"
            />

            {/* Password */}
            <View className="flex-row items-center bg-[#1e293b] rounded-xl px-3 mb-4">
              <TextInput
                secureTextEntry={secure}
                placeholder="Password"
                value={form.password}
                onChangeText={(v) => handleChange("password", v)}
                className="flex-1 text-white py-4 placeholder:text-gray-400"
              />
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Ionicons
                  name={secure ? "eye-off" : "eye"}
                  size={22}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <View className="flex-row items-center bg-[#1e293b] rounded-xl px-3">
              <TextInput
                secureTextEntry={confirmSecure}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChangeText={(v) => handleChange("confirmPassword", v)}
                className="flex-1 text-white py-4 placeholder:text-gray-400"
              />
              <TouchableOpacity
                onPress={() => setConfirmSecure(!confirmSecure)}
              >
                <Ionicons
                  name={confirmSecure ? "eye-off" : "eye"}
                  size={22}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            </View>

            {/* Match Message */}
            {form.confirmPassword.length > 0 && (
              <Text
                className={`mt-2 ${isMatch ? "text-green-400" : "text-red-400"}`}
              >
                {isMatch ? "✅ Password matched" : "❌ Password not matched"}
              </Text>
            )}

            {/* Button */}
            <TouchableOpacity
              disabled={loading}
              onPress={handleRegister}
              style={{
                backgroundColor: loading ? "#999" : COLORS.primary,
              }}
              className="mt-6 py-4 rounded-xl items-center"
            >
              <Text className="text-white font-bold text-lg">
                {loading ? "Registering..." : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
