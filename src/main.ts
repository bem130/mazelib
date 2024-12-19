import { mazeFloor, mazeMap } from './map.js';
import { mazeGame, mazeAction } from './game.js';
import { mazePlayer } from './player.js';
import { mazeEnv } from './env.js';
import { consoleOut, consoleAnimation, consoleAnimationNode } from './visualizer.js';

function mazeGenerator1(x:number,y:number): mazeMap {
    let maze = mazeMap.fromSize(x*2+1,y*2+1);
    // 一旦全てのマスを壁にする
    for (let i=0;i<y*2+1;i++) {
        for (let j=0;j<x*2+1;j++) {
            maze.set(j,i,1);
        }
    }
    // 迷路の通路を作る
    {
        function unvisited() {
            for (let i=0;i<y;i++) {
                for (let j=0;j<x;j++) {
                    if (maze.get(j*2+1,i*2+1)==1) { return true; }
                }
            }
            return false;
        }
        { // 最初の1マスをランダムに作る
            let lx = Math.floor(Math.random()*x);
            let ly = Math.floor(Math.random()*y);
            maze.set(lx*2+1,ly*2+1,2);
        }
        while (unvisited()) {
            // 1マスランダムに選ぶ
            let lx = Math.floor(Math.random()*x);
            let ly = Math.floor(Math.random()*y);
            // 未生成のマスか確認
            if (maze.get(lx*2+1,ly*2+1)!=1) { continue; }
            // 一方向ランダムに選ぶ
            let dir = [[1,0],[0,1],[-1,0],[0,-1]][Math.floor(Math.random()*4)];
            // 選んだ方向が範囲内か確認
            if (lx+dir[0]<0||lx+dir[0]>=x) { continue; }
            if (ly+dir[1]<0||ly+dir[1]>=y) { continue; }
            // 進んだ方向が床か確認
            if (maze.get(lx*2+1+dir[0]*2,ly*2+1+dir[1]*2)==1) { continue; }
            // 床を設置
            maze.set(lx*2+1,ly*2+1,2);
            maze.set(lx*2+1+dir[0],ly*2+1+dir[1],2);
        }
    }
    // 左上と右下をスタート/ゴールにする
    maze.set(1,1,3);
    maze.set(x*2-1,y*2-1,4);
    return maze;
}

class randomlyMoving extends mazePlayer {
    constructor() {
        super();
    }
    nextAction(game: mazeGame): mazeAction {
        let candidate: (0|1|2|3)[] = [];
        for (let i of [0,1,2,3] as (0|1|2|3)[]) {
            if (game.surroundings[i]!=1) { candidate.push(i); }
        }
        let dir = candidate[Math.floor(Math.random()*candidate.length)];
        return {action:"move",direction:dir};
    }
}

const env = new mazeEnv(mazeGenerator1(10,10),new randomlyMoving());
consoleOut(env.map);
env.start();
console.log("");
consoleAnimationNode(env)