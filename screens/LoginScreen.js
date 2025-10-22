import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleLogin = async () => {
    if (name.trim()) {
      const user = {
        name,
        email: email || "не указано",
        phone: phone || "не указано",
        address: address || "не указано",
      };
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      navigation.navigate("Profile");
    } else {
      alert("Введите хотя бы имя!");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}
      contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
    >
      <Text style={{ fontSize: 26, textAlign: "center", marginBottom: 20 }}>
        Регистрация в MiniShop
      </Text>

      <TextInput
        placeholder="Имя"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Телефон"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Адрес"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Зарегистрироваться</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
};
