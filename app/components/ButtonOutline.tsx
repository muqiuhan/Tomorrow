import { Pressable, Text, View } from "react-native";

interface ButtonOutlineProps {
  text: string;
  action?: () => void;
  children?: React.ReactNode;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({
  text,
  action,
  children,
}) => {
  return (
    <Pressable
      className="border-2 border-neutral-500 rounded-lg justify-center items-center py-3 flex-row space-x-2"
      onPress={action}
    >
      {children && <View>{children}</View>}
      <Text
        className="text-neutral-500 font-bold text-lg"
        style={{ fontFamily: "MiSans" }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default ButtonOutline;
