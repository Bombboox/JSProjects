class Layer {
    constructor(nodes) {
        this.nodes = new Array(nodes).fill().map((x) => new Node());
        this.connections = [];
    }

    connect_to(layer) {
        this.connections = [];
        for(let node1 of this.nodes) {
            node1.output_connections = [];
            for(let node2 of layer.nodes) {
                let conn = new Connection(node1, node2, random(-10, 10));
                this.connections.push(conn);
                node1.output_connections.push(conn);
            } 
        }
    }

    activate() {
        for(let node of this.nodes) {
            node.activate();
        }
    }
    
    input(inputs) {
        let len = inputs.length;
        if(len != this.nodes.length) throw new Error('input: inputs must match size of nodes vector');
        for(let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].input_sum = inputs[i];
        }
    }

    get_values() {
        let outputs = [];
        for(let node of this.nodes) {
            outputs.push(node.output_value);
        }
        return outputs;
    }
    
    cross(layer) {
        let result = layer.clone();
        for(let i = 0; i < this.nodes.length; i++) {
            if(random(0, 1) > 0.5) {
                result.nodes[i].bias = this.nodes[i].bias;
            }
        }

        for(let i = 0; i < this.connections.length; i++) {
            if(random(0, 1) > 0.5) {
                result.connections[i].weight = this.connections[i].weight;
            }
        }

        return result;
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