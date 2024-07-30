import { Pressable, Text, View } from "react-native";

interface ButtonOutlineProps {
  text: string;
  action?: () => void;
  children?: React.ReactNode;
  bg?: string;
  fg?: string;
  border?: string;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({
  text,
  action,
  children,
  bg = "bg-white",
  fg = "text-neutral-500",
  border = "border-neutral-500",
}) => {
  return (
    <Pressable
      className={`border-2 ${border} ${bg} rounded-lg justify-center items-center py-3 flex-row space-x-2`}
      onPress={action}
    >
      {children && <View>{children}</View>}
      <Text
        className={`${fg} font-bold text-lg`}
        style={{ fontFamily: "MiSans" }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default ButtonOutline;
