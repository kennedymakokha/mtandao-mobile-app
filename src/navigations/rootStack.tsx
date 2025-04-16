import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/onBoardingScreen";
import HomeScreen from "../screens/homescreen";

const Stack = createNativeStackNavigator();

export function RootStack(firstTime: any) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {firstTime ? (
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            ) : (
                <Stack.Screen name="Home" component={HomeScreen} />
            )}
        </Stack.Navigator>
    );
}



