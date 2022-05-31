import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'


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
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <View style={styles.wrapper}>
                        <Text style={styles.secondTitle}>Ingredients:</Text>
                        {steps.map((step) => {
                            return(
                            step.ingredients.map((ingredient) => {
                                return (<Text style={styles.bodyText}>- {ingredient.name}</Text>)
                            })
                            )
                        })}
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.secondTitle}>Steps:</Text>
                        {steps.map((step) => {
                            
                            return(
                                <View style={styles.stepWrapper}> 
                                    <Text style={styles.bodyText}>{step.number}.  {step.step}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: 'white', 
    
    },
    wrapper: {
        marginTop: 5,
        marginBottom: 15,
    },
    stepWrapper: {
        margin: 5
    },
    title: {
        fontSize: 35,
    },
    secondTitle: {
        fontSize: 20
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 20,
    }
})
export default Recipe;