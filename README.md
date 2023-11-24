# Ingride's Zaubergefährten

## How To Deploy Your Vue App to GitHub Pages

> Note: Taken from [this source](https://learnvue.co/articles/deploy-vue-to-github-pages) on 2023-11-24

### Step 1. Set publicPath in vue.config.js to our repository name
On the master branch, we want to create a vue.config.js file in the root directory of our project. Here, we want to configure the publicPath (which also edits the webpack publicPath) to route all static assets to the proper path.
If we don’t have this configuration, our deployed site will not properly load assets such as images.
We want to route it to the URL path of our deployed GitHub Pages site, which we can find in our repository settings.

We want to take the path found in that red box – anything after github.io – and use it in our vue.config.jslike this.

```js
vue.config.js

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
};
```

Now, when we deploy our site, all the static assets should be loaded from the correct paths.
Deploying Your Vue Project
With our Vue publicPath configured, we can now work on deploying our project.

### Step 2. Build your project using npm build
This step is pretty self explanatory, we actually need to have a dist folder to deploy.
### Step 3. Run git add dist && git commit -m 'adding dist subtree'
This commits our changes to the master branch so that we can create a dist subtree in the next step. Make sure that dist is not included in your .gitignorefile!
### Step 4. Run git subtree push --prefix dist origin gh-pages
This step makes gh-pages a subtree of our master branch. The prefix option specifies the folder that we want for our the subtree. If we take a look at our gh-pages branch, we will see that it is equivalent to being the root of the dist folder.

### Step 5. Done
In a few minutes, GitHub Pages should refresh with your newest repository changes, and you should be able to see your Vue project online. Exciting!


