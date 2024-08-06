import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { Fail } from './Fail';
import { Fake } from './Fake';
import { performanceOfPromise } from './performanceOfPromise';
import { HttpMethod } from './HttpMethod';
import { HttpStatus } from './HttpStatus';

export type ParsedQs = { [p: string]: ParsedQs | string };

/**
 * Request configuration
 */
export type RequestConfig = Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>;

/**
 * Response data or error object
 */
export type Response<ResBody> = ResBody | Fail;

/**
 * Base class for creating HTTP clients
 *
 * Wrapper for axios
 */
export abstract class Client extends Fake {
  private readonly instance: AxiosInstance;
  private readonly logging: boolean;

  public constructor(config?: CreateAxiosDefaults & { logging?: boolean }) {
    super();

    this.instance = axios.create(config);
    this.logging = config?.logging ?? true;
  }

  public static join(...paths: string[]): string {
    return paths.join('/').replace(/\/{2,}/g, '/');
  }

  public join(...paths: string[]): string {
    return Client.join(...paths);
  }

  /**
   * Get base URL
   */
  public getBaseUrl(): string {
    return this.instance.defaults.baseURL || '';
  }

  /**
   * Set base URL
   */
  public setBaseUrl(url: string): void {
    this.instance.defaults.baseURL = url;
  }

  /**
   * Send request
   *
   * Counts the request execution time and logs information
   */
  protected async request<
    ResBody,
    ReqBody = undefined,
    ReqQuery extends ParsedQs | undefined = undefined,
    H extends HttpMethod = HttpMethod,
  >(
    httpMethod: H,
    url: string,
    body?: H extends HttpMethod.Get ? undefined : ReqBody,
    reqQuery?: ReqQuery,
    config?: RequestConfig,
  ): Promise<Response<ResBody>> {
    const request = httpMethod === HttpMethod.Delete ? { data: body } : body;

    if (this.logging) {
      const { result: response, totalTime } = await performanceOfPromise(
        this.createResponse<ResBody>(httpMethod, url, request, reqQuery, config),
      );

      Client.responseLog(
        httpMethod,
        this.getUri(url, reqQuery),
        request,
        response,
        response instanceof Fail ? response.status : HttpStatus.Ok,
        totalTime,
      );

      return response;
    }

    return this.createResponse<ResBody>(httpMethod, url, request, reqQuery, config);
  }

  private getUri(url: string, reqQuery?: ParsedQs): string {
    return this.instance.getUri({ url, params: reqQuery });
  }

  private async createResponse<ResBody, ReqBody = any, ReqQuery extends ParsedQs | undefined = ParsedQs | undefined>(
    httpMethod: HttpMethod,
    url: string,
    request: ReqBody,
    reqQuery: ReqQuery,
    config?: RequestConfig,
  ): Promise<Response<ResBody>> {
    try {
      const newConfig = Client.createConfig<ReqBody>(request, config);

      const response = await this.instance.request({
        url: url + '/',
        params: reqQuery,
        method: httpMethod,
        ...newConfig,
      });

      return Client.convertResponse(response);
    } catch (e) {
      const error = e as Error & { response?: AxiosResponse };

      if (error.response) {
        return Client.convertResponse(error.response);
      }

      if (e instanceof AxiosError) {
        return new Fail('client.createResponse', HttpStatus.InternalServerError, `AxiosError: ${e.message}`);
      }

      return new Fail('client.createResponse', HttpStatus.InternalServerError, error);
    }
  }

  private static responseLog(
    httpMethod: HttpMethod,
    url: string,
    request: any,
    response: any,
    status: HttpStatus,
    totalTime: number,
  ): void {
    const method = httpMethod.toUpperCase();
    const roundedTime = Math.round(totalTime);

    const { pathname } = new URL(url);

    console.groupCollapsed(`(${status}) <`, method, pathname, `[${roundedTime}ms]`);
    console.groupCollapsed('info');
    console.log('url:', url);
    console.groupEnd();
    console.group('> Request');
    console.log(request);
    console.groupEnd();
    console.group('< Response');
    if (response instanceof Fail) {
      console.log('Sender:', response.sender);
      console.log('Error:', response.message);
      console.log('Info:', response.info);
      console.log(response.stack);
    } else {
      console.log(response);
    }
    console.groupEnd();
    console.groupEnd();
  }

  private static convertResponse<ResBody>(
    response:
      | ({ status: Extract<HttpStatus, HttpStatus.Ok> } & AxiosResponse<ResBody>)
      | ({ status: Exclude<HttpStatus, HttpStatus.Ok> } & AxiosResponse<unknown>),
  ): Response<ResBody> {
    if (response.status === HttpStatus.Ok) return response.data;

    return new Fail('client.convertResponse', response.status, response.data);
  }

  private static createConfig<ReqBody>(
    request: ReqBody,
    config: RequestConfig = {},
  ): Omit<AxiosRequestConfig<ReqBody>, 'url' | 'method'> {
    return {
      ...config,
      data: request,
    };
  }
}
