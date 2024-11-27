import {writeFileSync} from "node:fs";

export const saveCraft = (categories: any, items: any) => {
    let newCraft = {
        m_CraftClasses: {
            "m_CustomizationSetting": {
                "PathToMainBackgroundImg": "my path to main img",
                "PathToRepairImg": "my path to RepairImg",
                "PathToPaintImg": "my path to PaintImg",
                "PathToCraftImg": "my path to CraftImg"
            },
            "WorkbenchesClassnames": [
                "COTZ_Workbench"
            ],
            CraftCategories: []
        }
    }

    categories.forEach((value: any, key: any, map: any) => {
        const craftItems = items.get(key);
        const noddedCraftItems = craftItems.map((item: any) => {
            const newItem = {
                "Result": item.Result,
                "ResultCount": item.ResultCount,
                "ComponentsDontAffectHealth": item.ComponentsDontAffectHealth,
                "CraftType": item.CraftType,
                "RecipeName": item.RecipeName,
                "CraftComponents": item.CraftComponents,
                "AttachmentsNeed": item.AttachmentsNeed
            }
            return newItem
        })
        const newCategory = {
            "CategoryName": value,
            CraftItems: noddedCraftItems
        }
        // @ts-ignore
        newCraft.m_CraftClasses.CraftCategories.push(newCategory)
    })

    writeFileSync('tempFiles/craft.json', JSON.stringify(newCraft, null, 4))
}