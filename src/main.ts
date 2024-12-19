import { mazeFloor, mazeMap } from './map.js';
import { mazeGame, mazeAction, moveDir, moveDirLookup, Direction, flipDir } from './game.js';
import { mazePlayer } from './player.js';
import { mazeEnv } from './env.js';
import { consoleOut, consoleAnimation, consoleAnimationNode } from './visualizer.js';
import { data2d } from './tool.js';

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
            let dir = moveDir[Math.floor(Math.random()*4)];
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
    // スタートとゴールをランダムに選ぶ
    {
        let lx = Math.floor(Math.random()*x);
        let ly = Math.floor(Math.random()*y);
        maze.set(lx*2+1,ly*2+1,3);
    }
    {
        let lx = Math.floor(Math.random()*x);
        let ly = Math.floor(Math.random()*y);
        // スタートとゴールが一緒にならないように
        while (maze.get(lx*2+1,ly*2+1)==3) {
            lx = Math.floor(Math.random()*x);
            ly = Math.floor(Math.random()*y);
        }
        maze.set(lx*2+1,ly*2+1,4);
    }
    return maze;
}

class randomlyMoving extends mazePlayer {
    constructor() {
        super();
    }
    nextAction(game: mazeGame): mazeAction {
        let candidate: Direction[] = [];
        for (let i of [0,1,2,3] as Direction[]) {
            if (game.surroundings[i]!=1) { candidate.push(i); }
        }
        let dir = candidate[Math.floor(Math.random()*candidate.length)];
        return {action:"move",direction:dir};
    }
}
class DepthFirstMoving extends mazePlayer {
    map: data2d<mazeFloor|0>; // 0は到達済
    stack: [number,number][];
    actionStack: Direction[];
    constructor() {
        super();
        this.map = new data2d();
        this.stack = [];
        this.actionStack = [];
    }
    init(game: mazeGame): void {
        this.map = new data2d();
        this.stack = [game.position];
        this.actionStack = [];
    }
    nextAction(game: mazeGame): mazeAction {
        let movedir: Direction = 0;
        const [x,y] = this.stack[this.stack.length-1];
        // 新たに分かった範囲をmapに追加
        for (let i of [0,1,2,3] as Direction[]) {
            if (this.map.get(...this.movedp(x,y,i))!=0) {
                this.map.set(...this.movedp(x,y,i),game.surroundings[i]);
            }
        }
        // 現在の位置を訪問済みに
        if (this.map.get(x,y)!=0) {
            this.map.set(x,y,0);
        }
        // 周りの探索
        for (let i of [0,1,2,3] as Direction[]) {
            if (this.map.get(...this.movedp(x,y,i))!=1&&this.map.get(...this.movedp(x,y,i))!=0) {
                this.stack.push(this.movedp(x,y,i));
                this.actionStack.push(i);
                movedir = i;
                return {action:"move",direction:movedir};
            }
        }
        // 移動できなかった場合、バックトラックする
        this.stack.pop();
        return {action:"move",direction:flipDir(this.actionStack.pop()!)};
    }
    /** 移動後の座標 */
    movedp(x:number,y:number,dir:Direction): [number,number] {
        return [x+moveDir[dir][0],y+moveDir[dir][1]];
    }
}

// const env = new mazeEnv(mazeGenerator1(10,10),new randomlyMoving());
const env = new mazeEnv(mazeGenerator1(55,27),new DepthFirstMoving());
consoleOut(env.map);
env.start();
console.log("");
consoleAnimationNode(env);