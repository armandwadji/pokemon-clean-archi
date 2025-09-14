import { Config } from "../shared/model/config.model";
import { TranslateService } from "../shared/service/translate/translate.service";
import React, { Context, createContext, useEffect, useState } from "react";

export interface appInitContextType {
  config: Config;
  translateService: TranslateService;
}

interface appInitContextProps {
  children: React.ReactNode;
}

const AppInitContext: Context<appInitContextType | null> =
  createContext<appInitContextType | null>(null);

const AppInit = ({ children }: appInitContextProps) => {
  const [config, setConfig] = useState<Config>(new Config({}));
  const [translateService, setTranslateService] = useState<TranslateService>(
    new TranslateService({} as typeof import("../../public/i18n/fr.json")),
  );

  useEffect(() => {
    const userLang: string = navigator.language.split("-")[0];

    Promise.all([
      fetch(`${process.env.PUBLIC_URL}/config/config.json`).then(
        (response: Response) => response.json(),
      ),
      fetch(`${process.env.PUBLIC_URL}/i18n/${userLang}.json`).then(
        (response: Response) => response.json(),
      ),
    ]).then(([configResponse, translateResponse]: any[]) => {
      setConfig(new Config(configResponse));
      setTranslateService(
        new TranslateService(
          translateResponse as typeof import("../../public/i18n/fr.json"),
        ),
      );
    });
  }, []);

  return (
    <AppInitContext.Provider value={{ config, translateService }}>
      {children}
    </AppInitContext.Provider>
  );
};

export { AppInitContext, AppInit };
