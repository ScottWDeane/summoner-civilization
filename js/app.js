// basic resources
var soulEnergy = 0;
var soulCap = 100;
var bones = 0;
var bonesCap = 50;
var stone = 0;
var stoneCap = 50;
var corpses = 0;
var corpseCap = 50;
// track which resoruce is being manually gathered
var isGatheringSouls = false;
var isGatheringBones = false;
var isGatheringStone = false;
var isGatheringCorpses = false;
// basic skeletons tracking
var skeletons = 0;
var skeletonsCap = 1;
var availableSkeletons = 0;
// tracking skeletons' labor
var skeletonsAssignedToSoulEnergyHarvesting = 0;
var maxSkeletonsSoulEnergyHarvesting = 1;
var skeletonsAssignedToBoneHarvesting = 0;
var maxSkeletonsBoneHarvesting = 1;
var skeletonsAssignedToStoneHarvesting = 0;
var maxSkeletonsStoneHarvesting = 1;
var skeletonsAssignedToCorpseHarvesting = 0;
var maxSkeletonsCorpseHarvesting = 1;
var skeletonLaborSoulEnergy;
var skeletonLaborBones;
var skeletonLaborStone;
var skeletonLaborCorpses;
// misc strings to use for UI
var gatherSoulEnergyOriginalText = "Gather Soul Energy";
var gatherBonesOriginalText = "Process a cadaver";
var gatherStoneOriginalText = "Collect Stone";
var gatherCorpsesOriginalText = "Pilfer Graveyard";
// basic buildings
var crypts = 1;
var ossuaries = 0;
var rockpiles = 0;
var openPits = 0;

function loadSavedGame() {
    console.log("Loading saved game, if it exists...");
    var savedGame = JSON.parse(localStorage.getItem("save"));

    if (typeof savedGame.soulEnergy !== "undefined") {
      soulEnergy = savedGame.soulEnergy;
      document.getElementById("soulEnergy").innerHTML = soulEnergy;
    };
    if (typeof savedGame.bones !== "undefined") {
      bones = savedGame.bones;
      document.getElementById("bones").innerHTML = bones;
    };
    if (typeof savedGame.stone !== "undefined") {
      stone = savedGame.stone;
      document.getElementById("stone").innerHTML = stone;
    };
    if (typeof savedGame.corpses !== "undefined") {
      corpses = savedGame.corpses;
      document.getElementById("corpses").innerHTML = corpses;
    };
    if (typeof savedGame.skeletons !== "undefined") {
      skeletons = savedGame.skeletons;
      document.getElementById('skeletons').innerHTML = skeletons;
    };
    if (typeof savedGame.crypts !== "undefined") {
        crypts = savedGame.crypts;
        document.getElementById('currentCrypts').innerHTML = crypts;
    };
    if (typeof savedGame.ossuaries !== "undefined") {
        ossuaries = savedGame.ossuaries;
        document.getElementById('currentOssuary').innerHTML = ossuaries;
    };
    if (typeof savedGame.rockpiles !== "undefined") {
        rockpiles = savedGame.rockpiles;
        document.getElementById('currentRockpiles').innerHTML = rockpiles;
    };
    if (typeof savedGame.openPits !== "undefined") {
        openPits = savedGame.openPits;
        document.getElementById('currentOpenPits').innerHTML = openPits;
    };
};

// *****************************************
// on page load
// *****************************************
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

function collectSkeletonLabor() {
    skeletonLaborSoulEnergy = skeletonsAssignedToSoulEnergyHarvesting * 1;
    collectSoulEnergy(skeletonLaborSoulEnergy);
    document.getElementById("soulEnergyCollectionRate").innerHTML = skeletonLaborSoulEnergy;

    skeletonLaborBones = skeletonsAssignedToBoneHarvesting * 1;
    collectBones(skeletonLaborBones);
    document.getElementById("bonesCollectionRate").innerHTML = skeletonLaborBones;

    skeletonLaborStone = skeletonsAssignedToStoneHarvesting * 1;
    collectStone(skeletonLaborStone);
    document.getElementById("stoneCollectionRate").innerHTML = skeletonLaborStone;

    skeletonLaborCorpses = skeletonsAssignedToCorpseHarvesting * 1;
    collectCorpses(skeletonLaborCorpses);
    document.getElementById("corpsesCollectionRate").innerHTML = skeletonLaborCorpses;
};

function collectSoulEnergy(number){
    if (soulEnergy < soulCap) {
        soulEnergy = soulEnergy + number;
        if (soulEnergy > soulCap) {
          soulEnergy = soulCap;
        }
        document.getElementById("soulEnergy").innerHTML = soulEnergy;
        document.getElementById("soulCap").innerHTML = soulCap;
    } else if (soulEnergy = soulCap) {
        document.getElementById("gatherSoulEnergyButton").innerHTML = "[SOUL ENERGY FULL]";
    };
};

function collectBones(number){
    if (bones < bonesCap) {
        bones = bones + number;
        if (bones > bonesCap) {
          bones = bonesCap;
        }
        document.getElementById("bones").innerHTML = bones;
        document.getElementById("bonesCap").innerHTML = bonesCap;
    } else if (bones = bonesCap) {
        document.getElementById("gatherBonesButton").innerHTML = "[BONES FULL]";
    };
};

function collectStone(number){
    if (stone < stoneCap) {
        stone = stone + number;
        if (stone > stoneCap) {
          stone = stoneCap;
        }
        document.getElementById("stone").innerHTML = stone;
        document.getElementById("stoneCap").innerHTML = stoneCap;
    } else if (stone = stoneCap) {
        document.getElementById("gatherStoneButton").innerHTML = "[BLOOD FULL]";
    };
};

function collectCorpses(number){
    if (corpses < corpseCap) {
        corpses = corpses + number;
        if (corpses > corpseCap) {
          corpses = corpseCap;
        }
        document.getElementById("corpses").innerHTML = corpses;
        document.getElementById("corpseCap").innerHTML = corpseCap;
    } else if (corpses = corpseCap) {
        document.getElementById("gatherCorpsesButton").innerHTML = "[CORPSES FULL]";
    };
};

function summonSkeleton() {
    var skeletonCost = calcSummonSkeletonCost(); 
    if (bones >= skeletonCost && skeletons <= skeletonsCap) {
        skeletons = skeletons + 1;
        bones = bones - skeletonCost;
        // update "gather bones" UI button's display
        if (isGatheringBones == false) {
          document.getElementById("gatherBonesButton").innerHTML = gatherBonesOriginalText;
        }
        else if (isGatheringBones) {
          document.getElementById("gatherBonesButton").innerHTML = "Gathering...";
        };
        document.getElementById('skeletons').innerHTML = skeletons;
        document.getElementById('bones').innerHTML = bones;
    };
    var nextSkeletonCost = calcSummonSkeletonCost(); 
    document.getElementById('nextSkeletonCost').innerHTML = nextSkeletonCost;
    document.getElementById('skeletonsCap').innerHTML = skeletonsCap;
};

function calcSummonSkeletonCost() {
    return Math.floor(10 * Math.pow(1.1,skeletons));
};

// for now, skeletons generate 1 resource a tick per assigned skeleton
function assignSkeletonToResource(selectedResource) {
    // check if we have any available skeletons
    updateAvailableSkeletons();
    if (availableSkeletons >= 1) {
        if (selectedResource == "soulEnergy" && skeletonsAssignedToSoulEnergyHarvesting < maxSkeletonsSoulEnergyHarvesting) {
            skeletonsAssignedToSoulEnergyHarvesting += 1;
            document.getElementById('numberOfSkeletonsHarvestingSoulEnergy').innerHTML = skeletonsAssignedToSoulEnergyHarvesting;
        } 
        else if (selectedResource == "bones" && skeletonsAssignedToBoneHarvesting < maxSkeletonsBoneHarvesting) {
            skeletonsAssignedToBoneHarvesting += 1;
            document.getElementById('numberOfSkeletonsHarvestingBones').innerHTML = skeletonsAssignedToBoneHarvesting;
        } 
        else if (selectedResource == "stone" && skeletonsAssignedToStoneHarvesting < maxSkeletonsStoneHarvesting) {
            skeletonsAssignedToStoneHarvesting += 1;
            document.getElementById('numberOfSkeletonsHarvestingStone').innerHTML = skeletonsAssignedToStoneHarvesting;
        } 
        else if (selectedResource == "corpses" && skeletonsAssignedToCorpseHarvesting < maxSkeletonsCorpseHarvesting) {
            skeletonsAssignedToCorpseHarvesting += 1;
            document.getElementById('numberOfSkeletonsHarvestingCorpses').innerHTML = skeletonsAssignedToCorpseHarvesting;
        };
    };
    updateAvailableSkeletons();
};

function removeSkeletonFromResource(selectedResource) {
    updateAvailableSkeletons();
    if (selectedResource == "soulEnergy" && skeletonsAssignedToSoulEnergyHarvesting > 0) {
        skeletonsAssignedToSoulEnergyHarvesting -= 1;
        document.getElementById('numberOfSkeletonsHarvestingSoulEnergy').innerHTML = skeletonsAssignedToSoulEnergyHarvesting;
    } 
    else if (selectedResource == "bones" && skeletonsAssignedToBoneHarvesting > 0) {
        skeletonsAssignedToBoneHarvesting -= 1;
        document.getElementById('numberOfSkeletonsHarvestingBones').innerHTML = skeletonsAssignedToBoneHarvesting;
    } 
    else if (selectedResource == "stone" && skeletonsAssignedToStoneHarvesting > 0) {
        skeletonsAssignedToStoneHarvesting -= 1;
        document.getElementById('numberOfSkeletonsHarvestingStone').innerHTML = skeletonsAssignedToStoneHarvesting;
    } 
    else if (selectedResource == "corpses" && skeletonsAssignedToCorpseHarvesting > 0) {
        skeletonsAssignedToCorpseHarvesting -= 1;
        document.getElementById('numberOfSkeletonsHarvestingCorpses').innerHTML = skeletonsAssignedToCorpseHarvesting;
    };
    updateAvailableSkeletons();
};

function updateAvailableSkeletons() {
    availableSkeletons = skeletons - skeletonsAssignedToSoulEnergyHarvesting - skeletonsAssignedToBoneHarvesting - skeletonsAssignedToStoneHarvesting - skeletonsAssignedToCorpseHarvesting;
}

function buildCrypt() {
  var cryptCost = calcBuildCryptCost();
  if (stone >= cryptCost) {
    crypts += 1;
    stone -= cryptCost;
    document.getElementById('stone').innerHTML = stone;
    document.getElementById('nextCryptCost').innerHTML = cryptCost;
    document.getElementById('currentCrypts').innerHTML = crypts;
    skeletonsCap = calcCryptSkeletonCap();
    document.getElementById('skeletonsCap').innerHTML = skeletonsCap;
  }
}

function calcBuildCryptCost() {
  return Math.floor(10 * Math.pow(1.1,crypts));
};

function calcCryptSkeletonCap() {
    // placeholder: each crypt increases max skeletons by a flat "1" per crypt.
    // will later be replaced with more complicated formula related to other game mechanics
    return crypts * 1;
}

function buildOssuary() {
    var ossuaryCost = calcBuildOssuaryCost();
    if (stone >= ossuaryCost) {
      ossuaries += 1;
      stone -= ossuaryCost;
      document.getElementById('stone').innerHTML = stone;
      document.getElementById('nextOssuaryCost').innerHTML = ossuaryCost;
      document.getElementById('currentOssuaries').innerHTML = ossuaries;
      bonesCap = calcOssuaryBonesCap();
      document.getElementById('bonesCap').innerHTML = bonesCap;
    }
}

function calcBuildOssuaryCost() {
    return Math.floor(10 * Math.pow(1.1,ossuaries));
}

function calcOssuaryBonesCap() {
    return 50 + (ossuaries * 50);
}

// rockpiles
function buildRockpile() {
    var rockpileCost = calcBuildRockpileCost();
    if (stone >= rockpileCost) {
        rockpiles += 1;
        stone -= rockpileCost;
        document.getElementById('stone').innerHTML = stone;
        document.getElementById('nextRockpileCost').innerHTML = rockpileCost;
        document.getElementById('currentRockpiles').innerHTML = rockpiles;
        stoneCap = calcRockpileStonesCap();
        document.getElementById('stoneCap').innerHTML = stoneCap;
    }
}

function calcBuildRockpileCost() {
    return Math.floor(10 * Math.pow(1.1,rockpiles));
}

function calcRockpileStonesCap() {
    return 50 + (rockpiles * 50);
}

// Open Pits
function buildOpenPit() {
    var openPitCost = calcBuildOpenPitCost();
    if (stone >= openPitCost) {
        openPits += 1;
        stone -= openPitCost;
        document.getElementById('stone').innerHTML = stone;
        document.getElementById('nextOpenPitCost').innerHTML = openPitCost;
        document.getElementById('currentOpenPits').innerHTML = openPits;
        corpseCap = calcOpenPitCorpsesCap();
        document.getElementById('corpseCap').innerHTML = corpseCap;
    }
}

function calcBuildOpenPitCost() {
    return Math.floor(10 * Math.pow(1.1,openPits));
}

function calcOpenPitCorpsesCap() {
    return 50 + (openPits * 50);
}

// save game
function saveGame() {
    console.log("Saving game...");
    var save = {
        bones:bones,
        soulEnergy:soulEnergy,
        stone:stone,
        corpses:corpses,
        skeletons:skeletons,
        crypts:crypts,
        ossuaries:ossuaries,
        rockpiles:rockpiles,
        openPits:openPits
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
        crypts = 1;
        ossuaries = 0;
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
    // gather skeleton's labor
    collectSkeletonLabor();

    //debug/cheat mode... gather a bunch of resources automatically
    // collectSoulEnergy(5);
    // collectBones(5);
    // collectStone(5);
    // collectCorpses(5);

}, 100);