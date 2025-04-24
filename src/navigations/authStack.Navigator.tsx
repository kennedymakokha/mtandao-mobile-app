import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { authStackParamList, clientStackParamList } from "../../types";
import ClientDashboard from "../screens/vendor/business/businessDeatilpage";
import OnboardingScreen from "../screens/onBoardingScreen";
import LoginScreen from "../screens/login";
import { RootDrawer } from "./drawer";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator<authStackParamList>();

export function RootStack(firstTime: any) {
  const { token } = useAuth();
  return (
    <Stack.Navigator screenOptions={{
      headerTransparent: true,
      headerShadowVisible: false,
    }}>
      {/* <Stack.Screen options={{ headerShown: false }} name="Onboarding" component={OnboardingScreen} /> */}
      {token ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Root"
          component={RootDrawer}
        />
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={firstTime ? OnboardingScreen : LoginScreen}
        />
      )}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Auth"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={RootDrawer}
      />



    </Stack.Navigator>
  );
}



