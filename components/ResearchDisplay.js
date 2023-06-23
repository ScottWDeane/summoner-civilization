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
                    id: 'two-hands',
                    title: 'Two Hands',
                    cost: {
                        'Soul Energy': 100,
                        'Bones': 100
                    },
                    description: 'Refine your resurrection spell so that skeletons have both of their hands. Most of the time. <hr> Double all skeleton labor production.<hr>',
                    bonus: 2, // double all skeletons' labor
                    requirements: {
                    }
                },
                better_supports: {
                    id: 'better-supports',
                    title: 'Better Supports',
                    cost: {
                        'Soul Energy': 100,
                        'Stone': 100
                    },
                    description: 'Instruct your skeletons to build walls for the Rock Piles, increasing the amount of rocks that can be stored per pile. <hr> +50% storage capacity for Rock Piles.<hr>',
                    bonus: 1.5, // 50% bonus to rock pile storage capacity
                    requirements: {
                    }
                },
                lodestone_staff: {
                    id: 'lodestone-staff',
                    title: 'Lodestone Staff',
                    cost: {
                        'Soul Energy': 100,
                        'Bones': 500,
                        'Corpses': 500
                    },
                    description: 'Draw power from your skeletons and consume the middling life energy of some reagents to empower your staff. <hr> 500% increased maximum Soul Energy cap.<hr>',
                    bonus: 5, // 500% bonus (or, 5x) to maximum soul energy cap
                    requirements: {
                        skeletonsCap: 10
                    }
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
            this.selectedResearch = research.id;
            this.$emit('purchase-research', research.title, research.cost, research.bonus);
            // this.$emit('purchase-research', { id: this.available_research.id, costs: this.available_research.cost })
        }
    },
    template:
        /*html*/
        `
        <ul>
            <button 
            v-for="(research, index) in available_research" 
            class="tooltip button"> 
                {{ research.title }}
                <span 
                class="tooltiptext" 
                v-html="createTooltip(research)">
                </span>
            </button>
        </ul>
        `
})
