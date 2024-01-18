import dayjs from "dayjs"

const today = dayjs().minute(0);
const tomorrow = today.add(1, 'day').minute(0);
const future = today.add(3, 'day').minute(0);

window.hass = {
  "states": {
    "input_datetime.smoke_free_nikolai" : {
      "entity_id": "input_datetime.smoke_free_nikolai",
      "state": "2024-01-01 23:00:00",
      "attributes": {
        "has_date": true,
        "has_time": true,
        "editable": true,
        "year": 2024,
        "month": 1,
        "day": 1,
        "hour": 23,
        "minute": 0,
        "second": 0,
        "timestamp": 1704168000,
        "friendly_name": "smoke_free_nikolai"
      },
      "context": {
        "id": "01HKZWM3SNE4V0TPBVTSFTD8QX",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2024-01-12T22:28:01.461Z",
      "last_updated": "2024-01-12T22:28:01.461Z"
    },
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
    "sensor.smoke_free_nikolai": {
      "entity_id": "sensor.smoke_free_nikolai",
      "state": "3 months & 1 day",
      "attributes": {
        "achievement": "The CO from smoking has been eliminated",
        "next_achievement": "In 24 hours you will have expelled the nicotine from your body, and your taste and smell will return to normal",
        "icon": "mdi:molecule-co",
        "friendly_name": "Nikolai Smoke Free"
      },
      "context": {
        "id": "01HJFCHHGWWBM7P0BH8W82QDEV",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-12-25T02:23:27.260Z",
      "last_updated": "2023-12-25T02:23:27.260Z"
    },
    "sensor.activity_nikolai": {
      "entity_id": "sensor.activity_nikolai",
      "state": "2023-12-24T21:24:00.485563-05:00",
      "attributes": {
        "exercise": 36,
        "exercise_goal": "30",
        "energy": 547.8469999999999,
        "energy_goal": "800",
        "steps": 9466,
        "step_goal": "10000",
        "friendly_name": "Nikolai's Activity"
      },
      "context": {
        "id": "01HJFCJHZ5J2QCR5FKGDD0EKHB",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-12-25T02:24:00.485Z",
      "last_updated": "2023-12-25T02:24:00.485Z"
    },
    "sensor.weight_and_size_nikolai": {
      "entity_id": "sensor.weight_and_size_nikolai",
      "state": "195.6",
      "attributes": {
        "current": 195.6,
        "bmi": 26.5,
        "goal_weight": 180,
        "muscle_mass": 36.3,
        "water": 59.7,
        "friendly_name": "Nikolai's Weight and Size"
      },
      "context": {
        "id": "01HJE2B5S36KF8QFE7YFSKRHMB",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-12-24T14:05:58.435Z",
      "last_updated": "2023-12-24T14:05:58.435Z"
    },
    "sun.sun": {
      "entity_id": "sun.sun",
      "state": "below_horizon",
      "attributes": {
        "next_dawn": "2023-12-15T11:40:58.860196+00:00",
        "next_dusk": "2023-12-15T22:01:23.010303+00:00",
        "next_midnight": "2023-12-15T04:51:13+00:00",
        "next_noon": "2023-12-15T16:50:53+00:00",
        "next_rising": today.hour(6).minute(32).format('YYYY-MM-DDTHH:mm:ss.SSSSSS-05:00'),
        "next_setting": today.hour(21).minute(32).format('YYYY-MM-DDTHH:mm:ss.SSSSSS-05:00'),
        "elevation": -8.9,
        "azimuth": 246.94,
        "rising": false,
        "friendly_name": "Sun"
      },
      "context": {
        "id": "01HHN6F97MQWYDZV9GNSF14JBS",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-12-14T21:33:44.687Z",
      "last_updated": "2023-12-14T22:17:06.548Z"
    },
    "sensor.dashboard_calendar_events" : {
      "entity_id": "sensor.dashboard_calendar_events",
      "state": "2023-12-08T08:30:00.727525-05:00",
      "attributes": {
        "calendars": {
          "calendar.famalam": {
            "events": [
              {
                "start": today.hour(9).format(),
                "end": today.hour(10).format(),
                "summary": "Maddie: Gymnastics class",
                "location": "Diamond Gymnastics\n738 Willow Ave, Hoboken, NJ  07030, United States"
              },
              {
                "start": today.hour(12).format(),
                "end": today.hour(13).format(),
                "summary": "Maddie Ballet/Tap class!",
                "location": "Mile Square Theatre\n1408 Clinton St, Hoboken, NJ  07030, United States"
              },
              {
                "start": today.format('YYYY-MM-DD'),
                "end": today.format('YYYY-MM-DD'),
                "summary": "Rosmar Babysitting tonight "
              },
              {
                "start": tomorrow.hour(9).format(),
                "end": tomorrow.hour(11).format(),
                "summary": "Mommy: Dinner w/Sandy & Serena",
                "location": "Edgewater\nUnited States"
              },
              {
                "start": tomorrow.hour(17).format(),
                "end": tomorrow.hour(20).format(),
                "summary": "DFR Holiday Dinner"
              },
              {
                "start": future.hour(9).format(),
                "end": future.hour(10).format(),
                "summary": "Hugs & Bugs Santa @the park (hot cocoa & activities- bring unwrapped toys!)",
                "location": "Church Square Park\n400 Garden St, Hoboken, NJ 07030, United States"
              },
              {
                "start": future.hour(12).format(),
                "end": future.hour(14).format(),
                "summary": "Max: Sarah Kelly Bday party!",
                "location": "Meadowlands Gymnastics Academy\n69 NJ-17 S, Hasbrouck Heights, NJ  07604, United States"
              },
              {
                "start": tomorrow.format('YYYY-MM-DD'),
                "end": tomorrow.format('YYYY-MM-DD'),
                "summary": "Mommy: Covid/Flu shots",
                "description": "Next steps: Please check in at the pharmacy area inside the store when you arrive. Bring your ID and insurance card, voucher or other coverage. Don't forget a face covering. Wearing it throughout your visit is required. What to do if you're feeling sick or experiencing COVID-19 symptoms: Don't go to the pharmacy. Contact your primary care provider for next steps. CVS tips for vaccine shots: Did you know wearing short sleeves makes getting a shot easier and faster? If you must wear long sleeves, dress in layers with the short sleeves underneath. Review your patient fact sheet for up-to-date, vaccine-specific information about side effects, risks and more.",
                "location": "CVS Pharmacy\n210 14th St, Hoboken, NJ  07030, United States"
              },
              {
                "start": tomorrow.format('YYYY-MM-DD'),
                "end": tomorrow.format('YYYY-MM-DD'),
                "summary": "Maddie: Parent/adult viewing @gymnastics!",
                "location": "Diamond Gymnastics\n738 Willow Ave, Hoboken, NJ  07030, United States"
              },
              {
                "start": today.format('YYYY-MM-DD'),
                "end": future.format('YYYY-MM-DD'),
                "summary": "Max: Publishing party!",
                "location": "Hoboken Charter School\n713 Washington St, Hoboken, NJ  07030, United States"
              },
              {
                "start": future.format('YYYY-MM-DD'),
                "end": future.format('YYYY-MM-DD'),
                "summary": "Maddie: Parent/Teacher conference ",
                "location": "Annex room 001"
              },
              {
                "start": future.hour(16).format(),
                "end": future.hour(18).format(),
                "summary": "Mommy: Dinner w/Anne & Ange",
                "location": "Nyc "
              },
              {
                "start": future.hour(12).minute(30).format(),
                "end": future.hour(13).minute(30).format(),
                "summary": "Max: HCS Winter Concert day! (Wear Dress shirt)"
              }
            ]
          },
          "calendar.lava_visitors": {
            "events": []
          }
        },
        "friendly_name": "Dashboard Calendar Events"
      },
      "context": {
        "id": "01HH4SXTMQ475HZ6RKDEW65PMY",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-12-08T13:30:00.727Z",
      "last_updated": "2023-12-08T13:30:00.727Z"
    },
    "sensor.tomorrow_io_garden_street_hourly": {
      "entity_id": "sensor.tomorrow_io_garden_st_weather_forecast_hourly",
      "state": "2023-12-07T09:15:00.207579-05:00",
      "attributes": {
        "friendly_name": "Tomorrow IO Garden St Weather Forecast Hourly",
        "forecast": [
          {
            "datetime": today.format(),
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 233.88,
            "temperature": 33,
            "dew_point": 23,
            "wind_speed": 2.93,
            "precipitation": 0,
            "humidity": 57
          },
          {
            "datetime": today.add(1, 'hour').format(),
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 239.77,
            "temperature": 34,
            "dew_point": 23,
            "wind_speed": 7.2,
            "precipitation": 0,
            "humidity": 64
          },
          {
            "datetime": today.add(2, 'hour').format(),
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 237.93,
            "temperature": 36,
            "dew_point": 24,
            "wind_speed": 8.48,
            "precipitation": 0,
            "humidity": 62
          },
          {
            "datetime": today.add(3, 'hour').format(),
            "condition": "snowy",
            "precipitation_probability": 12,
            "wind_bearing": 237.4,
            "temperature": 37,
            "dew_point": 25,
            "wind_speed": 8.99,
            "precipitation": 0.01,
            "humidity": 62
          },
          {
            "datetime": today.add(4, 'hour').format(),
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 235.66,
            "temperature": 37,
            "dew_point": 27,
            "wind_speed": 8.97,
            "precipitation": 0,
            "humidity": 67
          },
          {
            "datetime": today.add(5, 'hour').format(),
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 230.01,
            "temperature": 37,
            "dew_point": 28,
            "wind_speed": 8.79,
            "precipitation": 0,
            "humidity": 71
          },
          {
            "datetime": today.add(6, 'hour').format(),
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 231.58,
            "temperature": 39,
            "dew_point": 30,
            "wind_speed": 9.08,
            "precipitation": 0,
            "humidity": 73
          },
          {
            "datetime": today.add(7, 'hour').format(),
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 233.69,
            "temperature": 40,
            "dew_point": 31,
            "wind_speed": 8.66,
            "precipitation": 0,
            "humidity": 73
          },
          {
            "datetime": today.add(8, 'hour').format(),
            "condition": "sunny",
            "precipitation_probability": 0,
            "wind_bearing": 240.32,
            "temperature": 40,
            "dew_point": 32,
            "wind_speed": 7.2,
            "precipitation": 0,
            "humidity": 75
          },
          {
            "datetime": today.add(9, 'hour').format(),
            "condition": "partlycloudy",
            "precipitation_probability": 0,
            "wind_bearing": 226.58,
            "temperature": 38,
            "dew_point": 32,
            "wind_speed": 5.99,
            "precipitation": 0,
            "humidity": 78
          },
          {
            "datetime": today.add(10, 'hour').format(),
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 223.48,
            "temperature": 37,
            "dew_point": 32,
            "wind_speed": 5.64,
            "precipitation": 0,
            "humidity": 79
          },
          {
            "datetime": today.add(11, 'hour').format(),
            "condition": "partlycloudy",
            "precipitation_probability": 0,
            "wind_bearing": 218.15,
            "temperature": 36,
            "dew_point": 32,
            "wind_speed": 5.77,
            "precipitation": 0,
            "humidity": 84
          },
          {
            "datetime": today.add(12, 'hour').format(),
            "condition": "clear-night",
            "precipitation_probability": 0,
            "wind_bearing": 227.33,
            "temperature": 35,
            "dew_point": 31,
            "wind_speed": 6.2,
            "precipitation": 0,
            "humidity": 84
          },
          {
            "datetime": today.add(13, 'hour').format(),
            "condition": "clear-night",
            "precipitation_probability": 0,
            "wind_bearing": 232.62,
            "temperature": 34,
            "dew_point": 31,
            "wind_speed": 6.02,
            "precipitation": 0,
            "humidity": 83
          },
          {
            "datetime": today.add(14, 'hour').format(),
            "condition": "clear-night",
            "precipitation_probability": 0,
            "wind_bearing": 236.23,
            "temperature": 34,
            "dew_point": 30,
            "wind_speed": 5.88,
            "precipitation": 0,
            "humidity": 83
          },
          {
            "datetime": today.add(15, 'hour').format(),
            "condition": "clear-night",
            "precipitation_probability": 0,
            "wind_bearing": 242.33,
            "temperature": 34,
            "dew_point": 30,
            "wind_speed": 5.57,
            "precipitation": 0,
            "humidity": 83
          },
          {
            "datetime": today.add(16, 'hour').format(),
            "condition": "clear-night",
            "precipitation_probability": 0,
            "wind_bearing": 245.99,
            "temperature": 34,
            "dew_point": 29,
            "wind_speed": 5.17,
            "precipitation": 0,
            "humidity": 82
          },
          {
            "datetime": today.add(17, 'hour').format(),
            "condition": "clear-night",
            "precipitation_probability": 0,
            "wind_bearing": 249.46,
            "temperature": 35,
            "dew_point": 31,
            "wind_speed": 5.26,
            "precipitation": 0,
            "humidity": 82
          },
          {
            "datetime": today.add(18, 'hour').format(),
            "condition": "clear-night",
            "precipitation_probability": 0,
            "wind_bearing": 253.2,
            "temperature": 34,
            "dew_point": 30,
            "wind_speed": 5.37,
            "precipitation": 0,
            "humidity": 82
          },
          {
            "datetime": today.add(19, 'hour').format(),
            "condition": "clear-night",
            "precipitation_probability": 0,
            "wind_bearing": 260.37,
            "temperature": 34,
            "dew_point": 30,
            "wind_speed": 5.1,
            "precipitation": 0,
            "humidity": 82
          },
          {
            "datetime": today.add(20, 'hour').format(),
            "condition": "clear-night",
            "precipitation_probability": 0,
            "wind_bearing": 271.25,
            "temperature": 34,
            "dew_point": 29,
            "wind_speed": 4.7,
            "precipitation": 0,
            "humidity": 82
          },
          {
            "datetime": today.add(21, 'hour').format(),
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 277.36,
            "temperature": 34,
            "dew_point": 30,
            "wind_speed": 4.61,
            "precipitation": 0,
            "humidity": 82
          },
          {
            "datetime": today.add(22, 'hour').format(),
            "condition": "clear-night",
            "precipitation_probability": 0,
            "wind_bearing": 286.19,
            "temperature": 34,
            "dew_point": 30,
            "wind_speed": 4.61,
            "precipitation": 0,
            "humidity": 82
          },
          {
            "datetime": today.add(23, 'hour').format(),
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 282.96,
            "temperature": 34,
            "dew_point": 30,
            "wind_speed": 4.65,
            "precipitation": 0,
            "humidity": 81
          }
        ]
      },
      "context": {
        "id": "01HH2A3FVG52W4WVGMQ07K8EPW",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-12-07T14:15:00.208Z",
      "last_updated": "2023-12-07T14:15:00.208Z"
    },
    "weather.tomorrow_io_garden_street_daily" : {
      "entity_id": "weather.tomorrow_io_garden_street_daily",
      "state": "cloudy",
      "attributes": {
        "temperature": 52,
        "temperature_unit": "°F",
        "humidity": 85,
        "pressure": 29.78,
        "pressure_unit": "inHg",
        "wind_bearing": 264.69,
        "wind_speed": 1.97,
        "wind_speed_unit": "mph",
        "visibility": 8.13,
        "visibility_unit": "mi",
        "precipitation_unit": "in",
        "forecast": [
          {
            "datetime": "2023-11-22T11:00:00+00:00",
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 299.51,
            "temperature": 55,
            "templow": 43,
            "dew_point": 49,
            "wind_speed": 11.16,
            "precipitation": 0,
            "humidity": 95
          },
          {
            "datetime": "2023-11-23T11:00:00+00:00",
            "condition": "sunny",
            "precipitation_probability": 20,
            "wind_bearing": 277.57,
            "temperature": 48,
            "templow": 36,
            "dew_point": 39,
            "wind_speed": 10.8,
            "precipitation": 0,
            "humidity": 90
          },
          {
            "datetime": "2023-11-24T11:00:00+00:00",
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 326.71,
            "temperature": 47,
            "templow": 26,
            "dew_point": 33,
            "wind_speed": 12.24,
            "precipitation": 0,
            "humidity": 82
          },
          {
            "datetime": "2023-11-25T11:00:00+00:00",
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 177.23,
            "temperature": 39,
            "templow": 25,
            "dew_point": 20,
            "wind_speed": 4.72,
            "precipitation": 0,
            "humidity": 80
          },
          {
            "datetime": "2023-11-26T11:00:00+00:00",
            "condition": "cloudy",
            "precipitation_probability": 20,
            "wind_bearing": 192.08,
            "temperature": 47,
            "templow": 38,
            "dew_point": 39,
            "wind_speed": 7.78,
            "precipitation": 0,
            "humidity": 81
          },
          {
            "datetime": "2023-11-27T11:00:00+00:00",
            "condition": "cloudy",
            "precipitation_probability": 0,
            "wind_bearing": 250.67,
            "temperature": 47,
            "templow": 43,
            "dew_point": 38,
            "wind_speed": 8.95,
            "precipitation": 0,
            "humidity": 82
          }
        ],
        "attribution": "Powered by Tomorrow.io",
        "friendly_name": "Tomorrow.io - Garden Street Daily",
        "supported_features": 3
      },
      "context": {
        "id": "01HFVTXRVQRHJ2S4X29HX0G1NA",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-11-22T15:38:35.767Z",
      "last_updated": "2023-11-22T15:38:35.767Z"
    },
    "weather.forecast_garden_street": {
      "entity_id": "weather.forecast_garden_street",
      "state": "cloudy",
      "attributes": {
        "temperature": 74,
        "temperature_unit": "°F",
        "humidity": 89,
        "cloud_coverage": 97.7,
        "pressure": 30.08,
        "pressure_unit": "inHg",
        "wind_bearing": 34.9,
        "wind_speed": 6.96,
        "wind_speed_unit": "mph",
        "visibility_unit": "mi",
        "precipitation_unit": "in",
        "forecast": [{
          "condition": "cloudy",
          "datetime": "2023-09-09T16:00:00+00:00",
          "wind_bearing": 52.3,
          "temperature": 83,
          "templow": 73,
          "wind_speed": 8.95,
          "precipitation": 0.09,
          "humidity": 72
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T16:00:00+00:00",
          "wind_bearing": 190.3,
          "temperature": 82,
          "templow": 69,
          "wind_speed": 10.07,
          "precipitation": 0.81,
          "humidity": 78
        }, {
          "condition": "rainy",
          "datetime": "2023-09-11T16:00:00+00:00",
          "wind_bearing": 253.5,
          "temperature": 81,
          "templow": 69,
          "wind_speed": 10.31,
          "precipitation": 0.12,
          "humidity": 71
        }, {
          "condition": "rainy",
          "datetime": "2023-09-12T16:00:00+00:00",
          "wind_bearing": 146.1,
          "temperature": 81,
          "templow": 68,
          "wind_speed": 5.59,
          "precipitation": 0.19,
          "humidity": 66
        }, {
          "condition": "rainy",
          "datetime": "2023-09-13T16:00:00+00:00",
          "wind_bearing": 211.6,
          "temperature": 76,
          "templow": 67,
          "wind_speed": 7.58,
          "precipitation": 1.06,
          "humidity": 78
        }, {
          "condition": "partlycloudy",
          "datetime": "2023-09-14T16:00:00+00:00",
          "wind_bearing": 276.3,
          "temperature": 73,
          "templow": 61,
          "wind_speed": 7.83,
          "precipitation": 0,
          "humidity": 47
        }],
        "attribution": "Weather forecast from met.no, delivered by the Norwegian Meteorological Institute.",
        "friendly_name": "Forecast Garden Street"
      },
      "context": {
        "id": "01H9X2TCHK5WSE1Z08EMRNP7KH",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-09-09T10:50:36.957Z",
      "last_updated": "2023-09-09T13:41:36.947Z"
    },
    "weather.forecast_garden_street_hourly": {
      "entity_id": "weather.forecast_garden_street_hourly",
      "state": "cloudy",
      "attributes": {
        "temperature": 74,
        "temperature_unit": "°F",
        "humidity": 89,
        "cloud_coverage": 97.7,
        "pressure": 30.08,
        "pressure_unit": "inHg",
        "wind_bearing": 34.9,
        "wind_speed": 6.96,
        "wind_speed_unit": "mph",
        "visibility_unit": "mi",
        "precipitation_unit": "in",
        "forecast": [{
          "condition": "cloudy",
          "datetime": "2023-09-09T14:00:00+00:00",
          "wind_bearing": 40.5,
          "cloud_coverage": 100,
          "temperature": 77,
          "wind_speed": 5.84,
          "precipitation": 0,
          "humidity": 84
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-09T15:00:00+00:00",
          "wind_bearing": 54.5,
          "cloud_coverage": 100,
          "temperature": 79,
          "wind_speed": 4.91,
          "precipitation": 0,
          "humidity": 78
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-09T16:00:00+00:00",
          "wind_bearing": 52.3,
          "cloud_coverage": 100,
          "temperature": 81,
          "wind_speed": 4.72,
          "precipitation": 0,
          "humidity": 72
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-09T17:00:00+00:00",
          "wind_bearing": 74.7,
          "cloud_coverage": 100,
          "temperature": 82,
          "wind_speed": 6.03,
          "precipitation": 0,
          "humidity": 69
        }, {
          "condition": "rainy",
          "datetime": "2023-09-09T18:00:00+00:00",
          "wind_bearing": 92.9,
          "cloud_coverage": 100,
          "temperature": 83,
          "wind_speed": 7.15,
          "precipitation": 0.02,
          "humidity": 69
        }, {
          "condition": "rainy",
          "datetime": "2023-09-09T19:00:00+00:00",
          "wind_bearing": 126.3,
          "cloud_coverage": 100,
          "temperature": 80,
          "wind_speed": 7.15,
          "precipitation": 0.02,
          "humidity": 73
        }, {
          "condition": "rainy",
          "datetime": "2023-09-09T20:00:00+00:00",
          "wind_bearing": 150.3,
          "cloud_coverage": 100,
          "temperature": 80,
          "wind_speed": 8.95,
          "precipitation": 0.03,
          "humidity": 74
        }, {
          "condition": "rainy",
          "datetime": "2023-09-09T21:00:00+00:00",
          "wind_bearing": 122.9,
          "cloud_coverage": 100,
          "temperature": 77,
          "wind_speed": 6.28,
          "precipitation": 0.02,
          "humidity": 82
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-09T22:00:00+00:00",
          "wind_bearing": 51.6,
          "cloud_coverage": 100,
          "temperature": 75,
          "wind_speed": 4.04,
          "precipitation": 0,
          "humidity": 88
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-09T23:00:00+00:00",
          "wind_bearing": 57.6,
          "cloud_coverage": 97.7,
          "temperature": 74,
          "wind_speed": 6.28,
          "precipitation": 0,
          "humidity": 92
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T00:00:00+00:00",
          "wind_bearing": 64.3,
          "cloud_coverage": 100,
          "temperature": 73,
          "wind_speed": 7.58,
          "precipitation": 0,
          "humidity": 94
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T01:00:00+00:00",
          "wind_bearing": 89.1,
          "cloud_coverage": 100,
          "temperature": 73,
          "wind_speed": 7.58,
          "precipitation": 0,
          "humidity": 93
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T02:00:00+00:00",
          "wind_bearing": 105.5,
          "cloud_coverage": 100,
          "temperature": 73,
          "wind_speed": 6.03,
          "precipitation": 0,
          "humidity": 94
        }, {
          "condition": "rainy",
          "datetime": "2023-09-10T03:00:00+00:00",
          "wind_bearing": 111,
          "cloud_coverage": 75.8,
          "temperature": 73,
          "wind_speed": 5.84,
          "precipitation": 0.01,
          "humidity": 95
        }, {
          "condition": "rainy",
          "datetime": "2023-09-10T04:00:00+00:00",
          "wind_bearing": 157.5,
          "cloud_coverage": 34.4,
          "temperature": 73,
          "wind_speed": 6.46,
          "precipitation": 0.01,
          "humidity": 96
        }, {
          "condition": "rainy",
          "datetime": "2023-09-10T05:00:00+00:00",
          "wind_bearing": 194.9,
          "cloud_coverage": 96.1,
          "temperature": 73,
          "wind_speed": 6.28,
          "precipitation": 0.08,
          "humidity": 95
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T06:00:00+00:00",
          "wind_bearing": 217.9,
          "cloud_coverage": 100,
          "temperature": 71,
          "wind_speed": 8.26,
          "precipitation": 0,
          "humidity": 95
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T07:00:00+00:00",
          "wind_bearing": 132,
          "cloud_coverage": 100,
          "temperature": 71,
          "wind_speed": 1.37,
          "precipitation": 0,
          "humidity": 95
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T08:00:00+00:00",
          "wind_bearing": 44.7,
          "cloud_coverage": 100,
          "temperature": 70,
          "wind_speed": 3.11,
          "precipitation": 0,
          "humidity": 98
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T09:00:00+00:00",
          "wind_bearing": 27,
          "cloud_coverage": 100,
          "temperature": 70,
          "wind_speed": 2.49,
          "precipitation": 0,
          "humidity": 98
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T10:00:00+00:00",
          "wind_bearing": 10.3,
          "cloud_coverage": 100,
          "temperature": 70,
          "wind_speed": 2.92,
          "precipitation": 0,
          "humidity": 98
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T11:00:00+00:00",
          "wind_bearing": 24.3,
          "cloud_coverage": 100,
          "temperature": 70,
          "wind_speed": 3.79,
          "precipitation": 0,
          "humidity": 98
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T12:00:00+00:00",
          "wind_bearing": 40.4,
          "cloud_coverage": 100,
          "temperature": 71,
          "wind_speed": 3.79,
          "precipitation": 0,
          "humidity": 97
        }, {
          "condition": "cloudy",
          "datetime": "2023-09-10T13:00:00+00:00",
          "wind_bearing": 76.4,
          "cloud_coverage": 100,
          "temperature": 73,
          "wind_speed": 2.92,
          "precipitation": 0,
          "humidity": 92
        }],
        "attribution": "Weather forecast from met.no, delivered by the Norwegian Meteorological Institute.",
        "friendly_name": "Forecast Garden Street hourly"
      },
      "context": {
        "id": "01H9X2TCHM97RT5QJVFJA8NA04",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-09-09T10:50:36.958Z",
      "last_updated": "2023-09-09T13:41:36.948Z"
    },
    "sensor.arsenal_team_tracker": {
      "entity_id": "sensor.arsenal_team_tracker",
      "state": "PRE",
      "attributes": {
        "attribution": "Data provided by ESPN",
        "sport": "soccer",
        "league": "EPL",
        "league_logo": "https://a.espncdn.com/i/leaguelogos/soccer/500/23.png",
        "team_abbr": "ARS",
        "opponent_abbr": "WOL",
        "event_name": "WOL @ ARS",
        "date": "2023-12-02T15:00Z",
        "kickoff_in": "in 4 days",
        "venue": "Emirates Stadium",
        "location": "London, England",
        "tv_network": null,
        "odds": null,
        "overunder": null,
        "team_name": "Arsenal",
        "team_id": "359",
        "team_record": "9-3-1",
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
        "opponent_name": "Wolves",
        "opponent_id": "380",
        "opponent_record": "4-3-5",
        "opponent_rank": null,
        "opponent_homeaway": "away",
        "opponent_logo": "https://a.espncdn.com/i/teamlogos/soccer/500/380.png",
        "opponent_colors": [
          "#F7AA25",
          "#D00027"
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
        "last_update": "2023-11-27 15:45:17-05:00",
        "api_message": null,
        "icon": "mdi:soccer",
        "friendly_name": "arsenal_team_tracker"
      },
      "context": {
        "id": "01HG98EY77A38E0HQTNMA59CWP",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-11-27T05:05:17.498Z",
      "last_updated": "2023-11-27T20:45:17.415Z"
    },
    "sensor.arsenal_team_tracker_not_found": {
      "entity_id": "sensor.arsenal_team_tracker",
      "state": "NOT_FOUND",
      "attributes": {
        "attribution": "Data provided by ESPN",
        "sport": "soccer",
        "league": "EPL",
        "league_logo": "https://a.espncdn.com/i/leaguelogos/soccer/500/23.png",
        "team_abbr": "ARS",
        "opponent_abbr": null,
        "event_name": null,
        "date": null,
        "kickoff_in": null,
        "venue": null,
        "location": null,
        "tv_network": null,
        "odds": null,
        "overunder": null,
        "team_name": null,
        "team_id": null,
        "team_record": null,
        "team_rank": null,
        "team_homeaway": null,
        "team_logo": null,
        "team_colors": null,
        "team_score": null,
        "team_win_probability": null,
        "team_winner": null,
        "team_timeouts": null,
        "opponent_name": null,
        "opponent_id": null,
        "opponent_record": null,
        "opponent_rank": null,
        "opponent_homeaway": null,
        "opponent_logo": null,
        "opponent_colors": null,
        "opponent_score": null,
        "opponent_win_probability": null,
        "opponent_winner": null,
        "opponent_timeouts": null,
        "quarter": null,
        "clock": null,
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
        "last_update": "2023-12-11 06:29:06-05:00",
        "api_message": "No competition scheduled for 'ARS' between 2023-12-10T14:00Z and 2023-12-16T17:30Z",
        "icon": "mdi:soccer",
        "friendly_name": "arsenal_team_tracker"
      },
      "context": {
        "id": "01HHCA6K3YZ3HKMDPMXVG1GSHH",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-12-11T05:09:06.255Z",
      "last_updated": "2023-12-11T11:29:06.174Z"
    },
    "sensor.arsenal_cl_team_tracker": {
      "entity_id": "sensor.arsenal_cl_team_tracker",
      "state": "POST",
      "attributes": {
        "attribution": "Data provided by ESPN",
        "sport": "soccer",
        "league": "CL",
        "league_logo": "https://a.espncdn.com/i/leaguelogos/soccer/500/2.png",
        "team_abbr": "ARS",
        "opponent_abbr": "PSV",
        "event_name": "ARS @ PSV",
        "date": "2023-12-12T17:45Z",
        "kickoff_in": "in a day",
        "venue": "Philips Stadion",
        "location": "Eindhoven, Netherlands",
        "tv_network": null,
        "odds": null,
        "overunder": null,
        "team_name": "Arsenal",
        "team_id": "359",
        "team_record": "4-0-1",
        "team_rank": null,
        "team_homeaway": "away",
        "team_logo": "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
        "team_colors": [
          "#EF0107",
          "#dfff00"
        ],
        "team_score": "0",
        "team_win_probability": null,
        "team_winner": false,
        "team_timeouts": null,
        "opponent_name": "PSV",
        "opponent_id": "148",
        "opponent_record": "2-2-1",
        "opponent_rank": null,
        "opponent_homeaway": "home",
        "opponent_logo": "https://a.espncdn.com/i/teamlogos/soccer/500/148.png",
        "opponent_colors": [
          "#ef2f24",
          "#f7f3e7"
        ],
        "opponent_score": "0",
        "opponent_win_probability": null,
        "opponent_winner": false,
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
        "last_update": "2023-12-11 06:19:06-05:00",
        "api_message": null,
        "icon": "mdi:soccer",
        "friendly_name": "arsenal_cl_team_tracker"
      },
      "context": {
        "id": "01HHC9M9FRHDF7KN14YH9HX6ZF",
        "parent_id": null,
        "user_id": null
      },
      "last_changed": "2023-12-11T02:49:06.343Z",
      "last_updated": "2023-12-11T11:19:06.488Z"
    }
  }
}

