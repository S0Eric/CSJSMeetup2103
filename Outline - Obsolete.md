# Introduction

I discovered Solid when looking for a small UI framework that integrates easily into a legacy web app.

To use Solid, I created a Node project for building and bundling the source, and I had to come up to speed on TypeScript, JSX, and I struggled with JavaScript since I had never used it extensively.

One important questions is, "Solid is a small and mostly unknown framework - what if Solid stops development?"

I have two answers for that. First, for my needs, Solid does enough now, so I'd be happy with it as it is. And it's open-source, so I could fix bugs if something unexpected happens.

Secondly, the syntax is similar enough to React that the conversion wouldn't be terrible. The choices made by the Solid developers aren't in some obscure direction. In the future, there could be more similar options.
I have a lot of materials for these topics. To help the other developers I work with come up to speed, I created a number of videos that have been posted to YouTube. I was worried that it would be a hard sell, but once they used it a little, they've become enthusiastic about it.

To not run long, I'll get right into it. Please stop me anytime to ask questions.

Also, If I talk about things that everyone already knows, please stop me. I haven't been part of this group long enough to know the level of detail I should cover.

# Background

I want to show a few small projects, just to frame the discussion and to also get feedback on what other people have used and experienced.

These small projects all use the Node project that I created for developing and building the source code.

I'll talk about the specifics of compiling Solid/TypeScript source code later, but does anyone want me to talk about node projects a little, or is everyone familiar with Node projects?

# Node Projects

Let's quickly create a blank Node project. A simple Node project starts out as a single folder with a project.json file.

```
mkdir proj1
cd proj1
npm init
code .
```

Now to add tools and dependencies that the project can use, for example, let's add the latest TypeScript compiler.

```
npm install --save-dev typescript
```

This installs TypeScript, but it won't be deployed to production, it'll only be used to build the source code, so I made it a "devDependency". You can see the project file was updated.

You add any tools you want to use in this way, add configuration files for them, and use them in the project.

You add sections to the project.json file manually for some tools, and some require their own config files.

If you check out a Node project, from GitHub for example, and the dependencies haven't been downloaded, you use this command to download them all:

```
npm install
```

There are many project templates you can use. Solid provides a TypeScript starter project that you can easily create with one command.

```
cd ..
npm init solid app-ts my-app
code .
```

But this project includes a dependency called "solid-scripts" that is handy to get going, but doesn't allow the control over the settings that I wanted, so I created my own project that more explicitly performs the build process.

# Background (continued)

**Show 01-HTML**

This first project doesn't have any client side code, and is a simple static web page, served up by a web server. In this case, the web server used is provided by webpack. It provides hot reload and is nice for development.

Back to the node project... The "scripts" section can contain any number of command that you configure for convenient use.

In this case, I've defined "start" to launch the webpack development web server, "build-dev" to build the source bundle it into a single JS file that contains source maps for easy debugging, "build" to create a single JS file that is very small and intended for production use, and "watch" that watches the source files and recompiles when they change, for when you are debugging outside of VS code.

To run any of these commands, use "npm run", so to start the web server:

```
npm run start
```

This simply executes the command defined by the "start" script entry.

By the way, I've started using grid for layout, so the table layout is defined in the CSS file, and the HTML just contains lists of DIVs.

Now onto client side JS...

**Stop the web server, cd ..\02-JS-Template**

**Show 02-JS-Template**

This is a weird one that isn't that relevant, except to show a way for the client side to render the same table, but from HTML stored in a string variable.

Solid uses templates internally to create parts of components when they are rendered. Somewhere on Solid's web site said using templates, as opposed to document.createElement, provided a 5-8% improvement in rendering speed. document.createElement() just creates a single DOM node, and doing anything to it, like setting an attribute, or adding children, requires extra steps, while a template can contain a larger HTML fragment. It makes sense that re-using a template over and over is faster.

**Show index.html**

This project's HTML file contains a single DIV placeholder where the content will be rendered by JS.

**Show the single source file index.tsx - explain it**

**Start the project and open Edge development tools to see the source**

Now onto a project that builds the DOM nodes one at a time...

**Show 03-JSX-Build**

This project has the same index.html file with just a placeholder.

The index.tsx file contains two pairs of variables containing the data to render.

**Explain the intex.tsx file**

The UI layout is created by the renderTableControl() function. I'm curious how many people have built or worked on something like this?

Frankly, it's hard to see the UI from looking at the code. You can structure an application like this decently, but it can require a lot of lines of code - creating each element, setting attributes, adding to parent controls, etc.

When it is run, it renders one set of numbers, and then after 5 seconds it renders the second, and then switches every 2.5 seconds.

# Frameworks

A framework typically supports some sort of template language so your UI is described with an HTML like syntax, with JavaScript mixed in for that parts that are dynamic.

https://www.infoworld.com/article/3606737/angular-react-vue-javascript-frameworks-compared.html

This article shows a simple button component written using Angular, React, and View.

**Scroll down to the Angular example**

There's the UI template, easy to see, with the JavaScript stuff mixed in. The template includes calls to two functions, and the current counter is rendered at the bottom.

**Scroll down to the React example**

This looks very similar to Solid using JSX. For the templating piece, Solid also supports tagged template literals, and a hyperscript variant. I haven't used those, Solid recommends JSX for better performance, and I think JSX is easy to understand and use. More on JSX later.

**Scroll through the examples**

So Angular components are implemented as classes, React components are functions, and Vue components are defined by objects. But they all have some templating syntax, with JavaScript mixed in.

# Functional

No matter how the code is organized, you can look at it in a functional way - given the current state, the UI is generated by a hierarchy of functions.

The state is just the raw data that is displayed, and any other data that's required to generate the UI. For example, in a todo-list application, the list of todo items are part of the state, and if the application has a "Simple" and "Expert" mode, that could be stored in the state as a single boolean value.

This is going to get formal for a minute, but I found these ideas helpful.

**Show slide 4**

This equation says, given the current state, and an event or action, the next state of the application is calculated by equation R. Events can be internal or external - for example, the user could delete a todo item, or a new one could come in over the internet.

In the sample Solid project I'll create, there won't be a single function that applies an event to state, but it'll be a single software component, specifically a class.

**Show slide 5**

This equation says, given the current state, the function F generates the UI. F isn't typically a single function, but is a composition of components that together render the complete UI.

**Show slide 6**

This equation puts the two together. Working from the inside out, this is saying that the current state and an event are applied by function R to create a new state, that state is then applied by function F to generate the UI.

Applying this equation to every event drives your application forward in time, responding to actions and event, and properly displaying the appropriate UI.

You can't avoid writing the logic that updates state, or the logic that generates the UI, but if that is all you have to write, and skip the logic that determines when and what gets updated, then that would be almost too good to be true.

# Performance

The last project we looked at had static state, but the UI is completely generated by the single function renderTableControl.

Besides the source being hard to read and update, it also doesn't perform well. Every time it renders the page, the whole DOM is deleted and re-created. This isn't a problem with a tiny app like this, but any large app wants the UI to be as efficient and responsive as possible.

Updating the DOM is expensive because the browser has to layout and render the parts that change. The trick is to make minimal changes to the DOM. That may not sound hard to do, but it can be complicated. What if your app is showing a list of items, and you change the sort rules. Does it render the whole list, or does it rearrange the existing items in the DOM? The rearrange logic would be tricky. Let's say someone changes the color theme from light to dark, does everything re-render, or can you write the code that knows every style that has to change?

Last month there was mention of the virtual DOM. This technique is interesting, and is a performance improvement, even though it sounds like a lot of work. The code that generates the UI doesn't change the DOM directly, but instead renders into a tree in application memory. There can be localized optimizations, but any component that changes gets completely re-rendered to memory, but it's just allocating objects and building a tree in memory, so it's relatively fast. Then it compares the virtual DOM with the actual DOM, or I think the previously rendered memory tree, to see what elements have to be added, deleted, attributes changes, etc. So, for example, if you change the color theme, it'll re-render the whole UI, and then during the comparison phase will find what color attributes have to change.

If the app doesn't use a framework, like most of the codebase I work on, when the color theme changes, a method to set theme colors is called on the top level component, and that component knows what child components need to be notified, etc., all the way down to the smallest component.

Solid takes a different approach. I'll show you later how it doesn't implement a virtual DOM, but instead figures out the minimum DOM changes directly from the changes you make to your state.

