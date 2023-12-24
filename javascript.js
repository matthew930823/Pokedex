var type = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];
var weaknesses = {
    Normal: ["Fighting"],
    Fire: ["Water", "Ground", "Rock"],
    Water: ["Electric", "Grass"],
    Grass: ["Fire", "Ice", "Poison", "Flying", "Bug"],
    Electric: ["Ground"],
    Ice: ["Fire", "Fighting", "Rock", "Steel"],
    Fighting: ["Flying", "Psychic", "Fairy"],
    Poison: ["Ground", "Psychic"],
    Ground: ["Water", "Ice", "Grass"],
    Flying: ["Electric", "Ice", "Rock"],
    Psychic: ["Bug", "Ghost", "Dark"],
    Bug: ["Fire", "Rock", "Flying"],
    Rock: ["Water", "Grass", "Fighting", "Ground", "Steel"],
    Ghost: ["Ghost", "Dark"],
    Dragon: ["Ice", "Dragon", "Fairy"],
    Dark: ["Fighting", "Bug", "Fairy"],
    Steel: ["Fire", "Fighting", "Ground"],
    Fairy: ["Poison", "Steel"]
};
//抗性
const pokemonTypes = {
    Normal: [],
    Fire: ['Grass', 'Bug', 'Fire', 'Steel', 'Ice', 'Fairy'],
    Water: ['Fire', 'Steel', 'Water', 'Ice'],
    Grass: ['Water', 'Ground', 'Grass', 'Electric'],
    Electric: ['Flying', 'Steel', 'Electric'],
    Ice: ['Ice'],
    Fighting: ['Rock', 'Bug', 'Dark'],
    Poison: ['Grass', 'Fairy', 'Fighting', 'Poison', 'Bug'],
    Ground: ['Poison', 'Rock'],
    Flying: ['Fighting', 'Bug', 'Grass'],
    Psychic: ['Fighting', 'Psychic'],
    Bug: ['Grass', 'Fighting', 'Grass'],
    Rock: ['Fire', 'Poison', 'Flying', 'Normal'],
    Ghost: ['Poison', 'Bug'],
    Dragon: ['Fire', 'Water', 'Grass', 'Electric'],
    Dark: ['Ghost', 'Dark'],
    Steel: ['Normal', 'Flying', 'Rock', 'Bug', 'Steel', 'Grass', 'Psychic', 'Ice', 'Dragon', 'Fairy'],
    Fairy: ['Fighting', 'Dark', 'Bug'],
};
//無效
const invalid = {
    Normal: ['Ghost'],
    Fire: [],
    Water: [],
    Grass: [],
    Electric: [],
    Ice: [],
    Fighting: [],
    Poison: [],
    Ground: ['Electric'],
    Flying: ['Ground'],
    Psychic: [],
    Bug: [],
    Rock: [],
    Ghost: ['Normal', 'Fighting'],
    Dragon: [],
    Dark: ['Psychic'],
    Steel: ['Poison'],
    Fairy: ['Dragon'],
};


function start() {
    let img = document.getElementById("slideImgs");
    for (var i = 1; i <= 20; i++) {
        x = Math.floor(Math.random() * 809 + 1);
        img.innerHTML += '<a href="species.html?species='+x+'">'+'<img src=images/' + String(x).padStart(3, "0") + '.png></a>'
    }
    showpokedex1();
    checktype();

    $(window).scroll(function () {
        if ($(window).scrollTop() > 773) {
            $('.pokedex1').addClass('active1')
        }
        else {
            $('.pokedex1').removeClass('active1')
        }
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 996) {
            $('.pokedex2').addClass('active2')
        }
        else {
            $('.pokedex2').removeClass('active2')
        }
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 1216) {
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
            var y = (pokeimg.length < matchingObjects.length) ? pokeimg.length : matchingObjects.length;
            console.log(y);
            for (var i = 0; i < y; i++) {
                x[i] = matchingObjects[i]; console.log(i)
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
function checktype() {
    var checkboxes = document.querySelectorAll(".type");

    var pokemonWeaknesses = [];//*2
    var double = [];//*4
    var def = [];//*1/2
    var doubledef = [];//*1/4
    var inval = [];//*0

    var maxSelection = 3;
    var arr = new Array();
    var button = document.querySelectorAll(".button");
    console.log(button.length)
    for (var i = 18; i < button.length-1; i++) {
        button[i].id = "hide";
    }
    // 添加 onchange 事件监听器
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            var checkedCheckboxes = document.querySelectorAll(".type:checked");
            if (checkbox.checked) {
                arr[checkedCheckboxes.length] = checkbox.value;
                console.log(checkedCheckboxes.length)
                var typefind = type[checkbox.value - 1];
                //有效
                weaknesses[typefind].forEach(function (value) {
                    if (pokemonWeaknesses.indexOf(value) === -1) {
                        pokemonWeaknesses.push(value);
                    } else {
                        double.push(value);
                    }
                });

                pokemonWeaknesses = pokemonWeaknesses.filter(function (value) {
                    return double.indexOf(value) === -1;
                });
                //無效
                if (invalid[typefind])
                    inval = inval.concat(invalid[typefind]);
                //抗性
                pokemonTypes[typefind].forEach(function (value) {
                    if (def.indexOf(value) === -1) {
                        def.push(value);
                    } else {
                        doubledef.push(value);
                    }
                });
                def = def.filter(function (value) {
                    return doubledef.indexOf(value) === -1;
                });
                def = def.filter(function (value) {
                    return inval.indexOf(value) === -1;
                });
                var temp = pokemonWeaknesses;
                pokemonWeaknesses = pokemonWeaknesses.filter(function (element) {
                    return !def.includes(element);
                });
                pokemonWeaknesses = pokemonWeaknesses.filter(function (value) {
                    return inval.indexOf(value) === -1;
                });
                def = def.filter(function (element) {
                    return !temp.includes(element);
                });
            }
            else {
                pokemonWeaknesses = [];//*2
                double = [];//*4
                def = [];//*1/2
                doubledef = [];//*1/4
                inval = [];//*0
                if (arr[1] == checkbox.value) {
                    if (arr[2] != 0) {
                        arr[1] = arr[2];
                        arr[2] = 0;
                        if (weaknesses[type[arr[1] - 1]]) {
                            pokemonWeaknesses = pokemonWeaknesses.concat(weaknesses[type[arr[1] - 1]]);
                            def = def.concat(pokemonTypes[type[arr[1] - 1]]);
                            inval = inval.concat(invalid[type[arr[1] - 1]]);
                        }
                    }
                    else {
                        arr[1] = 0;
                    }
                }
                else if (arr[2] == checkbox.value) {
                    arr[2] = 0;
                    if (weaknesses[type[arr[1] - 1]]) {
                        pokemonWeaknesses = pokemonWeaknesses.concat(weaknesses[type[arr[1] - 1]]);
                        def = def.concat(pokemonTypes[type[arr[1] - 1]]);
                        inval = inval.concat(invalid[type[arr[1] - 1]]);
                    }
                }
            }
            if (checkedCheckboxes.length === maxSelection) {
                checkboxes[arr[1] - 1].checked = false;
                checkboxes[arr[2] - 1].checked = false;
                arr[1] = checkbox.value;
                arr[2] = 0;
                pokemonWeaknesses = [];//*2
                double = [];//*4
                def = [];//*1/2
                doubledef = [];//*1/4
                inval = [];//*0
                if (weaknesses[type[arr[1] - 1]]) {
                    pokemonWeaknesses = pokemonWeaknesses.concat(weaknesses[type[arr[1] - 1]]);
                    def = def.concat(pokemonTypes[type[arr[1] - 1]]);
                    inval = inval.concat(invalid[type[arr[1] - 1]]);
                }

            }
            console.log("*2 " + pokemonWeaknesses);
            console.log("*4 " + double);
            console.log("*1/2 " + def);
            console.log("*1/4 " + doubledef);
            console.log("*0 " + inval);
            var button = document.querySelectorAll(".button");
            console.log(button.length)
            for (var i = 18; i < button.length-1; i++) {
                button[i].id = "hide";
            }
            for (var i = 0; i < double.length; i++) {
                const foundIndex = type.findIndex((str) => str === double[i]);
                button[18 + foundIndex].id = "";
            }
            for (var i = 0; i < pokemonWeaknesses.length; i++) {
                const foundIndex = type.findIndex((str) => str === pokemonWeaknesses[i]);
                button[36 + foundIndex].id = "";
            }
            for (var i = 0; i < def.length; i++) {
                const foundIndex = type.findIndex((str) => str === def[i]);
                button[54 + foundIndex].id = "";
            }
            for (var i = 0; i < doubledef.length; i++) {
                const foundIndex = type.findIndex((str) => str === doubledef[i]);
                button[72 + foundIndex].id = "";
            }
            for (var i = 0; i < inval.length; i++) {
                const foundIndex = type.findIndex((str) => str === inval[i]);
                button[90 + foundIndex].id = "";
            }
        });
    });
}
window.addEventListener("load", start, false);
window.addEventListener("load", slide, false);