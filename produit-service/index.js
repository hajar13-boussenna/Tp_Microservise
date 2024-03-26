const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 4004;
const mongoose = require("mongoose");
const Produit = require("./Produit");
app.use(express.json());
//Connection à la base de données MongoDB « publication-service-db »
//(Mongoose créera la base de données s'il ne le trouve pas)
mongoose.set('strictQuery', true);
mongoose.connect(
    "mongodb://localhost/produit-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    
).then(()=>{
    console.log(`produit-service DB Connected`);

}).catch(error=>{
    console.log(`Eroor connecting to database : ${error}`);
})
;
app.post("/produit/ajouter", (req, res, next) => {
    const { nom, description, prix } = req.body;
    const newProduit = new Produit({
        nom,
        description,
        prix
    });

//La méthode save() renvoie une Promise.
//Ainsi, dans le bloc then(), nous renverrons une réponse de réussite avec un code 201 de réussite.
//Dans le bloc catch () , nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400.
    newProduit.save() 
        .then(produit => res.status(201).json(produit))
        .catch(error => res.status(400).json({ error }));
});
app.get("/produit/acheter", (req, res, next) => {
    const { ids } = req.body;
    Produit.find({ _id: { $in: ids } })
        .then(produits => res.status(201).json(produits))
        .catch(error => res.status(400).json({ error }));
});
app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
});
//"_id": "65feacbaa229ccf3203cf76c",
//"_id": "65feacfe68071d81d716d608",