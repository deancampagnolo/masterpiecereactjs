
export default class MPModel {
    constructor (public title: string, public neededInstruments: string[], public bpm: number, public key: string) {}
    static BlankMPModel (): MPModel {
        return new MPModel('default', [], -1, 'default')
    }
}
