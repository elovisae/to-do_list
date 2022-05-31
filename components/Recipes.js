import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Button, ScrollView} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import TriedRecipes from '../components/TriedRecipes'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Recipes = ({route, navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('Recipes');
  const [triedTitles, setTriedTitles] = useState([])

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
      const titlesFromStorage = [];
      data.map((item) => {
        let title = item[0]
        titlesFromStorage.push(title)
      })
      setTriedTitles(titlesFromStorage)
      
    } catch (error) {
      console.log(error)
    }
  }
  const setItem = async (title) => {
    console.log(title)
    try {
      await AsyncStorage.setItem(title, title)
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {/* <Text>Rendered</Text> */}
      <View style={styles.recipeContainer}>
      {recipes.map((recipe) => {
        // console.log(recipe.title)
        if(recipe.title.length > 20){
          let text = recipe.title.substring(0, 20)
          text += '(...)';
          
          return(
            <View style={styles.recipeItem}>
                <Text>{text}</Text>
                <Button 
                  title="More info" 
                  onPress={() => {
                    navigation.navigate('Recipe', {
                      itemId: recipe.id
                    })
                  }}
                  />
                <Button 
                  title="Done"
                  onPress={() => {
                    setItem(recipe.title)
                    getAllData()
                    }}
                  />
              </View>


            )
        }else{
          return(
            <View style={styles.recipeItem}>
                <Text>{recipe.title}</Text>
                <Button 
                  title="More info" 
                  onPress={() => {
                    navigation.navigate('Recipe', {
                      itemId: recipe.id
                    })
                  }}
                  />
                <Button 
                  title="Done" 
                  onPress={() => {
                    setItem(recipe.title)
                    getAllData()
                    }}/>
              </View>
              

            )
        }
        }
      
      )}
      </View>
      <View> 
          <Text style={styles.title}>TRIED RECIPES</Text>
          {triedTitles.map((title) => {
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
  </ScrollView>
  )
}

export default Recipes;

const styles = StyleSheet.create({
  container: {
    padding:20,
    paddingTop: 60,
    paddingBottom: 100,
    flex: 1,
    backgroundColor: 'white', //#F67AD4
    // alignItems: 'center',
  
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
  }
});