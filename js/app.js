var cookies = 0;
var cursors = 0;
var soulEnergy = 0;
var soulCap = 10;
var bones = 0;
var bonesCap = 10;
var blood = 0;
var bloodCap = 10;
var corpses = 0;
var corpseCap = 10;
var skeletons = 0;
var skeletonsCap = 5;

// var save = {
//     cookies: cookies,
//     cursors: cursors
// }

function collectEnergy(number){
    if (soulEnergy < soulCap) {
        soulEnergy = soulEnergy + number;
        document.getElementById("soulEnergy").innerHTML = soulEnergy;
        document.getElementById("soulCap").innerHTML = soulCap;
    }
};

function collectBones(number){
    if (bones < bonesCap) {
        bones = bones + number;
        document.getElementById("bones").innerHTML = bones;
        document.getElementById("bonesCap").innerHTML = bonesCap;
    }
};

function collectBlood(number){
    if (blood < bloodCap) {
        blood = blood + number;
        document.getElementById("blood").innerHTML = blood;
        document.getElementById("bloodCap").innerHTML = bloodCap;
    }
};

function collectCorpses(number){
    if (corpses < corpseCap) {
        corpses = corpses + number;
        document.getElementById("corpses").innerHTML = corpses;
        document.getElementById("corpseCap").innerHTML = corpseCap;
    }
};

function summonSkeleton() {
    var skeletonCost = Math.floor(10 * Math.pow(1.5,skeletons)); 
    if (bones >= skeletonCost) {
        skeletons = skeletons + 1;
        bones = bones - skeletonCost;
        document.getElementById('skeletons').innerHTML = skeletons;
        document.getElementById('bones').innerHTML = bones;
    };
    var nextSkeletonCost = Math.floor(10 * Math.pow(1.5,skeletons)); 
    document.getElementById('nextSkeletonCost').innerHTML = nextSkeletonCost;
}

// function save() {
//     localStorage.setItem("save",JSON.stringify(save));
// }

// main game loop
window.setInterval(function(){
    
}, 1000);