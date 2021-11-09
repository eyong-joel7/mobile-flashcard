import React, { Component } from "react";
import { Text, StatusBar, StyleSheet, View, Platform } from "react-native";
import { black, pink, green, orange, red, white } from "../utils/color";
import DeckCard from "../components/DeckCard";
import TouchableBtn from "../components/TouchableBtn";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "../components/TextButton";
import {
  clearLocalNotification,
  createPushNotification,
  schedulePushNotification,
} from "../utils/helpers";

function Completed(props) {
  return (
    <View style={styles.center}>
      <Text></Text>
      <Text style={{ color: orange, fontSize: 18, textAlign: "center" }}>
        You scored
      </Text>
      <Text style={{ color: pink, fontSize: 32, textAlign: "center" }}>
        {Math.round(props.score)}%
      </Text>
      <TextButton style={{ fontSize: 18, padding: 10 }} onPress={props.reset}>
        Restart Quiz
      </TextButton>
      <TextButton style={{ fontSize: 18, padding: 10 }} onPress={props.goBack}>
        Back to Deck
      </TextButton>
    </View>
  );
}
function EmptyDesk(props) {
  return (
    <View style={styles.center}>
      <Ionicons name="sad" size={100} />
      <Text style={{ color: red, fontSize: 18, textAlign: "center" }}>
        Opps! It seems you haven't created any card for this desk
      </Text>
      <TextButton style={{ fontSize: 18, padding: 10 }} onPress={props.goBack}>
        Go Back
      </TextButton>
    </View>
  );
}

export default class QuizView extends Component {
  state = {
    numQuestions: 0,
    questions: [],
    taskCount: 0,
    toggled: false,
    score: 0,
  };

  componentDidMount() {
    const { deck } = this.props.route.params;
    const { questions } = deck;
    const numQuestions = questions.length;
    this.setState(() => ({
      questions,
      numQuestions,
    }));
  }
  goBack = () => this.props.navigation.goBack();
  reset = () => this.setState(() => ({ taskCount: 0 }));
  responseHandler = (response) => {
    const { taskCount, numQuestions } = this.state;
    const score =
      response === "correct" ? this.state.score + 1 : this.state.score;
    if (taskCount < numQuestions) {
      this.setState((state) => ({
        taskCount: state.taskCount + 1,
        score,
      }));
    }
  };

  render() {
    const { questions, numQuestions, taskCount, toggled, score } = this.state;
    if (numQuestions < 1) return <EmptyDesk goBack={this.goBack} />;
    if (numQuestions === taskCount) {
      clearLocalNotification().then(createPushNotification());
      return (
        <Completed
          goBack={this.goBack}
          reset={this.reset}
          score={(score / numQuestions) * 100}
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.count}>
          <Text style={styles.left}>{`${
            numQuestions - taskCount
          }/${numQuestions}`}</Text>
        </View>
        <DeckCard
          subTitle={toggled ? "Show Question" : "Show Answer"}
          textColor={red}
          onPress={() => this.setState(() => ({ toggled: !toggled }))}
        >
          {toggled
            ? questions[taskCount].answer
            : questions[taskCount].question}
        </DeckCard>
        <View style={{ marginTop: 50 }}>
          <TouchableBtn
            onPress={() => this.responseHandler("correct")}
            bgColor={green}
            color={white}
            borderColor={"transparent"}
          >
            Corect
          </TouchableBtn>
          <TouchableBtn
            onPress={() => this.responseHandler("incorrect")}
            bgColor={red}
            color={white}
            borderColor={"transparent"}
          >
            Incorrect
          </TouchableBtn>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 20,
  },
  count: {
    alignSelf: "flex-start",
    marginBottom: 50,
  },
  left: {
    color: black,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
});
