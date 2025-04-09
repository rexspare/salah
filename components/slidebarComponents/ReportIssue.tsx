import { StyleSheet, View, Text, useColorScheme, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import { useState } from 'react';
import { useGlobalContext } from '@/context/GlobalProvider';
import StandarButton from '../StandarBtn';
export default function ReportIssue() {
  const colorScheme = useColorScheme() || 'light';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const { setSlidebarSelected } = useGlobalContext();
  return (
    <View>
      <Text style={[{ color: Colors[colorScheme].focusColor }, styles.textSelected]}>Settings</Text>
      <ThemedText style={styles.title}>Report an issue</ThemedText>
      <ThemedText style={styles.subtitle}>We appreciate your time and effort for reporting an issue.</ThemedText>
      <TextInput
        style={[styles.optionCont, { backgroundColor: Colors[colorScheme].opacityBtn, borderColor: Colors[colorScheme].borderColor, color: Colors[colorScheme].textColor }]}
        placeholder="Name"
        placeholderTextColor={Colors[colorScheme].placeholderColor}
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={[styles.optionCont, { backgroundColor: Colors[colorScheme].opacityBtn, borderColor: Colors[colorScheme].borderColor, color: Colors[colorScheme].textColor }]}
        placeholder="Email"
        placeholderTextColor={Colors[colorScheme].placeholderColor}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        multiline={true}
        style={[styles.optionCont, styles.textarea, { backgroundColor: Colors[colorScheme].opacityBtn, borderColor: Colors[colorScheme].borderColor, color: Colors[colorScheme].textColor }]}
        placeholder="Describe the issue"
        placeholderTextColor={Colors[colorScheme].placeholderColor}
        onChangeText={setText}
        value={text}
      />
      <StandarButton onPress={()=>setSlidebarSelected('ThanksReport')} style={[styles.submitBtn,{backgroundColor:Colors[colorScheme].focusColor}]}>
        <Text style={styles.btnText}>Submit</Text>
      </StandarButton>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
    lineHeight: 16,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    opacity: .6,
    marginBottom: 8,
  },
  textSelected: {
    fontSize: 12,
    fontWeight: '500',
  },
  optionCont: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginTop: 16,
    borderWidth: 2,
  },
  textarea:{
    height: 145,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlignVertical: 'top',
    paddingVertical:16
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitBtn:{
    marginTop: 16,
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btnText:{
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  }
});
