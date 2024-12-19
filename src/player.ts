import { mazeFloor, mazeMap } from './map.js';
import { mazeGame, mazeAction } from './game.js';

abstract class mazePlayer {
    constructor() {}
    abstract nextAction(game:mazeGame): mazeAction;
    init(game:mazeGame): void {};
}

export { mazePlayer };