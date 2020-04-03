declare module 'whatwg-fetch' {
  export const fetch:Window['fetch'];
}

declare type AllCommon = IObject | string | number | boolean;

declare type IObject = {
  [x:string]: AllCommon;
}

declare interface IRequestInit extends RequestInit {
  query?: IObject; // get用
}

declare interface IResponse {
  status: number;
  ok: boolean;
  statusText: string;
  url: string;
  data: AllCommon;
}
