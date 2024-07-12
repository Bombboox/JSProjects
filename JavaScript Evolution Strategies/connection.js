class Connection {
    constructor(from_node, to_node, weight) {
        this.from_node = from_node;
        this.to_node = to_node; 
        this.weight = weight;
    }

    mutate_weight(mutationRate) {
        let rand = random(0, 1);
        let a = 0.02; //Probability of case 1 
        let b = 0.02; //Probability of case 2
        let c = 0.02; //Probability of case 3

        if(rand < a) { //Replace with new value
            this.weight = random(-1, 1);
            return 0;
        }

        if(rand < a + b) { //Multiply by random percentage
            this.weight *= random(0.5, 1.5);
            return 0;
        }

        if(rand < a + b + c) { //Add random number
            this.weight += random(-1, 1);
            return 0;
        }

        //Add random gaussian number gigachad
        this.weight += gaussian_random() * mutationRate;
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