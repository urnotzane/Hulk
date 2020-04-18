/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * - 161/161 cases passed (84 ms)
 * - Your runtime beats 77.22 % of javascript submissions
 * - Your memory usage beats 85.71 % of javascript submissions (36.9 MB)
 * @description
 * - 定义慢指针从0开始，快指针从1开始。
 * - 若快指针与慢指针对应的值不相等，那么将值赋给慢指针+1的值，并且慢指针+=1。
 */
const removeDuplicates = (nums: number[]) => {
  let len = nums.length;
  if (len < 2) {
    return len;
  }
  let j = 0;
  for (let i = 1; i < len; i++) {
    if (nums[i] !== nums[j]) {
      j += 1;
      nums[j] = nums[i];
    }
  }
  return j + 1;
};
/**
 * - 161/161 cases passed (252 ms)
 * - Your runtime beats 10.28 % of javascript submissions
 * - Your memory usage beats 52.38 % of javascript submissions (37.3 MB)
 * @description
 * - 要考虑元素为负数时的情况
 * - 缓存数组原长度len。
 * - 查找当前元素在数组中的位置，若不等于当前i，说明有重复，那么原地删除此元素。
 * - 此时nums少了一个元素。
 * - 并且修改len = len - 1，i = i - 1。
 */
const removeDuplicates2 = (nums: number[]) => {
  let len = nums.length;
  if (len < 2) {
    return len;
  }
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (nums.indexOf(item) !== i) {
      nums.splice(i, 1);
      len -= 1;
      i -= 1;
    }
  }
  return len;
};

// 测试用例
// const nums1 = [1, 1, 2];
// console.log(removeDuplicates(nums1));
// const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
// console.log(removeDuplicates(nums2));
// const nums3 = [-1, 0, 0, 0, 0, 3, 3];
// console.log(removeDuplicates(nums3));
// @lc code=end
