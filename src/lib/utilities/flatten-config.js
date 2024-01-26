export default function( config, state ) {
  if (!config.users) { // no users config
    return {
      visibleToUser: true,
      ...config
    };
  } else if(!state) { // no state
    return {
      visibleToUser: !(Object.keys(config.users).length === 0),
      ...config
    };
  } else {
    const {
      user: {
        id
      }
    } = state;
    if(!id || (config.users.hasOwnProperty(id) && !config.users[id])) { // no user or user in config but falsey
      return {
        visibleToUser: false,
        ...config
      };
    } else if (!config.users[id]) { // user not in config
      return {
        visibleToUser: false,
        ...config
      };
    } else {
      return {
        visibleToUser: true,
        ...config,
        ...config.users[id]
      };
    }
  }
}