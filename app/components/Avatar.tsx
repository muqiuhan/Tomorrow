import React from "react";
import { supabase } from "@/lib/supabase";
import { Pressable, View } from "react-native";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

interface AvatarProps {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
  showUpload?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  size = 150,
  url,
  onUpload,
  showUpload,
}) => {
  const [uploading, setUploading] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) throw error;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(data);
      fileReader.onload = () => {
        setAvatarUrl(fileReader.result as string);
      };
    } catch (error) {
      if (error instanceof Error)
        console.log("Downloading image error: " + error.message);
    }
  };

  const uploadAvatar = async () => {};

  React.useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  return (
    <View>
      {avatarUrl ? (
        <View className="relative">
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        </View>
      ) : (
        <View
          className="justify-center items-center"
          style={[avatarSize, styles.avatar, styles.noimage]}
        >
          <ActivityIndicator color="white" />
        </View>
      )}

      {
        showUpload && (
          <View className="absolute right-0 bottom-0">
            {
              !uploading ? (
                <Pressable>
                  <MaterialIcons name="cloud-upload" size={30} color="black" />
                </Pressable>
              ) : (
                <ActivityIndicator color="white" />
              )
            }
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    overflow: "hidden",
    maxWidth: "100%",
    position: "relative",
  },
  image: {
    objectFit: "cover",
    padding: 0,
  },
  noimage: {
    backgroundColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 1,
  },
});

export default Avatar;
