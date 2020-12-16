import { useLocation } from "react-router-dom";

export const useSearchParams = () => {
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  let paramsObj: { [key: string]: string } = {};
  params.forEach((value, key) =>
    paramsObj = { ...paramsObj, [key]: value });

  return paramsObj;
};
