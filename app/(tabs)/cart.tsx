import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Itens do carrinho de exemplo
const cartItems = [
  {
    id: "1",
    name: "Margherita",
    description: "Tomates frescos, mussarela, manjericão",
    price: 49.9,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
  },
  {
    id: "2",
    name: "Pepperoni",
    description: "Pepperoni, mussarela, molho de tomate",
    price: 54.9,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
  },
];

export default function CartScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const delivery = subtotal > 0 ? 9.9 : 0;
  const total = subtotal + tax + delivery;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#4CAF50", dark: "#2E7D32" }}
      headerImage={<Text style={styles.headerEmoji}>🛒</Text>}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Seu Carrinho</ThemedText>
      </ThemedView>

      {items.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyEmoji}>🍕</Text>
          <ThemedText type="subtitle" style={styles.emptyText}>
            Seu carrinho está vazio
          </ThemedText>
          <ThemedText style={styles.emptySubtext}>
            Adicione pizzas deliciosas do nosso cardápio!
          </ThemedText>
        </View>
      ) : (
        <>
          <View style={styles.cartList}>
            {items.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.cartCard,
                  {
                    backgroundColor:
                      colorScheme === "dark" ? "#1D3D47" : "#FFFFFF",
                  },
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.cartImage}
                  resizeMode="cover"
                />
                <View style={styles.cartInfo}>
                  <Text
                    style={[
                      styles.cartName,
                      {
                        color: colorScheme === "dark" ? "#ECEDEE" : "#11181C",
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.cartDescription,
                      {
                        color: colorScheme === "dark" ? "#9BA1A6" : "#687076",
                      },
                    ]}
                  >
                    {item.description}
                  </Text>
                  <View style={styles.cartFooter}>
                    <Text style={[styles.cartPrice, { color: colors.tint }]}>
                      R${" "}
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        style={[
                          styles.quantityButton,
                          { backgroundColor: colors.tint },
                        ]}
                        onPress={() => updateQuantity(item.id, -1)}
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
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.quantityButton,
                          { backgroundColor: colors.tint },
                        ]}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: colorScheme === "dark" ? "#1D3D47" : "#FFFFFF",
              },
            ]}
          >
            <ThemedText type="subtitle" style={styles.summaryTitle}>
              Resumo do Pedido
            </ThemedText>

            <View style={styles.summaryRow}>
              <Text
                style={[
                  styles.summaryLabel,
                  { color: colorScheme === "dark" ? "#9BA1A6" : "#687076" },
                ]}
              >
                Subtotal
              </Text>
              <Text
                style={[
                  styles.summaryValue,
                  { color: colorScheme === "dark" ? "#ECEDEE" : "#11181C" },
                ]}
              >
                R$ {subtotal.toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text
                style={[
                  styles.summaryLabel,
                  { color: colorScheme === "dark" ? "#9BA1A6" : "#687076" },
                ]}
              >
                Taxa de serviço (8%)
              </Text>
              <Text
                style={[
                  styles.summaryValue,
                  { color: colorScheme === "dark" ? "#ECEDEE" : "#11181C" },
                ]}
              >
                R$ {tax.toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text
                style={[
                  styles.summaryLabel,
                  { color: colorScheme === "dark" ? "#9BA1A6" : "#687076" },
                ]}
              >
                Entrega
              </Text>
              <Text
                style={[
                  styles.summaryValue,
                  { color: colorScheme === "dark" ? "#ECEDEE" : "#11181C" },
                ]}
              >
                R$ {delivery.toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <View
              style={[
                styles.summaryRow,
                styles.totalRow,
                {
                  borderTopColor:
                    colorScheme === "dark" ? "#3D3D3D" : "#E0E0E0",
                },
              ]}
            >
              <Text
                style={[
                  styles.summaryLabel,
                  styles.totalLabel,
                  { color: colorScheme === "dark" ? "#ECEDEE" : "#11181C" },
                ]}
              >
                Total
              </Text>
              <Text
                style={[
                  styles.summaryValue,
                  styles.totalValue,
                  { color: colors.tint },
                ]}
              >
                R$ {total.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.checkoutButton, { backgroundColor: colors.tint }]}
            >
              <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  emptyCart: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: "center",
    opacity: 0.7,
  },
  cartList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  cartCard: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartImage: {
    width: 100,
    height: 100,
  },
  cartInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  cartName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartDescription: {
    fontSize: 12,
    opacity: 0.7,
  },
  cartFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartPrice: {
    fontSize: 16,
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
  },
  summaryCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    opacity: 0.7,
  },
  summaryValue: {
    fontWeight: "500",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 18,
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 18,
  },
  checkoutButton: {
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 16,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
