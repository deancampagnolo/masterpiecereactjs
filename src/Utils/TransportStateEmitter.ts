export default class TransportStateEmitter {
    listeners = [] as Array<(arg0: boolean) => void>
    emit (isPlaying: boolean): void {
        this.listeners
            .forEach(
                (callback) => {
                    // eslint-disable-next-line n/no-callback-literal
                    callback(isPlaying)
                }
            )
    }

    on (callback: (arg0: boolean) => void): void {
        this.listeners.push(callback)
    }

    reset (): void {
        this.listeners = []
    }
}
