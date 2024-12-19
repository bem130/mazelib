import { mazeFloor, mazeMap } from 'map.js';
import { mazeGame, mazeAction } from 'game.js';

abstract class mazePlayer {
    abstract nextAction(game:mazeGame): mazeAction;
}

export { mazePlayer };