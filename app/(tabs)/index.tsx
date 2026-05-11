import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Cardápio de pizzas
const pizzas = [
  {
    id: "1",
    name: "Margherita",
    description: "Tomates frescos, mussarela, manjericão",
    price: 49.9,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
  },
  {
    id: "2",
    name: "Pepperoni",
    description: "Pepperoni, mussarela, molho de tomate",
    price: 54.9,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
  },
  {
    id: "3",
    name: "Havaiana",
    description: "Presunto, abacaxi, mussarela",
    price: 52.9,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
  },
  {
    id: "4",
    name: "Frango BBQ",
    description: "Frango grelhado, molho BBQ, cebolas roxas",
    price: 59.9,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400",
  },
  {
    id: "5",
    name: "Vegetariana",
    description: "Pimentões, cogumelos, azeitonas, cebolas",
    price: 51.9,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
  },
  {
    id: "6",
    name: "Carnívora",
    description: "Pepperoni, linguiça, bacon, presunto",
    price: 64.9,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400",
  },
];

export default function MenuScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#E6A817", dark: "#8B5A00" }}
      headerImage={<Text style={styles.headerEmoji}>🍕</Text>}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Nosso Cardápio</ThemedText>
        {cartCount > 0 && (
          <View style={[styles.cartBadge, { backgroundColor: colors.tint }]}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        )}
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        Pizzas artesanais feitas com amor
      </ThemedText>

      <View style={styles.pizzaGrid}>
        {pizzas.map((pizza) => (
          <View
            key={pizza.id}
            style={[
              styles.pizzaCard,
              {
                backgroundColor: colorScheme === "dark" ? "#1D3D47" : "#FFFFFF",
              },
            ]}
          >
            <Image
              source={{ uri: pizza.image }}
              style={styles.pizzaImage}
              resizeMode="cover"
            />
            <View style={styles.pizzaInfo}>
              <Text
                style={[
                  styles.pizzaName,
                  { color: colorScheme === "dark" ? "#ECEDEE" : "#11181C" },
                ]}
              >
                {pizza.name}
              </Text>
              <Text
                style={[
                  styles.pizzaDescription,
                  { color: colorScheme === "dark" ? "#9BA1A6" : "#687076" },
                ]}
              >
                {pizza.description}
              </Text>
              <View style={styles.pizzaFooter}>
                <Text style={[styles.pizzaPrice, { color: colors.tint }]}>
                  R$ {pizza.price.toFixed(2).replace(".", ",")}
                </Text>
                <View style={styles.addButtons}>
                  {cart[pizza.id] ? (
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        style={[
                          styles.quantityButton,
                          { backgroundColor: colors.tint },
                        ]}
                        onPress={() => removeFromCart(pizza.id)}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text
                        style={[
                          styles.quantity,
                          {
                            color:
                              colorScheme === "dark" ? "#ECEDEE" : "#11181C",
                          },
                        ]}
                      >
                        {cart[pizza.id]}
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.quantityButton,
                          { backgroundColor: colors.tint },
                        ]}
                        onPress={() => addToCart(pizza.id)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={[
                        styles.addButton,
                        { backgroundColor: colors.tint },
                      ]}
                      onPress={() => addToCart(pizza.id)}
                    >
                      <Text style={styles.addButtonText}>Adicionar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerEmoji: {
    fontSize: 100,
    position: "absolute",
    bottom: 0,
    left: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  subtitle: {
    paddingHorizontal: 16,
    marginBottom: 20,
    opacity: 0.7,
  },
  cartBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  pizzaGrid: {
    paddingHorizontal: 16,
    gap: 16,
  },
  pizzaCard: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pizzaImage: {
    width: "100%",
    height: 150,
  },
  pizzaInfo: {
    padding: 12,
  },
  pizzaName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  pizzaDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  pizzaFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pizzaPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  quantity: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#11181C",
  },
});
