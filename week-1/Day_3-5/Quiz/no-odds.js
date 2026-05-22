const unsortedNumbers = [82, 14, 93, 4, 67, 31, 55, 78, 22, 49, 12, 88, 36, 71, 5, 60, 43, 99, 17, 26];

function removeOdds(nums){
    return nums.filter((num) => num % 2 === 0);
}

console.log(removeOdds(unsortedNumbers));