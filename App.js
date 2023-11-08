
import "react-native-gesture-handler";
import {
  SafeAreaView,
  StyleSheet,
} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MainScreen from "./screen/main";
import ProductScreen from "./screen/product";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Stack = createNativeStackNavigator();

export default function App() {
 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
   <SafeAreaView style={styles.safeAreaView}>
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName="main">
<Stack.Screen
name="Main"
component={MainScreen} options={{
  title:"홈 화면"
}}/>

<Stack.Screen
name="Product"
component={ProductScreen} options={{
  title:"상품 화면"
}}/>

    </Stack.Navigator>
    </NavigationContainer>
   
   </SafeAreaView>
   </GestureHandlerRootView>
  );

}

const styles = StyleSheet.create({
 
  safeAreaView:{
    flex:1,
    backgroundColor:"#fff",
  },
});
