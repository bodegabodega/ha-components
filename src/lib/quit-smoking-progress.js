import dayjs from "dayjs";

const s = n => n == 1 ? '' : 's';
export const friendlyDuration = (days) => {
  if (days < 7) {
    return `${days} day${s(days)}`;
  } else if (days < 30) {
    const weeks = Math.floor(days / 7);
    const daysLeft = days - (weeks * 7);
    return `${weeks} week${s(weeks)}${daysLeft > 0
      ? ` and ${daysLeft} day${s(daysLeft)}`
      : ''}`;
  } else if (days < 365) {
    const months = Math.floor(days / 30);
    const daysLeft = days - (months * 30);
    return `${months} month${s(months)}${daysLeft > 0
      ? ` and ${daysLeft} day${s(daysLeft)}`
      : ''}`;
  } else {
    const years = Math.floor(days / 365);
    const months = Math.floor((days - (years * 365)) / 30);
    const daysLeft = days - (years * 365) - (months * 30);
    return `${years} year${s(years)}${months > 0
      ? `, ${months} month${s(months)}`
      : ''}${daysLeft > 0 ?
        ` and ${daysLeft} day${s(daysLeft)}`
        : ''}`;
  }
}
export const currentAchievement = (days) => {
  if (days < 1) {
    return "This is the hardest day!";
  } else if (days == 1) {
    return "The CO from smoking has been eliminated";
  } else if (days == 2) {
    return "No more nicotine in your body";
  } else if (days == 3) {
    return "Breathing has returned to normal";
  } else if (days < 7) {
    return "Energy is back to normal";
  } else if (days < 14) {
    return "Bad breath is gone";
  } else if (days < 71) {
    return "Dental stains have been reduced";
  } else if (days < 90) {
    return "Circulation has drastically improved";
  } else if (days < 138) {
    return "Gums are back to normal";
  } else if (days < 365) {
    return "Lung function has improved";
  } else if (days < 3650) {
    return "Risk of heart disease has been reduced";
  } else if (days < 5475) {
    return "Risk of lung cancer has been reduced";
  } else {
    return "Heart attack risk same as a 'non-smoker'";
  }
}
export const nextAchievement = (days) => {
  if (days < 1) {
    return "Within 8 hours of quitting smoking, your oxygen levels return to normal";
  } else if (days == 1) {
    return "In 24 hours you will have expelled the nicotine from your body, and your taste and smell will return to normal";
  } else if (days == 2) {
    return "In 24 hours your breathing will return to normal";
  } else if (days < 7) {
    return `In ${friendlyDuration(7 - days)} bad breath from tobacco will disappear`;
  } else if (days < 14) {
    return `In ${friendlyDuration(14 - days)} dental stains and tobacco tartar on your teeth will be reduced`;
  } else if (days < 71) {
    return `In ${friendlyDuration(71 - days)} your circulation will have drastically improved`;
  } else if (days < 90) {
    return `In ${friendlyDuration(90 - days)} the texture and color of your gums will return to normal`;
  } else if (days < 138) {
    return `In ${friendlyDuration(138 - days)} immunity and lung function have improved`;
  } else if (days < 365) {
    return `In ${friendlyDuration(365 - days)} your risk of heart disease will be half that of a smoker`;
  } else if (days < 3650) {
    return `In ${friendlyDuration(3650 - days)} your risk of lung cancer will be half that of someone who smokes`;
  } else if (days < 5475) {
    return `In ${friendlyDuration(5475 - days)} your risk of heart attack will be the same as for someone who has never smoked`;
  } else {
    return "Keep it up! You are doing phenomenal";
  }
}

export const skippedCigarettesCount = (hoursWithout, cigarettesPerDay) => {
  return cigarettesPerDay
    ? Math.floor(hoursWithout * (cigarettesPerDay / 24))
    : undefined;
}

export const moneySaved = (hoursWithout, cigarettesPerDay, pricePerPack, cigarettesPerPack = 20, priceUnit = "$") => {
  return cigarettesPerDay && pricePerPack
    ? `${priceUnit}${Math.ceil(skippedCigarettesCount(hoursWithout, cigarettesPerDay) / cigarettesPerPack) * pricePerPack}`
    : undefined;
}

export const forEntityFromState = (config, hass) => {
  if(config && config.entity && hass.states[config.entity]) {
    const now = dayjs();
    const quitDate = dayjs.unix(hass.states[config.entity].attributes.timestamp);
    const daysWithout = now.diff(quitDate, 'day');
    const hoursWithout = now.diff(quitDate, 'hour');
    return {
      daysWithout,
      friendlyDaysWithout: friendlyDuration(daysWithout),
      achievement: currentAchievement(daysWithout),
      nextAchievement: nextAchievement(daysWithout),
      skippedCigarettesCount: skippedCigarettesCount(hoursWithout, config.cigarettes_per_day),
      moneySaved: moneySaved(hoursWithout, config.cigarettes_per_day, config.price_per_pack, config.cigarettes_per_pack, config.price_unit)
    }
  }
}


/*
"cigarettes_per_day": 10, "price_per_pack": 14, "price_unit": "$", "cigarettes_per_pack": 15
- platform: template
  sensors:
    smoke_free_nikolai:
      friendly_name: "Nikolai Smoke Free"
      value_template: >
        {% set days_total = (((states.input_datetime.smoke_free_nikolai.attributes.timestamp)-as_timestamp(now()))
        | int /60/1440) | round(0,'ceil') * -1 %}
        {% if days_total < 30 %} {{ days_total }} days
        {% elif 30 <= days_total < 365 %} 
          {% set months = (days_total / 30) | round(0,'floor') %}
          {% set days = days_total - (months * 30)  %}
          {{ months }} months{% if days > 0 %} & {{ days }} days{% endif %}
        {% elif 365 <= days_total %} 
          {% set years = (days_total / 365) | round(0,'floor') %}
          {% set months = ((days_total - (years * 365)) / 30 ) | round(0,'floor') %}
          {% set days = ((days_total - (years * 365) - (months * 30)) ) | round(0,'floor') %}
          {{ years }} years{% if months > 0 %}, {{ months }} months {% endif %}{% if days > 0 %} & {{ days }} days{% endif %}
        {% endif %}
      attribute_templates:
        achievement: >
          {% set days = (((states.input_datetime.smoke_free_nikolai.attributes.timestamp)-as_timestamp(now())) | int /60/1440) | round(0,'ceil') * -1 %}
          {% if days < 1 %} This is the hardest day!
          {% elif days == 1 %} The CO from smoking has been eliminated
          {% elif days == 2 %} No more nicotine in your body
          {% elif days == 3 %} Breathing has returned to normal
          {% elif 3 < days < 7 %} Energy is back to normal
          {% elif 7 <= days < 14 %} Bad breath is gone
          {% elif 14 <= days < 71 %} Dental stains have been reduced
          {% elif 71 <= days < 90 %} Circulation has drastically improved
          {% elif 90 <= days < 138 %} Gums are back to normal
          {% elif 138 <= days < 365 %} Lung function has improved
          {% elif 365 <= days < 3650 %} Risk of heart disease has been reduced
          {% elif 3650 <= days < 5475 %} Risk of lung cancer has been reduced
          {% else %} Heart attack risk same as a "non-smoker"
          {% endif %}
        next_achievement: >
          {% set days = (((states.input_datetime.smoke_free_nikolai.attributes.timestamp)-as_timestamp(now())) | int /60/1440) | round(0,'ceil') * -1 %}
          {% if days < 1 %}{% set goal = 'Within 8 hours of quitting smoking, your oxygen levels return to normal' %}
          {% elif days == 1 %}{% set goal = 'In 24 hours you will have expelled the nicotine from your body, and your taste and smell will return to normal' %}
          {% elif days == 2 %}{% set goal = 'In 24 hours your breathing will return to normal' %}
          {% elif days == 3 %}{% set goal = 'In 24 hours your energy will return to normal' %}
          {% elif 3 < days < 7 %}{% set meta = 7 %}{% set goal = 'bad breath from tobacco will disappear' %}
          {% elif 7 <= days < 14 %}{% set meta = 14 %}{% set goal = 'dental stains and tobacco tartar on your teeth will be reduced' %}
          {% elif 14 <= days < 71 %}{% set meta = 71 %}{% set goal = 'your circulation will improve a lot' %}
          {% elif 71 <= days < 90 %}{% set meta = 90 %}{% set goal = 'the texture and color of your gums will return to normal' %}
          {% elif 90 <= days < 138 %}{% set meta = 138 %}{% set goal = 'will improve immunity and lung function' %}
          {% elif 138 <= days < 365 %}{% set meta = 365 %}{% set goal = 'the risk of heart disease will be half that of a smoker' %}
          {% elif 365 <= days < 3650 %}{% set meta = 3650 %}{% set goal = 'the risk of lung cancer will be half that of someone who smokes' %}
          {% elif 3650 <= days < 5475 %}{% set meta = 5475 %}{% set goal = 'the risk of heart attack will be the same as for someone who has never smoked' %}
          {% else %}{% set goal = 'Keep it up! You are doing phenomenal' %}
          {% endif %}
          {% if 3 < days < 5475 %}
            {% set remaining = meta - days %}
            {% if remaining < 30 %}In {{ remaining }} days {% elif 30 <= remaining < 365 %}{% set months = (remaining / 30) | round(0,'floor') %}{% set days = remaining - (months * 30)  %}In {{ months }} months{% if days > 0 %} y {{ days }} days{% endif %} {% elif 365 <= remaining %}{% set years = (remaining / 365) | round(0,'floor') %}{% set months = ((remaining - (years * 365)) / 30 ) | round(0,'floor') %}{% set days = ((remaining - (years * 365) - (months * 30)) ) | round(0,'floor') %}En {{ years }} years{% if months > 0 %}, {{ months }} months {% endif %}{% if days > 0 %} y {{ days }} days{% endif %} {% endif %}{{ goal }}
          {% else %}{{ goal }}
          {% endif %}
      icon_template: >
        {% set days = (((states.input_datetime.smoke_free_nikolai.attributes.timestamp)-as_timestamp(now())) | int /60/1440) | round(0,'ceil') * -1 %}
        {% if days < 1 %} mdi:arm-flex
        {% elif days == 1 %} mdi:molecule-co
        {% elif days == 2 %} mdi:smoking-off
        {% elif days == 3 %} mdi:lungs
        {% elif 3 < days < 7 %} mdi:battery-90
        {% elif 7 <= days < 14 %} mdi:flower
        {% elif 14 <= days < 71 %} mdi:tooth
        {% elif 71 <= days < 90 %} mdi:heart-settings
        {% elif 90 <= days < 138 %} mdi:emoticon-outline
        {% elif 138 <= days < 365 %} mdi:lungs
        {% elif 365 <= days < 3650 %} mdi:heart-flash
        {% elif 3650 <= days < 5475 %} mdi:lungs
        {% else %} mdi:heart-flash
        {% endif %}
*/