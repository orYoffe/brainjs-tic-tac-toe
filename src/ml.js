import trainedNet from "./trainedNet";

const boardMapping = {
  null: 0,
  X: 1,
  O: -1,
};

const decideTurn = (board) => {
  console.log("--¯_(ツ)_/¯-----------board----------", board);
  //   const normelisedBoard = {};
  //   board.forEach((val, i) => {
  //     normelisedBoard[i] = boardMapping[`${val}`];
  //   });
  const normelisedBoard = board.map((val, i) => boardMapping[`${val}`]);
  console.log(
    "--¯_(ツ)_/¯-----------normelisedBoard----------",
    normelisedBoard
  );

  //   const options = [];
  //   let probability;
  //   normelisedBoard.forEach((val, position) => {
  //     if (val !== 0) {
  //       return;
  //     }
  //     probability = network.run({ board: normelisedBoard, position });
  //     console.log("--¯_(ツ)_/¯-----------probability----------", probability);
  //     options.push({ position, probability });
  //   });

  //   console.log("--¯_(ツ)_/¯-----------options----------", options);
  const result = trainedNet(normelisedBoard);
  console.log("--¯_(ツ)_/¯-----------result----------", result);
  const emptySpaces = normelisedBoard
    .map((space, index) => {
      return space === 0 ? result[index] : null;
    })
    .filter((space) => {
      return space !== null;
    });
  console.log("--¯_(ツ)_/¯-----------emptySpaces----------", emptySpaces);
  const response = {
    index: result.indexOf(
      emptySpaces.sort(function (a, b) {
        return b - a;
      })[0]
    ),
  };
  console.log("--¯_(ツ)_/¯-----------response----------", response);
  //   const probability = network.run(normelisedBoard);
  //   console.log("--¯_(ツ)_/¯-----------probability----------", probability);
  //   console.log(
  //     "--¯_(ツ)_/¯-----------parseInt(res * 10000000) - 999999----------",
  //     parseInt(res * 10000000) - 999999
  //   );
  //   console.log(
  //     "--¯_(ツ)_/¯-----------parseInt(res * 10) + 1----------",
  //     parseInt(res * 10) + 1
  //   );

  //   const likely = brain.likely(normelisedBoard, network);
  //   console.log("--¯_(ツ)_/¯-----------likely----------", likely);
  return response.index;
};

export default decideTurn;
