# Memory Card Game

Solution to [https://github.com/nytm/games-web-code-test](https://github.com/nytm/games-web-code-test)

### Implementation Decisions: ###
* Game fits mobile screen sizes.
* I did not download the `cards.json` file directly as I wanted to leave the cards flexible. Instead, I used `fetch()` to get the data so that if there were a change to the deck of cards, I'd get that update as soon as my app starts.
* I separated state management into 2 places:
    * `Game` manages the _view_ of the app: (1) initial and (2) play
    * `Board` manages the _game play_: number of matches, is game finished yet, etc.

### _Note:_ ###
This is my first time using Sass + CSS modules. I apologize in advance if the modules are not handled as efficiently as they should be ideally. For example, I had some trouble inheriting styles in the framework of the modules, so for the `Card` component, which is rendered by `Board`, I `@import`ed styles from `Board.scss` in `Card.scss`. I will look further into CSS Modules. (I am more familiar with and usually use this type of setup, where the Sass is managed in its own folder: [https://github.com/siuangie91/react_webpack/tree/with_sass/](https://github.com/siuangie91/react_webpack/tree/with_sass/)) Despite not being familiar with CSS modules, I thought I would take this opportunity to familiarize myself with the NYT code base.

