function binarySearch(nums, target) {
  if (!nums.length) return;
  if (nums.length === 1) return;
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2); //取中位数，可能除不尽向下取整
    if (target === nums[mid]) {
      return mid;
    } else if (target > nums[mid]) {
      start = mid + 1;
    } else {
      start = mid - 1;
    }
  }
  return -1;
}

const a = binarySearch([1, 2, 3, 4, 7, 9, 10, 13, 15, 100, 199], 2);
console.log('a000000', a);

console.log('11');
