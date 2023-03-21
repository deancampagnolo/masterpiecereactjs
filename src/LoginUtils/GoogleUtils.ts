import jwtDecode from 'jwt-decode'
import { UserProfileData } from './UserProfileData'
import { Theme } from '@mui/material'

export default class GoogleOAuthHelper {
    private static _instance: GoogleOAuthHelper
    public static getInstance (): GoogleOAuthHelper | null {
        if (this._instance == null) {
            this._instance = new GoogleOAuthHelper()
        }
        return this._instance
    }

    private constructor () {
        this.initializeGoogleOAuth()
    }

    private initializeGoogleOAuth (): void {
        /* global google */
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        google.accounts.id.initialize({
            client_id: '472860389992-n2lus5eb5tikpt5jqc4lk4h5esvuf5i2.apps.googleusercontent.com',
            callback: (response: any) => {
                const userObject = jwtDecode(response.credential)
                UserProfileData.setInstance(userObject)
                this.emit()
            },
            auto_select: true

        })
    }

    public showPrompt (): void {
        // @ts-expect-error
        google.accounts.id.prompt()
    }

    public renderGoogleOAuthButton (theme?: Theme): void {
        let size = 'large'
        let text = 'signin_with'
        if (theme != null) {
            const { innerWidth } = window
            if (innerWidth < theme.breakpoints.values.md) {
                size = 'medium'
                text = 'signin'
            }
        }
        // @ts-expect-error
        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: 'outline', size, text }
        )
    }

    listeners = [] as Array<() => void>
    emit (): void {
        this.listeners
            .forEach(
                (callback) => {
                    // eslint-disable-next-line n/no-callback-literal
                    callback()
                }
            )
    }

    public onAuthSuccess (callback: () => void): void {
        this.listeners.push(callback)
    }

    reset (): void {
        this.listeners = []
    }
}
