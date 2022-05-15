import { toDataURL } from 'qrcode'
import { Merchant } from 'steplix-emv-qrcps'

const createPixCode = (
  key: string,
  amount: number,
  name: string,
  key_type: 'telefone' | 'cnpj' | 'cpf' | 'email',
  city: string
) => {
  if (key_type !== 'email') key = key.replace(/\D/g, '')
  if (key_type === 'telefone' && !key.includes('+55')) key = '+55' + key

  const emvqr = Merchant.buildEMVQR()
  emvqr.setPayloadFormatIndicator('01')
  emvqr.setCountryCode('BR')
  emvqr.setMerchantCategoryCode('0000')
  emvqr.setTransactionCurrency('986')

  const merchantAccountInformation = Merchant.buildMerchantAccountInformation()
  merchantAccountInformation.setGloballyUniqueIdentifier('BR.GOV.BCB.PIX')

  merchantAccountInformation.addPaymentNetworkSpecific('01', key)

  const additionalDataFieldTemplate =
    Merchant.buildAdditionalDataFieldTemplate()
  additionalDataFieldTemplate.setReferenceLabel('***')

  emvqr.addMerchantAccountInformation('26', merchantAccountInformation)
  emvqr.setAdditionalDataFieldTemplate(additionalDataFieldTemplate)

  if (name) emvqr.setMerchantName(name)

  if (city) emvqr.setMerchantCity(city)

  if (amount) emvqr.setTransactionAmount(`${amount}`)

  return emvqr.generatePayload()
}

const createQrCode = (
  data: string,
  size: { width: number; height: number } = { width: 200, height: 200 }
) => toDataURL(data, size).then((qrcode) => qrcode)

export { createPixCode, createQrCode }
