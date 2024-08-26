import { Alert, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { fetchAPI } from "@/lib/fetch";
import { PaymentProps } from "@/types/type";

const Payment: React.FC<PaymentProps> = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

  const confirmHandler = async (paymentMethod, _, intentCreationCallback) => {
    const { paymentIntent, customer } = await fetchAPI(
      "/(api)/(stripe)/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName || email.split("@")[0],
          email: email,
          amount: amount,
          paymentMethodId: paymentMethod.id,
        }),
      }
    );

    if (paymentIntent.client_secret) {
      const { result } = await fetchAPI("/(api)/(stripe)/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          payment_intent_id: paymentIntent.id,
          customer_id: customer,
        }),
      });
      if (result.error) {
        intentCreationCallback({ error: result.error });
      } else if (result.client_secret) {
        //ride-created
      }
    }
    // do mobile app development react native developer ios android app firebase

    // Make a request to your own server.

    const { clientSecret, error } = await response.json();
    if (clientSecret) {
      intentCreationCallback({ clientSecret });
    } else {
      intentCreationCallback({ error });
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
    });
    if (error) {
      // handle error
      Alert.alert("Error", error.message);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        // Customer canceled - you should probably do nothing.
        Alert.alert("Payment Canceled", error.message);
      } else {
        // PaymentSheet encountered an unrecoverable error. You can display the error to the user, log it, etc.
        Alert.alert("Payment Error", error.message);
      }
    } else {
      // Payment completed - show a confirmation screen.
      Alert.alert("Success", "Your payment is completed!");
      setSuccess(true);
    }
  };
  return (
    <>
      <CustomButton
        className="my-10"
        title="Pay Now!"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
