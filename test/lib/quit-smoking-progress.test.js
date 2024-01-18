import { describe, expect, test } from 'vitest'
import {
  friendlyDuration,
  currentAchievement,
  nextAchievement,
  skippedCigarettesCount,
  moneySaved
} from "../../src/lib/quit-smoking-progress";

describe('friendlyDuration', () => {
  test('for 1 day', () => {
    expect(friendlyDuration(1)).toBe('1 day')
  })
  test('for 2 days', () => {
    expect(friendlyDuration(2)).toBe('2 days')
  })
  test('for 8 days', () => {
    expect(friendlyDuration(8)).toBe('1 week and 1 day')
  })
  test('for 14 days', () => {
    expect(friendlyDuration(14)).toBe('2 weeks')
  })
  test('for 18 days', () => {
    expect(friendlyDuration(18)).toBe('2 weeks and 4 days')
  })
  test('for 22 days', () => {
    expect(friendlyDuration(22)).toBe('3 weeks and 1 day')
  })
  test('for 31 days', () => {
    expect(friendlyDuration(31)).toBe('1 month and 1 day')
  })
  test('for 61 days', () => {
    expect(friendlyDuration(61)).toBe('2 months and 1 day')
  })
  test('for 396 days', () => {
    expect(friendlyDuration(396)).toBe('1 year, 1 month and 1 day')
  })
  test('for 400 days', () => {
    expect(friendlyDuration(400)).toBe('1 year, 1 month and 5 days')
  })
})

describe('currentAchievement', () => {
  test('for 0 days', () => {
    expect(currentAchievement(0)).toBe("This is the hardest day!")
  })
  test('for 1 day', () => {
    expect(currentAchievement(1)).toBe("The CO from smoking has been eliminated")
  })
  test('for 2 days', () => {
    expect(currentAchievement(2)).toBe("No more nicotine in your body")
  })
  test('for 3 days', () => {
    expect(currentAchievement(3)).toBe("Breathing has returned to normal")
  })
  test('for 6 days', () => {
    expect(currentAchievement(6)).toBe("Energy is back to normal")
  })
  test('for 13 days', () => {
    expect(currentAchievement(13)).toBe("Bad breath is gone")
  })
  test('for 70 days', () => {
    expect(currentAchievement(70)).toBe("Dental stains have been reduced")
  })
  test('for 89 days', () => {
    expect(currentAchievement(89)).toBe("Circulation has drastically improved")
  })
  test('for 137 days', () => {
    expect(currentAchievement(137)).toBe("Gums are back to normal")
  })
  test('for 364 days', () => {
    expect(currentAchievement(364)).toBe("Lung function has improved")
  })
  test('for 3649 days', () => {
    expect(currentAchievement(3649)).toBe("Risk of heart disease has been reduced")
  })
  test('for 5474 days', () => {
    expect(currentAchievement(5474)).toBe("Risk of lung cancer has been reduced")
  })
  test('for 5475 days', () => {
    expect(currentAchievement(5475)).toBe("Heart attack risk same as a 'non-smoker'")
  })
})

describe('nextAchievement', () => {
  test('for 0 days', () => {
    expect(nextAchievement(0)).toBe("Within 8 hours of quitting smoking, your oxygen levels return to normal")
  })
  test('for 1 day', () => {
    expect(nextAchievement(1)).toBe("In 24 hours you will have expelled the nicotine from your body, and your taste and smell will return to normal")
  })
  test('for 2 days', () => {
    expect(nextAchievement(2)).toBe("In 24 hours your breathing will return to normal")
  })
  test('for 6 days', () => {
    expect(nextAchievement(6)).toBe("In 1 day bad breath from tobacco will disappear")
  })
  test('for 12 days', () => {
    expect(nextAchievement(12)).toBe("In 2 days dental stains and tobacco tartar on your teeth will be reduced")
  })
  test('for 68 days', () => {
    expect(nextAchievement(68)).toBe("In 3 days your circulation will have drastically improved")
  })
  test('for 78 days', () => {
    expect(nextAchievement(78)).toBe("In 1 week and 5 days the texture and color of your gums will return to normal")
  })
  test('for 128 days', () => {
    expect(nextAchievement(128)).toBe("In 1 week and 3 days immunity and lung function have improved")
  })
  test('for 364 days', () => {
    expect(nextAchievement(364)).toBe("In 1 day your risk of heart disease will be half that of a smoker")
  })
  test('for 3000 days', () => {
    expect(nextAchievement(3000)).toBe("In 1 year, 9 months and 15 days your risk of lung cancer will be half that of someone who smokes")
  })
  test('for 3800 days', () => {
    expect(nextAchievement(3800)).toBe("In 4 years, 7 months and 5 days your risk of heart attack will be the same as for someone who has never smoked")
  })
})

describe('skipped cigarettes count', () => {
  test('without cigarettesPerDay', () => {
    expect(skippedCigarettesCount(1)).toBe(undefined);
  })
  test('for 24 hours', () => {
    expect(skippedCigarettesCount(24, 10)).toBe(10);
  })
  test('for 36 hours', () => {
    expect(skippedCigarettesCount(36, 10)).toBe(15);
  })
})

// (hours, cigarettesPerDay, pricePerPack, cigarettesPerPack = 20, priceUnit = "$")
describe('moneySaved', () => {
  test('without cigarettesPerDay', () => {
    expect(moneySaved(20)).toBe(undefined);
  })
  test('without pricePerPack', () => {
    expect(moneySaved(20, 10)).toBe(undefined);
  })
  test('with defaults', () => {
    expect(moneySaved(36, 10, 10)).toBe('$10');
  })
})