const activations = ["abs", "clamped", "cube", "exp", "gauss", "hat", "identity", "inv", "log", "relu", "elu", "sigmoid", "tanh", "square", "sin"];

class Node {
    constructor(id, type) {
        this.id = id; // Unique identifier for the node
        this.type = type; // Type of the node ('sensor', 'hidden', 'output')
        this.inputSum = 0; // Sum of inputs
        this.outputValue = 0; // Output value of the node
        this.outputConnections = []; // List of connections to other nodes
        this.activation = randint(0, activations.length - 1); //Activation function randomly chose from array
        this.bias = random(-1, 1); //Random bias from -1 to 1
    }

    activate() {
        // Apply activation function 
        this.outputValue = window[activations[this.activation]](this.inputSum);
        
        // Reset input sum
        this.inputSum = 0;

        // For each output connection, send the output value * connection weight
        for(let i = 0; i < this.outputConnections.length; i++) {
            if(this.outputConnections[i].enabled) {
                this.outputConnections[i].toNode.inputSum += this.outputValue * this.outputConnections[i].weight;
            }
        }
    }
}