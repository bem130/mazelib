import { mazeFloor, mazeMap } from 'map.js';

class mazeGame {
    #map: mazeMap;
    #time: number;
    #position: [number,number];
    get map(): mazeMap {
        return this.#map.copy;
    }
    get time(): number {
        return this.#time;
    }
    get position(): [number,number] {
        return [...this.#position];
    }
    constructor (map: mazeMap) {
        this.#map = map;
        this.#time = 0;
        if (map.start) {
            this.#position = map.start;
        }
        else {
            throw new Error("Maze map has no start")
        }
        if (map.goal) {
            throw new Error("Maze map has no goal")
        }
    }
    /**
     * ユーザーの行動を受け付けます
     * @param action mazeAction
     * @return accept
     */
    action(action: mazeAction): boolean {
        let accept = false;
        return accept;
    }
}

type mazeAction = {
    action: "move";
    direction: 0|1|2|3;
}

export { mazeGame, mazeAction };