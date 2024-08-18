import { Stack } from "expo-router";
import AuthLayout from "@/app/(auth)/_layout";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default RootLayout;
