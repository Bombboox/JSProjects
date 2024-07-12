class Individual {
    constructor(inputs = 2, hidden_nodes = 4, outputs = 2, hidden_layers = 2) {
        this.brain = new NeuralNetwork(false, inputs, hidden_nodes, outputs, hidden_layers);
        this.fitness = 0;
    }

    breed(mate, individualTemplate) {
        let offspring = new individualTemplate();
        offspring.brain = this.brain.crossover(mate.brain);
        return offspring; 
    }

    render() {
        console.log('Please define render method for inherited class, sir 🥺.');
    }
}