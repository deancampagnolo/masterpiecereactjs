import { Subdivision, TimeObject } from 'tone/build/esm/core/type/Units'
import { Time } from 'tone'

export default class TimeMap {
    private readonly timeMap
    constructor (map?: Map<Subdivision, number>, nudgeObject?: TimeObject) {
        if (map != null) {
            this.timeMap = map
        } else if (nudgeObject != null) {
            this.timeMap = this.nudgeObjectToMap(nudgeObject)
        } else {
            this.timeMap = new Map<Subdivision, number>()
        }
    }

    private nudgeObjectToMap (nudgeObject: TimeObject): Map<Subdivision, number> {
        const newMap = new Map<Subdivision, number>()
        Object.entries(nudgeObject).forEach((value, index, array) => {
            // @ts-expect-error
            newMap.set(value[0], value[1])
        })
        return newMap
    }

    add (sub: Subdivision, num: number): void {
        if (this.timeMap.has(sub)) {
            const prevNum = this.timeMap.get(sub)
            if (prevNum != null) {
                this.timeMap.set(sub, prevNum + num)
            }
        } else {
            this.timeMap.set(sub, num)
        }
    }

    private invert (): void {
        this.timeMap.forEach((value, key, map) => {
            map.set(key, value * -1)
        })
    }

    createNewInvertedMap (): TimeMap {
        const newTimeMap = new TimeMap(new Map(this.timeMap))
        newTimeMap.invert()
        return newTimeMap
    }

    toSeconds (): number {
        return Time(this.getObject()).toSeconds()
    }

    getObject (): TimeObject {
        return Object.fromEntries(this.timeMap)
    }
}
