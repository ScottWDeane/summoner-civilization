app.component('research-display', {
    data() {
        return {
            available_research: {
                two_hands: {
                    id: 'two-hands',
                    title: 'Two Hands',
                    cost: {
                        'soulEnergy': 100,
                        'bones': 100
                    },
                    description: 'Refine your resurrection spell so that skeletons have both of their hands. Most of the time.',
                    bonus: 2, // double all skeletons' labor
                    requirements: {
                        owned_settlements: 0
                    }
                },
                better_supports: {
                    id: 'better-supports',
                    title: 'Better Supports',
                    cost: {
                        'soulEnergy': 100,
                        'stone': 100
                    },
                    description: 'Instruct your skeletons to build walls for the Rock Piles, increasing the amount of rocks that can be stored per pile.',
                    bonus: 1.5, // 50% bonus to rock pile storage capacity
                    requirements: {
                        owned_settlements: 0
                    }
                },
                lodestone_staff: {
                    id: 'lodestone-staff',
                    title: 'Lodestone Staff',
                    cost: {
                        'soulEnergy': 100,
                        'bones': 500,
                        'corpses': 500
                    },
                    description: 'Draw power from your skeletons and consume the middling life energy of some... reagants... and complete a ritual to empower your staff. Increase your maximum capacity for Soul Energy.',
                    bonus: 5, // 500% bonus (or, 5x) to maximum soul energy cap
                    requirements: {
                        owned_settlements: 0,
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
            
            <button v-for="(research, index) in available_research"> 
            {{ research.title }} 
            <div>
                {{ research.description }}
            </div>
            </button>
        </ul>
        <div>--------------------------------------------------------------------</div>
        `
})