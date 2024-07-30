import { Pressable, Text } from "react-native";

interface ButtonProps {
  text: string;
  action?: () => void;
  bg?: string;
  fg?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  action,
  bg = "bg-[#4984dc]",
  fg = "text-white",
}) => {
  return (
    <Pressable
      className={`${bg} rounded-lg justify-center items-center py-3`}
      onPress={action}
    >
      <Text
        className={`${fg} font-bold text-lg`}
        style={{ fontFamily: "MiSans" }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
