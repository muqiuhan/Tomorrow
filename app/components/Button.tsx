import { Pressable, Text } from "react-native";

interface ButtonProps {
  text: string;
  action?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, action }) => {
  return (
    <Pressable
      className="bg-[#4984dc] rounded-lg justify-center items-center py-3"
      onPress={action}
    >
      <Text
        className="text-white font-bold text-lg"
        style={{ fontFamily: "MiSans" }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
