### ========== *Show this web page* - https://babeljs.io/

I’m now going to talk about JSX. All web developers are comfortable with HTML, so allowing an HTML-like syntax in your source code while allowing the intermixing of JavaScript to provide any level of complexity to the dynamic parts of the content, is a great solution.

JSX was created by Facebook as a syntax extension to JavaScript, for use with their framework called React. But it can be used with any framework that supports it. It requires a compiler pass to transform the JSX expressions into JavaScript that creates the described structure. Solid provides its own JSX compiler.

When talking about the DOM structure, at first I wasn't sure if I should use the term **node** or **element**. I read that **node** is the generic term for any node in the DOM structure, while **element** is a more specific term for a node created by an HTML tag, like DIV or BUTTON.

I’m now going to show some JSX and how it gets compiled into JavaScript to demystify it a little. BabelJs.io’s “Try it out” page shows how JSX gets compiled to JavaScript.

### ========== *Click on Try It Out, and type:

Here is some code with a simple JSX expression:

```
const foo1 = <strong>Name:</strong>
```

You can see on the right that the JSX expression, that gets assigned to the **foo1** variable, is simply translated to a function call that will create the equivalent DOM node. By default, React's createElement() function is called to create the node structure. When this code executes, the resulting top level node will be assigned to the **foo1** variable.

I'll add this directive to tell this JSX compiler to use a different library to create the DOM nodes.

### ========== *Add this to the top:*

```
/** @jsx myCreateElement */
```

This directive configures the JSX compiler to call the myCreateElement function to create the nodes. That function doesn’t exist, but you could implement it to customize your own node creation logic. When your build process is configured to use Solid, the JSX gets compiled into code that calls internal Solid functions to create the DOM node structure, and implement the fine-grained reactivity logic.

The node creation function takes three arguments, the first is the name of the HTML element, **strong** in this case. The second is an object that encapsulates all the element's attributes, null in this case because it has no attributes. And the rest of the arguments are the child elements, in this case, the string constant "Name:" that's the only child node.

JSX can appear anywhere a JavaScript expression is allowed: as a function return value, assigned to a variable, passed to a function, etc. The most common use case is in a component function that returns the JSX expression, or, after JSX compilation, a function that returns a UI node structure.

Here is a more realistic example of a component function that returns JSX. These examples aren't truly realistic, for example, they don't deal with state or accept properties, but I want to just focus on JSX for now.

```
const label1 = () => <strong>Name:</strong>
```

This is a component function that returns a node structure.

Once you define a component function, you can reference it in other component functions.

```
const entry1 = () => (
    <div>
        <label1/>
        <input type="text" id="fname"/>
    </div>
)
```

This is a powerful feature - here, **label1** is a simple component, but as you can imagine, this feature allows you to create very powerful custom components and re-use them anywhere.

This is still an arrow function that returns a single expression. It's recommended that you surround multiline JSX expressions in parenthesis to avoid issues with automatic semicolon insertion. This multiline format makes it much easier to see the nested structure, and has no impact on the generated code.

The generated code is a little hard to read, but you can see the nested calls to myCreateElement(). That's the benefit of JSX - concise syntax that replaces code that's tedious to write using explicit node creation functions.

Now let's add some attributes to a JSX element and use a JavaScript variable for the child text.

```
const text = "Name: "
const label2 = () => <strong id="s1" class="bold">{text}</strong>
```

See that the attributes, **id** and **class**, are encapsulated in an object and passed as the second argument, and instead of a string constant, the child text node is specified by the **text** JavaScript string variable.

Any JavaScript expression can be placed inside braces. Here is another example where two functions are invoked to obtain values:

```
const label3 = () => {
    const getText = () => "Name: "
    const getClass = () => "bold"
    return (
        <strong id="s1" class={getClass()}>
            {getText()}
        </strong>
    )
}
```

This is a multi-statement arrow function, so it requires a return statement, and it defines two private helper functions.

When the lable3 component function is invoked to render some part of the UI, the **getClass()** and **getText()** functions are invoked to obtain the element's class and child text node.

This illustrates how easy it is to mix HTML-like syntax with JavaScript logic for the dynamic parts. To keep the JSX syntax readable, it makes sense to move complex logic into helper functions that are referenced in the JSX. You'll see examples of this in a later section when we create an actual web application.

Here is an example where the whole **style** attribute can be specified as either a string or an object:

```
const msg1 = () => (
    <div style="color: green">
        Hello <strong>{name}!</strong>
    </div>
)
const msg2 = () => (
    <div style={ {color: "green"} }>
        Hello <strong>{name}!</strong>
    </div>
)
```

When passing an object literal to a component, the doubly nested curly braces are required – the outer ones to indicate this is a JavaScript expression, and the inner ones to indicate an object literal.

JSX compiles to JavaScript calls that evaluate to a single JavaScript object. So, this syntax results in an error because there are two top level nodes:

```
const SimpleComponent = () => (
    <p>Simple</p>
    <p>Component</p>
)
```

You must wrap them in this special syntax to create a JSX Fragment.

```
const SimpleComponent = () => (
    <>
        <p>Simple</p>
        <p>Component</p>
    </>
)
```

Fragments let you group a list of children without adding extra nodes to the DOM. The returned node is a special placeholder that doesn't get added to the DOM, but its children do.

To support fine-grained reactivity, Solid’s JSX compiler does things a little differently with embedded JavaScript expressions than this compiler, but more on that later.

I hope this helped you understand JSX and how it's used in component functions. We'll go into more detail on component functions next.
