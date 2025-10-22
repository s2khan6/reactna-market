import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // Загружаем данные пользователя и историю покупок
  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem("userData");
      const history = await AsyncStorage.getItem("orderHistory");
      if (data) setUser(JSON.parse(data));
      if (history) setOrders(JSON.parse(history).reverse());
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userData");
    navigation.navigate("Login");
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            backgroundColor: "#3b82f6",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Войти / Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f3f4f6", padding: 20 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 10 }}>
        👤 {user.name}
      </Text>

      <View style={styles.card}>
        <Text style={styles.title}>Контактная информация</Text>
        <Text>📧 Email: {user.email}</Text>
        <Text>📱 Телефон: {user.phone}</Text>
        <Text>🏠 Адрес: {user.address}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>История покупок</Text>
        {orders.length === 0 ? (
          <Text style={{ color: "gray" }}>Нет покупок</Text>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.order}>
              <Text style={{ fontWeight: "bold" }}>🧾 Заказ от {order.date}</Text>
              {order.items.map((it, i) => (
                <Text key={i}>
                  • {it.title} — {it.quantity} шт. × ${it.price}
                </Text>
              ))}
              <Text style={{ fontWeight: "bold", marginTop: 4 }}>
                💰 Итого: ${order.total.toFixed(2)}
              </Text>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logout}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Выйти из аккаунта
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    width: "100%",
    marginBottom: 20,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  order: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 10,
    paddingBottom: 8,
  },
  logout: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 30,
  },
};
