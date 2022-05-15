# @pix-qrcode/lib

## createPixCode()
args: `key`, `amount`, `name`, `key_time`, `city`

`key`: string key for pix transaction  
`amount`: number in BRL for transfer amount  
`name`: string of the name of the beneficiary  
`key_type`: string of one of the `'telefone' | 'cnpj' | 'cpf' | 'email'` types  
`city`: string of the city of the transfer  

## createQrCode()
args: `data`, `size`: `{ width, height }`

`data`: string of any data, best used with `createPixCode()`  
`size`: object with `{ width, height }`