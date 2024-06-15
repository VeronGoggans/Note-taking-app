import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";
import { fetchData } from "../util/request/request.js";

export class FolderModel {
    
    async get(parentId = undefined) {
        const OPTIONS = RequestOptionsBuilder.buildGetOptions();
        const ENDPOINT = parentId !== undefined ? '/subfolders' : '/folders';

        if (parentId !== undefined) {
            return fetchData(`${ENDPOINT}/${parentId}`, OPTIONS)
        }
        return fetchData(ENDPOINT, OPTIONS)
    }

    async add(name, parentId = undefined, color='rgb(255, 255, 255)') {
        const OPTIONS = parentId !== undefined ?
            RequestOptionsBuilder.buildPostOptions({'folder_id': parentId, 'name': name, 'color': color}) :
            RequestOptionsBuilder.buildPostOptions({'name': name, 'color': color});
        const ENDPOINT = parentId !== undefined ? '/subfolder': '/folder'
        return fetchData(ENDPOINT, OPTIONS);
    }

    async update(folderId, name, color) {
        const OPTIONS = folderId.startsWith('f') ?
            RequestOptionsBuilder.buildPutOptions({'folder_id': folderId, 'name': name, 'color': color}) :
            RequestOptionsBuilder.buildPutOptions({'subfolder_id': folderId, 'name': name, 'color': color})
        const ENDPOINT = folderId.startsWith('s') ? '/subfolder': '/folder'
        return fetchData(ENDPOINT, OPTIONS)
    }

    async delete(folderId, parentId) {
        const OPTIONS = parentId !== 'f-1' ?
            RequestOptionsBuilder.buildDeleteOptions({'folder_id': parentId, 'subfolder_id': folderId}) :
            RequestOptionsBuilder.buildDeleteOptions()
        const ENDPOINT = parentId !== 'f-1' ? '/subfolder': `/folder/${folderId}`
        return fetchData(ENDPOINT, OPTIONS);
    }
}