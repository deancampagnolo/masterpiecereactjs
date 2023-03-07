import React from 'react'
import FacebookLogin from 'react-facebook-login'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { GoogleLogin } from '@react-oauth/google'

export default function Login (): ReactJSXElement {
    const responseFacebook = (response: any): any => {
        console.log('Facebook Response')
        console.log(response)
    }

    const responseGoogle = (response: any): any => {
        console.log('Google Response')
        console.log(response)
    }

    return (
        <div className="App">
            <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>

            <FacebookLogin // FIXME I have localhost added as an acceptable domain for this
                appId="729668058597678"
                fields="name,email,picture"
                callback={responseFacebook}
            />
            <br />
            <br />

            <div>
                <h2>React Google Login</h2>
                <br />
                <br />
                <GoogleLogin onSuccess={responseGoogle} onError={console.error} />
            </div>

        </div>
    )
}
