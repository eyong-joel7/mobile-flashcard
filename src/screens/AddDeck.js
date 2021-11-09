import React, { Component } from "react";
import { Text,StatusBar, StyleSheet, View } from "react-native";
import { saveDeckTitle } from "../utils/api";
import { black, white } from "../utils/color";
import InputText from "../components/InputText";
import TouchableBtn from "../components/TouchableBtn";

export default class AddDeck extends Component {
  state = {
    title: "",
  };
  handleTextChange = (value) => {
    this.setState(() => ({
      title: value,
    }));
  };

  submit = () => {
    const { title } = this.state;
    if(title!==''){
        saveDeckTitle(title.trim());
        this.setState({
            title:''
        }, this.toDeckDetail())
    }
}
toDeckDetail= () => this.props.navigation.navigate('Deck Details', {deckTitle:this.state.title});
  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            {" "}
            What is the title of your new deck?{" "}
          </Text>
        </View>
        <InputText
          placeholder="Deck Title"
          handleTextChange={this.handleTextChange}
          inputValue={title}
        />
        <TouchableBtn bgColor={black} color={white} onPress = {this.submit}>
          Create Deck
        </TouchableBtn>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },
});
