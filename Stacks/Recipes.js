import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Recipes = ({route, navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('Recipes');
  const [thisMonthTitles, setThisMonthTitles] = useState([])
  const [doneTitles, setDoneTitles] = useState([])

  useEffect(() => {
    
    setRecipes(route.params.recipes)
    setTitle(route.params.title)
    getAllData()
  }, [])
  
  const getAllData = async () => {
    try {
      //Is working
      const keys = await AsyncStorage.getAllKeys()
      const data  = await AsyncStorage.multiGet(keys)
      console.log(data)
      const thisMonthTitles = [];
      const doneTitles = [];
      data.map((item) => {
        let validator = item[1]
        let title = item[0]
        if(validator === 'done'){
          doneTitles.push(title)
        }else{
          thisMonthTitles.push(title)
        }
      })
      setDoneTitles(doneTitles);
      setThisMonthTitles(thisMonthTitles);
      
    } catch (error) {
      console.log(error)
    }
  }
  const setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
      console.log('data saved')
    } catch (error) {
      console.log(error)
    }
  }
  
  const deleteAllData = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys()
      await AsyncStorage.multiRemove(keys)
      console.log('Data removed')
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

  
  

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={styles.container}>

      <Text style={styles.title}>{title}</Text>
      <View style={styles.recipeContainer}>
      {recipes.map((recipe) => {
        if(recipe.title.length > 20){
          recipe.title = recipe.title.substring(0, 20)
          recipe.title += '...';
        }
          return(
            <View style={styles.recipeItem}>
                <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Recipe', {
                    itemId: recipe.id
                  })
                }}
                >
                  <Text>{recipe.title}</Text>
                </TouchableOpacity>
                <Button 
                  title="This month"
                  onPress={() => {
                    setItem(recipe.title, 'thisMonth')
                    getAllData()
                  }}
                  />
              </View>
          )
      })}
      </View>
      <View>
        <Text style={styles.title}>Recipes to try this month:</Text>
        
        {thisMonthTitles.map((title) => {
          if(title.length > 20){
            title = title.substring(0, 20)
            title += '...'
          }
          return (
            <View style={styles.recipeItem}>
              <View style={styles.recipeTitleContainer}>
                <Text>{title}</Text>
              </View>
                <Button 
                title='Reset'
                onPress={() => {
                  console.log(title)
                  deleteItem(title)
                }}
                />
                <Button 
                title='Done'
                onPress={() => {
                  setItem(title, 'done')
                  getAllData()
                }}
                />
              </View>
            )
          })}

      </View>
      <View> 
          <Text style={styles.title}>Has been done</Text>
          {doneTitles.map((title) => {
            return (
              <View style={styles.recipeItem}>
                <Text>{title}</Text>
                <Button 
                title='Reset'
                onPress={() => {
                  console.log(title)
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
      <StatusBar style="auto" /> 
    <View style={styles.paddingView}></View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default Recipes;

const styles = StyleSheet.create({
  container: {
    padding:20,
    paddingTop: 60,
    flex: 1,
    backgroundColor: 'white', //#F67AD4
    // alignItems: 'center',
    height:1000
  
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
  paddingView:{
    padding: 50,
  },
  recipeTitleContainer: {
    width:'50%'
  }
});