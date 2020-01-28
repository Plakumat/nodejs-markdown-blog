# Markdown+NodeJS Blog
Markdown blog with using NodeJS, Nunjucks, Front Matter

## Installation
Install npm packages on your terminal:
```sh
npm install
```

To run the project with nodemon, install the package globally on your system path:
```sh
npm install -g nodemon
```

Run node task:
```sh
nodemon app
```
or

```sh
node app.js
```

## Creating a new blog
You can create a simple blog with new .md file in your blog folder. NodeJS will read your markdown file and convert all contents to json object with Front Matter library. After that Nunjucks template engine will render your list page and detail page.

## Front Matter
Front matter section starts at the top of your markdown file which contains all attributes that your blog files can get.
You can change blog layout, blog description, blog title etc. using with Front Matter. Also you can add new attributes for using with Node + Nunjucks.
