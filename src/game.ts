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
     * プレイヤーの位置 [x,y]
     */
    get position(): [number,number] {
        return [...this.#position];
    }
    get copy(): mazeGame {
        return new mazeGame(this.#map.copy,this.time,this.position);
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
}

type mazeAction = {
    action: "move";
    direction: 0|1|2|3;
}
const moveDir = {
    0: [1,0],
    1: [0,1],
    2: [-1,0],
    3: [0,-1],
}
function moveDirLookup(x:-1|0|1,y:-1|0|1) {
    if (x==0&&y==0) { return 0; }
    if (x==0&&y==1) { return 1; }
    if (x==-1&&y==0) { return 2; }
    if (x==0&&y==-1) { return 3; }
    return false;
}

export { mazeGame, mazeAction, moveDir,moveDirLookup };