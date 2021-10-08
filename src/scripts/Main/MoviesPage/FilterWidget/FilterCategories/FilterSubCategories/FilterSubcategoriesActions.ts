export async function handleFilter(
  location,
  category: string,
  data: any[],
  setColor
) {
  const currentParams = location.search.replace("?", "");
  if (currentParams) {
    return await handleWithParams(currentParams, category, data, setColor);
  } else {
    return { search: `${category.toLowerCase().replace(" ", "_")}=${data[1]}` };
  }
}

function handleWithParams(currentParams, category, data, setColor) {
  const paramsArray = currentParams
    .split("&")
    .map((splitee) => splitee.split("="));
  let paramsDouble: { key: string; value: string[] }[] = paramsArray.map(
    (param) => ({ key: param[0], value: param[1].toString().split("|") })
  );
  let updatedParams: string[] = [];
  let paramTrue: Boolean = false;

  paramsDouble.forEach((param) => {
    if (param.key === category.toLowerCase().replace(" ", "_")) {
      if (param.value.indexOf(data[1].toString()) === -1) {
        if (!["true", "false"].includes(data[1].toString())) {
          param.value.push(data[1].toString());
          updatedParams.push(`${param.key}=${param.value.join("|")}`);
        } else {
          updatedParams.push(`${param.key}=${data[1].toString()}`);
        }
      } else {
        const removedValue = param.value.filter(
          (par) => par !== data[1].toString()
        );
        if (removedValue.length > 0) {
          updatedParams.push(`${param.key}=${removedValue.join("|")}`);
        }
        setColor("gray");
      }
      paramTrue = true;
    } else {
      updatedParams.push(`${param.key}=${param.value.join("|")}`);
    }
  });

  if (paramTrue === false) {
    updatedParams = [
      `${currentParams}&${category.toLowerCase().replace(" ", "_")}=${data[1]}`,
    ];
  }
  return { search: updatedParams.join("&") };
}

export function handleButtonColors(currentParams, data, setColor) {
  if (currentParams) {
    const paramsArray = currentParams
      .split("&")
      .map((splitee) => splitee.split("="));
    let paramsDouble: { key: string; value: string[] }[] = paramsArray.map(
      (param) => ({ key: param[0], value: param[1].toString().split("|") })
    );
    paramsDouble.forEach((param) => {
      if (!["true", "false"].includes(data[1].toString())) {
        if (param.value.includes(data[1].toString())) {
          setColor("green");
        }
      } else {
        setColor("gray");
        if (param.value.includes(data[1].toString())) {
          setColor("green");
        }
      }
    });
  }
}
