import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {parseCraft} from "./src/parseCraft";
import {saveCraft} from "./src/saveCraft";
import { v6 as uuidv6 } from 'uuid';

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json())

const {categories, items} = parseCraft()

app.get('/categories', async (req, res) => {
    if (!categories) {
        res.send(JSON.stringify({error: 'No data found'}))
    } else {
        const categoriesArray: any = []
        categories.forEach((value, key) => {
            categoriesArray.push({id: key, name: value})
        });
        res.send(JSON.stringify(categoriesArray))
    }
})

app.get('/categories/:category', async (req, res) => {
    console.log(items)
    if (!items.has(req.params.category)) {
        res.send(JSON.stringify({error: 'No data found'}))
    } else {
        res.send(JSON.stringify(items.get(req.params.category)))
    }
})

app.post('/recipe', async (req, res) => {
    const item = items.get(req.body.activeCategory);
    const modifedIndex = item.findIndex((i: any) => i.id === req.body.recipe.id);
    item[modifedIndex] = req.body.recipe;
    items.set(req.body.activeCategory, item);
    saveCraft(categories, items)
    res.send(JSON.stringify(item))
})

app.delete('/recipe/:categoryId/:id', async (req: any, res: any) => {
    const item = items.get(req.params.categoryId);
    console.log(item)
    const modifedIndex = item.findIndex((i: any) => i.id === req.params.id);
    item.splice(modifedIndex, 1);
    items.set(req.body.activeCategory, item);
    saveCraft(categories, items)
    res.send(JSON.stringify(item))
})

app.post('/recipe/new', async (req, res) => {
    const item = items.get(req.body.activeCategory);
    item.push({
        id: uuidv6(),
        "Result": "",
        "ResultCount": 1,
        "ComponentsDontAffectHealth": 1,
        "CraftType": "craft",
        "RecipeName": "",
        "CraftComponents": [],
        "AttachmentsNeed": []
    });
    items.set(req.body.activeCategory, item);
    saveCraft(categories, items);
    res.send(JSON.stringify(item))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})