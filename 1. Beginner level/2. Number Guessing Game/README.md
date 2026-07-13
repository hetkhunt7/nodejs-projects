# Number Guessing Game

A simple CLI-based number guessing game built with pure Node.js. The computer picks a random number between 1 and 100, and you have to guess it within a limited number of attempts based on your chosen difficulty.

## Features

- 3 difficulty levels with different attempt limits
- Greater/less than hints on every wrong guess
- Automatic odd/even hint on your last chance
- Timer showing how long each round took
- High score tracking per difficulty saved to a JSON file
- Play multiple rounds without restarting

## Requirements

- Node.js v14 or higher

## Installation

Clone or download the project, then navigate to the folder:

```bash
cd number-guessing-game
```

## Usage

```bash
node game.js
```

## How to Play

**1. Start the game**

Run the command above. You'll see a welcome message.

**2. Choose a difficulty**

```
Please select the difficulty level:
1. Easy   (10 chances)
2. Medium (5 chances)
3. Hard   (3 chances)

Enter your choice (1/2/3):
```

**3. Guess the number**

The computer picks a number between 1 and 100. Enter your guesses one at a time:

```
Guess (5 chances left): 50
Incorrect! The number is less than 50.

Guess (4 chances left): 25
Incorrect! The number is greater than 25.

Guess (2 chances left): 30
Congratulations! You guessed the correct number in 4 attempts!
Time taken: 12.34 seconds.
```

**4. Hints**

- After every wrong guess → told if the number is **greater** or **less** than your guess
- On your **last chance** → automatic hint revealing if the number is **odd** or **even**

**5. Play again**

After each round you'll be asked if you want to play again:

```
Play again? (yes/no):
```

Type `yes` to start a new round or `no` to quit.

## Difficulty Levels

| Level | Chances |
|---|---|
| Easy | 10 |
| Medium | 5 |
| Hard | 3 |

## High Scores

High scores are saved in `highscores.json` in the same folder. The score tracks the **fewest attempts** it took to guess correctly per difficulty. It updates automatically when you beat your previous best.

Example `highscores.json`:

```json
{
  "Easy": 3,
  "Medium": 2,
  "Hard": null
}
```

`null` means no successful guess yet for that difficulty.

## Project Structure

```
number-guessing-game/
├── game.js            # Main game logic
├── highscores.json    # Auto-generated high score file
└── README.md          # This file
```

## Project URL

```
https://roadmap.sh/projects/number-guessing-game
```