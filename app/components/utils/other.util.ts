type ObjectType = { [key: string]: any };


export function containsObject(array: ObjectType[], target: ObjectType): boolean {
    return array.some(obj => JSON.stringify(obj) === JSON.stringify(target));
}

export function createMap(array: any[]): Map<string, boolean> {
    const map = new Map<string, boolean>();
    array.forEach(item => {
        map.set(item.id, true);
    });
    return map;
}