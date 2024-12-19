import { mazeFloor, mazeMap } from './map.js';
import { mazeGame, mazeAction } from './game.js';
import { mazePlayer } from './player.js';
import { mazeEnv } from './env.js';

const consoleChar = {
    0: "OO",
    1: "\x1b[32mWW\x1b[0m",
    2: "  ",
    3: "\x1b[41ms \x1b[49m",
    4: "\x1b[44mg \x1b[49m",
    5: "\x1b[47m p\x1b[49m",
    6: " .",
    7: "\x1b[44mgp\x1b[49m",
}
async function consoleAnimation(env: mazeEnv,tspan: number=0): Promise<void> {
    let t = 0;
    consoleOut(env.map);
    async function animate(): Promise<void> {
        return new Promise((resolve) => {
            function step() {
                consoleOut(env.map, env.log.slice(0, t));
                t++;
                if (t <= env.log.length) {
                    setTimeout(step, tspan);
                } else {
                    resolve();
                }
            }
            step();
        });
    }

    await animate();
}
async function consoleAnimationNode(env: mazeEnv,tspan: number=0): Promise<void> {
    let t = 0;
    consoleOutNode(env.map);
    console.log("");
    async function animate(): Promise<void> {
        return new Promise((resolve) => {
            function step() {
                console.log(`\x1b[${env.map.size[1]+2}A`);
                consoleOutNode(env.map, env.log.slice(0, t));
                console.log(`${t} /${env.log.length}`);
                t++;
                if (t <= env.log.length) {
                    setTimeout(step, tspan);
                } else {
                    resolve();
                }
            }
            step();
        });
    }

    await animate();
}

function consoleOut(map: mazeMap,log: [number,number][]=[]) {
    type datatype = mazeFloor|5|6|7;
    let data: datatype[][] = map.map;
    for (let pos of log) {
        data[pos[1]][pos[0]] = 6;
        if (map.map[pos[1]][pos[0]]==3) { data[pos[1]][pos[0]] = 3; }
    }
    if (log.length>0) {
        let pos = log[log.length-1];
        if (map.map[pos[1]][pos[0]]==4) { data[pos[1]][pos[0]] = 7; }
        else { data[pos[1]][pos[0]] = 5; }
    }
    let str = data.map(row=>row.map((x:datatype)=>consoleChar[x]).join("")).join("\n");
    console.log(str);
}
function consoleOutNode(map: mazeMap,log: [number,number][]=[]) {
    type datatype = mazeFloor|5|6|7;
    let data: datatype[][] = map.map;
    for (let pos of log) {
        data[pos[1]][pos[0]] = 6;
        if (map.map[pos[1]][pos[0]]==3) { data[pos[1]][pos[0]] = 3; }
    }
    if (log.length>0) {
        let pos = log[log.length-1];
        if (map.map[pos[1]][pos[0]]==4) { data[pos[1]][pos[0]] = 7; }
        else { data[pos[1]][pos[0]] = 5; }
    }
    let str = data.map(row=>row.map((x:datatype)=>consoleChar[x]).join("")).join("\n");
    console.log(str);
}

export { consoleAnimation, consoleAnimationNode, consoleOut, consoleOutNode };