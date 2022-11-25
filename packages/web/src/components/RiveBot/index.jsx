// import rivebot from '../../assets/bot.riv';
import Rive, { Fit } from 'rive-react';

function RiveBot() {
  return <Rive src="./bot.riv" style={{ width: 144, height: 250 }} fit={Fit.Cover} />;
}

export default RiveBot;
