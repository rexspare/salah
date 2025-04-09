import { ScrollView, StyleSheet, View, SafeAreaView, useColorScheme, Platform, StatusBar } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { PlayerOption } from '@/components/PlayerOption';
export default function HomeScreen() {
  const colorScheme = useColorScheme() || 'light';
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background}]}>
      <ThemedView>
        <View style={styles.mainTitle}>
          <ThemedText type='title'  >
            Salah Dua & Dhikr
          </ThemedText>
          </View>
          <ScrollView style={styles.mainCont}>
            <View style={{ paddingBottom: 75 }}>
              <PlayerOption img='image1.png' backgroundColor='#B5DEE0' title='Before salah' subtitle='Talk about things like wudhu'/>
              <PlayerOption img='image2.png' backgroundColor='#F9E7DB' title='How to pray' subtitle='Step by step on how to pray'/>
              <PlayerOption img='image3.png' backgroundColor='#EDDA8E' title='After salah' subtitle='Adhkar after salah'/>
              <PlayerOption img='image4.png' backgroundColor='#FFF1B8' title='Virtues of salah' subtitle='hadith and verses on virtues of salah'/>
              <PlayerOption img='image5.png' backgroundColor='#E9F8FF' title='Duas' subtitle='Duas people can read after salah'/>
            </View>
          </ScrollView>
        
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTitle: {
    paddingHorizontal:16,
    paddingTop:12,
    marginBottom: 23,
    textAlign:'center',
    alignItems:'center',
  },
  mainCont: {
    paddingHorizontal:16,
    paddingTop: 0,
    paddingBottom:300
  }
});
