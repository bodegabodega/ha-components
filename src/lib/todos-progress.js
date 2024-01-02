import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const forEntityFromState = (hass, config) => {
  if(!hass || !config || !config.entity || !hass.states || !hass.states[config.entity]) return null;

  const { attributes } = hass.states[config.entity];
  const updatedDate = dayjs(attributes.updated_date);
  const lastUpdated = updatedDate.fromNow();
  const todos = [];
  const dones = [];
  const now = dayjs();
  attributes.data.forEach(todo => {
    const { title, list, complete, due } = todo;
    const dueDate = dayjs(due);
    const daysOverdue = now.diff(dueDate, 'day');
    const todoDate = dayjs(due);
    const timestamp = todoDate.unix();
    const pusher = complete ? dones : todos;
    pusher.push({
      title,
      list,
      complete,
      daysOverdue,
      timestamp
    });
  });
  todos.sort((a, b) => a.timestamp - b.timestamp);
  const done = dones.length;
  const tasks = [...todos, ...dones];
  const total = tasks.length;
  const percentComplete = Math.round((done / total) * 100);
  return {
    lastUpdated,
    remaining,
    percentComplete,
    tasks
  };
}

/*
"my.todays_reminders": {
      "entity_id": "my.todays_reminders",
      "state": "2023-12-30T08:00:05.033865",
      "attributes": {
        "friendly_name": "Todays Reminders",
        "updated_date": "2023-12-30T08:00:05.033865",
        "data": [
          {
            "complete": false,
            "due": "2023-12-30T00:00:00-05:00",
            "list": "Garden Street",
            "title": "Feed starter"
          },
          {
            "complete": false,
            "due": "2023-12-30T00:00:00-05:00",
            "list": "Personal",
            "title": "Brush & Floss 🦷"
          },
          {
            "complete": false,
            "due": "2023-12-27T00:00:00-05:00",
            "list": "Showtime",
            "title": "Prep that Comcast thing"
          },
          {
            "complete": true,
            "due": "2023-12-29T00:00:00-05:00",
            "list": "Personal",
            "title": "Watch Jacob's movie"
          }
        ]
      },
      "context": {
        "id": "01HJXCYV1QCTGP6FC2D3V2K54F",
        "parent_id": null,
        "user_id": "f2a22e16e6034df9bc1e8cfb0277911b"
      },
      "last_changed": "2023-12-30T13:00:05.047Z",
      "last_updated": "2023-12-30T13:00:05.047Z"
    },
    */