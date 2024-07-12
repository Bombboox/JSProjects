class Node {
    constructor() {
        this.input_sum = 0;
        this.output_value = 0;
        this.output_connections = [];
        this.bias = random(-1, 1);
    }

    mutate_bias(mutation_rate) {
        let rand = random(0, 1);
        let a = 0.02; //Probability of case 1 
        let b = 0.02; //Probability of case 2
        let c = 0.02; //Probability of case 3

        if(rand < a) { //Replace with new value
            this.bias = random(-1, 1);
            return 0;
        }

        if(rand < a + b) { //Multiply by random percentage
            this.bias *= random(0.5, 1.5);
            return 0;
        }

        if(rand < a + b + c) { //Add random number
            this.bias += random(-1, 1);
            return 0;
        }

        //Add random gaussian number, like gaussian distribution, like the bell curve thing, like its close to 0 basically
        this.bias += gaussian_random() * mutation_rate;
    }

    activate() {
        // Apply activation function 
        this.output_value = sigmoid(this.input_sum + this.bias);
        
        // Reset input sum
        this.input_sum = 0;

        // For each output connection, send the output value * connection weight
        for(let i = 0; i < this.output_connections.length; i++) {
            this.output_connections[i].to_node.input_sum += this.output_value * this.output_connections[i].weight;
        }
    }

    clone() {
        const clonedLayer = Object.create(Object.getPrototypeOf(this));
        for (let key of Reflect.ownKeys(this)) {
          const val = this[key];
          clonedLayer[key] = (val instanceof Array) ? val.map(x => Array.isArray(x) ? x.slice() : x.clone()) : val;
        }
        return clonedLayer;
      }
}