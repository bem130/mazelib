/**
 * 迷路の床の種類を表します。
 * - `0`: 見えない範囲
 * - `1`: 壁
 * - `2`: 動ける床
 * - `3`: スタート
 * - `4`: ゴール
 */
type mazeFloor = 0 | 1 | 2 | 3 | 4;

/**
 * 迷路のマップのデータを表すClass
 */
class mazeMap {
    /**
     * 迷路を表す2D配列
     */
    #map: mazeFloor[][]
    /**
     * 迷路を表す2D配列
     * @return 複製された迷路
     */
    get map(): mazeFloor[][] {
        const size = this.size;
        let map: mazeFloor[][] = Array.from({length:size[1]},()=>Array.from({length:size[0]},()=>0));
        for (let i in map) {
            for (let j of map[i]) {
                map[i][j] = this.#map[i][j];
            }
        }
        return map;
    }
    /**
     * 迷路の大きさ [横,縦]
     */
    get size(): [number,number] {
        return [this.#map[0].length,this.#map.length];
    }
    /**
     * 2次元配列を素に`mazeMap`を作る
     * @param map - 迷路を表す2D配列
     */
    constructor(map: mazeFloor[][] = [[]]) {
        this.#map = map;
    }
    /**
     * 迷路の大きさが`size`の0で埋められた`mazeMap`を作る
     * @param size - [横,縦]
     */
    static fromSize(size: [number,number]): mazeMap {
        return new mazeMap(
            Array.from({length:size[1]},
                ()=>Array.from({length:size[0]},
                    ()=>0
                )
            )
        );
    }
    /**
     * `mazeMap.stringify`で作った文字列を素に`mazeMap`を作る
     * @param str 各行をコンマで区切った文字列
     */
    static fromString(str: string): mazeMap {
        return new mazeMap(mazeMap.parse(str));
    }
    /**
     * `mazeMap.stringify`で作った文字列を素に`mazeFloor[][]`を作る
     * @param str 各行をコンマで区切った文字列
     */
    static parse(str: string): mazeFloor[][] {
        // 文字列を数値の配列に変換する
        let map_: number[][] = str.split(",").map(row=>row.split("").map(Number)); // mazeFloor[][]かどうか分かっていない状態
        // 配列の形をチェックする
        let size: number[] = [map_[0].length,map_.length];
        for (let row of map_) {
            if (row.length!=size[0]) {
                throw new TypeError("Invalid maze shape. Mazes must be rectangular.");
            }
        }
        // 値がmazeFloorかどうか確認しながらコピーする
        let map: mazeFloor[][] = Array.from({length:size[1]},()=>Array.from({length:size[0]},()=>0));
        let specialFloor: {start:number,goal:number} = {start:0,goal:0}
        for (let i in map_) {
            for (let j of map_[i]) {
                const value = map_[i][j]
                if (value==0||value==1||value==2||value==3||value==4) {
                    map[i][j] = value;
                    // スタートとゴールを数える
                    if (value==3) {
                        specialFloor.start++;
                    }
                    if (value==4) {
                        specialFloor.goal++;
                    }
                }
                else {
                    throw new TypeError("Invalid floor type. Must be 0,1,2,3,4.");
                }
            }
        }
        // スタートとゴールの数を確認する
        // スタート/ゴールのマスがmazeFloorが0の時は見えないので、スタート/ゴールが0であるのは問題ない
        if (specialFloor.start>1) { throw new Error(`Invalid maze. There are ${specialFloor.start} starts.`) }
        if (specialFloor.goal>1) { throw new Error(`Invalid maze. There are ${specialFloor.goal} goals.`) }
        return map;
    }
    /**
     * 迷路を文字列で表します
     * @return 各行をコンマで区切った文字列
     * `mazeMap.parse`を使って`mazeMap`に戻せる
     */
    stringify(): string {
        return this.#map
            .map(row => row.join(""))
            .join(",");
    }
}

const myMaze = mazeMap.fromSize([5,5]);
console.log(myMaze.stringify());
console.log(mazeMap.fromString(myMaze.stringify()).stringify());

export { mazeMap };