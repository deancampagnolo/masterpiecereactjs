
export class UserProfileData {
    private static _instance: UserProfileData
    public static getInstance (): UserProfileData | null {
        if (this._instance == null) {
            return null
        }
        return this._instance
    }

    public static setInstance (googleUserObject: any): void {
        this._instance = new UserProfileData(googleUserObject.sub, googleUserObject.name, googleUserObject.picture)
    }

    private constructor (public userId: number, public name: string, public imageSrc: string) {}
}
