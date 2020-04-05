/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start

const getValue = (key: string) => {
  switch(key) {
    case 'I': return 1;
    case 'IV': return 4;
    case 'V': return 5;
    case 'IX': return 9;
    case 'X': return 10;
    case 'XL': return 40;
    case 'L': return 50;
    case 'XC': return 90;
    case 'C': return 100;
    case 'CD': return 400;
    case 'D': return 500;
    case 'CM': return 900;
    case 'M': return 1000;
    default: return 0;
  }
}
/**
 * Your runtime beats 92.03 % of javascript submissions.
 * Your memory usage beats 56.25 % of javascript submissions (40.3 MB).
 * @description
 * 解法一：字符串分割成数组
 */
const romanToInt = (s: string) => {
  const sArr = s.split('');
  let result = 0;
  let canSkip = false;
  for (let i = 0; i < sArr.length; i++) {
    if (!canSkip) {
      const current = sArr[i];
      // 如果是六种特殊情况
      const value = getValue(current + sArr[i + 1]);
      if (value) {
        canSkip = true;
        result += value
      } else {
        result += getValue(current)
      }
    } else {
      canSkip = false;
    }
  }
  return result;
};
/**
 * Your runtime beats 30 % of javascript submissions.
 * Your memory usage beats 49.22 % of javascript submissions (40.3 MB).
 * @description
 * 解法二：s.charAt
 */
const romanToInt2 = (s: string) => {
  let result = 0;
  let canSkip = false;
  const { length } = s; 
  for (let i = 0; i < length; i++) {
    if (!canSkip) {
      const current = s.charAt(i);
      // 如果是六种特殊情况
      const value = getValue(current + s.charAt(i + 1));
      if (i < length - 1 && value) {
        canSkip = true;
        result += value
      } else {
        result += getValue(current)
      }
    } else {
      canSkip = false;
    }
  }
  return result;
};

const getValue2 = (key: string) => {
  switch(key) {
    case 'I': return 1;
    case 'V': return 5;
    case 'X': return 10;
    case 'L': return 50;
    case 'C': return 100;
    case 'D': return 500;
    case 'M': return 1000;
    default: return 0;
  }
}
/**
 * Your runtime beats 69.53 % of javascript submissions.
 * Your memory usage beats 88.28 % of javascript submissions (39.8 MB).
 * @description
 * 解法三：把小值放在大值左边就做减法，否则做加法
 */
const romanToInt3 = (s: string) => {
  const sArr = s.split('');
  let result = 0;
  let canSkip = false;
  for (let i = 0; i < sArr.length; i++) {
    if (!canSkip) {
      const current = getValue(sArr[i]);
      const next = getValue(sArr[i + 1])
      // 如果是六种特殊情况
      if (current < next) {
        canSkip = true;
        result += (next - current)
      } else {
        result += current
      }
    } else {
      canSkip = false;
    }
  }
  return result;
};

// @lc code=end

