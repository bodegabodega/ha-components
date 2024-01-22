import dayjs from "dayjs";

const earliestEvent = ( entities, hass ) => {
  const considerable = entities.filter(entity => {
    const event = hass.states[entity];
    return !(event.state == 'NOT_FOUND' || !event.attributes.date);
  });
  if (!considerable.length) return null;
  if (considerable.length == 1) return hass.states[considerable[0]];
  return considerable.reduce(
    (earliest, entity) => {
      const event = hass.states[entity];
      if (!event) return earliest;
      if (!earliest) return event;
      const now = dayjs();
      this.log('event diff', Math.abs(dayjs(event.attributes.date).diff(now)))
      this.log('earliest diff', Math.abs(dayjs(earliest.attributes.date).diff(now)))
      this.log('earliest is not', entity )
      return Math.abs(dayjs(event.attributes.date).diff(now)) < Math.abs(dayjs(earliest.attributes.date).diff(now)) ? event : earliest;
    },
    null
  );
}

export const forEntitiesFromState = ( config, hass ) => {
  const event = earliestEvent(config.entities, hass);
  if (!event) return null;
  const { state, attributes } = event;
  const eventDate = dayjs(attributes.date);
  const shouldShowScore = (state != 'PRE' && config.spoilers) || (!config.spoilers && dayjs().isAfter(eventDate.endOf('day')));
  const out = {
    date: eventDate.format('MMM, D • h:mmA'),
    league: attributes.league,
    location: `${attributes.venue} • ${attributes.location}`,
    clock: state == 'PRE' ? '' : `${attributes.clock}`
  }
  const goodGuys = {
    name: attributes.team_name,
    abbreviation: attributes.team_abbr,
    record: attributes.team_record.replace(/-/g, ' • '),
  }
  const badGuys = {
    name: attributes.opponent_name,
    abbreviation: attributes.opponent_abbr,
    record: attributes.opponent_record.replace(/-/g, ' • '),
  }
  if (attributes.team_homeaway == 'home') {
    out.home = { color: attributes.team_colors[0], ...goodGuys };
    out.away = { color: attributes.opponent_colors[1], ...badGuys };
    out.score = shouldShowScore ? `${attributes.team_score} • ${attributes.opponent_score}` : '';
  } else {
    out.home = { color: attributes.opponent_colors[0], ...badGuys };
    out.away = { color: attributes.team_colors[1], ...goodGuys };
    out.score = shouldShowScore ? `${attributes.opponent_score} • ${attributes.team_score}` : '';
  }
  return out;
}


/**
 * {
  "entity_id": "sensor.arsenal_cl_team_tracker",
  "state": "PRE",
  "attributes": {
    "attribution": "Data provided by ESPN",
    "sport": "soccer",
    "league": "CL",
    "league_logo": "https://a.espncdn.com/i/leaguelogos/soccer/500/2.png",
    "team_abbr": "ARS",
    "opponent_abbr": "RCL",
    "event_name": "RCL @ ARS",
    "date": "2023-11-29T20:00Z",
    "kickoff_in": "in a day",
    "venue": "Emirates Stadium",
    "location": "London, England",
    "tv_network": null,
    "odds": null,
    "overunder": null,
    "team_name": "Arsenal",
    "team_id": "359",
    "team_record": "3-0-1",
    "team_rank": null,
    "team_homeaway": "home",
    "team_logo": "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
    "team_colors": [
      "#EF0107",
      "#dfff00"
    ],
    "team_score": "0",
    "team_win_probability": null,
    "team_timeouts": null,
    "opponent_name": "Lens",
    "opponent_id": "175",
    "opponent_record": "1-2-1",
    "opponent_rank": null,
    "opponent_homeaway": "away",
    "opponent_logo": "https://a.espncdn.com/i/teamlogos/soccer/500/175.png",
    "opponent_colors": [
      "#ffff00",
      "#1a1a1a"
    ],
    "opponent_score": "0",
    "opponent_win_probability": null,
    "opponent_timeouts": null,
    "quarter": null,
    "clock": "Scheduled",
    "possession": null,
    "last_play": null,
    "down_distance_text": null,
    "outs": null,
    "balls": null,
    "strikes": null,
    "on_first": null,
    "on_second": null,
    "on_third": null,
    "team_shots_on_target": null,
    "team_total_shots": null,
    "opponent_shots_on_target": null,
    "opponent_total_shots": null,
    "team_sets_won": null,
    "opponent_sets_won": null,
    "last_update": "2023-11-27 15:39:05-05:00",
    "api_message": null,
    "icon": "mdi:soccer",
    "friendly_name": "arsenal_cl_team_tracker"
  },
  "context": {
    "id": "01HG983JZ31VQDWX3NZ128WDMY",
    "parent_id": null,
    "user_id": null
  },
  "last_changed": "2023-11-24T05:09:02.454Z",
  "last_updated": "2023-11-27T20:39:05.443Z"
}
 */