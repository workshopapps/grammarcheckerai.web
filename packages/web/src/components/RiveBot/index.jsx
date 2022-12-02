import Rive, { Fit } from 'rive-react';
import PropTypes from 'prop-types';

function RiveBot({ size }) {
  return (
    <Rive
      src="./bot.riv"
      style={size === 'small' ? { width: 54, height: 101 } : { width: 144, height: 140 }}
      fit={Fit.Cover}
    />
  );
}

RiveBot.propTypes = {
  size: PropTypes.string,
};

export default RiveBot;
