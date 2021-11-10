import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import AddDeck from "./src/screens/AddDeck";
import AddQuestion from "./src/screens/AddQuestion";
import DeckDetails from "./src/screens/DeckDetails";
import DeckList from "./src/screens/DeckList";
import QuizView from "./src/screens/QuizView";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { lightPurp, purple, white } from "./src/utils/color";
import { createPushNotification } from "./src/utils/helpers";

function Tabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: purple,
      }}
    >
      <Tab.Screen
        name="Decks"
        component={DeckList}
        options={{
          tabBarLabel: "Decks",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-books" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Deck"
        component={AddDeck}
        options={{
          tabBarLabel: "Add Deck",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-box" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default class App extends Component {

  componentDidMount(){
    createPushNotification();
  }
  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Deck Details" component={DeckDetails} />
          <Stack.Screen
            name="Start Quiz"
            component={QuizView}
            options={{
              title: "Quiz",
              headerStyle: {
                backgroundColor: lightPurp,
              },
              headerTintColor: white,
              headerTitleStyle: {},
            }}
          />
          <Stack.Screen name="Add Card" component={AddQuestion} />
        </Stack.Navigator>
      </NavigationContainer>
 
 );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
