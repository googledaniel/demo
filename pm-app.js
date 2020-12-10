const $narrator = {
    start: `You're the ambitious Prime Minister of Britain, secretly hoping to overthrow the monarch and become dictator. Both you and the monarch have different tactics to become more popular. Each tactic could backfire though, taking away popularity. <br></br>
    The winner needs to hit 100 points first - or just be the last one standing if the other dives to 0. <br></br>
    Enter your name and choose which monarch you want to go up against. Choose carefully, some Monarchs have special powers...`,
    current: '',
    end: ''
}

class Game {
    constructor (chosenMonarch, round) {
        this.round = 0; //always add a round with a new game.
        this.currentMonarch = chosenMonarch;
        this.gameStatus = true;
        this.round = round;
    }
    // let $narrator = `You're the ambitious Prime Minister of Britain, secretly hoping to overthrow the monarch and become dictator. Both you and the monarch have different tactics to become more popular. Each tactic could backfire though, taking away popularity. <br></br>
    // The winner needs to hit 100 points first - or just be the last one standing if the other dives to 0. <br></br>
    // Enter your name and choose which monarch you want to go up against. Choose carefully, some Monarchs have special powers...`;
}

class Player {
    constructor (name, title) {
            this.name = name;
            this.title = title;
            this.popularity = 50;
            this.lessonsLearned = []
    }
    learnLesson (lesson) {
        // Stretch goal. Will add special rule if player has a past mistake happen again.
        this.lessonsLearned.push(lesson);
    };

    updatePopularity (result) {
        this.popularity += result;
        if (this.popularity >= 100) {
            this.popularity = 100;
            this.gameOver(true);            
        } else if (this.popularity <= 0) {
            this.popularity = 0;
            this.gameOver(false);
        };
        if (this.elizabeth && this.popularity <= 40) {
            this.elizabethRule();
        };
        //pay attention to this area. If I update the scoreboard with elizabeth, the player will miss that she had special powers.
        //maybe move elizabeth to another area to run as a check after 'play' before the next round starts.
        

    };

    determineLuck () {
        let luck = Math.floor(Math.random() * 2);
        return luck;
    };

    

    gameOver (won) {
        gameStatus == false;
        if (this.title === 'Prime Minister' && won == true) {
            $narrator.current = 'PM won.';
        } else if (this.title === 'Prime Minister' && won == false) {
            $narrator = 'PM lost.';
        }
        else if (won == true) {
            $narrator.current = 'Monarch won.';
        } else {
            $narrator.current = 'Monarch lost.';
        }
        
        //add a button here to play again. Just set the variables back to 50/50 and turn is PM. Keep everything else
        // $playAgain = $('#play')
    };
}



class Monarch extends Player {
    constructor (name, title, balcony, elizabeth, pronoun) {
        super (name, title);
        this.balcony = balcony;
        this.elizabeth = elizabeth;
        this.pronoun = pronoun;
    };

    monarchPlay () {
        let choice = Math.floor(Math.random() * 2)
        if (choice === 0) {
            this.dissolveParliament();
        } else if (choice === 1) {
            this.rideThroughStreets();
        };
    }
    
    elizabethRule () {
        $narrator.current = `Bad news... Queens Elizabeth always know when the mob is turning on them. Elizabeth smiled and waved just in time. Popularity now 75 points`;
        this.popularity = 75;
        updateScoreboard();
    };

    dissolveParliament () {
        if (this.determineLuck() === 0) {
            $narrator.current = `${this.title} ${this.name} just dissolved Parliament. The ${this.title} made a BIG mistake. They lost 90% popularity.`;
            this.updatePopularity(-90);
        } else {
            $narrator.current = `${this.title} ${this.name} just dissolved Parliament. The ${this.title} apparently knew this was a good move. They gained 90% popularity.`;
            this.updatePopularity(90)
        }
    };
    rideThroughStreets () {
        if (this.determineLuck() === 0) {
            $narrator.current = `${this.title} ${this.name} rode through the streets in a new golden carriage. Not a good idea. The ${this.title} is covered in rotting vegetables and just lost 15 points`;
            this.updatePopularity(-15)
        } else {
            $narrator.current = `${this.title} ${this.name} rode through the streets with a carriage. The subjects love seeing their ${this.title}. Plus 15 points.`;
            this.updatePopularity(15)
        }
    };
    
    
}

class PrimeMinister extends Player {
    constructor (name, title) {
        super (name, title);
    }

    pmPlay (pmChoice) {
        if (pmChoice === 0) {
            //this.dissolveParliament();
            this.updatePopularity(10);
        } else if (pmChoice === 1) {
            this.rideThroughStreets();
        };
        
    }
}

//let playerName = 'Daniel';

// const pm = new PrimeMinister(playerName, 'Prime Minister', false, false);
// const johnI = new Monarch('John I', 'King', false, false);
// const elizabethI = new Monarch('Elizabeth I', 'Queen', false, true);
// const charlesI = new Monarch('Charles I', 'King', false, false);
// const victoria = new Monarch('Victoria', 'Queen', true, false);
// const elizabethII = new Monarch('Elizabeth II', 'Queen', true, true);


//elizabethI.play();
// elizabethI.rideThroughStreets();

//console.log(elizabethI);


$(()=>{
    
    const $body = $('body');
    const $form = $('<form>').attr('id', 'input-container');
    const $label = $('<label>').attr('for', '#input-box');//check the hash sign
    const $input = $('<input>')
        .attr('type', 'text')
        .attr('name', '')
        .attr('value', '')
        .attr('id', 'input-box');
    
    /* BUTTONS */
    const $startButton = $('<button type="submit">Start Game</button>');
    const $playMore = $('<button type="submit" id="play-more">Continue</button>');
    const $playButton1 = $('<button type="submit" id="play-button-1">Go To War</button>');
    const $playButton2 = $('<button type="submit" id="play-button-2">Go To War</button>');
    const $playButton3 = $('<button type="submit" id="play-button-3">Go To War</button>');
    const $playButton4 = $('<button type="submit" id="play-button-4">Go To War</button>');
    const $playButton5 = $('<button type="submit" id="play-button-5">Go To War</button>');
    const $playButton6 = $('<button type="submit" id="play-button-6">Go To War</button>');
    
    
    
    $label.append($input);
    $label.append($startButton);
    $form.append($label);
    $('#container').append($form);
    $('#narrator').append($narrator.start);
    let pmTurn = true;// delete after adding to class pm

    $form.on('submit', (event2) => {
        event2.preventDefault();
        
        //add new game here
        const pm = new PrimeMinister($input.val(), 'Prime Minister', false, false);
        const johnI = new Monarch('John I', 'King', false, false, 'He');
        const elizabethI = new Monarch('Elizabeth I', 'Queen', false, true, 'She');
        const charlesI = new Monarch('Charles I', 'King', false, false, 'He');
        const victoria = new Monarch('Victoria', 'Queen', true, false, 'She');
        const elizabethII = new Monarch('Elizabeth II', 'Queen', true, true, 'She');

        const $body = $('body');
        
        const currentMonarch = elizabethII;

        const $pmPlayer = $('<h2>')
            .addClass('score')
            .attr('id', 'pm-player')
            .text(`${pm.title} ${pm.name}`);

        const $pmPopularity = $('<h3>')
            .addClass('score')
            .attr('id', 'pm-popularity')
            .text(`Your popularity score: ${pm.popularity}`);

        const $monachPlayer = $('<h2>')
            .addClass('score')
            .attr('id', 'monarch-player')
            .text(`${currentMonarch.title} ${currentMonarch.name}`)
        
        const $monarchPopularity = $('<h3>')
            .addClass('score')
            .attr('id', 'monarch-popularity')
            .text(`Your popularity score: ${currentMonarch.popularity}`);
        
        $body.append($pmPlayer, $pmPopularity, $playButton1, $monachPlayer, $monarchPopularity);

        const updateScoreboard = () => {
            
            $('#narrator').text($narrator.current)
            const $pmPopularityUpdate = $('#pm-popularity')
            .text(`Your popularity score: ${pm.popularity}`); //maybe append this?

            const $monarchPopularityUpdate = $('#monarch-popularity')
            .text(`The ${currentMonarch.title}'s popularity score: ${currentMonarch.popularity}`);

            $body.append($pmPopularityUpdate, $monarchPopularityUpdate); 
            

        }

        //updateScoreboard() 

        //removes the start form:
        $startButton.remove();
        $label.remove();
        $form.remove();

        //now I should probably do a while loop:
        if (pmTurn === true) {
            const $play1 = $('#play-button-1').on('click', (clickEvent2) => {
                pm.pmPlay(0);
                updateScoreboard();
                currentMonarch.monarchPlay();
                updateScoreboard()
                //pmTurn = false; 
            })
        } else {
            const $play1 = $('#play-button-1').on('click', (clickEvent2) => {
                currentMonarch.monarchPlay();
                updateScoreboard()
                //pmTurn = false; 
            })
            currentMonarch.monarchPlay();
            updateScoreboard()
            $playMore
            //pmTurn = true;
        }



    })
        
        
})