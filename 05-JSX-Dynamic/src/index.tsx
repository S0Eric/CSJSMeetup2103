import { render } from "solid-js/web";
import { Component, For } from "solid-js";

let timestamps = ["00:15:00", "00:30:00", "00:45:00", "01:00:00", "01:15:00", "01:30:00", "01:45:00", "02:00:00"];
let tableData = [
  { descr: "Temp", values: [60, 61, 62, 63, 64, 65, 66, 67] },
  { descr: "Stir Speed", values: [300, 303, 306, 309, 311, 315, 312, 299] },
  { descr: "Amps", values: [3.5, 3.6, 3.4, 3.3, 3.3, 3.2, 3.1, 2.9] }
];

type RowType = { descr: string, values: number[] }

type OurControlArgsType = {
  timestamps: string[];
  tableData: RowType[];
}

// const OurControl: Component<OurControlArgsType> = args => (
//   <div class="ctrl1_container">
//     <div class="ctrl1_titlebar">
//       <div class="ctrl1_timestamp">hh:mm:ss</div>
//       <For each={args.timestamps}>
//         {ts => <div class="ctrl1_timestamp">{ts}</div>}
//       </For>
//     </div>
//     <div class="ctrl1_datatable">
//       <For each={args.tableData}>
//         {row => <OurRowControl row={row} />}
//       </For>
//     </div>
//   </div>
// );

const OurControl: Component<OurControlArgsType> = args => (
  <div class="ctrl1_container">
    <OurTitleBarControl timestamps={args.timestamps} />
    <div class="ctrl1_datatable">
      <For each={args.tableData}>
        {row => <OurRowControl row={row} />}
      </For>
    </div>
  </div>
);

type OurTitleBarControlArgsType = { timestamps: string[] }

const OurTitleBarControl: Component<OurTitleBarControlArgsType> = args => (
  <div class="ctrl1_titlebar">
    <div class="ctrl1_timestamp">hh:mm:ss</div>
    <For each={args.timestamps}>
      {ts => <div class="ctrl1_timestamp">{ts}</div>}
    </For>
  </div>
)

type OurRowControlArgsType = {
  row: RowType;
}

const OurRowControl: Component<OurRowControlArgsType> = args => (
  <>
    <div class="ctrl1_descr">{args.row.descr}</div>
    <For each={args.row.values}>
      {v => <div class="ctrl1_value">{v}</div>}
    </For>
  </>
);

// const OurRowControl: Component<OurRowControlArgsType> = args => {
//   console.log(args.row.descr);
//   return (
//   <>
//     <div class="ctrl1_descr">{args.row.descr}</div>
//     <For each={args.row.values}>
//       {v => <div class="ctrl1_value">{v}</div>}
//     </For>
//   </>
//   );
// }

// const OurControl: Component<OurControlArgsType> = args => (
//   <div class="ctrl1_container">
//     <div class="ctrl1_titlebar">
//       <div class="ctrl1_timestamp">hh:mm:ss</div>
//       <For each={args.timestamps}>
//         {ts => <div class="ctrl1_timestamp">{ts}</div>}
//       </For>
//     </div>
//     <div class="ctrl1_datatable">
//       <For each={args.tableData}>
//         {row => (
//           <>
//             <div class="ctrl1_descr">{row.descr}</div>
//             <For each={row.values}>
//               {v => <div class="ctrl1_value">{v}</div>}
//             </For>
//           </>
//         )}
//       </For>
//     </div>
//   </div>
// )

if (window.addEventListener) {
  window.addEventListener("load", () => {
    render(() => <OurControl timestamps={timestamps} tableData={tableData} />, document.getElementById("root") as Node);
  });
}
