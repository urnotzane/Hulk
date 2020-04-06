/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * Your runtime beats 98.41 % of javascript submissions.
 * Your memory usage beats 73.84 % of javascript submissions (34.7 MB).
 * @description
 * 时间复杂度：O(l1 * l2).
 * - l1为公共前缀长度
 * - l2为strs.length - 1
 */
const longestCommonPrefix = (strs:string[]) => {
  if (!strs || !strs.length) {
    return '';
  }
  const firstStr = strs[0];
  const arr = strs.slice(1);
  let result = '';
  for (let i = 0; i < firstStr.length; i++) {
    const code = firstStr[i];
    if (arr.every((item) => item[i] === code)) {
      result += code;
    } else {
      break;
    }
  }
  return result;
};


// @lc code=end

