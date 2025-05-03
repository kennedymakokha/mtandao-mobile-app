
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authStackParamList } from "../../types";
import RegisterLogin, { OtpView } from "./components/authComponets/registration";
import OverlayLoader, { FormLoader } from "../components/loader";
import Toast from "../components/toast";
import { useUser } from "../context/UserContext"
import { API_URL } from '@env';
import { useAuth } from "../context/AuthContext";
import { useActivateMutation, useLoginMutation, useSignupMutation } from "../services/authApi.slice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth.slice";
import { useAuthContext } from "../../contexts/AuthContext1";

export default function LoginScreen() {

  const { user, setUser, logout } = useUser();
  type Item = {
    phone_number: string;
    password: string;
    confirm_password: string;
    username: string,
    otp?: any,
    code?: any
  };
  const [hide, setHide] = useState(true)
  const [hideconfirm, setHideConfirm] = useState(true)
  const [islogin, setIslogin] = useState(true)
  const [isLoading, setIsloading] = useState(false)
  const [msg, setMsg] = useState({ msg: "", state: "" });
  const [loginUser, { isLoading: logingin, error }] = useLoginMutation();
  const [register, { isLoading: registrationLoading }] = useSignupMutation();
  const [activate, { isLoading: activationLoading }] = useActivateMutation();
  const [step, setStep] = useState(1);
  const { token, login } = useAuthContext();
  const [item, setItem] = useState<Item>({
    phone_number: "0706203245",
    password: "MikeMike",
    confirm_password: "",
    username: "suggeted",
    code: ""
  })
  type NavigationProp = NativeStackNavigationProp<authStackParamList>;
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch()
  const handleChange = (key: keyof Item, value: string) => {
    setMsg({ msg: "", state: "" });

    setItem(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handleSubmit = async (e?: any) => {
    try {
      setIsloading(true)
      if (e?.preventDefault) e.preventDefault();

      setMsg({ msg: "", state: "" });

      if (!item.phone_number || !item.password) {
        setMsg({ msg: "Both fields are required", state: "error" });
        setIsloading(false)
        return;
      }

      if (!islogin && item.password !== item.confirm_password) {
        setMsg({ msg: "Passwords do not match", state: "error" });
        setIsloading(false)
        return;
      }

      const data = islogin ? await loginUser(item).unwrap() : await register(item).unwrap();

      if (data.ok === true) {
        setMsg({ msg: `${islogin ? "Login successful! Redirecting..." : "Registration successful! Please verify your account."}`, state: "success" });
        await login(data.token);
        if (islogin) {
          dispatch(setCredentials({ ...data }))
          navigation.navigate("Home");
          setIsloading(false)
        } else {
          setStep(2);
          setIslogin(false);

        }
        // setTimeout(() => {
        //   if (islogin) {
        //     navigation.navigate("admin");
        //     setIsloading(false)
        //   } else {
        //     setStep(2);
        //     setIslogin(false);

        //   }
        // }, 2000);

      } else {
        if (data === "Kindly activate your account to continue") {
          setStep(2);
          setIslogin(false);
        }

        setMsg({ msg: data.message || data, state: "" });
        setIsloading(false)
      }

    } catch (error) {
      console.error(error);
      setMsg({ msg: "An error occurred. Please try again.", state: "error" });
      setIsloading(false)
    } finally {
      setIsloading(false)
    }
  };
  const handleVerification = async (e: React.FormEvent) => {
    try {
      setIsloading(true)
      if (e?.preventDefault) e.preventDefault();
      setMsg({ msg: "", state: "" });
      if (!item.otp) {
        setMsg({ msg: "Enter the OTP sent on", state: "error" });
        setIsloading(false)
        return;
      }
      item.code = item.otp
      const response = await fetch(`${API_URL}/api/auth/activate-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      });

      const data = await response.json();
      if (data.ok === true) {
        setMsg({ msg: "Account activated successfully! Redirecting...", state: "success" });
        setTimeout(() => {
          setStep(1)
          setIslogin(true)
          setIsloading(false)
        }, 2000);
      } else {
        setMsg({ msg: data.message || data, state: "error" });
        setIsloading(false)
      }

    } catch (error) {
      console.log(error)
      setMsg({ msg: "Enter the OTP sent on ", state: "error" });
      setIsloading(false)

    } finally {
      setIsloading(false)
    }
  };
  return (
    <KeyboardAvoidingView className=" bg-primary-800"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >

      {logingin && <FormLoader />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center  items-center bg-black-50 px-6">
            <View className="flex-1 items-center justify-center">

              <Image
                className="w-60 h-60"
                source={require('./../assets/logo-1.png')}
                resizeMode="cover"
              />
            </View>
            {msg.msg && <Toast msg={msg.msg} state={msg.state} />}
            {step === 1 && <RegisterLogin
              item={item}
              handleChange={handleChange}
              handleLogin={handleSubmit}
              setIslogin={setIslogin}
              hide={hide}
              setHide={setHide}
              setHideConfirm={setHideConfirm}
              hideconfirm={hideconfirm}
              islogin={islogin}
            />}
            {step === 2 && <OtpView
              item={item}
              handleChange={handleChange}
              handleLogin={handleVerification}
              setIslogin={setIslogin}
              hide={hide}
              setHide={setHide}
              setHideConfirm={setHideConfirm}
              hideconfirm={hideconfirm}
              islogin={islogin}
            />}

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
