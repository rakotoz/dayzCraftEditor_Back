import { v6 as uuidv6 } from 'uuid';
import {readFileSync} from "fs";

export const parseCraft = () => {
    const craft = readFileSync('tempFiles/craft.json', 'utf-8');
    const craftJson = JSON.parse(craft);
    const parsedCraft = craftJson.m_CraftClasses.CraftCategories
    const categories = new Map();
    const items = new Map();
    for (let i = 0; i < parsedCraft.length; i++) {
        const category = parsedCraft[i];
        const id = uuidv6();
        categories.set(id, category.CategoryName);
        for (let j = 0; j < category.CraftItems.length; j++) {
            const item = category.CraftItems[j];
            item.id = uuidv6();
            if (!items.has(id)) {
                items.set(id, [item]);
            } else {
                items.set(id, [...items.get(id), item]);
            }
        }
        if (category.CraftItems.length === 0) {
            items.set(id, []);
        }
    }

    return {categories, items};
}