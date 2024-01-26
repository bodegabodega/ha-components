export default function( config, state ) {
  if (!config.users) {
    return {
      visibleToUser: true,
      ...config
    };
  } else if(!state) {
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
    if(!id || !config.users.hasOwnProperty(id)) {
      return {
        visibleToUser: false,
        ...config
      };
    } else if (!config.users[id]) {
      return {
        visibleToUser: true,
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