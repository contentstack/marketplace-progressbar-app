import React, { useEffect, useState } from "react";

import ContentstackAppSdk from "@contentstack/app-sdk";
import Slider, { SliderProps } from "@mui/material/Slider";
import { alpha, styled } from "@mui/material/styles";
import { isEmpty } from "lodash";

import { TypeSDKData, TypeProgressBar } from "../../common/types";
import "./styles.css";

const sliderColor = "#5d50bf";

const SuccessSlider = styled(Slider)<SliderProps>(() => ({
  color: sliderColor,
  "& .MuiSlider-thumb": {
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0 0 0 8px ${alpha(sliderColor, 0.16)}`,
    },
    "&.Mui-active": {
      boxShadow: `0 0 0 14px ${alpha(sliderColor, 0.16)}`,
    },
  },
}));

const CustomField: React.FC = function () {
  const [state, setState] = useState<TypeSDKData>({
    config: {},
    location: {},
    appSdkInitialized: false,
  });

  const [slideValue, setSlideValue] = useState<[TypeProgressBar]>([
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
    <div className="layout-container customField">
      {state.appSdkInitialized && (
        <div className="customField__slide_bar">
          <SuccessSlider
            defaultValue={10}
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
