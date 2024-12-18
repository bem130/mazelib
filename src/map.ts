/**
 * Represents the type of floor in the maze.
 * - `0`: 見えない範囲
 * - `1`: 壁
 * - `2`: 動ける床
 * - `3`: スタート
 * - `4`: ゴール
 */
type mazeFloor= 0 | 1 | 2 | 3 | 4;

class mazeMap {
    /**
     * The 2D grid representing the maze.
     */
    map: Array<mazeFloor>[]
    /**
     * Creates a new maze map with the specified dimensions.
     * @param rows - The number of rows in the maze.
     * @param cols - The number of columns in the maze.
     */
    constructor(rows: number, cols: number) {
        this.map = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => 0 as mazeFloor)
        );
    }
    /**
     * Converts the maze map to a string representation.
     * @returns A string where each row is separated by a newline,
     * and cells are separated by spaces.
     */
    stringify(): string {
        return this.map
            .map(row => row.join(" "))
            .join("\n");
    }
}

const myMaze = new mazeMap(5, 5);
console.log(myMaze.stringify());

export { mazeMap };