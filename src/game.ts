import { mazeFloor, mazeMap } from './map.js';

class mazeGame {
    #map: mazeMap;
    #time: number;
    #position: [number,number];
    get surroundings() {
        let res: mazeFloor[] = [];
        for (let i of [0,1,2,3] as (0|1|2|3)[]) {
            res.push(this.#map.get(...this.#position.map((x,j)=>x+moveDir[i][j]) as [number,number]));
        }
        return res;
    }
    get time(): number {
        return this.#time;
    }
    /**
     * プレイヤーの位置 [x,y] (スタート位置からの相対位置)
     */
    get position(): [number,number] {
        return [
            this.#position[0]-this.#map.start![0],
            this.#position[1]-this.#map.start![1],
        ];
    }
    // get position(): [number,number] {
    //     return [...this.#position];
    // }
    get copy(): mazeGame {
        return new mazeGame(this.#map.copy,this.time,[...this.#position]);
    }
    constructor (map: mazeMap,time: number=0,position: [number,number]=map.start?map.start:[1,1]) {
        this.#map = map;
        this.#time = time;
        if (map.start!=null) {
            this.#position = position;
        }
        else {
            throw new Error("Maze map has no start");
        }
        if (map.goal==null) {
            throw new Error("Maze map has no goal");
        }
    }
    /**
     * ユーザーの行動を受け付けます
     * @param action mazeAction
     * @return accept
     */
    action(action: mazeAction): boolean {
        if (action.action=="move") {
            // 移動先の壁の確認
            let newPosition: [number,number] = this.#position.map((x,i)=>x+moveDir[action.direction][i]) as [number,number];
            if (this.#map.get(...newPosition)==1) {
                return false;
            }
            else {
                this.#position = newPosition;
                return true;
            }
        }
        return false;
    }
    get goal(): boolean {
        // console.log(this.#map.map)
        return this.#map.get(...this.#position)==4;
    }
}

type Direction = 0|1|2|3;
type mazeAction = {
    action: "move";
    direction: Direction;
}
const moveDir = [
    [1,0],
    [0,1],
    [-1,0],
    [0,-1],
]
function moveDirLookup(x:-1|0|1,y:-1|0|1) {
    if (x==0&&y==0) { return 0; }
    if (x==0&&y==1) { return 1; }
    if (x==-1&&y==0) { return 2; }
    if (x==0&&y==-1) { return 3; }
    return false;
}
function flipDir(dir: Direction): Direction {
    if (dir==0) { return 2; }
    if (dir==1) { return 3; }
    if (dir==2) { return 0; }
    if (dir==3) { return 1; }
    return 0;
}

export { mazeGame, mazeAction, moveDir, moveDirLookup, Direction, flipDir };