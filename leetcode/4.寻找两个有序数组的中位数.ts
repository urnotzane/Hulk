/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个有序数组的中位数
 */

// @lc code=start

/**
 * @description O(log(m+n))
 * - 臣妾做不到
 */
const findMedianSortedArrays = (nums1:number[], nums2:number[]) => {

};
/**
 * - 2085/2085 cases passed (144 ms)
 * - Your runtime beats 52.16 % of javascript submissions
 * - Your memory usage beats 56.25 % of javascript submissions (39.9 MB)
 * @description O((m + n)log(m + n))
 * - sort在数据量少的时候采用的是冒泡排序，数据量大的时候采用的是插入排序
 */
const findMedianSortedArrays2 = (nums1:number[], nums2:number[]) => {
  const temp = nums1.concat(nums2).sort((a, b) => a - b);
  const len = temp.length;
  if(len % 2) {
    return temp[(len - 1) / 2];
  } else {
    const right = len / 2;
    return (temp[right] + temp[right - 1]) / 2;
  }
};
console.log(findMedianSortedArrays([1, 3], [2]));
console.log(findMedianSortedArrays([1, 2], [3, 4]));
// @lc code=end

