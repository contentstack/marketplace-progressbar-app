import React, { useEffect, useState } from "react";

import ContentstackAppSdk from "@contentstack/app-sdk";
import Slider, { SliderProps } from "@mui/material/Slider";
import { alpha, styled } from "@mui/material/styles";
import { isEmpty } from "lodash";

import { TypeDataSDK, ProgressBarData } from "../../common/types";
import "./styles.scss";
import "./index.css";

const SuccessSlider = styled(Slider)<SliderProps>(() => ({
  color: "#5d50bf",
  "& .MuiSlider-thumb": {
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0px 0px 0px 8px ${alpha("#5d50bf", 0.16)}`,
    },
    "&.Mui-active": {
      boxShadow: `0px 0px 0px 14px ${alpha("#5d50bf", 0.16)}`,
    },
  },
}));

const CustomField: React.FC = function () {
  const [state, setState] = useState<TypeDataSDK>({
    config: {},
    location: {},
    appSdkInitialized: false,
  });

  const [slideValue, setSlideValue] = useState<[ProgressBarData]>([
    {
      value: 10,
    },
  ]);

  useEffect(() => {
    ContentstackAppSdk.init().then(async (appSdk) => {
      const config = await appSdk?.getConfig();

      setState({
        config,
        location: appSdk.location,
        appSdkInitialized: true,
      });

      const initialData = appSdk.location.CustomField?.field.getData();

      if (initialData && !isEmpty(initialData)) {
        setSlideValue(initialData);
      }
    });
  }, []);

  const onChangeSave = (event: Event, slideVal: number | Array<number>) => {
    setSlideValue([{ value: slideVal }]);
    state.location?.CustomField?.field?.setData([{ value: slideVal }]);
  };

  return (
    <div className="layout-container">
      {state.appSdkInitialized && (
        <div className="slideBarDiv">
          <SuccessSlider
            defaultValue={10}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={onChangeSave}
            value={slideValue[0].value}
          />
        </div>
      )}
    </div>
  );
};

export default CustomField;
