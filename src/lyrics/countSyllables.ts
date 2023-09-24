const VOWELS = ["a", "e", "i", "o", "u"];

export default function countSyllables(word: string) {
  let vowelSounds = 0;
  let vowelFound = false;

  word.split("").forEach((letter, index) => {
    if (VOWELS.includes(letter) && !vowelFound) {
      if (!(index === word.length - 1 && letter === "e")) {
        vowelSounds++;
      }
      vowelFound = true;
      return;
    }
    vowelFound = false;
  });

  return vowelSounds;
}
