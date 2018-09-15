
$(document).ready( function () {

    var correct = 0;
    var incorrect= 0;
    var item = 0;
    var answer = '';
    var allQuestions = 0;
    
    var time = 15;
    var intervalId;
    
 function pullQuestion() {
        $('#questions').empty();
    
        $.getJSON('assets/javascript/questions.json', function (data) {
            answer = data.list[item].answer;
            allQuestions = data.list.length;
    
            var $question = $('<h3>').html(data.list[item].question)
    
            var $options = $('<ul>').addClass('choices');
    
            $.each(data.list[item].choices, function (index) {
                $($options).append(
                    '<li class="option">' + data.list[item].choices[index] + '</li>'
                )
            })

    function countDown () {
       
        time--;
        $('#timer').html('<h2> Time Remaining: ' + time + '</h2>');
        if (time <=0){
           evalAnswer(null);
    
        }
    }
    
    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(countDown, 1000);
      }
      
        var $p = $('<div>').html($question).append($options);
    
        $('#questions').append($p);
    
    });
    
    }
  
    function startGame () {
        item = 0;
        correct = 0;
        incorrect= 0;
        allQuestions= 0;
    
        pullQuestion();
        run();
    }
    
     $(document).on('click', '.option', function() {
        evalAnswer(this.innerText);
    });
 
    $(document).on('click', '.start', function() {
        pullQuestion();
        run();
    });
    console.log(pullQuestion)

   
    function evalAnswer (text) {
        item++;
        time = 15;
        if(text === answer) {
            correct++;
            pullQuestion();
    
        } else {
            incorrect++;
            pullQuestion();
        }
        
        if (item === allQuestions) {
            endGame();
        }
    }
    function endGame () {
        $('#questions').empty();
        $('#timer').empty();
    
        var $right = $('<h3 class= "right">').text('Correct: ' + correct)
        var $wrong = $('<h3 class= "wrong">').text('Incorrect: ' + incorrect)
        var $Reset = $('<button>').addClass('start-over').text('Start Over');
    
        var $gameOver = $('<div>').append(
            $right, $wrong, $Reset
        )
    
        clearInterval(intervalId);
    
        $('#questions').append($gameOver)
    
        $('.start-over').on('click', startGame)
        
    
    }
    })