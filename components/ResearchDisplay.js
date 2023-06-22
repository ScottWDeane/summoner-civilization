app.component('research-display', {
    data() {
        return {
            available_research: {
                two_hands: {
                    id: 'two-hands',
                    title: 'Two Hands',
                    cost: {
                        'Soul Energy': 100,
                        'bones': 100
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
                        'stone': 100
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
                        'bones': 500,
                        'corpses': 500
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
    template:
        /*html*/
        `
        <div>--------------------------------------------------------------------</div>
        <div> Research and Upgrades </div>
        <ul>
            
            <button 
                v-for="(research, index) in available_research" 
                class="tooltip button"> 
                    {{ research.title }} 
                <span 
                    class="tooltiptext" 
                    v-html="research.description">
                </span>
            </button>
        </ul>
        <div>--------------------------------------------------------------------</div>
        `
})