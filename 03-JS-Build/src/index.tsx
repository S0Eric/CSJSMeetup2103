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
    // Alternate between the two data sets every second.
    renderTableControl(timestamps1, tableData1);
    let show1 = false;
    setInterval(function() {
      if (show1) {
        renderTableControl(timestamps2, tableData2);
        show1 = false;
      }
      else {
        renderTableControl(timestamps1, tableData1);
        show1 = true;
      }
    }, 2000);
  });
}

// Function to create a DIV element, optionally add a class name,
// optionally add it to a parent node, and optionally add a child text node.
let createElement = (type: string, classname?: string, parent?: HTMLElement, text?: string) => {
  let ret = document.createElement(type);
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
  // Get a reference to the root node where we will render the table.
  let root = document.getElementById("root");
  if (root === null) { return; }
  // Delete all child content of the root node because we will replace it.
  root.innerHTML = "";
  // Create the container DIV.
  let container = createElement("div", "ctrl1_container", root);
  // Create the title bar DIV.
  let titlebar = createElement("div", "ctrl1_titlebar", container);
  // Add the single label to the title bar.
  createElement("div", "ctrl1_timestamp", titlebar, "hh:mm:ss");
  // Add each timestamp to the title bar.
  timestamps.forEach(ts => createElement("div", "ctrl1_timestamp", titlebar, ts));
  // Create the data table DIV.
  let datatable = createElement("div", "ctrl1_datatable", container);
  // Add each row to the data table.
  tableData.forEach(row => {
    // Create the description label.
    createElement("div", "ctrl1_descr", datatable, row.descr);
    // Add each value to the table.
    row.values.forEach(v => createElement("div", "ctrl1_value", datatable, v.toString()));
  });
}
