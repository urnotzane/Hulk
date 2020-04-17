/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 *
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/description/
 *
 * algorithms
 * Easy (60.85%)
 * Likes:    957
 * Dislikes: 0
 * Total Accepted:    229.9K
 * Total Submissions: 376.7K
 * Testcase Example:  '[1,2,4]\n[1,3,4]'
 *
 * 将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
 * 
 * 示例：
 * 
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 * 
 * 
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
class ListNode {
  public val:number;
  public next:ListNode;
  constructor(val?:number) {
    this.val = val;
    this.next = null;
  }
}
/**
 * - Your runtime beats 65.38 % of javascript submissions
 * - Your memory usage beats 85.29 % of javascript submissions (35.8 MB).
 * @description 递归
 * - 每一层递归都将返回比较过大小的链表头，赋值给上一层递归的next
 */
const mergeTwoLists = (l1:ListNode, l2:ListNode) => {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  // 如果l1的值比l2的值小，
  // 那么l1的值排在结果值第一位，然后比较l1.next和l2的值
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l2.next, l1);
    return l2;
  }
};


/**
 * @description 按照顺序生成ListNode
 * - 从最深的ListNode开始生成
 */
const generateListNode = (arr:number[]) => {
  const tempArr = arr.sort((a, b) => b - a)
  let result:ListNode = null;
  tempArr.forEach((item) => {
    const temp = new ListNode(item);
    temp.next = result;
    result = temp;
  });
  return result;
}
/**
 * - Your runtime beats 16.72 % of javascript submissions.
 * - Your memory usage beats 85.29 % of javascript submissions (35.9 MB).
 * @description while循环的笨办法，并且定义了一个重新生成ListNode的函数`generateListNode`
 */
const mergeTwoLists2 = (l1:ListNode, l2:ListNode) => {
  let tempArr = [];
  let tempLn = l1;
  while (tempLn && typeof tempLn.val === 'number') {
    tempArr.push(tempLn.val);
    tempLn = tempLn.next;
  }
  tempLn = l2;
  while (tempLn && typeof tempLn.val === 'number') {
    tempArr.push(tempLn.val);
    tempLn = tempLn.next;
  }
  return generateListNode(tempArr);
};

const l1 = generateListNode([1, 2, 4]);
const l2 = generateListNode([1, 3, 4])
console.log(mergeTwoLists(l1, l2));

// @lc code=end