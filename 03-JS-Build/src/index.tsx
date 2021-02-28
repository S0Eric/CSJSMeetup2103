let timestamps1 = ["00:15:00", "00:30:00", "00:45:00", "01:00:00", "01:15:00", "01:30:00", "01:45:00", "02:00:00"];
let tableData1 = [
  { descr: "Temp", values: [60, 61, 62, 63, 64, 65, 66, 67] },
  { descr: "Stir Speed", values: [300, 303, 306, 309, 311, 315, 312, 299] },
  { descr: "Amps", values: [3.5, 3.6, 3.4, 3.3, 3.3, 3.2, 3.1, 2.9] }
];

let timestamps2 = ["00:30:00", "01:00:00", "01:30:00", "02:00:00", "02:30:00", "03:00:00", "03:30:00", "02:00:00"];
let tableData2 = [
  { descr: "Amps", values: [2.5, 2.6, 2.4, 2.3, 2.3, 2.2, 2.1, 1.9] },
  { descr: "Temp", values: [80, 81, 82, 83, 84, 85, 86, 87] },
  { descr: "Stir Speed", values: [200, 203, 206, 209, 211, 215, 212, 299] }
];

if (window.addEventListener) {
  window.addEventListener("load", () => {
    // Initially render the control.
    renderTableControl(timestamps1, tableData1)

    // After interval, re-render the control with different data, and after half the
    // interval, re-render with the original data - basically swap back and forth.
    let interval = 5000;
    setInterval(() => {
      renderTableControl(timestamps2, tableData2);
      setTimeout(() => renderTableControl(timestamps1, tableData1), interval / 2);
    }, interval);
  });
}

// Function to create a DIV element, optionally add a class name,
// optionally add it to a parent node, and optionally add a child text node.
let createDivElement = (classname?: string, parent?: HTMLElement, text?: string) => {
  let ret = document.createElement("div");
  if (classname !== undefined) {
    ret.className = classname;
  }
  if (parent !== undefined) {
    parent.appendChild(ret);
  }
  if (text !== undefined) {
    ret.appendChild(document.createTextNode(text));
  }
  return ret;
}

function renderTableControl(timestamps: string[], tableData: { descr: string, values: number[] }[]) {
  let root = document.getElementById("root") ?? undefined;
  if (root === undefined) { return; }
  root.innerHTML = "";
  let container = createDivElement("ctrl1_container", root);
  let titlebar = createDivElement("ctrl1_titlebar", container);
  createDivElement("ctrl1_timestamp", titlebar, "hh:mm:ss");
  timestamps.forEach(ts => createDivElement("ctrl1_timestamp", titlebar, ts));
  let datatable = createDivElement("ctrl1_datatable", container);
  tableData.forEach(row => {
    createDivElement("ctrl1_descr", datatable, row.descr);
    row.values.forEach(v => createDivElement("ctrl1_value", datatable, v.toString()));
  });
}
