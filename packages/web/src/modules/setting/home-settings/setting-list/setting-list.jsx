import PropTypes from 'prop-types';
function SettingOption({ option, arrowRight, children, openBar }) {
  return (
    <div
      className={
        option.route
          ? 'relative flex items-center justify-between border-b-2 border-gray-300 pb-3 cursor-pointer flex-row sm:flex-col sm:items-stretch md:cursor-default gap-4 sm:border-0'
          : 'flex flex-col gap-4'
      }
    >
      <div className="flex gap-3">
        <img className="lg:hidden" src={option.icon} alt="language" />
        <h2 className="text-lg">{option.name}</h2>
      </div>
      {option.route && (
        <div className="sm:hidden lg:hidden">
          <button className="absolute left-0 bg-blue w-full h-full" onClick={() => openBar(option.route)}></button>
          <img src={arrowRight} alt="select your language" />
        </div>
      )}
      <div className={option.route ? 'hidden sm:block' : 'block'}>{children}</div>
    </div>
  );
}

SettingOption.propTypes = {
  option: PropTypes.shape(),
  arrowRight: PropTypes.string,
  children: PropTypes.object,
  openBar: PropTypes.func,
};

export default SettingOption;
