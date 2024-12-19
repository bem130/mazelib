interface Dic<T> {
    // キーは文字列で扱う
    [key: string]: T;
}

/** 2次元のデータを管理する */
class data2d<T> {
    data: Dic<T>
    constructor () {
        this.data = {};
    }
    set(x:number,y:number,value:T) {
        this.data[[x,y].join(",")] = value;
        return this;
    }
    get(x:number,y:number,defaltValue:T|null=null): T|null {
        if (this.data.hasOwnProperty([x,y].join(","))) {
            return this.data[[x,y].join(",")];
        }
        else {
            return defaltValue;
        }
    }
}

export { data2d };