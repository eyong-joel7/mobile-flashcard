import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { addCardToDeck } from "../utils/api";
import { black, white } from "../utils/color";
import InputText from "../components/InputText";
import TouchableBtn from "../components/TouchableBtn";

export default class AddQuestion extends Component {
  state = {
    question: "",
    answer: "",
  };

  handleQuestionTextChange = (value) => {
    this.setState(() => ({
      question: value,
    }));
  };
  handleAnswerTextChange = (value) => {
    this.setState(() => ({
      answer: value,
    }));
  };
submit = () => {
 const {deckTitle} = this.props.route.params
    const {question, answer} = this.state;
    if(question !=='' && answer!==''){
        addCardToDeck(deckTitle, {question, answer}).then(() => this.setState(() =>({
          question:'',
          answer:'',
      }),() => this.goBack()))
    }
}
goBack= () => this.props.navigation.goBack();
  render() {
      const {question, answer} = this.state;
    return (
      <View style={styles.container}>
        <InputText
          placeholder="Question"
          handleTextChange={this.handleQuestionTextChange}
          inputValue={question}
        />
        <InputText
          placeholder="Answer"
          handleTextChange={this.handleAnswerTextChange}
          inputValue={answer}
        />
        <TouchableBtn bgColor={black} color={white} borderColor={black} onPress = {this.submit}>
          Submit
        </TouchableBtn>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:20,
    alignItems: "center",
    justifyContent: "center",
  },
});
