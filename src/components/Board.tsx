const GameBoard = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex justify-center">
          {[0, 1, 2].map((col) => (
            <button
              key={col}
              className="w-16 h-16 bg-gray-200 border border-gray-400 flex items-center justify-center text-3xl font-bold focus:outline-none focus:bg-gray-300"
            >
              {/* You can put your logic for rendering X, O, or empty here */}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
