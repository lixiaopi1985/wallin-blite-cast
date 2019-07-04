const fs = require('fs-extra');

async function removeFolder(folderPath){
    try{
        await fs.emptyDir(folderPath);
        console.log(`Successfully cleaned the contents in the ${folderPath}`);
        
    } catch (err){
        console.error(err);
    }
    
}


module.exports = removeFolder;