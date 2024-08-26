import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { icons } from "@/constants";
import Map from "./Map";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

interface Props {
  children: React.ReactNode;
  title: string;
}

const RideLayout: React.FC<Props> = ({ title = "Go Back", children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-lg font-JakartaBold ml-5">{title}</Text>
          </View>
          <Map />
        </View>
        <BottomSheet ref={bottomSheetRef} snapPoints={["40%", "85%"]} index={0}>
          <BottomSheetScrollView
            style={{ flex: 1, padding: 20, paddingBottom: 20 }}
          >
            {children}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
