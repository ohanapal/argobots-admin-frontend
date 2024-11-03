import instagram from '@/assets/icons/bot/instagram.jpg'
import linkedIn from '@/assets/icons/bot/linked-in.jpg'
import messenger from '@/assets/icons/bot/messenger.jpg'
import others from '@/assets/icons/bot/others.jpg'
import web from '@/assets/icons/bot/web.jpg'
import whatsapp from '@/assets/icons/bot/whatsapp.jpg'

export const renderReferrer = (referrer: string | undefined) => {
  if (referrer === 'facebook') return messenger
  else if (referrer === 'linkedin') return linkedIn
  else if (referrer === 'whatsapp') return whatsapp
  else if (referrer === 'instagram') return instagram
  else if (referrer === 'web') return web
  else if (referrer === 'others') return others
  else return undefined
}
