import { render } from "solid-js/web"
import { Store } from "./store"
import { App } from "./App"

// Create an instance of the Store.
const store = new Store();

// Define a function that increments the state's count, and randomly
// adds or removes an element from the state's values list.
const updateStateFunction = () => {
  store.incrementCount();
  if (Math.random() >= 0.5 || store.state.values.length === 0)
    store.addValue(store.state.count);
  else store.removeLastValue();
}

// When the window loads, render the App control under the "root" element in index.html.
// Then start updating the state every second.
if (window.addEventListener) {
  window.addEventListener("load", () => {
    render(() => <App store={store} />, document.getElementById("root") as Node);

    setInterval(updateStateFunction, 1000)
  })
}
