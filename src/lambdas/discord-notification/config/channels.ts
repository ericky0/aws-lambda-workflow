export const allowedChannels = ['support', 'reports', 'integration']
export const allowedChannelsTypeAssertion = [
  'support',
  'reports',
  'integration',
] as const

export type AllowedChannelsType = (typeof allowedChannelsTypeAssertion)[number]

export const webhookChannelsMap = {
  support:
    'https://discord.com/api/webhooks/1314670221726056448/_VYGykkCPGSsR_cfG71zyCCK81L9NK3QcjyGkCAftPB8cEqqmDB73lGR3MfpBfENyo6b',
  integration:
    'https://discord.com/api/webhooks/1314670332547698710/XWUiDcVZUKlazFT0gLY14VoUCToGfxHzJRuEUkHwY8AsE-bvhhD6LxhcJ4dRE-U_JBhH',
  reports:
    'https://discord.com/api/webhooks/1314317567271243886/t6jsVT0dY-2sPAjoTq3zcsLYc9l3xqVL1_TT5vN4HntAqMTNLCPVpy2ke-oX0XgZJVeb',
}
