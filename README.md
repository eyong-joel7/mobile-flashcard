

This project was bootstrapped with [create-react-native-app], the following highlight the available scripts relevant in in running this project on a development server.

## Available Scripts

In the project directory, you can run:


1. ###   `yarn add or npm i`. This will download and install the packages (dependencies) used in this project

Next run, the following command in order to start the development server.
N/B Yarn is used below the equivalent npm commands will also work e.g yarn ios  = npm run ios. 

2. ## `yarn ios (expo run:ios)` Build the iOS version of the App (requires a MacOS computer)
3. ## `yarn android (expo run:android)` Build the Android version of the App - the app will run on an connected Android devive or an emulator
4. ## `yarn web (expo start --web)` Run the website in your browser.



## source (src) Folder Structure

1. Component
     
    
     ├── DeckCard.js - A simple View - reusable View describing a head title and 
     subtitle of the main view or pages. Used by the Add Question, AddDeck and DeckDetails views
     ├── InputText.js - A simple  resuable file describing a form Input
   
     ├── TextButton.js - A simple and reusable component describing presenting a clicking text view.
     ├── TouchableBtn.js - A reusable Button component created with TouchableOpacity element use to dynamically create all the buttons used our views.

2. screens
      ├── AddDeck.js - This file represent the view and logic to create and  
          add a New Deck to the database.
      ├── Add Question.js This is the file describing the Interface to create
          and add a new Card to a particular Deck
      ├── DeckList.js - This file describe a list of all the Decks in the database
      ├── QuizView.js - This file contains logic and UI for taking a quiz on a particular Deck.
      ├── DeckDetails.js - This view give full details of a particular Deck as well as options to start Quiz and to add new Cards to the particular deck
3. utils
     ├── api.js - This file contains methods for accessing the database  fetching all decks,
         a deck, creating a deck, add a question to a deck and deleting a deck
     ├── colors.js - Colors used in project are exported from this files
     and add a new Card to a particular Deck 
     ├── helpers.js - Here, helper functions for formatting our datbase before going to the database as well as our notification logic are resident here


## Tested Platforms
   This project has been tested and confirmed to  work any without issues on the foloowing physical devices 9 (no test has been performed on an emulator yet)
1. Xiaomi Redmi Note 7
2. Samsung Galaxy J6
       


## Author 
- [Github](https://github.com/eyong-joel7)
- [JOEL EMOH](https://eyongjoel.netlify.app)