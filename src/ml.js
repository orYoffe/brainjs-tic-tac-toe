import trainedNet from "./trainedNet";

const boardMapping = {
  null: 0,
  X: 1,
  O: -1,
};

const decideTurn = (board) => {
  const normelisedBoard = board.map((val, i) => boardMapping[`${val}`]);
  console.log(
    "--¯_(ツ)_/¯-----------normelisedBoard----------",
    normelisedBoard
  );

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
  return response.index;
};

export default decideTurn;
