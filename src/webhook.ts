import https from 'https'
import CryptoJS from 'crypto-js'

class Webhook {
  webhookUrl: string
  webhookSecret?: string
  constructor(url: string, secret?: string) {
    this.webhookUrl = url
    this.webhookSecret = secret
  }

  getSign(timestamp: number): string {
    const sign = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(
        `${timestamp}\n${this.webhookSecret}`,
        this.webhookSecret
      )
    )
    return sign
  }

  async send(obj: string): Promise<string> {
    if (!this.webhookUrl) {
      return Promise.reject(new Error('lost param webhookUrl'))
    }

    if (!obj) {
      return Promise.reject(new Error('lost param data'))
    }

    const urlObj = new URL(this.webhookUrl)
    let chunkData = ''
    return new Promise<string>((resolve, reject) => {
      if (this.webhookSecret) {
        const timestamp = Date.now()
        const sign = this.getSign(timestamp)
        urlObj.searchParams.append('timestamp', String(timestamp))
        urlObj.searchParams.append('sign', sign)
      }

      // eslint-disabled-next-line
      const completePath = `${
        urlObj.pathname
      }?${urlObj.searchParams.toString()}`

      const req = https.request(
        {
          hostname: urlObj.hostname,
          port: 443,
          path: completePath,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        res => {
          res.on('data', d => {
            chunkData += d
          })

          res.on('end', () => {
            resolve(chunkData)
          })

          res.on('error', err => {
            reject(err)
          })
        }
      )
      req.write(obj)
      req.end()
    })
  }
}

export default Webhook
