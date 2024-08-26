import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const FindRide = () => {
  const {
    destinationLatitude,
    destinationLongitude,
    destinationAddress,
    userAddress,
    userLatitude,
    userLongitude,
    setUserLocation,
    setDestinationLocation,
  } = useLocationStore();
  console.log(destinationLatitude, destinationLongitude, destinationAddress);
  return (
    <RideLayout title="Ride">
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>
      <CustomButton
        title="find now!"
        onPress={() => router.push("/(root)/confirm-ride")}
        className="mt-4"
      />
    </RideLayout>
  );
};

export default FindRide;

const styles = StyleSheet.create({});
