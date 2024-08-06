import { Client, type ParsedQs, RequestConfig, Response } from './Client';
import { HttpMethod } from './HttpMethod';

/**
 * Class for creating a repository using basic HTTP requests
 */
export abstract class HttpClient extends Client {
  /**
   * POST HTTP request
   */
  protected async post<ResBody, ReqBody = undefined, ReqQuery extends ParsedQs | undefined = undefined>(
    url: string,
    body?: ReqBody,
    reqQuery?: ReqQuery,
    config?: RequestConfig,
  ): Promise<Response<ResBody>> {
    return this.request<ResBody, ReqBody, ReqQuery>(HttpMethod.Post, url, body, reqQuery, config);
  }

  /**
   * GET HTTP request
   */
  protected async get<ResBody, ReqBody = undefined, ReqQuery extends ParsedQs | undefined = undefined>(
    url: string,
    body?: ReqBody,
    reqQuery?: ReqQuery,
    config?: RequestConfig,
  ): Promise<Response<ResBody>> {
    return this.request<ResBody, ReqBody, ReqQuery>(HttpMethod.Get, url, body, reqQuery, config);
  }

  /**
   * PUT HTTP request
   */
  protected async put<ResBody, ReqBody = undefined, ReqQuery extends ParsedQs | undefined = undefined>(
    url: string,
    body?: ReqBody,
    reqQuery?: ReqQuery,
    config?: RequestConfig,
  ): Promise<Response<ResBody>> {
    return this.request<ResBody, ReqBody, ReqQuery>(HttpMethod.Put, url, body, reqQuery, config);
  }

  /**
   * DELETE HTTP request
   */
  protected async delete<ResBody, ReqBody = undefined, ReqQuery extends ParsedQs | undefined = undefined>(
    url: string,
    body?: ReqBody,
    reqQuery?: ReqQuery,
    config?: RequestConfig,
  ): Promise<Response<ResBody>> {
    return this.request<ResBody, ReqBody, ReqQuery>(HttpMethod.Delete, url, body, reqQuery, config);
  }
}
