$(()=>{

const $narrator = {
    // start: `You're the ambitious Prime Minister of Britain, secretly hoping to overthrow the monarch and become dictator. Both you and the monarch have different tactics to become more popular. Each tactic could backfire though, taking away popularity. <br></br>
    // The winner needs to hit 100 points first - or just be the last one standing if the other dives to 0. <br></br>
    // Enter your name and choose which monarch you want to go up against. Choose carefully, some Monarchs have special powers...`,
    current: `You're the ambitious Prime Minister of Britain, secretly hoping to overthrow the monarch and become dictator. Both you and the monarch have different tactics to become more popular. Each tactic could backfire though, taking away popularity. <br></br>
    The winner needs to hit 100 points first - or just be the last one standing if the other dives to 0. <br></br>
    Enter your name and choose which monarch you want to go up against. Choose carefully, some Monarchs have special powers...`,
    end: ''
}

// I have to decare these objects and update them later.
let currentMonarch = {}; 
let pm = {};

const $playButton1 = $('<div><button type="click" class="pm-button" id="play-button-1">Go To War</button></div>');
const $playButton2 = $('<div><button type="click" class="pm-button" id="play-button-2">Go To War2</button></div>');
const $playButton3 = $('<div><button type="click" class="pm-button" id="play-button-3">Go To War3</button></div>');
const $playButton4 = $('<div><button type="click" class="pm-button" id="play-button-4">Go To War4</button></div>');
const $playButton5 = $('<div><button type="click" class="pm-button" id="play-button-5">Go To War5</button></div>');
const $playButton6 = $('<div><button type="click" class="pm-button" id="play-button-6">Go To War6</button></div>');
const $playMonarch = $('<div><button type="submit" class="monarch-button"i d="play-monarch">Let Monarch Try</button>');
const $playAgain = $('<button type="submit" id="play-again">Play Again</button>');

// const updateScoreboard = (pm, currentMonarch) => {
                
//             $('#narrator').text($narrator.current)
//             const $pmPopularityUpdate = $('#pm-popularity')
//             .text(`Your popularity score: ${pm.popularity}`); //maybe append this?

//             const $monarchPopularityUpdate = $('#monarch-popularity')
//             .text(`The ${currentMonarch.title}'s popularity score: ${currentMonarch.popularity}`);

//             $body.append($pmPopularityUpdate, $monarchPopularityUpdate); //I should update the id text rather than append
//         };

class Game {
    constructor (name) {
        this.name = name;
        this.status = "new";
    };

    playGame() { //currentMonarch
        if (this.status === ("new" || "pmTurn")) {console.log('pre button')
            $('#pm-div').append($playButton1, $playButton2, $playButton3, $playButton4, $playButton5, $playButton6);
                const $play1 = $playButton1.on('click', (clickEvent2) => {
                    clickEvent2.preventDefault();
                    console.log(`before pm play. ${currentMonarch} and ${this.status} and pm pop ${pm.popularity}`)
                    pm.pmPlay(0, pm, currentMonarch);
                    //updateScoreboard(pm, currentMonarch);
                    this.status = "monarchTurn";
                    $('.pm-button').fadeOut('slow');
                    $playMonarch.fadeIn('slow');
                    this.playGame();

                    // currentMonarch.monarchPlay();
                    // updateScoreboard() 
                })
            } else if (this.status === ("monarchTurn")) {
                $('#monarch-div').append($playMonarch);
                const $play2 = $playMonarch.on('click', (clickEvent2) => {
                    clickEvent2.preventDefault();
                    currentMonarch.monarchPlay(pm, currentMonarch);
                    //updateScoreboard(pm, currentMonarch);
                    this.status = "pmTurn";
                    $playMonarch.fadeOut('slow');
                    $('.pm-button').fadeIn('slow');
                    this.playGame();
                })}
            //     currentMonarch.monarchPlay();
            //     updateScoreboard()
            //     $playMore
            //     //pmTurn = true;
            // }
    };

    
}

const game = new Game('game');

class Player {
    constructor (name, title) {
            this.name = name;
            this.title = title;
            this.popularity = 50;
            //this.lessonsLearned = []
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
        if (this.elizabeth && this.popularity <= 40 && game.status != 'done') {
            this.elizabethRule();
        };
        this.updateScoreboard(); //monitor
    };

    updateScoreboard () {
                
            $('#narrator').text($narrator.current)
            const $pmPopularityUpdate = $('#pm-popularity')
            .text(`Your popularity score: ${pm.popularity}`); //maybe append this?

            const $monarchPopularityUpdate = $('#monarch-popularity')
            .text(`The ${currentMonarch.title}'s popularity score: ${currentMonarch.popularity}`);

            $body.append($pmPopularityUpdate, $monarchPopularityUpdate); //I should update the id text rather than append
        };

    determineLuck () {
        let luck = Math.floor(Math.random() * 2);
        return luck;
    };

    

    gameOver (won) {
        game.status = 'done';
        if (this.title === 'Prime Minister' && won == true) {
            $narrator.end = 'PM won.';
        } else if (this.title === 'Prime Minister' && won == false) {
            $narrator.end = 'PM lost.';
        }
        else if (won == true) {
            $narrator.end = 'Monarch won.';
        } else {
            $narrator.end = 'Monarch lost.';
        };
        $('#narrator').append($narrator.end);
        $playAgain

        
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
        this.done = false;
    };

    monarchPlay (pm, currentMonarch) {
        let choice = Math.floor(Math.random() * 2)
        if (choice === 0) {
            this.dissolveParliament();
        } else if (choice === 1) {
            this.rideThroughStreets();
        };
        //this.updateScoreboard(pm, currentMonarch);

    }
    
    elizabethRule (pm, currentMonarch) {
        $narrator.current = `Bad news... Queens Elizabeth always know when the mob is turning on them. Elizabeth smiled and waved just in time. Popularity now 75 points`;
        this.popularity = 75;
        this.updateScoreboard(pm, currentMonarch);
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
        this.name = name;
        this.title = title;
    }

    pmPlay (pmChoice, pm, currentMonarch) {
        if (this.determineLuck() === 0) {
            $narrator.current = `Oh no, you chose war? Your army's terrible, everyone died. <p>You lost 50 points.`;
            this.updatePopularity(-50);
        } else {
            $narrator.current = `War looks good on you (this time). <p>You gained 50 points for winning.`;
            this.updatePopularity(50)
        }
    };
    hold () {
        if (this.determineLuck() === 0) {
            $narrator.current = `${this.title} ${this.name} rode through the streets in a new golden carriage. Not a good idea. The ${this.title} is covered in rotting vegetables and just lost 15 points`;
            this.updatePopularity(-15)
        } else {
            $narrator.current = `${this.title} ${this.name} rode through the streets with a carriage. The subjects love seeing their ${this.title}. Plus 15 points.`;
            this.updatePopularity(15)
        }
    };
}

    
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
    const $chooseJohnButton = $('<button type="click" class="monarch-button" value="johnI">John I</button>'); //monitor input here... swap submit with click?
    const $chooseEIButton = $('<button type="click" class="monarch-button" value="elizabethI">Elizabeth I</button>');
    const $chooseCharlesIButton = $('<button type="click" class="monarch-button" value="charlesI">Charles I</button>')
    const $chooseVictoriaButton = $('<button type="click" class="monarch-button" value="victoria">Victoria</button>')
    const $chooseEIIButton = $('<button type="click" class="monarch-button" value="elizabethII">Elizabeth II</button>')
    //const $playMore = $('<button type="submit" id="play-more">Continue</button>');
    // const $playButton1 = $('<button type="click" id="play-button-1">Go To War</button>');
    // const $playButton2 = $('<button type="click" class="pm-button" value="johnI">Go To War</button>');
    // const $playButton3 = $('<button type="click" class="pm-button" value="johnI">Go To War</button>');
    // const $playButton4 = $('<button type="click" class="pm-button" value="johnI">Go To War</button>');
    // const $playButton5 = $('<button type="click" class="pm-button" value="johnI">Go To War</button>');
    // const $playButton6 = $('<button type="submit" id="play-button-6">Go To War</button>');

    // const game = new Game();
    // const pm = new PrimeMinister($input.val(), 'Prime Minister', false, false);
    // const johnI = new Monarch('John I', 'King', false, false, 'He');
    // const elizabethI = new Monarch('Elizabeth I', 'Queen', false, true, 'She');
    // const charlesI = new Monarch('Charles I', 'King', false, false, 'He');
    // const victoria = new Monarch('Victoria', 'Queen', true, false, 'She');
    // const elizabethII = new Monarch('Elizabeth II', 'Queen', true, true, 'She');

    $label.append($input);
    $label.append($startButton);
    $form.append($label);
    $('#container').append($form);
    $('#narrator').append($narrator.current);
    let pmTurn = true;// delete after adding to class pm

    $form.on('submit', (event2) => {
        event2.preventDefault();
        
        // const game = new Game('game');
        pm = new PrimeMinister($input.val(), 'Prime Minister');
        const johnI = new Monarch('John I', 'King', false, false, 'He');
        const elizabethI = new Monarch('Elizabeth I', 'Queen', false, true, 'She');
        const charlesI = new Monarch('Charles I', 'King', false, false, 'He');
        const victoria = new Monarch('Victoria', 'Queen', true, false, 'She');
        const elizabethII = new Monarch('Elizabeth II', 'Queen', true, true, 'She');

        // const updateScoreboard = () => {
                
        //     $('#narrator').text($narrator.current)
        //     const $pmPopularityUpdate = $('#pm-popularity')
        //     .text(`Your popularity score: ${pm.popularity}`); //maybe append this?

        //     const $monarchPopularityUpdate = $('#monarch-popularity')
        //     .text(`The ${currentMonarch.title}'s popularity score: ${currentMonarch.popularity}`);

        //     $body.append($pmPopularityUpdate, $monarchPopularityUpdate); //I should update the id text rather than append
        // };

        const roundSetup = () => {
            $('.monarch-button').hide('slow');
            $narrator.current = `Let's unseat that ${currentMonarch.title}!`;
            $('#narrator').text($narrator.current);
            
            console.log(currentMonarch.name);

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
            
            //$body.append($pmPlayer, $pmPopularity, $monachPlayer, $monarchPopularity); // this is where I split them into their divs

            $('#pm-div').append($pmPlayer, $pmPopularity);
            $('#monarch-div').append($monachPlayer, $monarchPopularity);

            game.playGame(pm, currentMonarch);
        };

        const $body = $('body');
        //add the next game here:
        
        $form.remove();

        $('#container').append($chooseJohnButton, $chooseEIButton, $chooseCharlesIButton, $chooseVictoriaButton, $chooseEIIButton, );


        $chooseJohnButton.on('click', (event3) => {//for now I'm just using the variables, I'd rather use the value though.
            event3.preventDefault();

            currentMonarch = johnI; // $(this).children('value').val()  //!! I deleted const 
            roundSetup();
            
        });
        
        $chooseEIButton.on('click', (event3) => {//for now I'm just using the variables, I'd rather use the value though.
            event3.preventDefault();

            currentMonarch = elizabethI; // $(this).children('value').val()  //!! I deleted const 
            roundSetup();
            
        });
        
        $chooseCharlesIButton.on('click', (event3) => {//for now I'm just using the variables, I'd rather use the value though.
            event3.preventDefault();

            currentMonarch = charlesI; // $(this).children('value').val()  //!! I deleted const 
            roundSetup();
            
        });
        
        
        $chooseVictoriaButton.on('click', (event3) => {//for now I'm just using the variables, I'd rather use the value though.
            event3.preventDefault();

            currentMonarch = victoria; // $(this).children('value').val()  //!! I deleted const 
            roundSetup();
            
        });

        $chooseEIIButton.on('click', (event3) => {//for now I'm just using the variables, I'd rather use the value though.
            event3.preventDefault();

            currentMonarch = elizabethII; // $(this).children('value').val()  //!! I deleted const 
            roundSetup();
            
        });
        

    })    
        
})