import { mazeFloor, mazeMap } from './map.js';
import { mazeGame, mazeAction } from './game.js';
import { mazePlayer } from './player.js';

class mazeEnv {
    #map: mazeMap;
    #game: mazeGame;
    #player: mazePlayer;
    #log: [number,number][];
    #goal: boolean;
    get map(): mazeMap {
        return this.#map.copy;
    }
    get log(): [number,number][] {
        return this.#log.map(x=>[...x]);
    }
    constructor (map: mazeMap,player: mazePlayer) {
        this.#map = map;
        this.#game = new mazeGame(map);
        this.#player = player;
        this.#log = [this.#game.position];
        this.#goal = false;
    }
    start() {
        while (this.#step()) {}
    }
    #step() {
        let action = this.#player.nextAction(this.#game.copy);
        if (!this.#game.action(action)) {
            throw new Error("The player performed an illegal operation");
        }
        this.#log.push(this.#game.position);
        // 移動先がゴールであれば終了
        if (this.#map.get(...this.#game.position)==4) {
            this.#goal = true;
            return false;
        }
        return true;
    }
}

export { mazeEnv };