import React from "react";
import PropTypes from "prop-types";

import MapPickerInput from "../MapPickerInput";
import usePluginConfig from "../../../hooks/use-plugin-config";

const MapPickerComponent = (props) => {
  const { config, isLoading } = usePluginConfig();
  return config && config.apiKey && config.default_center ? (
    <MapPickerInput {...props} config={config} />
  ) : null;
};

MapPickerComponent.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
};

MapPickerComponent.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.object,
};

export default MapPickerComponent;
