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
var gatherSoulEnergyOriginalText = "Gather Soul Energy";
var gatherBonesOriginalText = "Process a cadaver";
var gatherBloodOriginalText = "Collect vials of Blood";
var gatherCorpsesOriginalText = "Pilfer Graveyard";
var isGatheringSouls = false;
var isGatheringBones = false;
var isGatheringBlood = false;
var isGatheringCorpses = false;

function loadSavedGame() {
    console.log("Loading saved game, if it exists...")
    var savedGame = JSON.parse(localStorage.getItem("save"));
    if (typeof savedGame.soulEnergy !== "undefined") soulEnergy = savedGame.soulEnergy;
    if (typeof savedGame.bones !== "undefined") bones = savedGame.bones;
    if (typeof savedGame.blood !== "undefined") blood = savedGame.blood;
    if (typeof savedGame.corpses !== "undefined") corpses = savedGame.corpses;
    if (typeof savedGame.skeletons !== "undefined") skeletons = savedGame.skeletons;

    document.getElementById("soulEnergy").innerHTML = soulEnergy;
    document.getElementById("bones").innerHTML = bones;
    document.getElementById("blood").innerHTML = blood;
    document.getElementById("corpses").innerHTML = corpses;
    document.getElementById('skeletons').innerHTML = skeletons;
}

// at page load: load saved game if it exists
loadSavedGame();

function resetManualGather() {
    isGatheringSouls = false;
    if (soulEnergy < soulCap) {
        document.getElementById("gatherSoulEnergyButton").innerHTML = gatherSoulEnergyOriginalText;
    };
    isGatheringBones = false;
    if (soulEnergy < soulCap) {
        document.getElementById("gatherBonesButton").innerHTML = gatherBonesOriginalText;
    };
    isGatheringBlood = false;
    if (soulEnergy < soulCap) {
        document.getElementById("gatherBloodButton").innerHTML = gatherBloodOriginalText;
    };
    isGatheringCorpses = false;
    if (soulEnergy < soulCap) {
        document.getElementById("gatherCorpsesButton").innerHTML = gatherCorpsesOriginalText;
    };
};

function setGatherResource(currentResource) {
    resetManualGather();
    if (currentResource == "soulEnergy") {
        isGatheringSouls = true;
        document.getElementById("gatherSoulEnergyButton").innerHTML = "Gathering...";
    };
    if (currentResource == "bones") {
        isGatheringBones = true;
        document.getElementById("gatherBonesButton").innerHTML = "Gathering...";
    };
    if (currentResource == "blood") {
        isGatheringBlood = true;
        document.getElementById("gatherBloodButton").innerHTML = "Gathering...";
    };
    if (currentResource == "corpses") {
        isGatheringCorpses = true;
        document.getElementById("gatherCorpsesButton").innerHTML = "Gathering...";
    };
};

function collectCurrentManualResource() {
    if (isGatheringSouls) {
        collectSoulEnergy(1);
    };
    if (isGatheringBones) {
        collectBones(1);
    };
    if (isGatheringBlood) {
        collectBlood(1);
    };
    if (isGatheringCorpses) {
        collectCorpses(1);
    };
};

function collectSoulEnergy(number){
    if (soulEnergy < soulCap) {
        soulEnergy = soulEnergy + number;
        document.getElementById("soulEnergy").innerHTML = soulEnergy;
        document.getElementById("soulCap").innerHTML = soulCap;
    } else if (soulEnergy = soulCap) {
        document.getElementById("gatherSoulEnergyButton").innerHTML = "[SOUL ENERGY FULL]";
    };
};

function collectBones(number){
    if (bones < bonesCap) {
        bones = bones + number;
        document.getElementById("bones").innerHTML = bones;
        document.getElementById("bonesCap").innerHTML = bonesCap;
    } else if (bones = bonesCap) {
        document.getElementById("gatherBonesButton").innerHTML = "[BONES FULL]";
    };
};

function collectBlood(number){
    if (blood < bloodCap) {
        blood = blood + number;
        document.getElementById("blood").innerHTML = blood;
        document.getElementById("bloodCap").innerHTML = bloodCap;
    } else if (blood = bloodCap) {
        document.getElementById("gatherBloodButton").innerHTML = "[BLOOD FULL]";
    };
};

function collectCorpses(number){
    if (corpses < corpseCap) {
        corpses = corpses + number;
        document.getElementById("corpses").innerHTML = corpses;
        document.getElementById("corpseCap").innerHTML = corpseCap;
    } else if (corpses = corpseCap) {
        document.getElementById("gatherCorpsesButton").innerHTML = "[CORPSES FULL]";
    };
};


function summonSkeleton() {
    var skeletonCost = Math.floor(10 * Math.pow(1.5,skeletons)); 
    if (bones >= skeletonCost) {
    if (bones >= skeletonCost && skeletons < skeletonsCap) {
        skeletons = skeletons + 1;
        bones = bones - skeletonCost;
        document.getElementById('skeletons').innerHTML = skeletons;
        document.getElementById('bones').innerHTML = bones;
    };
    var nextSkeletonCost = Math.floor(10 * Math.pow(1.5,skeletons)); 
    document.getElementById('nextSkeletonCost').innerHTML = nextSkeletonCost;
}

// save game
function saveGame() {
    console.log("Saving game...");
    var save = {
        bones:bones,
        soulEnergy:soulEnergy,
        blood:blood,
        corpses:corpses,
        skeletons:skeletons
    }
    localStorage.setItem("save",JSON.stringify(save));
}

function deleteSave() {
    var doubleCheck = confirm("Are you sure you want to delete your save? This cannot be undone!");
    if (doubleCheck) {
        console.log("Deleting game save...");
        localStorage.removeItem("save");
    }
}

// reset all buildings, summons, prestige, as if game is starting anew.
function resetGame() {
    var doubleCheck = confirm("Are you sure you want to reset everything? THIS IS NOT A PRESTIGE. You will be starting over completely from scratch!");
    if (doubleCheck) {
        console.log("Resetting game...");
        localStorage.removeItem("save");
        bones = 0;
        soulEnergy = 0;
        blood = 0;
        corpses = 0;
        skeletons = 0;
        saveGame();
        document.getElementById("soulEnergy").innerHTML = soulEnergy;
        document.getElementById("bones").innerHTML = bones;
        document.getElementById("blood").innerHTML = blood;
        document.getElementById("corpses").innerHTML = corpses;
        document.getElementById('skeletons').innerHTML = skeletons;
    }
}

// main game loop
window.setInterval(function(){
    // gather whatever resource we have set to manual gathering
    collectCurrentManualResource();

}, 1000);