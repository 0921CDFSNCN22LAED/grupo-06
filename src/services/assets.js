const fs = require("fs");
const path = require("path");
const stockListJSON = fs.readFileSync(
    path.join(__dirname, "../data/stocksList.json")
);
const cryptoListJSON = fs.readFileSync(
    path.join(__dirname, "../data/cryptocurrenciesList.json")
);
const cryptoFilePath = path.join(
    __dirname,
    "../data/cryptocurrenciesList.json"
);
const stockFilePath = path.join(__dirname, "../data/stocksList.json");
const stockList = JSON.parse(stockListJSON);
const cryptoList = JSON.parse(cryptoListJSON);
const assetList = stockList.concat(cryptoList);

// devuelve lista de criptomonedas
function getCrypto() {
    return cryptoList;
}

// devuelve lista de acciones
function getStock() {
    return stockList;
}

// devuelve lista de todos los activos juntos
function getAll() {
    return assetList;
}

// devuelve lista dependiendo del tipo solicitado
function getAssetList(marketType) {
    const assetList =
        marketType === "cryptocurrencies" ? cryptoList : stockList;
    return assetList;
}

function saveAssets(newAsset) {
    // agrega el nuevo activo a la lista correspondiente usando las funciones getAssetList y push
    const assetList = this.getAssetList(newAsset.type);
    assetList.push(newAsset);
    // selecciona la ruta de archivo correspondiente a actualizar
    const filePath =
        newAsset.type === "cryptocurrencies" ? cryptoFilePath : stockFilePath;
    // transforma la lista en formato JSON
    const updatedJSON = JSON.stringify(assetList);
    // escribe el array actualizado al JSON
    fs.writeFileSync(filePath, updatedJSON, "utf-8");
}

function createAsset(formBody) {}

function updateAsset(assetId) {}

function findAsset(marketType, assetRequested) {
    const assetList = this.getAssetList(marketType);
    const asset = assetList.find(
        (asset) =>
            asset.name === assetRequested ||
            asset.ticker.toLowerCase() === assetRequested ||
            asset.id === assetRequested
    );
    return asset;
}

function deleteAsset(assetId) {}

// ordena todos los activos con respecto a su cambio de precio (mayor a menor)
function sortByGainers(assetList) {
    gainers = assetList.sort(function (a, b) {
        if (a.change < b.change) {
            return 1;
        }
        if (a.change > b.change) {
            return -1;
        }
        return 0;
    });
    return gainers;
}

// ordena todos los activos con respecto a su cambio de precio (menor a mayor)
function sortByLosers(assetList) {
    losers = [...sortByGainers(assetList)].reverse();
    return losers;
}

module.exports = {
    getAll,
    getCrypto,
    getStock,
    getAssetList,
    saveAssets,
    createAsset,
    updateAsset,
    findAsset,
    deleteAsset,
    sortByGainers,
    sortByLosers,
};