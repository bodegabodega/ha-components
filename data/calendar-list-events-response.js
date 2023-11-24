import dayjs from "dayjs"

const today = dayjs().minute(0);
const tomorrow = today.add(1, 'day').minute(0);
const future = today.add(3, 'day').minute(0);

export default [
  {
    "start": {
      "date": today.format('YYYY-MM-DD')
    },
    "end": {
      "date": future.format('YYYY-MM-DD')
    },
    "summary": "Rosmar: Taking Week off ",
    "description": null,
    "location": null,
    "uid": null,
    "recurrence_id": null,
    "rrule": null
  },
  {
    "start": {
      "date": tomorrow.format('YYYY-MM-DD')
    },
    "end": {
      "date": future.format('YYYY-MM-DD')
    },
    "summary": "Max & Maddie- no school- Thanksgiving",
    "description": null,
    "location": null,
    "uid": null,
    "recurrence_id": null,
    "rrule": null
  },
  {
    "start": {
      "dateTime": today.hour(9).format()
    },
    "end": {
      "dateTime": today.hour(10).format()
    },
    "summary": "Daddy: Wonder Lofts visit",
    "description": null,
    "location": "720 Clinton St\nHoboken, NJ, United States",
    "uid": null,
    "recurrence_id": null,
    "rrule": null
  },
  {
    "start": {
      "dateTime": today.hour(14).format()
    },
    "end": {
      "dateTime": today.hour(15).format()
    },
    "summary": "Morelias free Paletas!",
    "description": null,
    "location": null,
    "uid": null,
    "recurrence_id": null,
    "rrule": null
  },
  {
    "start": {
      "dateTime": today.hour(17).format()
    },
    "end": {
      "dateTime": today.hour(18).format()
    },
    "summary": "Max: Hip Hop trial class",
    "description": null,
    "location": "Mile Square Theatre\n1408 Clinton St, Hoboken, NJ  07030, United States",
    "uid": null,
    "recurrence_id": null,
    "rrule": null
  },
  {
    "start": {
      "dateTime": tomorrow.hour(8).format()
    },
    "end": {
      "dateTime": tomorrow.hour(9).format()
    },
    "summary": "Maddie Ballet/Tap class!",
    "description": null,
    "location": "Mile Square Theatre\n1408 Clinton St, Hoboken, NJ  07030, United States",
    "uid": null,
    "recurrence_id": null,
    "rrule": null
  },
  {
    "start": {
      "dateTime": tomorrow.hour(10).format()
    },
    "end": {
      "dateTime": tomorrow.hour(14).format()
    },
    "summary": "Open house! ",
    "description": null,
    "location": "210 11th St\nHoboken, NJ, United States",
    "uid": null,
    "recurrence_id": null,
    "rrule": null
  },
  {
    "start": {
      "dateTime": tomorrow.hour(8).format()
    },
    "end": {
      "dateTime": tomorrow.hour(21).format()
    },
    "summary": "Max: Augie’s bday party! (Snacks tee & Bring grip socks!",
    "description": null,
    "location": "Gravity Vault\n1423 Clinton St, Hoboken, NJ  07030, United States",
    "uid": null,
    "recurrence_id": null,
    "rrule": null
  },
  {
    "start": {
      "dateTime": future.hour(8).format()
    },
    "end": {
      "dateTime": tomorrow.hour(9).format()
    },
    "summary": "Family Nite w/The Clarkes! (Pizza & Movie)",
    "description": null,
    "location": null,
    "uid": null,
    "recurrence_id": null,
    "rrule": null
  }
]