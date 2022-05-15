import { createPixCode, createQrCode } from '@pix-qrcode/lib'
import express, { json } from 'express'

interface PixRequest {
  key: string
  amount: number
  name: string
  key_type: 'telefone' | 'cnpj' | 'cpf' | 'email'
  city: string
  size?: {
    width: number
    height: number
  }
}

const app = express()

app.use(json())

app.get('/api/gen-pix', (req, res) => {
  const { size, ...data } = req.body as PixRequest

  const code = createPixCode(
    data.key,
    data.amount,
    data.name,
    data.key_type,
    data.city
  )

  createQrCode(code, size)
    .then((qrcode) => {
      res.status(200).json({
        code,
        qrcode,
        ...data,
      })
    })
    .catch((error) => {
      res.status(502).json(error)
    })
})

export { app }
