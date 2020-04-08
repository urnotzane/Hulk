/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 *
 * https://leetcode-cn.com/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (41.31%)
 * Likes:    1498
 * Dislikes: 0
 * Total Accepted:    247.5K
 * Total Submissions: 598.8K
 * Testcase Example:  '"()"'
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 
 * 有效字符串需满足：
 * 
 * 
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 
 * 
 * 注意空字符串可被认为是有效字符串。
 * 
 * 示例 1:
 * 
 * 输入: "()"
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: "()[]{}"
 * 输出: true
 * 
 * 
 * 示例 3:
 * 
 * 输入: "(]"
 * 输出: false
 * 
 * 
 * 示例 4:
 * 
 * 输入: "([)]"
 * 输出: false
 * 
 * 
 * 示例 5:
 * 
 * 输入: "{[]}"
 * 输出: true
 * 
 */

// @lc code=start
// const COMPLETE_SYMBOL = {
//   "(": ")",
//   "{": "}",
//   "[": "]",
// };
const getRight = (left:string) => {
  switch (left) {
    case "(": return ")";
    case "{": return "}";
    case "[": return "";
    default: undefined;
  }
}
/**
 * 
 */
const isValid = (s:string) => {
  if (!s || !s.length) {
    return false;
  }
  let myStr = s;
  while (myStr.length > 1) {
    const left = myStr[0];
    const right = getRight(left);
    if (right && myStr.indexOf(right) > -1) {
      myStr = myStr.replace(left, '');
      myStr = myStr.replace(right, '');
    } else {
      return false;
    }
  }
  return !myStr.length;
};
console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("([)]"));
console.log(isValid("{[]}"));

// @lc code=end

