import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { authorizedFetch } from '../utils/authorizedFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';
import { API_URL, SOME_SECRET } from '@env';

const { width } = Dimensions.get('window');

type Slide = {
  id: string;
  title: string;
  description: string;
};

const slides: Slide[] = [
  { id: '1', title: 'Welcome', description: 'This is an awesome app.' },
  { id: '2', title: 'Scan QR', description: 'Easily scan QR codes.' },
  { id: '3', title: 'Chat', description: 'Chat in real time with friends.' },
];

const OnboardingScreen = () => {
  const { user, setUser, logout } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<Animated.FlatList<Slide>>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("Auth")
    }
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View className="w-screen flex-1 items-center justify-center px-6">
      <Image
        source={require('../assets/logo-1.png')}
        className="w-1/2 h-1/2 mb-6"
        resizeMode="contain"
      />
      <Text className="text-3xl font-bold text-center text-gray-800">{item.title}</Text>
      <Text className="text-lg text-center mt-4 text-gray-600">{item.description}</Text>
    </View>
  );
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authorizedFetch(`${API_URL}/api/auth`);
        if (res?.userId) {
          setUser(res)
          await AsyncStorage.setItem("userId", res?.userId);
          navigation.navigate('Dashboard');
          console.log("logged in")
          // navigation.navigate('admin');
        } else {
          console.log(" not logged in")
          // navigation.navigate('Dashboard');
        }
      } catch (e) {
        console.error(e);
        // navigation.navigate('Dashboard');
      }
    };
    checkAuth();
  }, []);
  return (
    <View className="flex-1 bg-white">
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Pagination Dots */}
      <View className="flex-row justify-center mb-4">
        {slides.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: dotWidth,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: '#2563EB', // blue-600
                opacity: dotOpacity,
              }}
            />
          );
        })}
      </View>

      {/* Next / Get Started Button */}
      <View className="absolute bottom-12 w-full items-center">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-blue-600 px-8 py-3 rounded-full"
        >
          <Text className="text-white text-base font-semibold">
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
