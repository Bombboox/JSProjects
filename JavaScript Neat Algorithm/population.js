const breed = (population, offspring) => {
    let new_generation = [];
    let total_fitness = 0;

    for(let individual in population) {
        total_fitness += individual.fitness;
    }

    while(new_generation.length < offspring) {
        let parent_1;
        let parent_2;

        while(!parent_1) {
            let r1 = random(0, total_fitness);
            cum_fitness = 0;
            for(let individual in population) {
                cum_fitness += individual.fitness;

                if(cum_fitness > r1) {
                    parent_1 = individual;
                    break;
                }
            }
        }

        while(!parent_2) {
            let r1 = random(0, total_fitness);
            cum_fitness = 0;
            for(let individual in population) {
                cum_fitness += individual.fitness;

                if(cum_fitness > r1) {
                    parent_1 = individual;
                    break;
                }
            }
        }

        let child = new Individual();
        child.genome = parent_1.genome.crossover(parent_2.genome);
        child.genome.mutate();

        new_generation.append(child);
    }

    return new_generation;
}