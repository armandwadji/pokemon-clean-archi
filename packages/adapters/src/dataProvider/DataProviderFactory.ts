import {IDataprovider, Version} from "./IDataprovider";

export abstract class DataProviderFactory<V extends IDataprovider> {

    /**
     * Toutes les implémentations de notre fournisseur de données.
     * Nous avons une implémentation par version du fournisseur de données.
     */
    private readonly dataProvidersSingleton: V[] = [];

    /**
     * La version courante du fournisseur de données.
     */
    private readonly currentVersion: string;

    protected constructor(dataProviders: V[], currentVersion: string) {
        this.currentVersion = currentVersion;
        if (!this.dataProvidersSingleton.length){
            dataProviders.forEach((dataProvider: any) => {
                this.dataProvidersSingleton.push(new dataProvider())
            })
        }
    }

    /**
     * @return enumeration de la version courante du fournisseur de données
     */
    protected getCurrentVersion(): Version {
        switch (this.currentVersion) {
            case "V1":
                return Version.V1;
            case "V2":
                return Version.V2;
            case "V3":
                return Version.V3;
            default:
                throw new Error(`Unsupported version: ${this.currentVersion}`);
        }
    }

    /**.
     * @return le fournisseur de données correspondant à la version courante
     * @throws IllegalArgumentException si aucun fournisseur de données n'est trouvé pour la version courante
     */
    protected getCurrentDataProvider(): V {
        const currentDataprovider: V | undefined = this.dataProvidersSingleton
            .find((dataProvider: V) => this.getCurrentVersion() === dataProvider.getVersion());
        if (!currentDataprovider) {
            throw new Error(`No data provider found for version: ${this.currentVersion}`);
        }
        return currentDataprovider;
    }
}