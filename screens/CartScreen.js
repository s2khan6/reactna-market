import { View, Text, FlatList, Button, Alert } from "react-native";
import { useCart } from "../context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Добавляем заказ в историю
  const saveOrderToHistory = async () => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart.map((i) => ({ title: i.title, price: i.price, quantity: i.quantity })),
      total,
    };

    const existing = await AsyncStorage.getItem("orderHistory");
    const orders = existing ? JSON.parse(existing) : [];
    orders.push(newOrder);

    await AsyncStorage.setItem("orderHistory", JSON.stringify(orders));
  };

  const handleCheckout = async () => {
    await saveOrderToHistory();
    Alert.alert("🎉 Спасибо!", "Покупка оформлена успешно!");
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>🛍️ Ваша корзина пуста</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 8,
              backgroundColor: "#fff",
              borderRadius: 8,
              padding: 10,
            }}
          >
            <Text style={{ flex: 1 }}>{item.title}</Text>
            <Text>x{item.quantity}</Text>
            <Text>${item.price * item.quantity}</Text>
            <Button title="❌" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
        Итого: ${total.toFixed(2)}
      </Text>
      <Button title="Оформить покупку" onPress={handleCheckout} />
    </View>
  );
}
