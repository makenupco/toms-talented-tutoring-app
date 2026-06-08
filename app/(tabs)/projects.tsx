import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function ProjectsScreen() {
  const projects = [
    { id: 1, title: "Summer Vibes", type: "Song", date: "2 days ago", status: "Draft" },
    { id: 2, title: "Midnight Dreams", type: "Video", date: "1 week ago", status: "Published" },
    { id: 3, title: "Ocean Waves", type: "Album", date: "2 weeks ago", status: "Draft" },
    { id: 4, title: "Electric Pulse", type: "Song", date: "1 month ago", status: "Published" },
    { id: 5, title: "Cosmic Journey", type: "Video", date: "1 month ago", status: "Draft" },
  ];

  const renderProject = ({ item }: { item: (typeof projects)[0] }) => (
    <TouchableOpacity className="bg-surface rounded-xl p-4 mb-3 border border-border active:opacity-70">
      <View className="gap-2">
        <View className="flex-row justify-between items-start">
          <View className="gap-1 flex-1">
            <Text className="text-base font-semibold text-foreground">{item.title}</Text>
            <Text className="text-xs text-muted">
              {item.type} • {item.date}
            </Text>
          </View>
          <View
            className={`px-2 py-1 rounded-full ${
              item.status === "Published" ? "bg-green-500/20" : "bg-yellow-500/20"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                item.status === "Published" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {item.status}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-2 pt-2 border-t border-border">
          <TouchableOpacity className="flex-1 py-2 px-3 bg-primary/10 rounded-lg">
            <Text className="text-xs font-semibold text-primary text-center">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-2 px-3 bg-secondary/10 rounded-lg">
            <Text className="text-xs font-semibold text-secondary text-center">Share</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-2 px-3 bg-error/10 rounded-lg">
            <Text className="text-xs font-semibold text-error text-center">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="bg-background px-4">
      <View className="gap-4 flex-1 pt-6">
        <View className="gap-2">
          <Text className="text-3xl font-bold text-foreground">My Projects</Text>
          <Text className="text-base text-muted">Manage your creations</Text>
        </View>

        <View className="flex-row gap-2 mb-4">
          <TouchableOpacity className="flex-1 py-2 px-4 bg-primary rounded-lg">
            <Text className="text-white font-semibold text-center text-sm">All</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-2 px-4 bg-surface border border-border rounded-lg">
            <Text className="text-foreground font-semibold text-center text-sm">Drafts</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-2 px-4 bg-surface border border-border rounded-lg">
            <Text className="text-foreground font-semibold text-center text-sm">Published</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={projects}
          renderItem={renderProject}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </ScreenContainer>
  );
}
