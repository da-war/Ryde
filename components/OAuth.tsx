import { Image, Text, View } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const googlePress = () => {
    console.log("Google Pressed");
  };
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg "> Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        IconLeft={() => (
          <Image className="w-5 h-5 mx-2" source={icons.google} />
        )}
        title="Login With Google"
        className={`mt-5 w-full`}
        bgVariant="outline"
        textVariant="primary"
        onPress={googlePress}
      />
    </View>
  );
};

export default OAuth;
