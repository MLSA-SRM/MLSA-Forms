const multer = require('multer');
const MulterAzureStorage = require('multer-azure-storage')


module.exports = multer({
    storage: new MulterAzureStorage({
        azureStorageConnectionString: process.env.AZURE_CONNECTION_STRING,
        containerName: 'files',
        containerSecurity: 'blob'
    })
}).fields([{ name: 'logo', maxCount: 1 },
    { name: 'background', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]);