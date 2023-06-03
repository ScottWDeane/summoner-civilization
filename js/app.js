var soulEnergy = 0;
var soulCap = 10;
var bones = 0;
var bonesCap = 10;
var stone = 0;
var stoneCap = 10;
var corpses = 0;
var corpseCap = 10;
var skeletons = 0;
var skeletonsCap = 5;
var gatherSoulEnergyOriginalText = "Gather Soul Energy";
var gatherBonesOriginalText = "Process a cadaver";
var gatherStoneOriginalText = "Collect Stone";
var gatherCorpsesOriginalText = "Pilfer Graveyard";
var isGatheringSouls = false;
var isGatheringBones = false;
var isGatheringStone = false;
var isGatheringCorpses = false;
var skeletonsAssignedToSoulEnergyHarvesting = 0;
var maxSkeletonsSoulEnergyHarvesting = 1;
var skeletonsAssignedToBoneHarvesting = 0;
var maxSkeletonsBoneHarvesting = 1;
var skeletonsAssignedToStoneHarvesting = 0;
var maxSkeletonsStoneHarvesting = 1;
var skeletonsAssignedToCorpseHarvesting = 0;
var maxSkeletonsCorpseHarvesting = 1;

function loadSavedGame() {
    console.log("Loading saved game, if it exists...")
    var savedGame = JSON.parse(localStorage.getItem("save"));
    if (typeof savedGame.soulEnergy !== "undefined") soulEnergy = savedGame.soulEnergy;
    if (typeof savedGame.bones !== "undefined") bones = savedGame.bones;
    if (typeof savedGame.stone !== "undefined") stone = savedGame.stone;
    if (typeof savedGame.corpses !== "undefined") corpses = savedGame.corpses;
    if (typeof savedGame.skeletons !== "undefined") skeletons = savedGame.skeletons;

    document.getElementById("soulEnergy").innerHTML = soulEnergy;
    document.getElementById("bones").innerHTML = bones;
    document.getElementById("stone").innerHTML = stone;
    document.getElementById("corpses").innerHTML = corpses;
    document.getElementById('skeletons').innerHTML = skeletons;
}
};

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
    isGatheringStone = false;
    if (soulEnergy < soulCap) {
        document.getElementById("gatherStoneButton").innerHTML = gatherStoneOriginalText;
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
    if (currentResource == "stone") {
        isGatheringStone = true;
        document.getElementById("gatherStoneButton").innerHTML = "Gathering...";
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
    if (isGatheringStone) {
        collectStone(1);
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

function collectStone(number){
    if (stone < stoneCap) {
        stone = stone + number;
        document.getElementById("stone").innerHTML = stone;
        document.getElementById("stoneCap").innerHTML = stoneCap;
    } else if (stone = stoneCap) {
        document.getElementById("gatherStoneButton").innerHTML = "[BLOOD FULL]";
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
    var skeletonCost = calcSummonSkeletonCost(); 
    if (bones >= skeletonCost && skeletons < skeletonsCap) {
        skeletons = skeletons + 1;
        bones = bones - skeletonCost;
        document.getElementById('skeletons').innerHTML = skeletons;
        document.getElementById('bones').innerHTML = bones;
    };
    var nextSkeletonCost = calcSummonSkeletonCost(); 
    document.getElementById('nextSkeletonCost').innerHTML = nextSkeletonCost;
    document.getElementById('skeletonsCap').innerHTML = skeletonsCap;
};

function calcSummonSkeletonCost() {
    return Math.floor(10 * Math.pow(1.5,skeletons));
};

function updateAvailableSkeletons() {
    availableSkeletons = skeletons - skeletonsAssignedToSoulEnergyHarvesting - skeletonsAssignedToBoneHarvesting - skeletonsAssignedToStoneHarvesting - skeletonsAssignedToCorpseHarvesting;
    // TODO: add line to update any UI elements that refer to current number of skeletons available to assign labor
}

// save game
function saveGame() {
    console.log("Saving game...");
    var save = {
        bones:bones,
        soulEnergy:soulEnergy,
        stone:stone,
        corpses:corpses,
        skeletons:skeletons
    }
    localStorage.setItem("save",JSON.stringify(save));
};

function deleteSave() {
    var doubleCheck = confirm("Are you sure you want to delete your save? This cannot be undone!");
    if (doubleCheck) {
        console.log("Deleting game save...");
        localStorage.removeItem("save");
    }
};

// reset all buildings, summons, prestige, as if game is starting anew.
function resetGame() {
    var doubleCheck = confirm("Are you sure you want to reset everything? THIS IS NOT A PRESTIGE. You will be starting over completely from scratch!");
    if (doubleCheck) {
        console.log("Resetting game...");
        localStorage.removeItem("save");
        bones = 0;
        soulEnergy = 0;
        stone = 0;
        corpses = 0;
        skeletons = 0;
        saveGame();
        document.getElementById("soulEnergy").innerHTML = soulEnergy;
        document.getElementById("bones").innerHTML = bones;
        document.getElementById("stone").innerHTML = stone;
        document.getElementById("corpses").innerHTML = corpses;
        document.getElementById('skeletons').innerHTML = skeletons;
    }
};

// main game loop (1000 --> one "tick" a second, 100 --> ten "ticks" a second)
window.setInterval(function(){
    // gather selected manual resource
    collectCurrentManualResource();

    //debug/cheat mode... gather a bunch of resources automatically
