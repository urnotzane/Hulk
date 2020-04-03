import { fetch as fetchPolyfill } from 'whatwg-fetch';
import { addParamsToUrl } from '../utils/utils';
import { API } from './api';
import { secretKeys } from './secret';

export class IFetch {
  private request: (method: string, url: string, config: IRequestInit) => void;
  private baseUrl: keyof typeof API;
  constructor(baseUrl: keyof typeof API) {
    this.baseUrl = baseUrl;
    this.request = (method, url, config) => {
      const iMethod = method.toLocaleUpperCase();
      const canSendBody = iMethod !== 'GET' && iMethod !== 'HEAD';
      const iConfig: IRequestInit = {
        ...config,
        body: canSendBody ? config.body : null,
        credentials: "include",
      }
      return fetchPolyfill(url, iConfig)
    }

  }
  public getUrl(url: string) {
    if (this.baseUrl.indexOf('http') > -1) {
      return `${this.baseUrl}${url}`;
    } else {
      const { host, port } = API[this.baseUrl];
      const origin = port ? `${host}:${port}` : host;
      const { clientId, clientSecret } = secretKeys[this.baseUrl];
      return addParamsToUrl(`${origin}${url}`, {
        client_id: clientId,
        client_secret: clientSecret,
      });
    }
  }
  public setResponse(res: Response, data:IObject) {
    const { status, ok, statusText, url } = res;
    return {
      status,
      ok,
      statusText,
      url,
      data,
    }
  }
  public async get(url: string, config: IRequestInit = {}) {
    const { query } = config;
    const iUrl = addParamsToUrl(this.getUrl(url), query);
    try {
      const res = await fetchPolyfill(iUrl, Object.assign({} as IRequestInit, {
        ...config,
        method: 'GET',
      }));
      if (res.ok) {
        const json = await res.json();
        return {
          ...res,
          data: json,
        }
      }
      throw new Error('Network response was not ok.');
    } catch (error) {
      console.log(error);
    }
  }
}

export const FetchGit = new IFetch('git');
export const FetchBaidu = new IFetch('baidu');
