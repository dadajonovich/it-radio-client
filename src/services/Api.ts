import axios, { AxiosError } from 'axios';
import { Fail, HttpClient } from '@/client';
import { urlPath as settings } from '@/settings';
import { ErrorInfo } from '@/client/ErrorInfo';

type UserResponce = {};
type UserParams = {};

export type TeamResponce = {
  id: number;
  name: string;
  last_name: string;
  position: string;
  img_person: string;
};

const instance = axios.create({ baseURL: settings });

class Api extends HttpClient {
  protected isFake = false;

  async getUser(params: UserParams): Promise<UserResponce> {
    const responce = await this.get<UserResponce, void, UserParams>('user', undefined, params);
    if (responce instanceof Fail) throw responce;
    return responce;
  }

  // async getTeams(): Promise<TeamResponce> {
  //   const responce = await this.get<TeamResponce>('radio/team');
  //   if (responce instanceof Fail) throw responce;
  //   return responce;
  // }

  async getTeam(): Promise<TeamResponce[]> {
    return instance
      .get<TeamResponce[]>('radio/team/')
      .then((responce) => {
        console.log(responce.data);
        return responce.data;
      })
      .catch((error) => {
        throw new ErrorInfo('Api.getTeam', error.message, error);
      });
  }
}

const api = new Api({ baseURL: settings });
window.api = api;
export default api;
