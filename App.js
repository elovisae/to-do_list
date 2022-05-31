import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Stacks/Home";
import Recipe from "./Stacks/Recipe"
import Recipes from "./Stacks/Recipes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          
        },
        headerTintColor: 'black',
        
      }}
      initialRouteName='Home'
      >
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Recipes" component={Recipes}/>
        <Stack.Screen name="Recipe" component={Recipe}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
  
}

