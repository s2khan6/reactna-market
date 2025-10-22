import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { CartProvider } from "./context/CartContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "🛍️ MiniShop" }} />
          <Stack.Screen name="Product" component={ProductScreen} options={{ title: "Product Details" }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: "🛒 Cart" }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

