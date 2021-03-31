export type SettingsDataType = { description: string; value: number; }[];

  // Simulates a backend data service.
  export class MockDataService {
  private static readonly SettingsMetadata = [
    { descr: "Image Plane (µm)", isInt: true },
    { descr: "Laser %", isInt: true },
    { descr: "Auto Laser 1 on/0 off", isInt: true },
    { descr: "Triage 1 on/0 off", isInt: true },
    { descr: "Min Black Level", isInt: true },
    { descr: "Image Save Interval", isInt: true },
    { descr: "Images/Interval", isInt: true },
    { descr: "Meas Duration (sec)", isInt: true },
    { descr: "Laser Temperature", isInt: false },
    { descr: "Camera Temperature", isInt: false },
    { descr: "Triage Quality %", isInt: true },
    { descr: "Contrast Range", isInt: true },
    { descr: "Image Spacing on/off", isInt: true },
    { descr: "Auto Laser interval", isInt: true },
    { descr: "Exclude Glare on/off", isInt: true },
    { descr: "Glare Level", isInt: true },
    { descr: "Max Glare %", isInt: true }
  ];

  // Given a timestamp, after a short delay, return random settings data for that timestamp.
  static getSettingsByTimestamp(timestamp: number): Promise<SettingsDataType> {
    return new Promise(function(resolve) {
      // Return data for this timestamp based on modulo 100 of the timestamp.
      let rootVal = Math.floor(Math.random() * 50);
      let data: SettingsDataType = MockDataService.SettingsMetadata.map((setting, idx) => {
        let val = rootVal + idx;
        return {
          description: setting.descr,
          value: setting.isInt ? val : val + Math.round(Math.random() * 100) / 100
        }
      });
      // Simulate a short delay before resolving the promise.
      setTimeout(() => resolve(data), Math.floor(Math.random() * 1000));
    });
  }
}
