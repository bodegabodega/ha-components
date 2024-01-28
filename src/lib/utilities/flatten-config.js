export default function( config, state ) {
  if (!config.users) { // no users config
    return {
      ...config,
      visibleToUser: true
    };
  } else if(!state) { // no state
    return {
      ...config,
      visibleToUser: !(Object.keys(config.users).length === 0)
    };
  } else {
    const {
      user: {
        name
      }
    } = state;
    if(!name || (config.users.hasOwnProperty(name) && !config.users[name])) { // no user or user in config but falsey
      return {
        ...config,
        visibleToUser: false
      };
    } else if (!config.users[name]) { // user not in config
      return {
        ...config,
        visibleToUser: false
      };
    } else {
      return {
        ...config,
        visibleToUser: true,
        ...config.users[name]
      };
    }
  }
}