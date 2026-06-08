import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const menuItems = [
    { id: "subscription", title: "Subscription", icon: "💎", value: "Pro Plan" },
    { id: "settings", title: "Settings", icon: "⚙️", value: "" },
    { id: "notifications", title: "Notifications", icon: "🔔", value: "" },
    { id: "privacy", title: "Privacy & Security", icon: "🔒", value: "" },
    { id: "help", title: "Help & Support", icon: "❓", value: "" },
    { id: "about", title: "About", icon: "ℹ️", value: "" },
  ];

  return (
    <ScreenContainer className="bg-background px-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6 pt-6 pb-8">
          {/* Profile Header */}
          <View className="items-center gap-4">
            <View className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 items-center justify-center">
              <Text className="text-4xl">👤</Text>
            </View>
            <View className="items-center gap-1">
              <Text className="text-2xl font-bold text-foreground">
                {user?.name || "User"}
              </Text>
              <Text className="text-sm text-muted">{user?.email}</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around bg-surface rounded-2xl p-4 border border-border">
            <View className="items-center gap-1">
              <Text className="text-2xl font-bold text-primary">12</Text>
              <Text className="text-xs text-muted">Projects</Text>
            </View>
            <View className="items-center gap-1">
              <Text className="text-2xl font-bold text-secondary">5.2K</Text>
              <Text className="text-xs text-muted">Followers</Text>
            </View>
            <View className="items-center gap-1">
              <Text className="text-2xl font-bold text-accent">28</Text>
              <Text className="text-xs text-muted">Likes</Text>
            </View>
          </View>

          {/* Subscription Banner */}
          <View className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-2xl p-4 gap-2">
            <Text className="text-lg font-bold text-white">Pro Subscription Active</Text>
            <Text className="text-sm text-white/90">Renews on June 15, 2026</Text>
            <TouchableOpacity className="bg-white/20 px-4 py-2 rounded-lg mt-2 self-start">
              <Text className="text-white font-semibold text-sm">Manage Subscription</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View className="gap-2">
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-surface rounded-xl p-4 flex-row justify-between items-center border border-border active:opacity-70"
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-xl">{item.icon}</Text>
                  <Text className="text-base font-semibold text-foreground">{item.title}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  {item.value && (
                    <Text className="text-sm text-muted">{item.value}</Text>
                  )}
                  <Text className="text-lg text-muted">→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-error/10 rounded-xl p-4 items-center border border-error/20 active:opacity-70"
          >
            <Text className="text-base font-semibold text-error">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
