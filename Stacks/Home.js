import {View, Text, Button, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';


export default function Home({navigation}) {
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle]     = useState('Recipes')
  
  //https://api.spoonacular.com/recipes/4632/summary?apiKey=${apiKey}
   const getAllRecipes = async () => {
      setRecipes([]) 
       let apiKey = 'f1d88e51854b4e9a98cde83deb557347';
       try{
          let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=${apiKey}`)
          let data   = await response.json();
          let result = data.results
          setRecipes(result) 
          setTitle('All recipes')     
          setLoading(false)

       }catch(error){
           console.log('Error:' + error)
      }
    }
    
    const getFilteredRecipes = async (diet) => {
      setRecipes([]) 
      let apiKey = 'f1d88e51854b4e9a98cde83deb557347';
      try{
        let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&diet=${diet}&apiKey=${apiKey}`)
        let data   = await response.json();
        let result = data.results
        setRecipes(result)
        setTitle('Vegeterian recipes')   
        setLoading(false)
          

    }catch(error){
        console.log('Error:' + error)
   }
    }
        
      return (
        <View style={styles.container}>
        <Text style={styles.title}>RECIPES:</Text>
        <View style={styles.button}>
          <Button 
            title="All pasta recipes!"
            color='black' 
            onPress={() => {
              if(loading){
                getAllRecipes()
              }else{
                setLoading(true)
                navigation.navigate('Recipes', {recipes: recipes, title: title})
                
              }
            
            
            }}/>
        </View>
        <View style={styles.button}>
          
          <Button 
            title="Vegetarian recipes"
            color='black' 
            onPress={() => {
              if(loading){
                getFilteredRecipes('vegetarian')
              }else{
                navigation.navigate('Recipes', {recipes: recipes, title: title})
              }
            
            
            }}/> 
        </View>
        <StatusBar style="auto" />
      </View>
      )
    
       
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
    }
  });