$(document).ready(function(){

    $("#startAki").on("click", function(){

        $.get("/api/akinator", "start", function(data){
            console.log(data)
            $(".akinatorbody").append($("<p>").html(data.question))
            for (let i = 0; i < data.answers.length; i++){
                $(".akinatorbody").append($("<button class = 'akiAnswer' data = '"+i+"'>").text(data.answers[i].answer))
            }
        })
    })

    $(".akinatorbody").on("click", ".akiAnswer", function(){
        
        let akiAnswer = $(this).attr("data")
        $.post("/api/akinator-answer", {answer : akiAnswer}, function(data){
            console.log(data)
            $(".akinatorbody").empty();
        })
    })



})