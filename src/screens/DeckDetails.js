import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { getDeck, removeDeck } from "../utils/api";
import { black, lightPurp, white } from "../utils/color";
import DeckCard from "../components/DeckCard";
import TextButton from "../components/TextButton";
import TouchableBtn from "../components/TouchableBtn";

export default class DeckDetails extends Component {
  state = {
    deck: {},
  };

  componentDidMount() {
    const { deckTitle } = this.props.route.params;
    this.props.navigation.setOptions({
      title: deckTitle,
    });
    this.focusLister = this.props.navigation.addListener("focus", () =>
      getDeck(deckTitle).then((deck) => this.setState(() => ({ deck })))
    );
  }

  componentWillUnmount() {
    if (this.focusLister != null && this.focusLister.remove) {
      this.focusLister.remove();
    }
  }

  goBack = () => this.props.navigation.goBack();
  deleteDeck = () => {
    const { deckTitle } = this.props.route.params;
    removeDeck(deckTitle).then(() => this.goBack());
  };

  render() {
    const { deckTitle } = this.props.route.params;
    const { deck } = this.state;
    const numCards = deck?.questions? deck.questions.length : 0;

    return (
      <View style={styles.container}>
        <DeckCard subTitle={`${numCards} Card(s)`}>{deckTitle}</DeckCard>
        <View style={styles.center}>
          <TouchableBtn
            onPress={() =>
              this.props.navigation.navigate("Add Card", { deckTitle })
            }
            bgColor={white}
            color={black}
          >
            Add Card
          </TouchableBtn>
          <TouchableBtn
            onPress={() =>
              this.props.navigation.navigate("Start Quiz", { deckTitle, deck })
            }
            bgColor={black}
            color={white}
          >
            Start Quiz
          </TouchableBtn>
          <TextButton
            onPress={this.deleteDeck}
            textColor={lightPurp}
            style={{ fontSize: 18, marginTop: 20 }}
          >
            Delete Deck
          </TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  center: {
    alignItems: "center",
  },
});
