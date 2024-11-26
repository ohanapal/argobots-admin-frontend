import instagram from '@/assets/icons/bot/instagram.png'
import linkedIn from '@/assets/icons/bot/linked-in.png'
import messenger from '@/assets/icons/bot/messenger.png'
import others from '@/assets/icons/bot/others.png'
import web from '@/assets/icons/bot/web.png'
import whatsapp from '@/assets/icons/bot/whatsapp.png'

export const renderReferrer = (referrer: string | undefined) => {
  if (referrer === 'facebook') return messenger
  else if (referrer === 'linkedin') return linkedIn
  else if (referrer === 'whatsapp') return whatsapp
  else if (referrer === 'instagram') return instagram
  else if (referrer === 'web') return web
  else if (referrer === 'others') return others
  else return undefined
}
