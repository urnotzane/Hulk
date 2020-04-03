/** url后面加参数 */
export function addParamsToUrl(baseUrl: string, params: IObject): string {
  let queryStr = '';
  const serializedParam = [];
  for (const key in params) {
    const val = params[key];
    if (val) {
      serializedParam.push(`${key}=${val}`);
    }
  }
  queryStr = serializedParam.join('&');
  if (queryStr === '') {
    return baseUrl;
  }
  const url = baseUrl + (baseUrl.indexOf('?') === -1 ? '?' : '&') + queryStr;
  return url;
}