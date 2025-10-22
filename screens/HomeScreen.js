import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      {/* Верхняя панель */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          backgroundColor: "#3b82f6",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
          🛍️ MiniShop
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#3b82f6" }}>🛒 {cart.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#3b82f6", fontWeight: "bold" }}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Список товаров */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              marginVertical: 8,
              borderRadius: 10,
              padding: 10,
              elevation: 2,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Product", { item })}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{ width: 80, height: 80, borderRadius: 8, marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ fontWeight: "bold", fontSize: 16 }}>
                  {item.title}
                </Text>
                <Text style={{ color: "gray" }}>{item.brand}</Text>
                <Text style={{ marginTop: 5, fontWeight: "bold" }}>{item.price}$</Text>
              </View>
            </TouchableOpacity>

            {/* Кнопка добавления в корзину */}
            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={{
                marginTop: 10,
                backgroundColor: "#10b981",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>➕ В корзину</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
