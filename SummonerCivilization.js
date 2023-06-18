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
      // skeleton laborers
      skeletons: 0,
      skeletonsCap: 1,
      nextSkeletonCost: 0,
    }
  },
  async created() {
    setInterval(this.collectCurrentManualResource, 10);
    this.calcSummonSkeletonCost();
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
      }
      this.calcSummonSkeletonCost();
    },
    calcSummonSkeletonCost() {
      this.nextSkeletonCost = Math.floor(10 * Math.pow(1.1, this.skeletons));

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
      }
    },
    calcBuildRockpileCost() {
      this.nextRockpileCost = Math.floor(10 * Math.pow(1.1, this.rockpiles));
    },
    calcRockpileStonesCap() {
      return 50 + (this.rockpiles * 50);
    }
  }
});
