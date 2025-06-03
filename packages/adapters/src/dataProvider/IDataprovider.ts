export interface IDataprovider {

    /**
     * @return la version du dataprovider
     */
    getVersion(): Version;

    /**
     * @return le code du dataprovider
     */
     getDataProviderCode(): DataProviderCode;


}


export enum Version {
    V1 = "V1",
    V2 = "V2",
    V3 = "V3",
}

export enum DataProviderCode {
    AUTH,
    EVENT,
    FOLDER,
    NOTIFICATION,
}