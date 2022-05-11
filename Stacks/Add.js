import {View, Text, Button, SectionList, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Add() {
    // const GridList = ({data}) => {
  
    // }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add a task</Text>
        <StatusBar style="auto" />
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
    }
  });