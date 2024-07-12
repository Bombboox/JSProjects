class NeuralNetwork {
    constructor(offspring = false, inputNodes = 2, hiddenNodes = 4, outputNodes = 2, hiddenLayers = 2) {
        this.layers = [];

        if(!offspring) {
            //Input Layer
            this.layers.push(new Layer(inputNodes));
            //Hidden Layers
            for(let i = 0; i < hiddenLayers; i++) {
                this.layers.push(new Layer(hiddenNodes));
            }
            //Output Layer
            this.layers.push(new Layer(outputNodes))

            this.fully_connect();
        }
    }

    fully_connect() {
        let len = this.layers.length;
        for(let i = 0; i < len - 1; i++) {
            this.layers[i].connect_to(this.layers[i + 1]);
        }
    }

    feed_forward(inputs) {
        let len = this.layers.length;

        this.layers[0].input(inputs);
        for(let i = 0; i < len; i++) {
            this.layers[i].activate();
        }

        return this.layers[len - 1].get_values();
    }
    
    crossover(brain) {
        let offspring = new NeuralNetwork(true);

        for(let i = 0; i < this.layers.length; i++) {
            offspring.layers[i] = this.layers[i].cross(brain.layers[i]);
        }

        return offspring;
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