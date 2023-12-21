function start() {
    let img = document.getElementById("slideImgs");
    for (var i = 1; i <= 20; i++) {
        x = Math.floor(Math.random() * 809 + 1);
        img.innerHTML += '<img src=images/' + String(x).padStart(3, "0") + '.png>'
    }
    showpokedex1();
    $(window).scroll(function () {
        if ($(window).scrollTop() > 360) {
            $('.pokedex1').addClass('active1')
        }
        else {
            $('.pokedex1').removeClass('active1')
        }
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 550) {
            $('.pokedex2').addClass('active2')
        }
        else {
            $('.pokedex2').removeClass('active2')
        }
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 825) {
            $('.pokedex3').addClass('active1')
        }
        else {
            $('.pokedex3').removeClass('active1')
        }
    });
}
function showpokedex1() {
    let pokeimg = document.getElementsByClassName("imgsrc");
    let pokehref = document.getElementsByClassName("imghref");
    var x = new Array();
    for (var i = 0; i < pokeimg.length; i++) {
        x[i] = Math.floor(Math.random() * 809 + 1);
        for (var j = 0; j < i; j++) {
            if (x[i] == x[j]) {
                i -= 1;
                continue;
            }
        }
        pokehref[i].href = 'species.html?species=' + x[i];
        pokeimg[i].src = 'images/' + String(x[i]).padStart(3, "0") + '.png';
    }
}
function slide() {
    $('.slideshow').each(function () {

        let slideImgs = $(this).find('img'),
            slideImgsCount = slideImgs.length,
            currentIndex = 0;

        slideImgs.eq(currentIndex).fadeIn();

        setInterval(showNextSlide, 2000);

        function showNextSlide() {
            let nextIndex = (currentIndex + 1) % slideImgsCount;
            slideImgs.eq(currentIndex).fadeOut();
            slideImgs.eq(nextIndex).fadeIn();
            currentIndex = nextIndex;
        }
    })
}
function getInputValue() {
    var userInput = document.getElementById("Input");
    const converter = OpenCC.Converter({ from: 'hk', to: 'cn' });
    var inputName = converter(userInput.value);
    
    fetch('https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/pokedex.json')
        .then(response => response.json())
        .then(data => {
            const matchingObjects = findSimilarObjects(data, inputName);
            //console.log(matchingObjects.length);
            let pokeimg = document.getElementsByClassName("imgsrc");
            let pokehref = document.getElementsByClassName("imghref");
            var x = new Array();
            //console.log((pokeimg.length < matchingObjects.length) ? pokeimg.length : matchingObjects.length);
            var y=(pokeimg.length < matchingObjects.length) ? pokeimg.length : matchingObjects.length;
            console.log(y);
            for (var i = 0; i < y; i++) {
                x[i] = matchingObjects[i];console.log(i)
                pokehref[i].href = 'species.html?species=' + x[i];
                pokeimg[i].src = 'images/' + String(x[i]).padStart(3, "0") + '.png';
            }
            for (var i = y; i < pokeimg.length; i++) {
                x[i] = Math.floor(Math.random() * 809 + 1);
                for (var j = 0; j < i; j++) {
                    if (x[i] == x[j]) {
                        i -= 1;
                        continue;
                    }
                }
                pokehref[i].href = 'species.html?species=' + x[i];
                pokeimg[i].src = 'images/' + String(x[i]).padStart(3, "0") + '.png';
            }
        })
        .catch(error => console.error('出错:', error));

}

function findSimilarObjects(data, inputName) {
    const matchingObjects = [];

    data.forEach(obj => {
        if (obj.name.chinese.includes(inputName)) {
            matchingObjects.push(obj.id);
            console.log(obj.name.chinese);
        }
    });

    return matchingObjects;
}


window.addEventListener("load", start, false);
window.addEventListener("load", slide, false);