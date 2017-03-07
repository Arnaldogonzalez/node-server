var express = require('express');
var bodyParser = require('body-parser');
var app = express(); //creates a server

var people = [
    {
        firstName: 'Bugs',
        lastName: 'Bunny',
        image: 'http://cdn.pcwallart.com/images/bugs-bunny-and-daffy-duck-gangster-wallpaper-1.jpg'
    },
    {
        firstName: 'Harley',
        lastName: 'Quinn',
        image: 'http://fc01.deviantart.net/fs71/i/2013/114/0/a/harley_quinn_cosplay_by_rongejon-d62x9ee.jpg'
    },
    {
        firstName: 'The',
        lastName: 'Joker',
        image: 'http://1.bp.blogspot.com/-2YW-x1vDtKY/UBc27ry_y1I/AAAAAAAAMm4/XM4XK-ZVVRw/s1600/The_Joker_by_DookieAdz.jpg'
    },
    {
        firstName: 'Deadshot',
        lastName: 'Kill',
        image: 'http://www.followingthenerd.com/site/wp-content/uploads/Arrow-season-2-episode-16-Deadshot-e1394905660384.jpg'
    },
    {
        firstName: 'Bruce',
        lastName: 'Wayne',
        image: 'https://tse3.mm.bing.net/th?id=OIP.20cYQp7hllDkTlBQhsb88AEsEs&pid=15.1&P=0&w=300&h=300'
    }
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));

app.get('/home', function(req, res){
    console.log('Home was requested');
    res.render('index.ejs', { people: people });
});

app.post('/home', function(req, res){
    console.log(req.body.first, req.body.last);
    res.render('index.ejs', { people: people });
});

app.get('/new', function(req, res){
    res.render('new.ejs');
});
app.post('/new', function(req, res){
    people.push({
        firstName: req.body.first,
        lastName: req.body.last,
        image: req.body.image
    });
    res.render('index.ejs', {people: people});
});
app.get('/about/:name', function(req, res){
    var person = people.find(function(person){
        return person.firstName === req.params.name
    });
    res.render('about.ejs', { person: person });

});
app.listen(3000, function(){
    console.log('Listener on port 3000...');
});
