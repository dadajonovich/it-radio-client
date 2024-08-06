import { Fail, HttpClient } from '@/client';
import { urlPath as settings } from '@/settings';

type UserResponce = {};
type UserParams = {};

export type TeamResponce = {
  id: number;
  name: string;
  last_name: string;
  position: string;
  img_person: string;
};

class Api extends HttpClient {
  protected isFake = false;

  async getUser(params: UserParams): Promise<UserResponce> {
    const responce = await this.get<UserResponce, void, UserParams>('user', undefined, params);
    if (responce instanceof Fail) throw responce;
    return responce;
  }

  async getTeams(): Promise<TeamResponce> {
    const responce = await this.get<TeamResponce>('radio/team');
    if (responce instanceof Fail) throw responce;
    return responce;
  }
}

const api = new Api({ baseURL: settings });
// window.api = api;
export default api;
