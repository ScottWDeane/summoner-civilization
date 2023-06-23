app.component('research-display', {
    props: {
        soulEnergy: {
            type: String
        },
        bones: {
            type: Number
        },
        stone: {
            type: Number
        },
        corpses: {
            type: Number
        },
        skeletons: {
            type: Number
        },
        skeletonsCap: {
            type: Number
        }
    },
    data() {
        return {
            available_research: {
                two_hands: {
                    id: 1,
                    title: 'Two Hands',
                    cost: {
                        'Soul Energy': 5,
                        'Bones': 5
                    },
                    description: 'Refine your resurrection spell so that skeletons have both of their hands. Most of the time. <hr> Double all skeleton labor production.<hr>',
                    bonus: 2, // double all skeletons' labor
                    requirements: {
                    },
                    purchased: false
                },
                better_supports: {
                    id: 2,
                    title: 'Better Supports',
                    cost: {
                        'Soul Energy': 5,
                        'Stone': 5
                    },
                    description: 'Instruct your skeletons to build walls for the Rock Piles, increasing the amount of rocks that can be stored per pile. <hr> +50% storage capacity for Rock Piles.<hr>',
                    bonus: 1.5, // 50% bonus to rock pile storage capacity
                    requirements: {
                    },
                    purchased: false
                },
                lodestone_staff: {
                    id: 3,
                    title: 'Lodestone Staff',
                    cost: {
                        'Soul Energy': 5,
                        'Bones': 5,
                        'Corpses': 5
                    },
                    description: 'Draw power from your skeletons and consume the middling life energy of some reagents to empower your staff. <hr> 500% increased maximum Soul Energy cap.<hr>',
                    bonus: 5, // 500% bonus (or, 5x) to maximum soul energy cap
                    requirements: {
                        skeletonsCap: 10
                    },
                    purchased: false
                }
            }
        }
    },
    methods: {
        // take in one Research upgrade.
        // Extract Title, Description, and Cost
        // build out a string of HTML so the tooltip would render like this:
        // Ensure your skeletons are resurrected with two hands.
        // -----------------------------------------------------
        // Double all Skeleton Labor production.
        // -----------------------------------------------------
        // 100 Soul Energy
        // 100 Bones
        // 100 Corpses
        createTooltip(currentResearch) {
            var toolTipText = currentResearch.description;
            // add all the individual cost values
            for (const [key, value] of Object.entries(currentResearch.cost)) {
                toolTipText = toolTipText + " " + key + " " + value + "<br>";
            }
            return toolTipText;
        },
        purchaseResearch(research) {
            // first, check if we can actually afford the upgrade.
            var canAfford = this.canAffordResearch(research.cost);

            // if we can afford the upgrade, emit to the parent the info we want
            if (canAfford) {
                console.log("We can afford this upgrade.")
                this.$emit('purchase-research', research.title, research.cost, research.bonus);
            } else if (!canAfford) {
                console.log("Cannot afford upgrade.")
            }

        },
        canAffordResearch(allResourceCosts) {
            var enoughResources = false;
            for (const [key, value] of Object.entries(allResourceCosts)) {
                if (key == "Soul Energy" && this.soulEnergy >= value) {
                    enoughResources = true;
                } else if (key == "Soul Energy" && this.soulEnergy < value) {
                    enoughResources = false;
                    break;
                }
                if (key == "Bones" && this.bones >= value) {
                    enoughResources = true;
                } else if (key == "Bones" && this.bones < value) {
                    enoughResources = false;
                    break;
                }
                if (key == "Stone" && this.stone >= value) {
                    enoughResources = true;
                } else if (key == "Stone" && this.stone < value) {
                    enoughResources = false;
                    break;
                }
                if (key == "Corpses" && this.corpses >= value) {
                    enoughResources = true;
                } else if (key == "Corpses" && this.corpses < value) {
                    enoughResources = false;
                    break;
                }
            }
            return enoughResources ? true : false;
        }
    },
    template:
        /*html*/
        `


        <div class="research-display">
        <div v-for="(research, index) in available_research" :key="index.id">
            <button 
            v-on:click="purchaseResearch(research)"
            class="tooltip button"> 
                {{ research.title }}
                <span 
                class="tooltiptext" 
                v-html="createTooltip(research)">
                </span>
            </button>
        </div>
        </div>
        `
})
