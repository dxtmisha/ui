import { Geo } from './Geo'
import { User } from './User'
import { AssociativeStringType, AssociativeType } from '../constructors/types'

export class Api {
  protected static auth = process.env.VUE_APP_AUTH || false
  protected static url = process.env.VUE_APP_API || '/'

  static async fetch ({
    path = '' as string,
    method = 'GET',
    request = undefined,
    headers = {},
    type = 'application/json;charset=UTF-8',
    init = {}
  }): Promise<AssociativeType> {
    const data = await (await fetch(this.toUrl(path), {
      ...init,
      method,
      headers: this.toHeaders(headers, type),
      body: this.toRequest(request)
    })).json() as AssociativeType

    if (
      this.auth &&
      'user' in data &&
      'token' in data &&
      'refresh' in data
    ) {
      User.set(data.user)
      User.setToken(data.token)
      User.setRefresh(data.refresh)

      return this.fetch({
        path,
        method,
        request,
        headers,
        type,
        init
      })
    } else {
      return data
    }
  }

  static toHeaders (value: AssociativeStringType, type?: string): AssociativeStringType | undefined {
    if (value === null) {
      return undefined
    } else {
      const headers = {} as AssociativeStringType

      if (type) {
        headers['Content-Type'] = type
      }

      if (this.auth) {
        headers['API-REFRESH'] = User.getRefresh().value
        headers['API-SIGNATURE'] = User.getSignature().value
        headers['API-TOKEN'] = User.getToken().value
      }

      return {
        ...headers,
        ...value
      }
    }
  }

  static toRequest (request?: FormData | string | AssociativeType): FormData | string | undefined {
    if (
      request === undefined ||
      request instanceof FormData ||
      typeof request === 'string'
    ) {
      return request
    } else {
      return JSON.stringify(request)
    }
  }

  static toUrl (path: string): string {
    if (process.env.NODE_ENV === 'production') {
      return `${this.url.replace('{_locale}', Geo.code.value)}${path}`
    } else {
      return `/api/${path}.json`
    }
  }
}
