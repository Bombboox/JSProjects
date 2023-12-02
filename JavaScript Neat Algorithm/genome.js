class Genome {
    constructor(inputs, outputs, offspring = false) {
        this.connections = [];
        this.nodes = [];

        this.inputs = inputs; //number of input nodes
        this.outputs = outputs; //number of output nodes
        this.offspring = offspring; //boolean, is it baby or no

        this.layers = 2;
        this.nextNode = 1;
        this.innovationNumber = 1;



        if(!offspring) {
            for(let i = 0; i < this.inputs; i++) {
                this.addNode('sensor', 0);
            }

            for(let i = 0; i < this.outputs; i++) {
                this.addNode('output', 1);
            }

            for(let i = 0; i < this.inputs; i++) {
                for(let o = this.inputs; o < this.nodes.length; o++) {
                    this.addConnection(i, o);
                }
            }
        }
    }
    

    addNode(type, layer) {
        this.nodes.push(new Node(this.nextNode, type, layer));
        this.nextNode++;
    }

    addConnection(from, to, weight = random(-1, 1)) {
        let conn = new Connection(this.nodes[from], this.nodes[to], weight, true, this.innovationNumber)
        this.connections.push(conn);
        this.nodes[from].outputConnections.push(conn);
        this.innovationNumber++;
    }

    run() {
        // Sort the nodes by their layer
        this.nodes.sort((a, b) => a.layer - b.layer);
      
        // Activate the input nodes
        for (let i = 0; i < this.inputs; i++) {
          this.nodes[i].activate();
        }
      
        // Activate the hidden and output nodes
        for (let i = this.inputs; i < this.nodes.length; i++) {
            this.nodes[i].activate();
        }
      
        // Return the output values of the output nodes
        let output = [];
        for (let i = 0; i < this.outputs; i++) {
          output.push(this.nodes[this.nodes.length - this.outputs + i].outputValue);
        }

        return output;
      }
}