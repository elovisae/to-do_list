import {View, Text, Button, SectionList, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import Recipes from '../components/Recipes';

export default function Home({navigation}) {
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState([]);
  //  useEffect(() => {
  //    setLoading(true)
  //    getAllRecipes()
            
  //  }, [])
  //https://api.spoonacular.com/recipes/4632/summary?apiKey=${apiKey}
   const getAllRecipes = async () => {
       let apiKey = 'f1d88e51854b4e9a98cde83deb557347';
       try{
           let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?type=pasta&apiKey=${apiKey}`)
           console.log(response.statusText)
           let recipes   = await response.json();
           let recipeArray = recipes.results
           setRecipes(recipeArray)
           console.log(recipes)
          
      

       }catch(error){
           console.log('Error:' + error)
    }finally{
      setLoading(false)
    }
    }
  
        
  //   }
    // const dummyData = {
    //   number:4,
    //   results: [
    //     {
    //       id: 1,
    //       title: 'Garlic pasta',
    //       calories: 500,
    //     },
    //     {
    //       id: 2,
    //       title: 'Mushroom pasta',
    //       calories: 500,
    //     },
    //     {
    //       id: 3,
    //       title: 'Salsiccia pasta',
    //       calories: 500,
    //     },
    //     {
    //       id: 4,
    //       title: 'Carbonara',
    //       calories: 500,
    //     },
    //   ]
    // }
    // console.log(dummyData)
    // useEffect(() => {
    //   setRecipes(dummyData.results)
    // }, [])
    
    if (loading){
      return (
        <View style={styles.container}>
        <Text style={styles.title}>RECIPES TO TRY:</Text>
        <Text>No recipes rendered</Text>
        <Button title="Click me!" onPress={() => {
          setLoading(true)
          getAllRecipes()
          }}/>
        <StatusBar style="auto" />
        <Button
        title="Add a task"
        onPress={() => navigation.navigate('Add')}
        />
      </View>
      )
    }else{  
      return (
        <View style={styles.container}>
          <Text style={styles.title}>RECIPES TO TRY:</Text>
          <Text>Rendered</Text>
          <View style={styles.recipeContainer}>
          {recipes.map((recipe) => {
              console.log(recipe.title)
              recipe.key = recipe.id
              return(
                <View style={styles.recipeItem}>
                  <Text>{recipe.title}</Text>
                  <Button title="Done"/>
                </View>
  
              )
            }
          
          )}
          </View>
          <StatusBar style="auto" />
      </View>
        
      )
    }
       
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
    },
    recipeContainer: {
      display: 'flex',
      flexDirection:'column',
      width: '100%',
    },
    recipeItem:{
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'space-around',

    }
  });