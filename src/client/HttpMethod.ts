/**
 * HTTP-method
 */
export enum HttpMethod {
  Get = 'get',
  Delete = 'delete',
  Head = 'head',
  Options = 'options',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Purge = 'purge',
  Link = 'link',
  Unlink = 'unlink',
}

/**
 * HTTP Method Validation
 */
export const isHttpMethod = (method: any): method is HttpMethod => {
  return Object.values(HttpMethod).includes(method);
};
