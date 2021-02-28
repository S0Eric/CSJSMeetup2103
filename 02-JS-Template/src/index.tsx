let tableHtml = `
<div class="ctrl1_container">
  <div class="ctrl1_titlebar">
    <div class="ctrl1_timestamp">hh:mm:ss</div>
    <div class="ctrl1_timestamp">00:15:00</div>
    <div class="ctrl1_timestamp">00:30:00</div>
    <div class="ctrl1_timestamp">00:45:00</div>
    <div class="ctrl1_timestamp">01:00:00</div>
    <div class="ctrl1_timestamp">01:15:00</div>
    <div class="ctrl1_timestamp">01:30:00</div>
    <div class="ctrl1_timestamp">01:45:00</div>
    <div class="ctrl1_timestamp">02:00:00</div>
  </div>
  <div class="ctrl1_datatable">
    <div class="ctrl1_descr">Temp</div>
    <div class="ctrl1_value">60</div>
    <div class="ctrl1_value">61</div>
    <div class="ctrl1_value">62</div>
    <div class="ctrl1_value">63</div>
    <div class="ctrl1_value">64</div>
    <div class="ctrl1_value">65</div>
    <div class="ctrl1_value">66</div>
    <div class="ctrl1_value">67</div>
    <div class="ctrl1_descr">Stir Speed</div>
    <div class="ctrl1_value">300</div>
    <div class="ctrl1_value">303</div>
    <div class="ctrl1_value">306</div>
    <div class="ctrl1_value">309</div>
    <div class="ctrl1_value">311</div>
    <div class="ctrl1_value">315</div>
    <div class="ctrl1_value">312</div>
    <div class="ctrl1_value">299</div>
    <div class="ctrl1_descr">Amps</div>
    <div class="ctrl1_value">3.5</div>
    <div class="ctrl1_value">3.6</div>
    <div class="ctrl1_value">3.4</div>
    <div class="ctrl1_value">3.3</div>
    <div class="ctrl1_value">3.3</div>
    <div class="ctrl1_value">3.2</div>
    <div class="ctrl1_value">3.1</div>
    <div class="ctrl1_value">2.9</div>
  </div>
</div>
`;

let createTemplate = (html: string) => {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  let node = t.content.firstChild;
  return node;
}

let tableTemplate = createTemplate(tableHtml) ?? undefined;

let renderFromTemplate = (template: ChildNode | undefined) => {
  if (template === undefined) { return; }
  let root = document.getElementById("root") ?? undefined;
  if (root === undefined) { return; }
  root.innerHTML = "";

  let node = template.cloneNode(true);
  root.appendChild(node);
}

if (window.addEventListener) {
  window.addEventListener("load", () => {
    // Render from template.
    renderFromTemplate(tableTemplate);
  });
}
