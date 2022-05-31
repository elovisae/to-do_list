import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'


const Recipe = ({route, navigation}) => {
    let itemId = route.params.itemId

    const [recipe, setRecipe]   = useState({});
    const [loading, setLoading] = useState(true)
    const [steps, setSteps]     = useState([])

    useEffect(() => {
        fetchRecipe()
        
    }, [])

    const fetchRecipe = async () => {
        try {
            let apiKey = 'f1d88e51854b4e9a98cde83deb557347';
    
            let response = await fetch(`https://api.spoonacular.com/recipes/${itemId}/information?apiKey=${apiKey}`)
            let data     = await response.json();
            setRecipe(data)
            setSteps(data.analyzedInstructions[0].steps)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
        }
    }
    if (loading){
        return (
            <Text>Loading your recipe</Text>
        )
    }else{
        return (
            <ScrollView>
                <Text style={styles.title}>{recipe.title}</Text>
                {steps.map((step) => {
                    return(
                    step.ingredients.map((ingredient) => {
                        return (<Text>{ingredient.name}</Text>)
                    })
                    )
                })}
                {steps.map((step) => {
                    
                    return(
                        <Text>{step.number} {step.step}</Text>
                    )
                })}
            </ScrollView>
        )
    }
}

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
})
export default Recipe;