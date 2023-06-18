const app = Vue.createApp({
  data() {
    return {
      soulEnergy: 0,
      soulCap: 100,
      bones: 0,
      bonesCap: 50,
      stone: 0,
      stoneCap: 50,
      corpses: 0,
      corpseCap: 50,
      isGatheringSouls: false,
      isGatheringBones: false,
      isGatheringStone: false,
      isGatheringCorpses: false,
    }
  },
  async created() {
    setInterval(this.collectCurrentManualResource, 100);
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
    }
  }
});
