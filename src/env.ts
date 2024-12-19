import { mazeFloor, mazeMap } from './map.js';
import { mazeGame, mazeAction } from './game.js';
import { mazePlayer } from './player.js';
import { consoleOut, consoleAnimation, consoleAnimationNode } from './visualizer.js';

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
        this.#log = [this.position];
        this.#goal = false;
    }
    start() {
        this.#player.init(this.#game.copy);
        while (this.#step()) {}
        console.log(this.#goal);
    }
    #step() {
        let action = this.#player.nextAction(this.#game.copy);
        if (!this.#game.action(action)) {
            throw new Error("The player performed an illegal operation");
        }
        this.#log.push(this.position);
        // 移動先がゴールであれば終了
        if (this.#game.goal) {
            this.#goal = true;
            return false;
        }
        return true;
    }
    get position(): [number,number] {
        return [
            this.#game.position[0]+this.#map.start![0],
            this.#game.position[1]+this.#map.start![1],
        ];
    }
}

export { mazeEnv };