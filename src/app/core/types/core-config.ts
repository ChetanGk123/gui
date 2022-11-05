// prettier-ignore
export interface CoreConfig {

  app             : {
    appName     : string;
    appTitle    : string;
    appLogoImage: string;
    logo?:{
      logo_dark:{
        logo_sm:string //only logo
        logo_lg:string //logo with name
      },
      logo_light:{
        logo_sm:string //only logo
        logo_lg:string //logo with name
      }
    }
  };
  layout: {
    enableLocalStorage: boolean;
  };
  url:string
}
