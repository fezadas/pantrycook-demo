var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs')

app.set('view engine', 'hbs')
app.set('views', './server/public/views')

app.use(express.static("public"));



// viewed at http://localhost:8080
app.get('/pantry', function(req, res) {

    var info = {
        food:[
            {
                title:"Potatoes",
                quantity:"500",
                unity:"g",
                image:"images/pantry-images/potatoes.png"
            },
            {
                title:"Pasta",
                quantity:"4",
                unity:"",
                image:"images/pantry-images/pasta.png"
            },
            {
                title:"Beef",
                quantity:"250",
                unity:"g",
                image:"images/pantry-images/beef.png"
            },
            {
                title:"Eggs",
                quantity:"12",
                unity:"units",
                image:"images/pantry-images/eggs.png"
            },
            {
                title:"Fish",
                quantity:"12",
                unity:"units",
                image:"images/pantry-images/fish.png"
            },
            {
                title:"Banana",
                quantity:"12",
                unity:"units",
                image:"images/pantry-images/banana.png"
            },
            {
                title:"Tomatoes",
                quantity:"12",
                unity:"units",
                image:"images/pantry-images/tomatoes.png"
            },
            {
                title:"Apple",
                quantity:"12",
                unity:"units",
                image:"images/pantry-images/apple.png"
            },
            {
                title:"Milk",
                quantity:"12",
                unity:"units",
                image:"images/pantry-images/milk.png"
            },
            {
                title:"Milk",
                quantity:"12",
                unity:"units",
                image:"images/pantry-images/milk.png"
            }
        ]
    }

    res.render(path.join(__dirname +  '/public/views/pantry.hbs'),info);
});

app.get('/shoppinglist',function(req, res){
    res.render(path.join(__dirname +  '/public/views/shoppinglist.hbs'))
})

app.get('/contact',function(req, res){
    res.render(path.join(__dirname +  '/public/views/contact.hbs'));
})

app.get('/',function(req, res){

    var info = {
        card:[
            {
                title:"BreakFast",
                description:"Breakfast is often rushed. However, our recipes saves a lot of time. Give us an opportunity to help you.",
                image:"images/breakfast.jpg"
            },
            {
                title:"Meat",
                description:"Meat is always a common ingredient, although you can find special recipes that we prepare for you.",
                image:"images/meat.jpg"
            },
            {
                title:"Fish",
                description:"Fish is a protein that can be combined with a lot of healthy ingredients.Find a lot of recipes here.",
                image:"images/fish.jpg"
            },
            {
                title:"Drinks",
                description:"Cocktails require a lot of creativity. We save that work from you, just follow our steps.",
                image:"images/drinks.jpg"
            }
        ]
    }

    res.render(path.join(__dirname +  '/public/views/index.hbs'),info);
    
})

app.listen(8080);