import {DataProviderCode, IDataprovider, Version} from "./IDataprovider";

export abstract class DataProvider implements IDataprovider {
    private readonly version: Version;
    private readonly dataProviderCode: DataProviderCode;

    protected constructor (version: Version, dataProviderCode: DataProviderCode) {
        this.version = version;
        this.dataProviderCode = dataProviderCode;
    }

    getVersion(): Version {
        return this.version != null ? this.version : Version.V1;
    }

    getDataProviderCode(): DataProviderCode {
        return this.dataProviderCode != null ? this.dataProviderCode : DataProviderCode.AUTH;
    }


}