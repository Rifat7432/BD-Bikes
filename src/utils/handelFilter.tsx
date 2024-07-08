/* eslint-disable @typescript-eslint/no-explicit-any */

import { removeDuplicates } from "./filters";

//product data type
type TProduct = {
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  type: "road" | "mountain" | "hybrid";
  size: string;
  color: string;
  material: string;
  suspensionType: string;
  customAttributes: string;
  isDeleted: boolean;
};
// after removing duplicate get all color for sidebar
export const handleColors = (array: TProduct[], handleProvinceChange: any) => {
  const filteredArray: string[] = removeDuplicates(
    array.map((element: TProduct) => element.color)
  );
  return filteredArray.map((element: string) => {
    return {
      key: element,
      label: (
        <p
          onClick={() => handleProvinceChange({ color: element })}
          style={{ color: `${element}` }}
        >
          {element}
        </p>
      ),
    };
  });
};
// after removing duplicate get all size for sidebar
export const handleSize = (array: TProduct[], handleProvinceChange: any) => {
  const filteredArray: string[] = removeDuplicates(
    array.map((element: TProduct) => element.size)
  );
  return filteredArray.map((element: string) => {
    return {
      key: element,
      label: (
        <p
          onClick={() => handleProvinceChange({ size: element })}
          style={{ color: `${element}` }}
        >
          {element}
        </p>
      ),
    };
  });
};
// after removing duplicate get all model for sidebar

export const handleModel = (array: TProduct[], handleProvinceChange: any) => {
  const filteredArray: string[] = removeDuplicates(
    array.map((element: TProduct) => element.model)
  );
  return filteredArray.map((element: string) => {
    return {
      key: element,
      label: (
        <p
          onClick={() => handleProvinceChange({ model: element })}
          style={{ color: `${element}` }}
        >
          {element}
        </p>
      ),
    };
  });
};
// after removing duplicate get all brand for sidebar

export const handleBrand = (array: TProduct[], handleProvinceChange: any) => {
  const filteredArray: string[] = removeDuplicates(
    array.map((element: TProduct) => element.brand)
  );
  return filteredArray.map((element: string) => {
    return {
      key: element,
      label: (
        <p
          onClick={() => handleProvinceChange({ brand: element })}
          style={{ color: `${element}` }}
        >
          {element}
        </p>
      ),
    };
  });
};
// after removing duplicate get all type for sidebar

export const handleType = (array: TProduct[], handleProvinceChange: any) => {
  const filteredArray: string[] = removeDuplicates(
    array.map((element: TProduct) => element.type)
  );
  return filteredArray.map((element: string) => {
    return {
      key: element,
      label: (
        <p
          onClick={() => handleProvinceChange({ type: element })}
          style={{ color: `${element}` }}
        >
          {element}
        </p>
      ),
    };
  });
};
// after removing duplicate get all material for sidebar
export const handleMaterial = (
  array: TProduct[],
  handleProvinceChange: any
) => {
  const filteredArray: string[] = removeDuplicates(
    array.map((element: TProduct) => element.material)
  );
  return filteredArray.map((element: string) => {
    return {
      key: element,
      label: (
        <p
          onClick={() => handleProvinceChange({ material: element })}
          style={{ color: `${element}` }}
        >
          {element}
        </p>
      ),
    };
  });
};
// after removing duplicate get all suspensionType for sidebar

export const handleSuspensionType = (
  array: TProduct[],
  handleProvinceChange: any
) => {
  const filteredArray: string[] = removeDuplicates(
    array.map((element: TProduct) => element.suspensionType)
  );
  return filteredArray.map((element: string) => {
    return {
      key: element,
      label: (
        <p
          onClick={() => handleProvinceChange({ suspensionType: element })}
          style={{ color: `${element}` }}
        >
          {element}
        </p>
      ),
    };
  });
};
// after removing duplicate get all customAttributes for sidebar

export const handleCustomAttributes = (
  array: TProduct[],
  handleProvinceChange: any
) => {
  const filteredArray: string[] = removeDuplicates(
    array.map((element: TProduct) => element.customAttributes)
  );
  return filteredArray.map((element: string) => {
    return {
      key: element,
      label: (
        <p
          onClick={() => handleProvinceChange({ customAttributes: element })}
          style={{ color: `${element}` }}
        >
          {element}
        </p>
      ),
    };
  });
};
