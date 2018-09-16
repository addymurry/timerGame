$(document).ready( function () {

    var correct = 0;
    var incorrect= 0;
    var item = 0;
    var answer = "";
    var theList = 0;
    
    var time = 30;
    var intervalId;
    
    function pullQuestion() {
        $('#questions').empty();
    
        $.getJSON("assets/questions.json", function (data) {
            answer = data.list[item].answer;
            theList = data.list.length;
    
            var $question = $('<h2>').html(data.list[item].question)
    
            var $options = $('<ul>').addClass('choices');
    
            $.each(data.list[item].choices, function (index) {
                $($options).append(
                    '<li class="option">' + data.list[item].choices[index] + '</li>'
                )
            })
    
  
    
    function go() {
        clearInterval(intervalId);
        intervalId = setInterval(countDown, 1000);
      }
        var $p = $('<div>').html($question).append($options);
    
        $('#questions').append($p);
    
    });
      function countDown () {
       
        time--;
        $('#countdown').html('<h2> Time left: ' + time + '</h2>');
        if (time <=0){
           TheAnswer("");
    
        }
    }
    }
    function startGame () {
        item = 0;
        correct = 0;
        incorrect= 0;
        theList= 0;
    
        pullQuestion();
        go();
    }
    
    function TheAnswer (text) {
        item++;
        time = 30;
        if(text === answer) {
            correct++;
            pullQuestion();
    
        } else {
            incorrect++;
            pullQuestion();
        }
        
        if (item === theList) {
            endGame();
        }
    }   
     $(document).on('click', '.option', function() {
        TheAnswer(this.innerText);
    });

    $(document).on('click', '.start', function() {
        pullQuestion();
        go();
    });
 
    
    function endGame () {
        $('#questions').empty();
        $('#countdown').empty();
    
        var $right = $('<h4 class= "right">').text('Correct: ' + correct)
        var $wrong = $('<h4 class= "wrong">').text('Incorrect: ' + incorrect)

    
        var $gameOver = $('<div>').append(
            $right, $wrong,
        )
    
        clearInterval(intervalId);
    
        $('#questions').append($gameOver)
    
    }

    
    
    
    
    
    
    })