export const features: {
  label: string,
  value: string,
  maxValue: number,
  sliderColor: string,
}[] = [
  {
    label: "Quality",
    value: "quality",
    maxValue: 5000,
    sliderColor: "linear-gradient(to right, fuchsia, orange)",
  },
  {
    label: "Resolution",
    value: "resolution",
    maxValue: 5000,
    sliderColor:
      "linear-gradient(to right, rgb(204, 102, 255), rgb(102, 102, 255))",
  },
  {
    label: "Devices",
    value: "devices",
    maxValue: 4,
    sliderColor:
      "linear-gradient(to right,rgb(0, 204, 153), rgb(0, 153, 153), rgb(0, 204, 255))",
  },
];
