// prettier-ignore
export interface CoreConfig {

  app             : {
    appName     : string;
    appTitle    : string;
    appLogoImage: string;
    logo?:{
      logo_dark:{
        logo_sm:string
        logo_lg:string
      },
      logo_light:{
        logo_sm:string
        logo_lg:string
      }
    }
  };
  layout: {
    enableLocalStorage: boolean;
  }
}
