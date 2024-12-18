class mazeMap {
    /**
     * Creates a new maze map with the specified dimensions.
     * @param rows - The number of rows in the maze.
     * @param cols - The number of columns in the maze.
     */
    constructor(rows, cols) {
        this.map = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
    }
    /**
     * Converts the maze map to a string representation.
     * @returns A string where each row is separated by a newline,
     * and cells are separated by spaces.
     */
    stringify() {
        return this.map
            .map(row => row.join(" "))
            .join("\n");
    }
}
const myMaze = new mazeMap(5, 5);
console.log(myMaze.stringify());
export { mazeMap };
