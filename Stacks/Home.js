import {View, Text, Button, SectionList, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Home({navigation}) {
   
    
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>THINGS TO DO:</Text>
        <StatusBar style="auto" />
        <Button
        title="Add a task"
        onPress={() => navigation.navigate('Add')}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 60,
      flex: 1,
      backgroundColor: '#F67AD4',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 40,
    },
    subTitle: {
      fontSize: 30,
    },
    listItem: {
      fontSize: 16
    }
  });