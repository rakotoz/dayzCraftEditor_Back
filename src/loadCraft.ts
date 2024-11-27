import {readFile} from "node:fs/promises";

export const loadCraft = async () => {
    return await readFile('tempFiles/craft.json', 'utf-8');
}