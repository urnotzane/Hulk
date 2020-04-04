/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start

/**
 * - Your runtime beats 39.48 % of javascript submissions
 * - Your memory usage beats 35.25 % of javascript submissions (46.1 MB)
 * - 转换成字符串
 */
const isPalindrome = (x:number) => {
  const xStr = x.toString();
  const xStrReverse = xStr.split('').reverse().join('');
  if (+xStr === +xStrReverse) {
    return true;
  }
  return false;
};

/**
 * - Your runtime beats 14.56 % of javascript submissions
 * - Your memory usage beats 96.12 % of javascript submissions (44.8 MB)
 * - 余数
 * - 求出反转后的数字进行比较，但是会多一半的循环
 */
const isPalindrome2 = (x:number) => {
  let left = x;
  let right = 0;
  while (left > 0) {
    const remainder = left % 10;
    left = Math.floor(left / 10);
    right = right * 10 + remainder;
  }
  return x === right;
}; 

/**
 * - Your runtime beats 91.52 % of javascript submissions
 * - Your memory usage beats 95.8 % of javascript submissions (44.8 MB)
 * - 求余数，抽象为原始数字折叠比较左右
 */
const isPalindrome3 = (x:number) => {
  let left = x;
  let right = 0;
  // 两种特殊情况：原始数除以10没余数一定是false，x=0一定是true
  if (x % 10 === 0 && x !== 0) {
    return false
  }
  // 当左边小于右边时应该停止循环
  while (left >= right) {
    const nextRight = right * 10 + left % 10;
    // 原始数偶数位直接比较两边
    // 原始数奇数位比较现在的左边和下一个循环右边
    if (left === right || left === nextRight) {
      return true;
    }
    right = nextRight;
    left = Math.floor(left / 10);
  }
  return false;
};

// @lc code=end

