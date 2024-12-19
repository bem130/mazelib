import { mazeFloor, mazeMap } from './map.js';
import { mazeGame, mazeAction } from './game.js';
import { mazePlayer } from './player.js';
import { mazeEnv } from './env.js';

const consoleChar = {
    0: "OO",
    1: "WW",
    2: "  ",
    3: "s.",
    4: "g ",
    5: " p", // player
    6: " .", // visited
}
async function consoleAnimation(env: mazeEnv): Promise<void> {
    let t = 0;
    consoleOut(env.map);
    async function animate(): Promise<void> {
        return new Promise((resolve) => {
            function step() {
                consoleOut(env.map, env.log.slice(0, t));
                t++;
                if (t < env.log.length) {
                    setTimeout(step, 0);
                } else {
                    resolve();
                }
            }
            step();
        });
    }

    await animate();
}
async function consoleAnimationNode(env: mazeEnv): Promise<void> {
    let t = 0;
    consoleOut(env.map);
    console.log("");
    async function animate(): Promise<void> {
        return new Promise((resolve) => {
            function step() {
                console.log(`\x1b[${env.map.size[1]+2}A`);
                consoleOut(env.map, env.log.slice(0, t));
                console.log(`${t} /${env.log.length}`);
                t++;
                if (t < env.log.length) {
                    setTimeout(step, 0);
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
    type datatype = 0|1|2|3|4|5|6;
    let data: datatype[][] = map.map;
    for (let pos of log) {
        data[pos[1]][pos[0]] = 6;
        if (map.map[pos[1]][pos[0]]==3) { data[pos[1]][pos[0]] = 3; }
    }
    if (log.length>0) {
        let pos = log[log.length-1];
        data[pos[1]][pos[0]] = 5;
    }
    let str = data.map(row=>row.map((x:datatype)=>consoleChar[x]).join("")).join("\n");
    console.log(str);
}

export { consoleAnimation, consoleAnimationNode, consoleOut };