// This is generated code, I set it to between -60 and 0 db some of it may not be accurate, but I don't think it matters
// the dbValueToSliderValue does not correctly inversely map to the sliderValueToDbValue. This shouldn't be a big deal
// because it is only for the initial visual update of someone's mp loading.

export function sliderValueToDbValue (sliderValue: number): number {
    const logValue = Math.log10(sliderValue + 1) * 10
    let dbValue = (0 - (-60)) * ((logValue - 0) / (20 - 0)) + (-60)
    if (dbValue > 0) {
        dbValue = 0
    }
    return dbValue
}
export function dbValueToSliderValue (dbValue: number): number {
    const logValue = (dbValue + 60) / (60 / 20)
    const sliderValue = Math.pow(10, logValue / 10) - 1
    return sliderValue
}
