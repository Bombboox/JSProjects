class Connection {
    constructor(fromNode, toNode, weight, enabled, innovation) {
        this.fromNode = fromNode; // Node from which the connection originates
        this.toNode = toNode; // Node to which the connection leads
        this.weight = weight; // Weight of the connection
        this.enabled = enabled; // Boolean indicating whether the connection is enabled
        this.innovation = innovation; // Unique identifier for the connection
    }
}