import { hp, wp } from "@/helpers/common";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn } from "react-native-reanimated";
import { THEME } from "@/constants/theme";
import { useRouter } from "expo-router";

export default function Page() {

  const router = useRouter()
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require('../assets/images/welcome.png')}
        style={styles.bg_image}
        resizeMode="cover"
      />

      {/*linear gradient*/}
      <Animated.View
        entering={FadeIn.duration(500)}
        style={{ flex: 1, }}>
        <LinearGradient
          colors={['#ffffff00', '#ffffff80', 'white', 'white']}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />

        {/*Content*/}
        <View style={styles.content_container}>
          <Animated.Text entering={FadeIn.delay(400).springify()} style={styles.title}>Pixels</Animated.Text>
          <Animated.Text entering={FadeIn.delay(600).springify()} style={styles.punchline}>Every Pixel tells a story</Animated.Text>

          <Animated.View entering={FadeIn.delay(800).springify()}>
            <Pressable style={styles.start_button} onPress={() => router.push('/home')}>
              <Text style={styles.start_text}>Start Explore</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg_image: {
    width: wp(100),
    height: hp(100),
    position: 'absolute',
  },
  gradient: {
    width: wp(100),
    height: hp(65),
    position: 'absolute',
    bottom: 0,
  },
  content_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 14,
  },
  title: {
    fontSize: hp(4),
    color: THEME.colors.neutral(0.9),
    fontWeight: THEME.fontWeights.bold,

  },
  punchline: {
    fontSize : hp(2),
    marginBottom:10,
    fontWeight : THEME.fontWeights.medium,
    letterSpacing:1,
  },
  start_button: {
    marginBottom:50,
    backgroundColor:THEME.colors.neutral(0.9),
    padding:15,
    paddingHorizontal:90,
    borderRadius:THEME.radius.xl,
    borderCurve : 'continuous',
  },
  start_text: {
    color : THEME.colors.white,
    fontSize:hp(3),
    fontWeight:THEME.fontWeights.medium,
    letterSpacing:1,
  },

});
