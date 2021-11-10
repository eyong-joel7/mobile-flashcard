import React, { Component } from "react";

import {
  FlatList,
  StatusBar,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import { gray, red } from "../utils/color";
import DeckCard from "../components/DeckCard";
import { getAllDecks } from "../utils/api";
import { Ionicons } from "@expo/vector-icons";
function EmptyDesk() {
  return (
    <View style={styles.center}>
      <Ionicons name="sad" size={100} />
      <Text style={{ color: red, fontSize: 21, textAlign: "center" }}>
        Ops! Your Desk is Empty
      </Text>
    </View>
  );
}
export default class DeckList extends Component {
  state = {
    selectedDeck: null,
    decks: null,
    opacityValue: new Animated.Value(1),
  };
  componentDidMount() {
    this.focusLister = this.props.navigation.addListener("focus", () =>
      getAllDecks().then(
        (result) =>
          result != null &&
          this.setState(() => ({
            decks: result,
          }))
      )
    );
  }
  componentWillUnmount() {
    if (this.focusLister != null && this.focusLister.remove) {
      this.focusLister.remove();
    }
  }

  handlePress = (deckTitle) => {
    const { opacityValue } = this.state;
    Animated.sequence([
      Animated.timing(opacityValue, {
        duration: 200,
        toValue: 0.5,
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        duration: 200,
        toValue: 1,
        useNativeDriver: false,
      })
    ]).start()
    // Animated.timing(opacityValue, {
    //   duration: 200,
    //   toValue: 0.5,
    //   useNativeDriver: false,
    // }).start()

    this.setState(
      () => ({ selectedDeck: deckTitle }),
      () =>
        this.props.navigation.navigate("Deck Details", {
          deckTitle: this.state.selectedDeck,
        })
    );
  };
  renderItem = ({ item }) => (
    <View style={([styles.items])}>
    <Animated.View style = {{opacity:this.state.opacityValue}}>
      <DeckCard
        onPress={() => this.handlePress(item.title)}
        subTitle={`${item.questions.length} Cards`}
      >
        {item.title}
      </DeckCard>
      </Animated.View>
    </View>
  );
  listData = () => {
    let dataArr = [];
    const { decks } = this.state;
    for (const key in decks) {
      if (Object.hasOwnProperty.call(decks, key)) {
        const deck = decks[key];
        dataArr.push(deck);
      }
    }
    return dataArr;
  };

  render() {
    if (!this.state.decks) return <EmptyDesk />;
    const dataList = this.listData();
    const { selectedDeck } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={dataList}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
          extraData={selectedDeck}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  items: {
    padding: 20,
    marginVertical: 10,
    borderBottomWidth: 2,
    borderColor: gray,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
});
