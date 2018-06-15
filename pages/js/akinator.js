$(document).ready(function(){

    $(".button").on("click", function(){
        desc = "Now click on card(s) that show your number, then click (Results) button down below"
        $(this).parent().children().slideUp(1000, function(){
            parentDiv = $(this).parent().empty().append(`<p>${desc}</p>`)
            $(".cards").css("opacity" , 1);
            
        })
    })

    $(".cards div img").on("click", function(){
        $("#final").text("")
        $(this).toggleClass("glow");
        if($(".cards div img").hasClass("glow")){
            $(".results").children().removeClass("hidden");
        } else {
            $(".results").children().addClass("hidden");
        }

    })

    $(".results").on("click", function(){
        var results = 0;
        var cards = $(".glow");
        myPromise = new Promise(function(resolve, reject) {
            
                cards.each(function(index, item){
                    results += parseInt($(item).attr("alt"));
                })
            resolve(results)
        });

        myPromise.then(function(data){
            $("#final").text(`Your number is ${data}`)
        })
        

    })


})