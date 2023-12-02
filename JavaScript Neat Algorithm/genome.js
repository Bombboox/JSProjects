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
                this.createNode('sensor', 0);
            }

            for(let i = 0; i < this.outputs; i++) {
                this.createNode('output', 1);
            }

            for(let i = 0; i < this.inputs; i++) {
                for(let o = this.inputs; o < this.nodes.length; o++) {
                    this.createConnection(i, o);
                }
            }
        }
    } 

    //creates a new node given type and layer
    createNode(type, layer) {
        this.nodes.push(new Node(this.nextNode, type, layer));
        this.nextNode++;
    }

    //creates a new connection given from node, to node, and weight
    createConnection(from, to, weight = random(-1, 1)) {
        let conn = new Connection(this.nodes[from], this.nodes[to], weight, true, this.innovationNumber)
        this.connections.push(conn);
        this.nodes[from].outputConnections.push(conn);
        this.innovationNumber++;
    }

    //adds already created node
    addNode(node) {
        this.nodes.push(node);
        this.nextNode++;
    } 

    //adds already created connection
    addConnection(conn) {
        this.connections.push(conn);
        conn.fromNode.outputConnections.push(conn);
        this.innovationNumber++;
    }

    //Checks if a valid connection can be made bwetewenw 2 nodes
    isConnectionValid(node1, node2) {
        if(node1.layer == node2.layer) {
            return false;
        }

        for(let conn of this.connections) {
            if(conn.fromNode == node1 && conn.toNode == node2 || conn.fromNode == node2 && conn.toNode == node1) {
                return false;
            }
        }

        return true;
    }

    //Generates a connection between 2 random nodes in the genome 😎
    generateConnection() {
        let pairs = []; //valid pairs of nodes that can be connected

        for(let node1 of this.nodes) {
            for(let node2 of this.nodes) {
                if(node1 != node2 && this.isConnectionValid(node1, node2)) {
                    pairs.push([node1, node2]);
                }
            }
        }

        if(pairs.length > 0) {
            let pair = pairs[randint(0, pairs.length - 1)];
            this.createConnection(pair[0], pair[1]);
        }
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

    crossover(partner) {
        let child = new Genome(this.inputs, this.outputs, true);

        let nodeMap = new Map(); //map that stores nodes from this genome and the partner genome
        let connectionSet = new Set(); //stores innovation numbers of connections from this genome and partner genome
    
        for(let node of this.nodes) {
            let copy = node.copy();
            child.addNode(copy);

            nodeMap.set(node.id, copy);
        }

        // Loop through the connections of the first parent
        for (let conn of this.connections) {
            // Check if the connection is enabled
            if (conn.enabled) {
            // Copy the connection to the child genome
            let copy = conn.copy(nodeMap);
        
            // Check if the partner genome has a connection with the same innovation number
            let match = partner.connections.find(c => c.innovationNumber == conn.innovationNumber);
        
            // If there is a match, randomly choose the weight from either connection
            if (match) {
                if (random(0, 1) < 0.5) {
                copy.weight = match.weight;
                }
            }
        
            // Add the connection to the child genome
            child.addConnection(copy);
        
            // Add the innovation number to the set
            connectionSet.add(conn.innovationNumber);
            }
        }

        for(let conn of partner.connections) {
            if(conn.enabled && !connectionSet.has(conn.innovationNumber)) {
                let copy = conn.copy(nodeMap);

                child.addConnection(copy);

                connectionSet.add(conn.innovationNumber);
            }
        }

        return child;
    }

    mutate(mutationRate = 0.02) {
        if(random(0, 1) < 0.8) { //80% chance to mutate weights
            for(let conn of this.connections) {
                conn.mutateWeight(mutationRate); 
            }
        }

        if(random(0, 1) < 0.5) { //50% chance to mutate node biases 
            for(let node of this.nodes) {
                node.mutateBias(mutationRate);
            }
        }

        if(random(0, 1) < 0.1) { //10% chance to mutate random nodes activation function
            let i = randint(0, this.nodes.length - 1);
            this.nodes[i].mutateActivation();
        }

        if(random(0, 1) < 0.05) { //5% chance to add connection
            this.generateConnection();
        } 
    }


}