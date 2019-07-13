$(document).ready(function () {

    // topic array
    var topics = ["Laughter", "Loathe", "Joyful", "Distraught", "Surprise", "Trust", "Disgust", "Horror", "Nostalgia"];




    function displayTopics() {
        var emotions = $(this).data("search");
        console.log(emotions);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotions + "&api_key=cgXkxy9BxdP3hRIxDjK5XO4U3loCajUY&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);

                console.log(response);

                var results = response.data;


                for (var i = 0; i < results.length; i++) {
                    var topicDiv = $("<div>");
                    var rating = results[i].rating;
                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;
                    var image = $("<img>");
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    image.attr("src", still);
                    image.addClass("Giphy");
                    image.attr("data-state", "still");
                    image.attr("data-still", still);
                    image.attr("data-animate", animated);
                    topicDiv.append(p);
                    topicDiv.prepend(image);
                    $("#gifsHere").prepend(topicDiv);

                }
            });
    }

    // submit button
    $("#select-emo").on("click", function (event) {
        event.preventDefault();
        var newEmotion = $("#emo-input").val().trim();
        topics.push(newEmotion);
        console.log(topics);
        $("#emo-input").val();
        displayEmo();
    });

    function displayEmo() {
        $("#emoButton").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-light">');
            a.attr("id", "topic");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#emoButton").append(a);
        }
    }

    displayEmo();

    $(document).on("click", "#topic", displayTopics);
    $(document).on("click", ".Giphy", playGif);

    function playGif() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }


});