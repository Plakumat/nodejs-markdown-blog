let express = require("express");
let path = require("path");
let fs = require("fs");
let frontMatter = require("front-matter");
let nunjucks = require("nunjucks");
let app = express();

app.listen(4001, () => { console.log("Server listening on 4001 port"); });

//nunjucks config
nunjucks.configure('views', { express: app });

//use statics
app.use("/assets", express.static("static"));

//favicon without middleware
app.use('/favicon.ico', express.static('favicon.ico'));

//get encoded data
app.use(express.urlencoded());

//list all blogs
app.get('/', function (req, res) {

	let blogPath = path.join(__dirname + '/blog/');

	let filenames = fs.readdirSync(blogPath);

	function readFromFile(file) {
		return new Promise((resolve, reject) => {
			fs.readFile(blogPath + file, 'utf-8', function (err, data) {
				if (err) {
					console.log('err', err);
					return reject(err);
				}

				let raw = frontMatter(data);
				file = file.split('.').shift();
				raw.link = '/blog/' + file;

				return resolve(raw);
			});
		});
	}

	Promise.all(filenames.map(item => readFromFile(item))).then((results) => {
		return res.render('index.html', {
			data: results
		});
	});

});

app.use('/blog/*', (req, res) => {

	let mdPath = path.join(__dirname + req.baseUrl + '.md');

	fs.readFile(mdPath, "utf-8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}

		let raw = frontMatter(data);

		return res.render(raw.attributes.layout + '.html', { title: raw.attributes.title, data: raw.body });
	});

});

//form requests
app.post('/form', function (req, res) {

	let formsPath = path.join(__dirname + '/forms/');

	//using slugify function for filename standardization
	let slugify = (string) => {
		const a = 'àáäâãåăæçèéëêǵğḧìíïîıḿńǹñòóöôœṕŕßśşțùúüûǘẃẍÿź·/_,:;';
		const b = 'aaaaaaaaceeeegghiiiiimnnnoooooprssstuuuuuwxyz------';
		const p = new RegExp(a.split('').join('|'), 'g');
		let url = string.toString().toLowerCase()
			.replace(/\s+/g, '-') // replace spaces with -
			.replace(p, c => b.charAt(a.indexOf(c))) // replace special characters
			.replace(/&/g, '-and-') // replace & with 'and'
			.replace(/[^\w\-]+/g, '') // remove all non-word characters
			.replace(/\-\-+/g, '-') // replace multiple - with single -
			.replace(/^-+/, '') // trim - from start of text
			.replace(/-+$/, ''); // trim - from end of text

		return url;
	};

	let fileName = slugify(req.body.name);

	if (req.body.name && req.body.surname) {
		fs.writeFile(formsPath + `${fileName}.txt`, req.body.message, function (err) {
			if (err) throw err;
		});
	}

});