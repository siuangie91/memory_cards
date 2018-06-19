# Memory Card Game

Solution to [https://github.com/nytm/games-web-code-test](https://github.com/nytm/games-web-code-test)

* Note: *
This is my first time using Sass + CSS modules. I apologize in advance if the modules are not handled as efficiently as they should be ideally. For example, I had some trouble making my Sass variables global in the framework of the modules, so for the Card component, which is rendered by Board, I put the Sass in Board.scss instead of Card.scss. I will look further into CSS Modules. (I am more familiar with and usually use this type of setup, where the Sass is managed in its own folder: [https://github.com/siuangie91/react_webpack/tree/with_sass/](https://github.com/siuangie91/react_webpack/tree/with_sass/))

I also did not download the `cards.json` file directly as I wanted to leave the cards flexible -- if there were a change to the deck of cards, I'd get that update as soon as my app starts. I used 'fetch()' to get the data.