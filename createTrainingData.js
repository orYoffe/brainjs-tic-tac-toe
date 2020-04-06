const brain = require("brain.js");
const fs = require("fs");
const data = require("./data");

const config = {
  binaryThresh: 0.5,
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: "sigmoid", // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

const network = new brain.NeuralNetwork(config);
/*

  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
s0 = square 0

0 = empty
1 = X (Ex)
-1 = O (Circle)
*/
function processLargeArrayAsync(array, fn) {
  return new Promise((resolve) => {
    const chunk = 100;
    let index = 0;
    function doChunk() {
      let cnt = chunk;
      while (cnt-- && index < array.length) {
        // callback called with args (value, index, array)
        fn.call(null, array[index], index, array);
        ++index;
      }
      if (index < array.length) {
        // set Timeout for async iteration
        setTimeout(doChunk, 1);
      } else {
        resolve();
      }
    }
    doChunk();
  });
}

console.log("--¯_(ツ)_/¯-----------started training...----------");
const preparedTrainingData = [];
processLargeArrayAsync(data, (set) => {
  //   const currentPosition = set.slice(9);
  //   const board = set.slice(0, 9);
  //   for (let position = 0; position < 9; position++) {
  //     preparedTrainingData.push({
  //       input: { board, position },
  //       output: currentPosition === position ? 1 : 0
  //     });
  //   }
  preparedTrainingData.push({
    input: set.slice(0, 9),
    output: set.slice(9),
  });
}).then(() => {
  console.log(
    "--¯_(ツ)_/¯-----------preparedTrainingData----------",
    preparedTrainingData
  );
  const board = [-1, 0, 1, 0, 1, 0, 0, 0, 0];

  console.log("--¯_(ツ)_/¯-----------done preparing array----------");
  network.train(preparedTrainingData);
  const result = network.run(board);
  console.log(
    "--¯_(ツ)_/¯-----------network.run([-1, 0, 1, 0, 1, 0, 0, 0, 0])----------",
    network.run(board)
  );
  const emptySpaces = board
    .map((space, index) => {
      return space === 0 ? result[index] : null;
    })
    .filter((space) => {
      return space !== null;
    });

  console.log("--¯_(ツ)_/¯-----------emptySpaces----------", emptySpaces);
  const sortedSpaces = emptySpaces.sort(function (a, b) {
    return b - a;
  })[0];
  console.log("--¯_(ツ)_/¯-----------sortedSpaces----------", sortedSpaces);
  const response = {
    index: result.indexOf(sortedSpaces),
  };
  console.log("--¯_(ツ)_/¯-----------response----------", response);
  fs.writeFileSync(
    "./src/trainedNet.js",
    `export default ${network.toFunction().toString()};`
  );
  console.log("youve done it");
  console.log("--¯_(ツ)_/¯-----------done training----------");
});
