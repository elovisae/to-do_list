import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Stacks/Home";
import Add from "./Stacks/Add";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Add" component={Add}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
  
}

