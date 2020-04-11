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


 /**
  * - Your runtime beats 42.43 % of javascript submissions.
  * - Your memory usage beats 13.7 % of javascript submissions (36.1 MB).
  * @description
  * 解法一
  * 替换所有括号对。
  */
const isValid = (s: string) => {
  while (s.length > 1) {
    const _s = s;
    s = s.replace('()', '');
    s = s.replace('[]', '');
    s = s.replace('{}', '');
    if (_s === s) {
      return false
    }
  }
  return !s.length;
}

/**
 * - Your runtime beats 59.89 % of javascript submissions.
 * - Your memory usage beats 76.35 % of javascript submissions (34 MB).
 * @description
 * 解法二
 * - 左括号推入栈，右括号pop元素，被pop的元素如果和当前元素不匹配则返回false.
 * - 如果最后栈内长度不为空返回false.
 */
const isValid2 = (s: string) => {
  // 字符串不等于null、undefined且字符数量为偶数，空字符串返回true
  if (s === null || s === undefined || s.length % 2) {
    return false;
  }
  if (!s.length) {
    return true;
  }
  const lefts = [];
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "(":
        lefts.push('(');
        break;
      case "{":
        lefts.push('{');
        break;
      case "[":
        lefts.push('[');
        break;
      case ")":
        if (lefts.pop() !== '(') {
          return false
        };
        break;
      case "}":
        if (lefts.pop() !== '{') {
          return false
        };
        break;
      case "]":
        if (lefts.pop() !== '[') {
          return false
        };
        break;
    }
  }
  return !lefts.length;
};

// 测试用例
// console.log(isValid("()")); // true
// console.log(isValid("()[]{}")); // true
// console.log(isValid("(]")); // false
// console.log(isValid("([)]")); // false
// console.log(isValid("{[]}")); // true
// console.log(isValid("(([]){})")); // true
// console.log(isValid("[({(())}[()])]")); // true

// @lc code=end

