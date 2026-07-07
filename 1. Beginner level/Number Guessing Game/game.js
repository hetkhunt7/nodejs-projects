const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    console.log("Welcome to the game!");
    console.log("I'm thinking of a number between 1 and 100. Can you guess it?");

    console.log("Difficulty levels:");
    console.log("1. Easy (10 attempts)");
    console.log("2. Medium (5 attempts)");
    console.log("3. Hard (3 attempts)\n");

    let chance;
    let difficultyName;

    while (true) {
        const choice = await ask("Choose a difficulty level (1, 2, or 3): ");
        if(choice === '1') {
            chance = 10;
            difficultyName = "Easy";
            break;
        } else if(choice === '2') {
            chance = 5;
            difficultyName = "Medium";
            break;
        } else if(choice === '3') {
            chance = 3;
            difficultyName = "Hard";
            break;
        } else {
            console.log("Invalid choice. Please select 1, 2, or 3.");
        }
    }
    
    console.log(`\nGreat! You Selected ${difficultyName} difficulty.`);
    console.log(`You have ${chance} attempts to guess the number.\n`);

    const secret = Math.floor(Math.random() * 100) + 1;
    const startTime = Date.now();

    let attempt = 0;
    let won = false;

    while(attempt < chance) {
        const input = await ask(`Guess (${chance - attempt} chances left): `);
        const guess = parseInt(input);

        if(isNaN(guess) || guess < 1 || guess > 100) {
            console.log("Please enter valid number between 1 to 100");
            continue;
        }

        attempt++;

        if (guess === secret) {
            const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
            console.log(`Congratulations! You guessed the correct number in ${attempt} attempt(s)!`);
            console.log(`Time taken: ${timeTaken} seconds.\n`);
            won = true;
            break;
        }
        else if(guess < secret) {
            console.log(`Incorrect! The number is greater than ${guess}.\n`);
        }
        else {
            console.log(`Incorrect! The number is less than ${guess}.\n`);
        }

        if(attempt === chance - 1) {
            const hint = secret % 2 === 0 ? "even" : "odd";
            console.log(`Hint: The number is ${hint}.\n`);
        }
    }

    if(!won) {
        console.log(`Out of chances! The number was ${secret}.\n`);
    }

    rl.close();
}

main();