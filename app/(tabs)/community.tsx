import { ScrollView, Text, View, TouchableOpacity, FlatList, TextInput } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function CommunityScreen() {
  const communityContent = [
    {
      id: 1,
      title: "Summer Vibes Mix",
      artist: "Alex Music",
      type: "Song",
      likes: 1234,
      comments: 45,
      avatar: "👨‍🎤",
    },
    {
      id: 2,
      title: "Midnight Dreams Video",
      artist: "Luna Beats",
      type: "Video",
      likes: 2567,
      comments: 89,
      avatar: "👩‍🎤",
    },
    {
      id: 3,
      title: "Ocean Waves Remix",
      artist: "Wave Rider",
      type: "Remix",
      likes: 876,
      comments: 23,
      avatar: "🎵",
    },
    {
      id: 4,
      title: "Electric Pulse",
      artist: "Synth Master",
      type: "Song",
      likes: 3421,
      comments: 156,
      avatar: "⚡",
    },
  ];

  const renderContent = ({ item }: { item: (typeof communityContent)[0] }) => (
    <TouchableOpacity className="bg-surface rounded-xl p-4 mb-3 border border-border active:opacity-70">
      <View className="gap-3">
        <View className="flex-row items-center gap-3">
          <Text className="text-3xl">{item.avatar}</Text>
          <View className="gap-1 flex-1">
            <Text className="text-sm font-semibold text-foreground">{item.artist}</Text>
            <Text className="text-xs text-muted">{item.type}</Text>
          </View>
        </View>

        <Text className="text-base font-semibold text-foreground">{item.title}</Text>

        <View className="bg-gray-300 h-40 rounded-lg" />

        <View className="flex-row justify-between items-center pt-2 border-t border-border">
          <View className="flex-row gap-4">
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-lg">❤️</Text>
              <Text className="text-xs text-muted">{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-lg">💬</Text>
              <Text className="text-xs text-muted">{item.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-lg">🔗</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="px-3 py-1 bg-primary/10 rounded-full">
            <Text className="text-xs font-semibold text-primary">Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="bg-background px-4">
      <View className="gap-4 flex-1 pt-6">
        <View className="gap-2">
          <Text className="text-3xl font-bold text-foreground">Community</Text>
          <Text className="text-base text-muted">Discover amazing creations</Text>
        </View>

        <View className="flex-row items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2">
          <Text className="text-lg">🔍</Text>
          <TextInput
            placeholder="Search songs, artists..."
            placeholderTextColor="#9aa0a6"
            className="flex-1 text-foreground text-sm"
          />
        </View>

        <View className="flex-row gap-2 mb-2">
          {["Trending", "New", "Most Liked", "Followed"].map((filter, i) => (
            <TouchableOpacity
              key={i}
              className={`px-3 py-2 rounded-full ${
                i === 0 ? "bg-primary" : "bg-surface border border-border"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  i === 0 ? "text-white" : "text-foreground"
                }`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={communityContent}
          renderItem={renderContent}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </ScreenContainer>
  );
}
