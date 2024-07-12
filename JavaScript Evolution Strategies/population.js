class Population {
    constructor(numIndividuals, individualTemplate) {
        this.pop = [];
        this.individualTemplate = individualTemplate;

        for(let i = 0; i < numIndividuals; i++) {
            let copy = new individualTemplate();
            this.pop.push(copy);
        }
    }

    breed() {
        // Sort the population in descending order of fitness
        let sortedPop = this.pop.sort((a, b) => b.fitness - a.fitness);
        console.log(sortedPop);
    
        // Select the top 50% of individuals
        let survivors = sortedPop.slice(0, Math.ceil(0.5 * sortedPop.length));
    
        // Randomly breed individuals from the survivors
        let offspring = [];
        while (offspring.length < this.pop.length) {
            let parent1 = survivors[randint(0, survivors.length - 1)];
            let parent2 = survivors[randint(0, survivors.length - 1)];
    
            let child = parent1.breed(parent2, this.individualTemplate);
    
            offspring.push(child);
        }
    
        // Replace the current population with the new generation
        this.pop = offspring;
    }

    average_fitness() {
        var totalFitness = this.pop.reduce(function(sum, individual) {
            return sum + individual.fitness;
        }, 0);
        var averageFitness = totalFitness / this.pop.length;
        return averageFitness;
    }

    render(c) {
        for(let individual of this.pop) {
            individual.render(c);
        }
    }
}