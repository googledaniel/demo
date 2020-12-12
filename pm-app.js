$(()=>{

const $narrator = {
    start: `You're the ambitious Prime Minister of Britain, secretly hoping to overthrow the monarch and become dictator. Both you and the monarch have different tactics to become more popular. Each tactic could backfire though, taking away popularity.
    <br></br>
    Enter your name: `,

    current: `The winner needs to hit 100 points first - or just be the last one standing if the other dives to 0. <br></br> Choose which monarch you want to go up against. Pick carefully, some Monarchs have special powers...`,

    end: ''
}

// I have to decare these objects and update them later.
let currentMonarch = {}; 
let pm = {};

/// BUTTONS ///
const $startButton = $('<button type="submit">Start Game</button>');
const $chooseJohnButton = $('#johnI'); 
const $chooseEIButton = $('#elizabethI');
const $chooseCharlesIButton = $('#charlesI');
const $chooseVictoriaButton = $('#victoria');
const $chooseEIIButton = $('#elizabethII');
const $playButton3 = $('<div><button type="click" class="pm-button" id="play-button-3">Go To War3</button></div>');
const $playButton4 = $('<div><button type="click" class="pm-button" id="play-button-4">Go To War4</button></div>');
const $playButton5 = $('<div><button type="click" class="pm-button" id="play-button-5">Go To War5</button></div>');
const $playButton6 = $('<div><button type="click" class="pm-button" id="play-button-6">Go To War6</button></div>');
const $playMonarch = $('#monarch-button-1');
const $playAgain = $('#play-again-button');

/// CSS DISPLAY ///
$('#play-again-button').css('display', 'none');
$('.play-button').css('display', 'none');
$('.choose-monarch-button').css('display', 'none');
$('.choose-monarch-button').css('display', 'none');
$('#monarch-button-1').css('display', 'none');
$('.score').css('display', 'none');

/// GLOBAL FUNCTIONS ///
const roundSetup = () => {
    $('.choose-monarch-button').css('display', 'none');
    $narrator.current = `Let's unseat that ${currentMonarch.title}!`;
    $('#narrator').text($narrator.current);
    $('.play-button').css('display', '');
    console.log(currentMonarch.name);
    
    $('.score').css('display', '');

    $('#pm-player').text(`${pm.title} ${pm.name}`);

    $('#pm-popularity').text(`Your popularity score: ${pm.popularity}`);

    $('#monarch-player').text(`${currentMonarch.title} ${currentMonarch.name}`);
    
    $('#monarch-popularity').text(`The ${currentMonarch.title}'s popularity score: ${currentMonarch.popularity}`);

    game.playGame(pm, currentMonarch);
};

class Game {
    constructor (name) {
        this.name = name;
        this.status = "new";
    };

    playGame() { //currentMonarch
        if (game.status === ("new" || "pmTurn") && game.status !== "done") { //try to fix this

            const $pmCoal = $('#pm-button-1').on('click', (clickEvent2) => {
                clickEvent2.preventDefault();
                pm.buildCoalIndustry();
                game.status = "monarchTurn";
                //$('.pm-button').fadeOut('slow');
                $('.monarch-button').css('display', '');
                $('.play-button').css('display', 'none');
                this.playGame();
            });

            const $pmWar = $('#pm-button-2').on('click', (clickEvent2) => {
                clickEvent2.preventDefault();
                pm.war();
                game.status = "monarchTurn";
                //$('.pm-button').fadeOut('slow');
                $('.monarch-button').css('display', '');
                $('.play-button').css('display', 'none')
                this.playGame();
            });


            const $pmWorldWar = $('#pm-button-3').on('click', (clickEvent2) => {
                clickEvent2.preventDefault();
                pm.worldWar();
                game.status = "monarchTurn";
                //$('.pm-button').fadeOut('slow');
                $('.monarch-button').css('display', '');
                $('.play-button').css('display', 'none')
                this.playGame();
            });

            const $pmPlague = $('#pm-button-4').on('click', (clickEvent2) => {
                clickEvent2.preventDefault();
                pm.plague();
                game.status = "monarchTurn";
                //$('.pm-button').fadeOut('slow');
                $('.monarch-button').css('display', '');
                $('.play-button').css('display', 'none')
                this.playGame();
            });

            const $pmEmpire = $('#pm-button-5').on('click', (clickEvent2) => {
                clickEvent2.preventDefault();
                pm.empire();
                game.status = "monarchTurn";
                //$('.pm-button').fadeOut('slow');
                $('.monarch-button').css('display', '');
                $('.play-button').css('display', 'none')
                this.playGame();
            });

            const $pmPrintMoney = $('#pm-button-6').on('click', (clickEvent2) => {
                clickEvent2.preventDefault();
                pm.printMoney();
                game.status = "monarchTurn";
                //$('.pm-button').fadeOut('slow');
                $('.monarch-button').css('display', '');
                $('.play-button').css('display', 'none')
                this.playGame();
            });
            } else if (game.status === "monarchTurn" && game.status !== "done") {
                const $play2 = $playMonarch.on('click', (clickEvent2) => {
                    clickEvent2.preventDefault();
                    currentMonarch.monarchPlay(pm, currentMonarch);
                    game.status = "pmTurn"; //check that this is ok.
                    $('.monarch-button').css('display', 'none');
                    $('.play-button').css('display', '');
                    this.playGame();
                })
        };
    };
};

const game = new Game('game');

class Player {
    constructor (name, title) {
            this.name = name;
            this.title = title;
            this.popularity = 50;
            //this.lessonsLearned = []
    };

    updatePopularity (result) {
        this.popularity += result;
        if (this.popularity >= 100) {
            this.popularity = 100;
            this.gameOver('true');            
        } else if (this.popularity <= 0) {
            this.popularity = 0;
            this.gameOver('false');
        } else {
            this.updateScoreboard(); 
        };
        //this is a wildcard rule only run if the game was =100 or 0:
        if (this.elizabeth && this.popularity <= 40 && game.status !== 'done') {
            this.elizabethRule();
        };
        
    };

    updateScoreboard () {
                
            $('#narrator').text($narrator.current);

            $('#pm-popularity').text(`Your popularity score: ${pm.popularity}`); 

            $('#monarch-popularity').text(`The ${currentMonarch.title}'s popularity score: ${currentMonarch.popularity}`);
        };

    determineLuck () {
        let luck = Math.floor(Math.random() * 2);
        return luck;
    };

    

    gameOver (won) {
        $('.play-button').css('display', 'none');
        $('.monarch-button').css('display', 'none');

        if (this.title === 'Prime Minister' && won === 'true') {
            $narrator.end = `<br></br> CONGRATULATIONS! You became dictator with 100% popularity and won.`;
            
        } else if (this.title === 'Prime Minister' && won === 'false') {
            $narrator.end = `<br></br> Uh oh, your popularity went below 0. Parliament removed you, you lost.`;
        }
        else if (won === 'true') {
            $narrator.end = `<br></br> Ooo the ${this.title} reached 100 points first, winning by becoming absolute Monarch. Parliament is eliminated, you lost.`;
        } else {
            $narrator.end = `<br></br> CONGRATULATIONS! You won by being the last one standing! The ${this.title} was so hated they hit 0 points and were removed by the mob.`;
        };
        game.status = 'done';
        this.updateScoreboard();
        $('#narrator').append($narrator.end);
        $('#play-again-button').css('display', '');
        $playAgain.on('click', (clickEvent) => {
            clickEvent.preventDefault();
            pm.popularity = 50;
            currentMonarch.popularity = 50;
            $('#play-again-button').css('display', 'none');
            $('.choose-monarch-button').css('display', '');

        })

        
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
        this.updatePopularity(0);
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
    };

    buildCoalIndustry () {
        if (this.determineLuck() === 0) {
            $narrator.current = `Coal seemed like a good plan... until one of the coal tips slid into an elementary school.  -15 points.`;
            this.updatePopularity(-15);
        } else {
            $narrator.current = `Great move building a coal industry, everyone is richer. Even if the environment died a little. +15 points.`;
            this.updatePopularity(15);
        };
    };

    war () {
        if (this.determineLuck() === 0) {
            $narrator.current = `Oh no, you chose war? Your army's terrible, everyone died. -20 points.`;
            this.updatePopularity(-20);
        } else {
            $narrator.current = `War looks good for you (this time). +20 points.`;
            this.updatePopularity(20);
        };
    };

    worldWar () {
        if (this.determineLuck() === 0) {
            $narrator.current = `Ahh! You lost the World War! The new dictator took your job but kept the ${currentMonarch.title} as a figure head.`;
            this.updatePopularity(-100);
        } else {
            $narrator.current = `Whew! That was scary - but you won the World War! +75 points.`;
            this.updatePopularity(75);
        };
    };
    
    plague () {
        if (this.determineLuck() === 0) {
            $narrator.current = `Plagues aren't fun... nor was your handling of it. -15 points.`;
            this.updatePopularity(-15);
        } else {
            $narrator.current = `You faced a plague and did your best. People are satisfied. +15 points.`;
            this.updatePopularity(15);
        };
    };

    empire () {
        if (this.determineLuck() === 0) {
            $narrator.current = `Empires aren't always fun. The colonies revolted. -15 points`;
            this.updatePopularity(-15);
        } else {
            $narrator.current = `Your expanding empire is making the people back home rich. +15 points`;
            this.updatePopularity(15);
        };
    };
    
    printMoney () {
        if (this.determineLuck() === 0) {
            $narrator.current = `You just caused hyper inflation. -40 points.`;
            this.updatePopularity(-40);
        } else {
            $narrator.current = `You printed money and everyone [thinks] they're rich! +40 points.`;
            this.updatePopularity(40);
        };
    };
};

    
    const $body = $('body');
    const $form = $('<form>').attr('id', 'input-container');
    const $label = $('<label>').attr('for', '#input-box');//check the hash sign
    const $input = $('<input>')
        .attr('type', 'text')
        .attr('name', '')
        .attr('value', '')
        .attr('id', 'input-box');


    


    $label.append($input);
    $label.append($startButton);
    $form.append($label);
    $('#narrator').append($narrator.start);
    $('#narrator').append($form);
    let pmTurn = true;// delete after adding to class pm



    $form.on('submit', (event2) => {
        event2.preventDefault();
        $('#narrator').text('')
        $('#narrator').append($narrator.current);
        // const game = new Game('game');
        pm = new PrimeMinister($input.val(), 'Prime Minister');
        const johnI = new Monarch('John I', 'King', false, false, 'He');
        const elizabethI = new Monarch('Elizabeth I', 'Queen', false, true, 'She');
        const charlesI = new Monarch('Charles I', 'King', false, false, 'He');
        const victoria = new Monarch('Victoria', 'Queen', true, false, 'She');
        const elizabethII = new Monarch('Elizabeth II', 'Queen', true, true, 'She');

        //roundSetup();

        const $body = $('body');
        //add the next game here:
        
        $form.remove();
        $('.choose-monarch-button').css('display', '');
        //$('#narrator').append($chooseJohnButton, $chooseEIButton, $chooseCharlesIButton, $chooseVictoriaButton, $chooseEIIButton, );


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