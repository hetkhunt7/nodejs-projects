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
    }

    if(choice === '1') {
        chance = 10;
        difficultyName = "Easy";
    } else if(choice === '2') {
        chance = 5;
        difficultyName = "Medium";
    } else if(choice === '3') {
        chance = 3;
        difficultyName = "Hard";
    } else {
        console.log("Invalid choice. Please select 1, 2, or 3.");
    }

    
    console.log(`\nGreat! You Selected ${difficultyName} difficulty.`);
    console.log(`You have ${chance} attempts to guess the number.\n`);
    rl.close();
}

main();