const fs = require('fs');
const path = require('path');

// Prompt: Write a program that finds a path to an exit (bonus: shortest path to an exit)

// Strategy: Implement a weighted graph.
// Use dijkstra's algorithm to find shortest paths from src to other nodes.
// Use minPath method to compare exit paths and return shortest path.

// Assumptions: Assume user can choose source node. Accessing door costs 1 unit of energy.

// Run: Create new graph with numRooms and matrix of roomDetails.
// Then, call graph's minPath method with source node

class Graph {
  constructor(numRooms, roomDetails) {
    this.exits = {};
    this.matrix = [];
    // initialize matrix
    for (let i = 0; i <= numRooms; i += 1) {
      let row = [];
      for (let j = 0; j <= numRooms; j += 1) {
        row[j] = 0;
      }
      this.matrix.push(row);
    }
    // add door connections to matrix
    for (let i = 0; i < roomDetails.length; i += 1) {
      for (let j = 0; j < roomDetails[i].length; j += 1) {
        if (j === 0) {
          // store exits
          if (roomDetails[i][j] == 1) this.exits[i] = true;
          continue;
        }
        let door = roomDetails[i][j];
        this.matrix[i][door] = 1;
        this.matrix[door][i] = 1;
      }
    }
  }
  // find shortest path from source node to other nodes
  // return paths and distances
  dijkstra(src) {
    const dist = [];
    const visited = [];
    const prevPath = [];
    const path = [];
    const INF = Infinity;
    const length = this.matrix.length;
    for (let i = 0; i < length; i += 1) {
      dist[i] = INF;
      visited[i] = false;
      prevPath[i] = undefined;
      path[i] = '';
    }
    dist[src] = 0;
    prevPath[src] = 0;
    for (let i = 0; i < length - 1; i += 1 ) {
      const u = this.minDistance(dist, visited);
      visited[u] = true;
      for (let v = 0; v < length; v += 1) {
        if (!visited[v] && this.matrix[u][v] !== 0 && dist[u] !== INF && dist[u] + this.matrix[u][v] < dist[v]) {
          dist[v] = dist[u] + this.matrix[u][v];
          // store shortest path from src to end node
          prevPath[v] = u;
          if (prevPath[v]) {
            path[v] += path[prevPath[v]] + ' ' + v;
          } else {
            path[v] += '0' + ' ' + v;
          }
        }
      }
    }
    return [path, dist];
  }
  // min distance between two points
  minDistance(dist, visited, path) {
    let min = Infinity;
    let minIndex = -1;
    for (let v = 0; v < dist.length; v += 1) {
      if (visited[v] === false && dist[v] <= min) {
        min = dist[v];
        minIndex = v;
      }
    }
    return minIndex;
  }
  // get shortest route to any exit
  minPath(src) {
    const [paths, dists] = this.dijkstra(src);
    let exit;
    for (let posExit in this.exits) {
      if (!exit) exit = posExit;
      if (dists[posExit] < dists[exit]) exit = posExit;
    }
    return paths[exit];
  }
}

const files = process.argv.slice(2);
files.forEach((file) => {
  const output2 = fs.readFile(file, 'utf8', (err, data) => {
    const parsedData = data.split('\n');
    let numDoors;
    let doorDetails = [];
    for (let i = 0; i < parsedData.length; i += 1) {
      if (i === 0) numDoors = parsedData[i];
      else {
        let door = parsedData[i].split(',');
        doorDetails.push(door);
      }
    }
    const graph = new Graph(numDoors, doorDetails);
    console.log('shortest path is', graph.minPath(0));
  });
});