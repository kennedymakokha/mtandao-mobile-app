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
import { authStackParamList } from '../../types';
import { authorizedFetch } from '../utils/authorizedFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';
import { API_URL, SOME_SECRET } from '@env';
import support from './../assets/slides/support.png'
import secure from './../assets/slides/Secure.png'
import sync from './../assets/slides/sync.png'
import genZ from './../assets/slides/genZ.png'
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');

type Slide = {
  id: string;
  title: string;
  image: string | any;
  description: string;
};

const slides: Slide[] =

  [
    {
      id: '1',
      description: "This is an awesome app",
      title: "Real-time notifications",
      image: genZ, // ✅ No quotes, no template string
    },
    {
      id: '2',
      description: "This is an awesome app",
      title: "Secure and private",
      image: secure,
    },
    {
      id: '3',
      description: "This is an awesome app",
      title: "Offline support",
      image: support,
    },
    {
      id: '4',
      description: "This is an awesome app",
      title: "Cross-device sync",
      image: sync,
    },
  ];

const OnboardingScreen = () => {
  const { token } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<Animated.FlatList<Slide>>(null);
  const navigation = useNavigation<NativeStackNavigationProp<authStackParamList>>();
  const { user } = useSelector((state: any) => state.auth)
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
    <View className="w-screen  flex-1 items-center justify-center px-6">
      <Image

        source={item.image}
        className="w-1/2 h-1/2 mb-6"
        resizeMode="contain"
      />
      <Text className="text-3xl font-bold text-center text-secondary-200">{item.title}</Text>
      <Text className="text-lg text-center mt-4 text-slate-200">{item.description}</Text>
    </View>
  );
  useEffect(() => {
    if (user) navigation.navigate('Home');
    
  }, []);
  return (
    <View className="flex-1 bg-primary-600">
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
                backgroundColor: '#ffaa1d',
                opacity: dotOpacity,
              }}
            />
          );
        })}
      </View>


      <View className="absolute bottom-12 w-full items-center">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-secondary-500 px-8 py-3 rounded-full"
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
