import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px] " />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome Back!
          </Text>
        </View>
        <View className="p-5 ">
          <InputField
            label="Email"
            placeholder="enter your email"
            icon={icons.person}
            value={form.email}
            onChangeText={(text: string) => setForm({ ...form, email: text })}
          />
          <InputField
            label="Password"
            placeholder="enter your password"
            icon={icons.lock}
            secureTextEntry
            value={form.password}
            onChangeText={(text: string) =>
              setForm({ ...form, password: text })
            }
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />
          {/*OAuth */}

          <OAuth />
          <Link
            className="text-lg text-center text-general-200 mt-10"
            href="/register"
          >
            <Text className="mr-2">Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up!</Text>
          </Link>
        </View>

        {/*Verification Modal */}
      </View>
    </ScrollView>
  );
};

export default Login;
