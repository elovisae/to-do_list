import {View, Text, Button, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home (props) {
  const [titles, setTitles] = useState([])
  useEffect(() => {
    setItem(props.title)
    getAllData()
  }, [])

  const getAllData = async () => {
    try {
      //Is working
      const keys = await AsyncStorage.getAllKeys()
      const data  = await AsyncStorage.multiGet(keys)
      const titlesFromStorage = [];
      data.map((item) => {
        let title = item[0]
        titlesFromStorage.push(title)
      })
      setTitles(titlesFromStorage)
      
    } catch (error) {
      console.log(error)
    }
  }
  const setItem = async (title) => {
    try {
      await AsyncStorage.setItem(title, title)
    } catch (error) {
      console.log(error)
    }
  }
  
  const deleteAllData = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys()
      await AsyncStorage.multiRemove(keys)
      getAllData()
    } catch (error) {
      console.log(error)
    }
  }
  const deleteItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
      getAllData()
    } catch (error) {
      console.log(error)
    }
  }
  
     


    if(titles.length === 0){
      return(
        <View>
          <Text style={styles.title}>TRIED RECIPES</Text>
          <Text>No recipes tried before</Text>
        </View>
      ) 
    }else{
      return (
        <View> 
          <Text style={styles.title}>TRIED RECIPES</Text>
          {titles.map((title) => {
            return (
              <View style={styles.recipeItem}>
                <Text>{title}</Text>
                <Button 
                title='Reset'
                onPress={() => {
                  deleteItem(title)
                }}
                />
              </View>
            )
          })}
          <Button
          title="Clear history"
          onPress={() => deleteAllData()}
          />
        </View>
      )
    }
    
       
  }
  
  const styles = StyleSheet.create({
    container: {
      padding:20,
      paddingTop: 60,
      flex: 1,
      backgroundColor: 'white', //#F67AD4
      alignItems: 'center',
    },
    title: {
      fontSize: 40,
    },
    subTitle: {
      fontSize: 30,
    },
    listItem: {
      fontSize: 16
    },
    recipeContainer: {
      display: 'flex',
      flexDirection:'column',
      width: '100%',
    },
    recipeItem:{
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'space-between',
    },
    button:{
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      color: 'black',
      marginTop:10
    },
    flex: {
      display: 'flex',
      justifyContent: 'space-around'
    }
  });