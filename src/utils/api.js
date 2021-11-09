import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatCard, formatSaveDeck } from "./helpers";
const DATA_STORAGE_KEY = "DATA_STORAGE_KEY";

export const getAllDecks = async () => {
  try {
    // await AsyncStorage.removeItem(DATA_STORAGE_KEY)
    const dataObj = await AsyncStorage.getItem(DATA_STORAGE_KEY);
    return dataObj != null ? JSON.parse(dataObj) : null;
  } catch (e) {
    console.log("Error", e);
  }
};
export const getDeck = async (id) => {
  try {
    const data = await AsyncStorage.getItem(DATA_STORAGE_KEY);

    const dataObj = data != null ? JSON.parse(data) : null;
    return dataObj != null ? dataObj[id] : null;
  } catch (e) {
    console.log("Error", e);
  }
};
export const saveDeckTitle = async (title) => {
  const formattedTitle = formatSaveDeck(title);
  try {
    await AsyncStorage.mergeItem(
      DATA_STORAGE_KEY,
      JSON.stringify(formattedTitle)
    );
  } catch (e) {
    console.log("Error", e);
  }
};
export const addCardToDeck = async (title, card) => {
    const formattedCard = formatCard(card);
  try {
    const result = await AsyncStorage.getItem(DATA_STORAGE_KEY);
    const data = JSON.parse(result);
    const deck = data[title];
    deck != null ? deck.questions.push(formattedCard) : null;
    if (deck != null) {
      data[title] = deck;
      await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.log("Error", e);
  }
};

export const removeDeck = async (title) => {
  try {
    const result = await AsyncStorage.getItem(DATA_STORAGE_KEY);
    const data = JSON.parse(result);
    data[title] = undefined;
    delete data[title];
    await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.log("Error", e);
  }
};
