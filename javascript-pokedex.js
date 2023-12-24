
var li = new Array();

// 解析 URL 中的參數
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// 根據 URL 中的物種 ID 加載相應的內容
function loadSpecies() {
    const speciesDetailContainer = document.getElementById('speciesDetail');
    const speciesId = getParameterByName('species');
    const speciesimg = document.getElementById('speciesimg');
    const speciesID = document.getElementById('speciesID');
    const speciesName = document.getElementById('speciesName');
    const Previoushref=document.getElementById('Previous');
    const Nexthref=document.getElementById('Next');
    // const PreviousID = document.getElementById('PreviousID');
    // const PreviousName = document.getElementById('PreviousName');
    // const NextID = document.getElementById('NextID');
    // const NextName = document.getElementById('NextName');
    const speciesHP = document.getElementById('HP');
    const speciesAttack = document.getElementById('Attack');
    const speciesDefense = document.getElementById('Defense');
    const speciesSpAttack = document.getElementById('SpAttack');
    const speciesSpDefense = document.getElementById('SpDefense');
    const speciesSpeed = document.getElementById('Speed');
    const Total = document.getElementById('Total');
    const HPvalue = document.getElementById('HPvalue');
    const Attackvalue = document.getElementById('Attackvalue');
    const Defensevalue = document.getElementById('Defensevalue');
    const SpAttackvalue = document.getElementById('SpAttackvalue');
    const SpDefensevalue = document.getElementById('SpDefensevalue');
    const Speedvalue = document.getElementById('Speedvalue');
    const Totalvalue = document.getElementById('Totalvalue');
    const speciesType = document.getElementById('type');
    const speciesWeakness = document.getElementById('weakness');
    const converter = OpenCC.Converter({ from: 'cn', to: 'hk' });
    if (speciesId) {
        // 假設有一些物種的內容
        fetch('https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/pokedex.json')
            .then(response => response.json())
            .then(data => {
                const Previous=data[((speciesId - 2)==-1)?896:speciesId - 2];
                const speciesDataItem = data[speciesId - 1];
                const Next=data[(speciesId==897)?0:speciesId];
                // PreviousID.innerHTML = Previous.id;
                // PreviousName.innerHTML = converter(Previous.name.chinese);
                // NextID.innerHTML = Next.id;
                // NextName.innerHTML = converter(Next.name.chinese);
                Previoushref.href='species.html?species='+(((speciesId - 2)==-1)?897:parseInt(speciesId)-1);
                speciesimg.src = 'images/' + String(speciesId).padStart(3, "0") + '.png'
                speciesID.innerHTML = speciesDataItem.id;
                speciesName.innerHTML = converter(speciesDataItem.name.chinese);
                Nexthref.href='species.html?species='+((speciesId==897)?1:(parseInt(speciesId)+1));
                if (parseInt(speciesId) < 810) {
                    HP = speciesDataItem.base.HP;
                    Attack = speciesDataItem.base.Attack;
                    Defense = speciesDataItem.base.Defense;
                    SpAttack = speciesDataItem.base['Sp. Attack'];
                    SpDefense = speciesDataItem.base['Sp. Defense'];
                    Speed = speciesDataItem.base.Speed;
                    speciesHP.style.width = parseInt(HP)/2.55 + "%";
                    HPvalue.innerHTML = HP;
                    speciesAttack.style.width = parseInt(Attack)/2.55 + "%";
                    Attackvalue.innerHTML = Attack;
                    speciesDefense.style.width = parseInt(Defense)/2.55 + "%";
                    Defensevalue.innerHTML = Defense;
                    speciesSpAttack.style.width = parseInt(SpAttack)/2.55 + "%";
                    SpAttackvalue.innerHTML = SpAttack;
                    speciesSpDefense.style.width = parseInt(SpDefense)/2.55 + "%";
                    SpDefensevalue.innerHTML = SpDefense;
                    speciesSpeed.style.width = parseInt(Speed)/2.55 + "%";
                    Speedvalue.innerHTML = Speed;
                    Total.style.width = (parseInt(HP)+parseInt(Attack)+parseInt(Defense)+parseInt(SpAttack)+parseInt(SpDefense)+parseInt(Speed))/7.2 + "%";
                    Totalvalue.innerHTML=parseInt(HP)+parseInt(Attack)+parseInt(Defense)+parseInt(SpAttack)+parseInt(SpDefense)+parseInt(Speed);
                }
                else {
                    find1(speciesId)
                        .then(() => {
                            HP = li[0];
                            Attack = li[1];
                            Defense = li[2];
                            SpAttack = li[3];
                            SpDefense = li[4];
                            Speed = li[5];
                            speciesHP.style.width = parseInt(HP)/2.55 + "%";
                            HPvalue.innerHTML = HP;
                            speciesAttack.style.width = parseInt(Attack)/2.55 + "%";
                            Attackvalue.innerHTML = Attack;
                            speciesDefense.style.width = parseInt(Defense)/2.55 + "%";
                            Defensevalue.innerHTML = Defense;
                            speciesSpAttack.style.width = parseInt(SpAttack)/2.55 + "%";
                            SpAttackvalue.innerHTML = SpAttack;
                            speciesSpDefense.style.width = parseInt(SpDefense)/2.55 + "%";
                            SpDefensevalue.innerHTML = SpDefense;
                            speciesSpeed.style.width = parseInt(Speed)/2.55 + "%";
                            Speedvalue.innerHTML = Speed;
                            Total.style.width = (parseInt(HP)+parseInt(Attack)+parseInt(Defense)+parseInt(SpAttack)+parseInt(SpDefense)+parseInt(Speed))/7.2 + "%";
                            Totalvalue.innerHTML=parseInt(HP)+parseInt(Attack)+parseInt(Defense)+parseInt(SpAttack)+parseInt(SpDefense)+parseInt(Speed);
                        })
                        .catch(error => console.error('Error:', error));

                }

                var pokemonWeaknesses = getWeakness(speciesDataItem.type);
                //console.log(speciesDataItem.type.length);
                for (var i = 0; i < speciesDataItem.type.length; i++) {
                    if (i >= 0) {
                        speciesType.innerHTML += '   ';
                    }
                    speciesType.innerHTML += '<span class="typebox_word '+speciesDataItem.type[i]+'">'+speciesDataItem.type[i]+'</span> ';
                }
                for (var i = 0; i < pokemonWeaknesses.length; i++) {
                    if (i >= 0) {
                        speciesWeakness.innerHTML += '   ';
                    }
                    speciesWeakness.innerHTML += '<span class="typebox_word '+pokemonWeaknesses[i]+'">'+pokemonWeaknesses[i]+'</span> ';
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        speciesDetailContainer.innerHTML = '缺少物種 ID。';
    }
}
function find1(speciesId) {
    return new Promise((resolve, reject) => {
        fetch('https://raw.githubusercontent.com/NightCatSama/pokedex/main/pokemon.json')
            .then(response => response.json())
            .then(data1 => {
                const speciesDataItem1 = data1[speciesId - 1];
                li = speciesDataItem1.stat.split(',');
                resolve();
            })
            .catch(error => reject(error));
    });
}
function getWeakness(pokemonType) {
    // 定义属性克制关系
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
        Normal: ['Ghost'],
        Fire: ['Grass', 'Bug', 'Fire', 'Steel', 'Ice', 'Fairy'],
        Water: ['Fire', 'Steel', 'Water', 'Ice'],
        Grass: ['Water', 'Ground', 'Grass', 'Electric'],
        Electric: ['Flying', 'Steel', 'Electric'],
        Ice: ['Ice'],
        Fighting: ['Rock', 'Bug', 'Dark'],
        Poison: ['Grass', 'Fairy', 'Fighting', 'Poison', 'Bug'],
        Ground: ['Electric', 'Poison', 'Rock'],
        Flying: ['Fighting', 'Bug', 'Grass', 'Ground'],
        Psychic: ['Fighting', 'Psychic'],
        Bug: ['Grass', 'Fighting', 'Grass'],
        Rock: ['Fire', 'Poison', 'Flying', 'Normal'],
        Ghost: ['Poison', 'Bug', 'Normal', 'Fighting'],
        Dragon: ['Fire', 'Water', 'Grass', 'Electric'],
        Dark: ['Psychic', 'Ghost', 'Dark'],
        Steel: ['Normal', 'Flying', 'Rock', 'Bug', 'Steel', 'Grass', 'Psychic', 'Ice', 'Dragon', 'Fairy', 'Poison'],
        Fairy: ['Fighting', 'Dragon', 'Dark', 'Bug'],
    };

    var pokemonWeaknesses = [];

    // 遍历宝可梦的类型，查找弱点
    for (var i = 0; i < pokemonType.length; i++) {
        var type = pokemonType[i];
        //console.log(type);
        if (weaknesses[type]) {
            pokemonWeaknesses = Array.from(new Set(pokemonWeaknesses.concat(weaknesses[type])));
        }
    }
    for (var i = 0; i < pokemonType.length; i++) {
        pokemonWeaknesses = pokemonWeaknesses.filter(function (item) {
            return !pokemonTypes[pokemonType[i]].includes(item);
        });
    }
    return pokemonWeaknesses;
}
// 在頁面載入完成後執行
document.addEventListener('DOMContentLoaded', loadSpecies);