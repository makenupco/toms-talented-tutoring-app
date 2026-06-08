import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";

export default function CreateScreen() {
  const router = useRouter();

  const tools = [
    {
      id: "lyrics",
      title: "Lyric Studio",
      description: "Write and compose song lyrics with AI suggestions",
      icon: "✍️",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "song",
      title: "Song Designer",
      description: "Create melodies and arrange instruments",
      icon: "🎵",
      color: "from-red-500 to-red-600",
    },
    {
      id: "video",
      title: "AI Music Video",
      description: "Generate stunning music videos from your songs",
      icon: "🎬",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: "cover",
      title: "Album Cover Creator",
      description: "Design beautiful album artwork with AI",
      icon: "🎨",
      color: "from-green-500 to-green-600",
    },
    {
      id: "remaster",
      title: "Remastering Suite",
      description: "Enhance and polish your audio quality",
      icon: "🔊",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "remix",
      title: "Remix Studio",
      description: "Remix existing tracks and create variations",
      icon: "🎧",
      color: "from-pink-500 to-pink-600",
    },
  ];

  const handleToolPress = (toolId: string) => {
    // For now, just show a message
    // In production, navigate to the actual tool
    console.log("Opening tool:", toolId);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8 pt-6">
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Create</Text>
            <Text className="text-base text-muted">Choose a tool to start creating</Text>
          </View>

          <View className="gap-3">
            {tools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                onPress={() => handleToolPress(tool.id)}
                className={`bg-gradient-to-r ${tool.color} rounded-2xl p-6 gap-3 active:opacity-80`}
              >
                <View className="flex-row items-start justify-between">
                  <View className="gap-2 flex-1">
                    <View className="flex-row items-center gap-3">
                      <Text className="text-3xl">{tool.icon}</Text>
                      <Text className="text-xl font-bold text-white flex-1">{tool.title}</Text>
                    </View>
                    <Text className="text-sm text-white/90">{tool.description}</Text>
                  </View>
                  <Text className="text-2xl">→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Templates Section */}
          <View className="gap-3 mt-4">
            <Text className="text-xl font-bold text-foreground">Start from Template</Text>
            <View className="gap-2">
              {["Pop Song", "Hip-Hop Beat", "Ambient Track", "Electronic Dance"].map((template, i) => (
                <TouchableOpacity
                  key={i}
                  className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center active:opacity-70"
                >
                  <Text className="text-base font-semibold text-foreground">{template}</Text>
                  <Text className="text-primary font-semibold">Use</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
