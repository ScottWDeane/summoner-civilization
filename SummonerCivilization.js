const app = Vue.createApp({
  data() {
    return {
      // basic resources
      soulEnergy: 0,
      soulCap: 100,
      bones: 0,
      bonesCap: 50,
      stone: 0,
      stoneCap: 50,
      corpses: 0,
      corpseCap: 50,
      // used for manual gathering logic
      isGatheringSouls: false,
      isGatheringBones: false,
      isGatheringStone: false,
      isGatheringCorpses: false,
      // basic buildings
      crypts: 1, // start with 1 on new game (hand-wave away as your lair)
      nextCryptCost: 10,
      ossuaries: 0,
      nextOssuaryCost: 10,
      rockpiles: 0,
      nextRockpileCost: 10,
      openPits: 0,
      nextOpenPitCost: 10,
      // skeleton laborers
      skeletons: 0,
      skeletonsCap: 1,
      nextSkeletonCost: 0,
      availableSkeletons: 0,
      // track skeleton labor
      skeletonsAssignedToSoulEnergyHarvesting: 0,
      maxSkeletonsSoulEnergyHarvesting: 1,
      skeletonsAssignedToBoneHarvesting: 0,
      maxSkeletonsBoneHarvesting: 1,
      skeletonsAssignedToStoneHarvesting: 0,
      maxSkeletonsStoneHarvesting: 1,
      skeletonsAssignedToCorpseHarvesting: 0,
      maxSkeletonsCorpseHarvesting: 1,
      skeletonLaborSoulEnergy: 0,
      skeletonLaborBones: 0,
      skeletonLaborStone: 0,
      skeletonLaborCorpses: 0
    }
  },
  created() {
    this.loadSavedGame(); // TODO: needs fixing
    setInterval(this.collectCurrentManualResource, 10);
    setInterval(this.collectSkeletonLabor, 10);
    this.calcSummonSkeletonCost();
    this.calcBuildOssuaryCost();
    this.calcBuildCryptCost();
    this.calcBuildRockpileCost();
    this.calcBuildOpenPitCost();
  },
  methods: {
    setGatherResource(currentResource) {
      this.resetManualGather();
      if (currentResource == "soulEnergy") {
        this.isGatheringSouls = true;
      };
      if (currentResource == "bones") {
        this.isGatheringBones = true;
      };
      if (currentResource == "stone") {
        this.isGatheringStone = true;
      };
      if (currentResource == "corpses") {
        this.isGatheringCorpses = true;
      };
    },
    collectCurrentManualResource() {
      if (this.isGatheringSouls) {
        this.collectSoulEnergy(1)
      }
      if (this.isGatheringBones) {
        this.collectBones(1)
      }
      if (this.isGatheringStone) {
        this.collectStone(1)
      }
      if (this.isGatheringCorpses) {
        this.collectCorpses(1)
      }
    },
    collectSoulEnergy(number) {
      if (this.soulEnergy < this.soulCap) {
        this.soulEnergy = this.soulEnergy + number;
        if (this.soulEnergy > this.soulCap) {
          this.soulEnergy = this.soulCap;
        }
      };
    },
    collectBones(number) {
      if (this.bones < this.bonesCap) {
        this.bones = this.bones + number;
        if (this.bones > this.bonesCap) {
          this.bones = this.bonesCap;
        }
      };
    },
    collectStone(number) {
      if (this.stone < this.stoneCap) {
        this.stone = this.stone + number;
        if (this.stone > this.stoneCap) {
          this.stone = this.stoneCap;
        }
      };
    },
    collectCorpses(number) {
      if (this.corpses < this.corpseCap) {
        this.corpses = this.corpses + number;
        if (this.corpses > this.corpseCap) {
          this.corpses = this.corpseCap;
        }
      };
    },
    resetManualGather() {
      this.isGatheringSouls = false;
      this.isGatheringBones = false;
      this.isGatheringStone = false;
      this.isGatheringCorpses = false;
    },
    summonSkeleton() {
      this.calcSummonSkeletonCost();
      if (this.bones >= this.nextSkeletonCost && this.skeletons < this.skeletonsCap) {
        this.skeletons = this.skeletons + 1;
        this.bones = this.bones - this.nextSkeletonCost;
        this.calcSummonSkeletonCost();
      }
    },
    calcSummonSkeletonCost() {
      this.nextSkeletonCost = Math.floor(10 * Math.pow(1.1, this.skeletons));
    },
    assignSkeletonToResource(selectedResource) {
      console.log("Attempting to assign a skeleton to a labor...")
      // check if we have any available skeletons
      this.updateAvailableSkeletons();
      if (this.availableSkeletons >= 1) {
        if (selectedResource == "soulEnergy" && this.skeletonsAssignedToSoulEnergyHarvesting < this.maxSkeletonsSoulEnergyHarvesting) {
          this.skeletonsAssignedToSoulEnergyHarvesting += 1;
        }
        else if (selectedResource == "bones" && this.skeletonsAssignedToBoneHarvesting < this.maxSkeletonsBoneHarvesting) {
          this.skeletonsAssignedToBoneHarvesting += 1;
        }
        else if (selectedResource == "stone" && this.skeletonsAssignedToStoneHarvesting < this.maxSkeletonsStoneHarvesting) {
          this.skeletonsAssignedToStoneHarvesting += 1;
        }
        else if (selectedResource == "corpses" && this.skeletonsAssignedToCorpseHarvesting < this.maxSkeletonsCorpseHarvesting) {
          this.skeletonsAssignedToCorpseHarvesting += 1;
        };
      };
      this.updateAvailableSkeletons();
    },
    removeSkeletonFromResource(selectedResource) {
      this.updateAvailableSkeletons();
      if (selectedResource == "soulEnergy" && this.skeletonsAssignedToSoulEnergyHarvesting > 0) {
        this.skeletonsAssignedToSoulEnergyHarvesting -= 1;
      }
      else if (selectedResource == "bones" && this.skeletonsAssignedToBoneHarvesting > 0) {
        this.skeletonsAssignedToBoneHarvesting -= 1;
      }
      else if (selectedResource == "stone" && this.skeletonsAssignedToStoneHarvesting > 0) {
        this.skeletonsAssignedToStoneHarvesting -= 1;
      }
      else if (selectedResource == "corpses" && this.skeletonsAssignedToCorpseHarvesting > 0) {
        this.skeletonsAssignedToCorpseHarvesting -= 1;
      };
      this.updateAvailableSkeletons();
    },
    updateAvailableSkeletons() {
      console.log("Available skeletons: " + this.availableSkeletons)
      this.availableSkeletons = this.skeletons - this.skeletonsAssignedToSoulEnergyHarvesting - this.skeletonsAssignedToBoneHarvesting - this.skeletonsAssignedToStoneHarvesting - this.skeletonsAssignedToCorpseHarvesting;
    },
    collectSkeletonLabor() {
      this.skeletonLaborSoulEnergy = this.skeletonsAssignedToSoulEnergyHarvesting * 1;
      this.collectSoulEnergy(this.skeletonLaborSoulEnergy);

      this.skeletonLaborBones = this.skeletonsAssignedToBoneHarvesting * 1;
      this.collectBones(this.skeletonLaborBones);

      this.skeletonLaborStone = this.skeletonsAssignedToStoneHarvesting * 1;
      this.collectStone(this.skeletonLaborStone);

      this.skeletonLaborCorpses = this.skeletonsAssignedToCorpseHarvesting * 1;
      this.collectCorpses(this.skeletonLaborCorpses);
    },
    buildCrypt() {
      this.calcBuildCryptCost();
      if (this.stone >= this.nextCryptCost) {
        this.crypts += 1;
        this.stone -= this.nextCryptCost;
        this.skeletonsCap = this.calcCryptSkeletonCap();
      }
    },
    calcBuildCryptCost() {
      this.nextCryptCost = Math.floor(10 * Math.pow(1.1, this.crypts));
    },
    calcCryptSkeletonCap() {
      return this.crypts * 1;
    },
    buildOssuary() {
      this.calcBuildOssuaryCost();
      if (this.stone >= this.nextOssuaryCost) {
        this.ossuaries += 1;
        this.stone -= this.nextOssuaryCost;
        this.bonesCap = this.calcOssuaryBonesCap();
        this.calcBuildOssuaryCost();
      }
    },
    calcBuildOssuaryCost() {
      this.nextOssuaryCost = Math.floor(10 * Math.pow(1.1, this.ossuaries));
    },
    calcOssuaryBonesCap() {
      return 50 + (this.ossuaries * 50);
    },
    buildRockpile() {
      this.calcBuildRockpileCost();
      if (this.stone >= this.nextRockpileCost) {
        this.rockpiles += 1;
        this.stone -= this.nextRockpileCost;
        this.stoneCap = this.calcRockpileStonesCap();
        this.calcBuildRockpileCost();
      }
    },
    calcBuildRockpileCost() {
      this.nextRockpileCost = Math.floor(10 * Math.pow(1.1, this.rockpiles));
    },
    calcRockpileStonesCap() {
      return 50 + (this.rockpiles * 50);
    },
    buildOpenPit() {
      this.calcBuildOpenPitCost();
      if (this.stone >= this.nextOpenPitCost) {
        this.openPits += 1;
        this.stone -= this.nextOpenPitCost;
        this.corpseCap = this.calcOpenPitCorpsesCap();
        this.calcBuildOpenPitCost();
      }
    },
    calcBuildOpenPitCost() {
      this.nextOpenPitCost = Math.floor(10 * Math.pow(1.1, this.openPits));
    },
    calcOpenPitCorpsesCap() {
      return 50 + (this.openPits * 50);
    },
    saveGame() {
      console.log("Saving game...");
      var save = {
        bones: this.bones,
        soulEnergy: this.soulEnergy,
        stone: this.stone,
        corpses: this.corpses,
        skeletons: this.skeletons,
        crypts: this.crypts,
        ossuaries: this.ossuaries,
        rockpiles: this.rockpiles,
        openPits: this.openPits,
        skeletonsAssignedToSoulEnergyHarvesting: this.skeletonsAssignedToSoulEnergyHarvesting,
        skeletonsAssignedToBoneHarvesting: this.skeletonsAssignedToBoneHarvesting,
        skeletonsAssignedToStoneHarvesting: this.skeletonsAssignedToStoneHarvesting,
        skeletonsAssignedToCorpseHarvesting: this.skeletonsAssignedToCorpseHarvesting
      }
      localStorage.setItem("save", JSON.stringify(save));
    },
    loadSavedGame() {
      console.log("Loading saved game, if it exists...");
      var savedGame = JSON.parse(localStorage.getItem("save"));

      if (savedGame) {
        console.log("Save game found. Loading...")
        if (typeof savedGame.soulEnergy !== "undefined") {
          this.soulEnergy = savedGame.soulEnergy;
        }
        if (typeof savedGame.bones !== "undefined") {
          this.bones = savedGame.bones;
        }
        if (typeof savedGame.stone !== "undefined") {
          this.stone = savedGame.stone;
        }
        if (typeof savedGame.corpses !== "undefined") {
          this.corpses = savedGame.corpses;
        }
        if (typeof savedGame.skeletons !== "undefined") {
          this.skeletons = savedGame.skeletons;
        }
        if (typeof savedGame.crypts !== "undefined") {
          this.crypts = savedGame.crypts;
        }
        if (typeof savedGame.ossuaries !== "undefined") {
          this.ossuaries = savedGame.ossuaries;
        }
        if (typeof savedGame.rockpiles !== "undefined") {
          this.rockpiles = savedGame.rockpiles;
        }
        if (typeof savedGame.openPits !== "undefined") {
          this.openPits = savedGame.openPits;
        }
        if (typeof savedGame.skeletonsAssignedToSoulEnergyHarvesting !== "undefined") {
          console.log("Assigned skeletons to soul energy: " + this.skeletonsAssignedToSoulEnergyHarvesting);
          this.skeletonsAssignedToSoulEnergyHarvesting = savedGame.skeletonsAssignedToSoulEnergyHarvesting;
          console.log("Assigned skeletons to soul energy 2: " + this.skeletonsAssignedToSoulEnergyHarvesting);
        }
        if (typeof savedGame.skeletonsAssignedToBoneHarvesting !== "undefined") {
          this.skeletonsAssignedToBoneHarvesting = savedGame.skeletonsAssignedToBoneHarvesting;
        }
        if (typeof savedGame.skeletonsAssignedToStoneHarvesting !== "undefined") {
          this.skeletonsAssignedToStoneHarvesting = savedGame.skeletonsAssignedToStoneHarvesting;
        }
        if (typeof savedGame.skeletonsAssignedToCorpseHarvesting !== "undefined") {
          this.skeletonsAssignedToCorpseHarvesting = savedGame.skeletonsAssignedToCorpseHarvesting;
        }
      }


    },
    deleteSave() {
      var doubleCheck = confirm("Are you sure you want to delete your save? This cannot be undone!");
      if (doubleCheck) {
        console.log("Deleting game save...");
        localStorage.removeItem("save");
      }
    }
  }
});
