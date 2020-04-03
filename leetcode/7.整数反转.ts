/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 *
 * https://leetcode-cn.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (33.95%)
 * Likes:    1786
 * Dislikes: 0
 * Total Accepted:    315.4K
 * Total Submissions: 929.2K
 * Testcase Example:  '123'
 *
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 * 
 * 示例 1:
 * 
 * 输入: 123
 * 输出: 321
 * 
 * 
 * 示例 2:
 * 
 * 输入: -123
 * 输出: -321
 * 
 * 
 * 示例 3:
 * 
 * 输入: 120
 * 输出: 21
 * 
 * 
 * 注意:
 * 
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回
 * 0。
 * 
 */

//  解法1
const reverse = (x:number):number => {
  const result = +Math.abs(x).toString().split('').reverse().join('');
  if (result >= Math.pow(-2, 31) && result <= (Math.pow(2, 31) - 1)) {
    return x < 0 ? -result : result;
  }
  return 0;
};

// 解法2
// const getPow = (base:number, times:number) => {
//   let result = 1;
//   for(let i = 0; i < times; i++) {
//     result = result * base
//   }
//   return result;
// }

// const reverse = (x:number) => {
//   const str = x.toString().replace('-', '');
//   const MIN = getPow(-2, 31);
//   const MAX = MIN * -1 - 1;
//   const isNegative = x < 0;
//   const strArray = str.split('');
//   let _str = '';
//   let result = 0;
//   for(let i = strArray.length - 1; i >= 0; i--) {
//     _str += strArray[i];
//     result = isNegative ? +_str * -1 : +_str;
//     if (result < MIN || result > MAX) {
//       return 0;
//     }
//   }
//   return result;
// }
// @lc code=end

