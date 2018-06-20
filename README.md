# Memory Card Game

Please run `npm install` and `npm run dev` to spin up the game at `localhost:3000`.

### Implementation Decisions: ###
* Game fits mobile screen sizes.
* I did not download the `cards.json` file directly as I wanted to leave the cards flexible. Instead, I used `fetch()` to get the data so that if there were a change to the deck of cards, I'd get that update as soon as my app starts.
    * Cards are shuffled each time they are fetched using the Fisher-Yates Shuffle ([https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array))
* I separated state management into 2 places:
    * `Game` manages the _view_ of the app: (1) initial (choose card color), (2) choose difficulty, and (3) play
    * `Board` manages the _game play_: number of matches, is game finished yet, etc.

### _Note:_ ###
Usually I use [this setup](https://github.com/siuangie91/react_webpack/tree/with_sass/); however, I wanted to take this opportunity to familiarize myself with the NYT code base.

