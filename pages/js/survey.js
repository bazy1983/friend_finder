$(document).ready(function () {
    var goldenStar = '<i class="sel fas fa-star"></i> '
    $(".sel").on("click", function (e) {
        var goldenStarDiv = $(this.parentNode.nextElementSibling);
        //goldenStarDiv.empty();
        var clickValue = this.attributes.data.value;
        for (var i = 0; i < clickValue; i++) {
            goldenStarDiv.append(goldenStar);
        }
        this.classList.add("selected");

        //disable stars div and change data attribute value 
        $(this.parentNode.parentNode).addClass("disabled").attr("data", clickValue)
    })


    function isValid() {
        var validInput = true;
        var results = $(".stars");
        var resultArr = [];
        for (var i = 0; i < results.length; i++) {
            if (results[i].attributes.data.value === "0") validInput = false;
        }
        if ($("#name").val() === "" || $("#photo").val() === "") validInput = false;
        return validInput;
    }

    $("#photo").on("change", function () {
        var input = $("#photo").val().trim();
        if (input.search(".jpg") != -1 || input.search(".png") != -1) {
            console.log("good input")
        } else {
            console.log("bad input")
        }
    })

    $("button").on("click", function () {

        // console.log(isValid())

        if (isValid()) { //if all questions answered

            let answers = $(".stars");
            let dataValues = [];
            for (let i = 0; i < answers.length; i++) {
                dataValues.push(answers[i].attributes.data.value) //getting answer values to array
            }

            let person = {
                name: $("#name").val().trim(),
                photo: $("#photo").val().trim(),
                scores: dataValues
            };
            console.log("client side");
            console.log(person);
            $.post("/api/friends", person, function (data) {
                //apendng stuff to the page
                $(".photo").empty();
                $(".photo").append($("<p>").html(data.name));
                $(".photo").append($("<img>").attr({
                    src : data.photo,
                    alt : data.photo
                }));
                $(".modal").fadeIn();
            })
        }

    })

    $(".fa-times").on("click", function(){
        $(".modal").fadeOut();
    })

})