module.exports = (app) => {
    app.use((_, res, next) => {
        // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
        // res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        next()
    })
}
