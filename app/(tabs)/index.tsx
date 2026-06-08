import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/use-auth";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const quickStartTools = [
    { id: "lyrics", title: "Lyric Studio", description: "Write & compose lyrics", icon: "✍️", color: "bg-blue-500" },
    { id: "song", title: "Song Designer", description: "Create melodies", icon: "🎵", color: "bg-red-500" },
    { id: "video", title: "AI Music Video", description: "Generate videos", icon: "🎬", color: "bg-yellow-500" },
    { id: "cover", title: "Album Cover", description: "Design artwork", icon: "🎨", color: "bg-green-500" },
    { id: "remaster", title: "Remastering", description: "Enhance audio", icon: "🔊", color: "bg-purple-500" },
    { id: "community", title: "Community", description: "Share & discover", icon: "👥", color: "bg-pink-500" },
  ];

  const recentProjects = [
    { id: 1, title: "Summer Vibes", type: "Song", date: "2 days ago" },
    { id: 2, title: "Midnight Dreams", type: "Video", date: "1 week ago" },
    { id: 3, title: "Ocean Waves", type: "Album", date: "2 weeks ago" },
  ];

  const handleToolPress = (toolId: string) => {
    // Navigate to tool screens using tab navigation
    switch (toolId) {
      case "community":
        router.push("/(tabs)/community");
        break;
      default:
        // For other tools, navigate to create tab
        router.push("/(tabs)/create");
        break;
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-8 pb-8 px-4">
          {/* Hero Section */}
          <View className="gap-3 pt-6">
            <Text className="text-4xl font-bold text-foreground">
              Welcome{user ? `, ${user.name?.split(" ")[0]}` : ""}!
            </Text>
            <Text className="text-base text-muted">
              Create, remix, and share your music with AI-powered tools
            </Text>
          </View>

          {/* Subscription Banner */}
          <View className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-2xl p-4 gap-2">
            <Text className="text-lg font-bold text-white">Unlock Premium Features</Text>
            <Text className="text-sm text-white/90">Get unlimited access to AI tools and exports</Text>
            <TouchableOpacity className="bg-white/20 px-4 py-2 rounded-lg mt-2 self-start">
              <Text className="text-white font-semibold">Upgrade Now</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Start Tools */}
          <View className="gap-3">
            <Text className="text-xl font-bold text-foreground">Quick Start</Text>
            <View className="flex-row flex-wrap gap-3 justify-between">
              {quickStartTools.map((tool) => (
                <TouchableOpacity
                  key={tool.id}
                  onPress={() => handleToolPress(tool.id)}
                  className={`${tool.color} rounded-2xl p-4 w-[48%] items-center gap-2 active:opacity-80`}
                >
                  <Text className="text-3xl">{tool.icon}</Text>
                  <Text className="text-sm font-semibold text-white text-center">{tool.title}</Text>
                  <Text className="text-xs text-white/80 text-center">{tool.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Projects */}
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-bold text-foreground">Recent Projects</Text>
              <TouchableOpacity onPress={() => router.push("/(tabs)/projects")}>
                <Text className="text-primary font-semibold">View All</Text>
              </TouchableOpacity>
            </View>
            <View className="gap-2">
              {recentProjects.map((project) => (
                <TouchableOpacity
                  key={project.id}
                  className="bg-surface rounded-xl p-4 flex-row justify-between items-center border border-border active:opacity-70"
                >
                  <View className="gap-1 flex-1">
                    <Text className="text-base font-semibold text-foreground">{project.title}</Text>
                    <Text className="text-xs text-muted">{project.type} • {project.date}</Text>
                  </View>
                  <Text className="text-xl">→</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Featured Content */}
          <View className="gap-3">
            <Text className="text-xl font-bold text-foreground">Featured from Community</Text>
            <View className="gap-2">
              {[1, 2].map((i) => (
                <TouchableOpacity
                  key={i}
                  className="bg-surface rounded-xl p-4 border border-border active:opacity-70"
                >
                  <View className="gap-2">
                    <View className="bg-gray-300 h-32 rounded-lg" />
                    <Text className="text-sm font-semibold text-foreground">Amazing Track #{i}</Text>
                    <Text className="text-xs text-muted">by Artist Name • 1.2K likes</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
