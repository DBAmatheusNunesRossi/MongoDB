/******************************************************************************************************************************************
Esse script lista todas as coleções do banco MongoDB e exibe quais são as maiores, ordenando por tamanho em GB (do maior para o menor).

✔ Tunagem e limpeza de dados

Identificar coleções que precisam de compact, delete, TTL, sharding ou partition keys.

✔ Monitoramento

Saber qual coleção está consumindo mais storage.

✔ Planejamento de migração

Saber o tamanho real das coleções ao mover para outro cluster.

✔ Auditoria de crescimento

Identificar coleções crescendo fora do esperado.
******************************************************************************************************************************************/
const collections = db.getCollectionNames();

const collectionSizes = collections.map(collection => {
    const stats = db.getCollection(collection).stats();
    return {
        collection: collection,
        sizeInGB: stats.size / (1024 ** 3) // Convert bytes to GB
    };
});

collectionSizes.sort((a, b) => b.sizeInGB - a.sizeInGB); // Sort by size descending

print("Collections sorted by size (in GB):");
collectionSizes.forEach(item => {
    print(`${item.collection}: ${item.sizeInGB.toFixed(2)} GB`);
});
