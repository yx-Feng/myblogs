## 0. 理论

①排序：

算法中所有语句的频度记为T(n)，用O(T(n))表示T(n)的数量级
**直接插入排序**：将一个待排序的记录按其关键字大小插入到前面已经排好序的子序列中。O(n^2)
折半插入排序：直接插入排序选择待插入记录该放在已排好序列中的那个位置，需要全遍历一遍，折半插入排序则是用折半查找，找到插入位置，故O(nlog2n)
**冒泡排序**：从前往后(或从后往前)两两比较相邻元素的值，若为逆序，则交换他们。O(n^2)
**选择排序**：如果要排成从小到大，每一次从剩余序列中选取一个最小的就行。O(n^2)
**堆排序**：可以将该一维数组视为一棵完全二叉树，以大根堆为例，任意根结点的值要大于它的左孩子和右孩子，所以堆顶就是最大值。堆排序的关键就是构造初始堆，其实就是找到最后一个非叶子顶点(n/2向下取整)，然后往上开始调整，调整方法就是，看看左右子节点的值是不是比自己大，大就换上来。此时拿到最大值，输出，然后将堆的最后一个元素放到堆顶，然后向下调整，调整完，最上面的就是第二大的数，输出，然后以此类推。。O(nlog2n)

②最小生成树：

Prim算法：先从图中任取一个顶点，加入集合T，然后再选择和当前顶点集合T距离最近的顶点，再将该顶点加入集合T，并记录一下相应的边，以此类推，直到图中所有顶点都并入T，就能得到最小生成树。O(V^2)，适合求解边稠密的图的最小生成树。

Kruskal算法：每次选择权值最小的边，并且该边依附的顶点落在不同的连通分量上，以此类推，直到所有顶点都在一个连通分量上，就能得到最小生成树。O(logE)，适合求边稀疏而顶点多的图的最小生成树。

③最短路径：

Dijkstra算法(求单源最短路径，有向图)：设置一个集合S用于记录已求得的最短路径的顶点。两个辅助数组，dist[]用于记录源点v0到其它顶点的最短路径长度。初始时，将v0顶点加入集合S，然后找到从v0出发的最短路径的终点，将该终点顶点加入到S集合中，修改v0到其它没到过的顶点的最短路径长度，以次类推，直到所有顶点都加入到S集合中。

Floyd算法：

④平衡二叉树和二叉排序树
二叉排序树：左子树上所有结点的值均小于它的根结点的值，右子树上所有结点的值均大于它的根结点的值，左、右子树也分别为二叉排序树

平衡二叉树：根结点左右的子树高度之差绝对值不超过1，并且它的左右子树都是平衡二叉排序树

⑤如何判断有向图是否有环

拓扑排序。首先选择一个入度为0的结点并输出。然后删除该结点和以该结点为起点的所有出边。重复上述两个步骤。如果最终有向图为空，则无环，若剩下的结点入度都不为0，都有前驱，则有环。

## 1. 排序

### 1.1 冒泡排序

升序：遍历数组，比较相邻元素，如果第一个比第二个大，就交换两个元素，把最大的元素排到最后。剩余元素依次类推。

```
int[] arr = {5, 2, 8, 3, 1, 6};
int n = arr.length;
for(int i = 0; i < n-1; i++) {
    for(int j = 0; j < n-i-1; j++) {
        if(arr[j] > arr[j+1]) {
            int tmp = arr[j];
            iarr[j] = arr[j+1];
            arr[j+1] = tmp;
        }
    }
}
```

### 1.2 选择排序

升序：每次在待排序数组中找到最小的元素，和数组的第一个元素交换位置，剩余元素同理

```
int[] arr = {5, 2, 8, 3, 1, 6};
int n = arr.length;
for(int i = 0; i < n-1; i++) {
    int minIndex = i;
    for(int j = i+1; j < n; j++) {
        if(arr[j] < arr[minIndex]) {
            minIndex = j;
        }
    }
    int tmp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = tmp;
}
```

### 1.3 插入排序

将一个记录插入到已经排好序的列表中

```
int[] arr = {5, 2, 8, 3, 1, 6};
int n = arr.length;
for(int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i-1;
    // 当前元素key和前面的元素比较，比它大的往后移动，剩下一个位置，key插进去
    while(j >= 0 && arr[j] > key) {
        arr[j+1] = arr[j];
        j--;
    }
    arr[j+1] = key;
}
```

### 1.4 快速排序

找一个基准，比它大的放右边，比它小的放左边

```
int[] arr = {5, 2, 8, 3, 1, 6};
quickSort(arr, 0, arr.length-1);

public static void quickSort(int[] arr, int low, int high) {
    if(low > high) {
        return;
    }
    int i = low;
    int j = high;
    int pivot = arr[low]; // 基准
    while(i < j) {
        while(arr[j] >= pivot && i < j) j--;
        while(arr[i] <= pivot && i < j) i++;
        if(i < j) {
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
    // 基准和i==j对应位置的元素交换
    arr[low] = arr[i];
    arr[i] = pivot;
    quickSort(arr, low, i-1);
    quickSort(arr, i+1, high);
}
```

## 2. 动态规划

### 2.1 爬楼梯

假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。

每次你可以爬 `1` 或 `2` 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**解**：f(x) = f(x-1)+f(x-2)，f(0)=1，f(1)=1

f(2) = f(1) + f(0) = 1 + 1 = 2

f(3) = f(2) + f(1) = 2 + 1 = 3

```
class Solution {
    public int climbStairs(int n) {
        int p=0,q=0,r=1;
        for(int i = 1; i <=n; i++) {
            p = q;
            q = r;
            r = p+q;
        }
        return r;
    }
}
```

### 2.2 接雨水

给定 `n` 个非负整数表示每个宽度为 `1` 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

**解**：对于下标 i，下雨后水能到达的最大高度等于下标 i 两边的最大高度的最小值，下标 i 处能接的雨水量等于下标 i 处的水能到达的最大高度减去 height[i]。

```
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        if(n == 0) {
            return 0;
        }
        // 统计下标i及其左边的位置中，height的最大高度
        int[] leftMax = new int[n];
        leftMax[0] = height[0];
        for(int i = 1; i < n; i++) {
            leftMax[i] = Math.max(leftMax[i-1], height[i]);
        }

        // 统计下标i及其右边的位置中，height的最大高度
        int[] rightMax = new int[n];
        rightMax[n-1] = height[n-1];
        for(int i = n-2; i >= 0; i--) {
            rightMax[i] = Math.max(rightMax[i+1], height[i]);
        }

        int ans = 0;
        for(int i=0; i < n; i++) {
            ans += Math.min(leftMax[i], rightMax[i])-height[i];
        }
        return ans;
    }
}
```

## 3. 分治

### 3.1

## 4. 贪心

### 4.1 买卖股票的最佳时机

给定一个数组 `prices` ，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。

你只能选择 **某一天** 买入这只股票，并选择在 **未来的某一个不同的日子** 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0` 。

**解**：假设自己总是从股票最低价时买入的，计算当天卖出股票的利润，然后选出可能获取的最大利润

```
class Solution {
    public int maxProfit(int[] prices) {
        int min_p = Integer.MAX_VALUE;
        int max_p = 0;
        for(int i = 0; i < prices.length; i++) {
            if(prices[i] < min_p) {
                min_p = prices[i];
            } else if(prices[i]-min_p > max_p) {
                max_p = prices[i] - min_p;
            }
        }
        return max_p;
    }
}
```

## 5. 深搜

### 5.1 二叉树的中序遍历

给定一个二叉树的根节点 `root` ，返回 它的 **中序** 遍历 。

**递归**

```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        inorder(root, res);
        return res;
    }

    public void inorder(TreeNode root, List<Integer> res) {
        if(root == null) {
            return;
        }
        inorder(root.left, res);
        res.add(root.val);
        inorder(root.right, res);
    }
}
```

**迭代**

```
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        Deque<TreeNode> stk = new LinkedList<TreeNode>();
        while (root != null || !stk.isEmpty()) {
            while (root != null) {
                stk.push(root);
                root = root.left;
            }
            root = stk.pop();
            res.add(root.val);
            root = root.right;
        }
        return res;
    }
}
```

### 5.2 相同的树

给你两棵二叉树的根节点 `p` 和 `q` ，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

```
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if(p == null && q == null) {
            return true;
        } else if ( p == null || q == null){
            return false;
        } else if (p.val != q.val) {
            return false;
        } else {
            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
        }
    }
}
```

## 6. 广搜

### 6.1

## 7. 哈希表

### 7.1 最长回文串

给定一个包含大写字母和小写字母的字符串 `s` ，返回 通过这些字母构造成的 **最长的回文串**的长度。

在构造过程中，请注意 **区分大小写** 。比如 `"Aa"` 不能当做一个回文字符串。

**解**：字符串能被构造成回文串的**充要条件**为：除了一种字符出现**奇数**次外，其余所有字符出现**偶数**次。

①借助一个 HashMap ，统计字符串 s 中各字符的出现次数；
②遍历 HashMap ，统计构造回文串的最大长度：
    将当前字符的出现次数向下取偶数（即若为偶数则不变，若为奇数则减 1 ），出现偶数次则都可组成回文串，因此计入 res ；
    若此字符出现次数为奇数，则可将此字符放到回文串中心，因此将 odd 置 1 ；

返回 `res + odd` 即可。

```
class Solution {
    public int longestPalindrome(String s) {
        HashMap<Character, Integer> counter = new HashMap<>();
        for(int i = 0; i < s.length(); i++) {
            counter.merge(s.charAt(i), 1, (oldValue, newValue) -> oldValue + newValue);
        }
        int res = 0, odd = 0;
        for(Map.Entry<Character, Integer> kv:counter.entrySet()) {
            int count = kv.getValue();
            if(count % 2 == 1) odd = 1;
            res += count - count%2;
        }
        return res+odd;
    }
}
```

### 7.2 两数之和

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** *`target`*  的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

```
public int[] twoSum(int[] num, int target) {
    Map<Integer, Integer> hashtable = new HashMap<Integer, Integer>();
    for(int i = 0; i < nums.length; i++) {
        if(hashtable.containsKey(target-num[i])) {
            return new int[]{hashtable.get(target-num[i]), i};
        }
        hashtable.put(num[i], i);
    }
    return new int[0];
}
```

## 8. 双指针

### 8.1 移动零

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

**请注意** ，必须在不复制数组的情况下原地对数组进行操作。

```
public void moveZero(int[] nums) {
    if(num == null) {
        return;
    }
    // 第一次遍历
    int j = 0;
    for(int i = 0; i < nums.length; i++) {
        if(num[i]!=0) {
            nums[j++] = nums[i];
        }
    }
    // 把末尾元素都赋0
    for(int i = j; i < nums.lengthl i++) {
        nums[i] = 0;
    }
}
```

## 9. 链表

### 9.1 相交链表

给你两个单链表的头节点 `headA` 和 `headB` ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 `null` 。

```
public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    Set<ListNode> visited = new HashSet<ListNode>();
    ListNode temp = headA;
    while(temp != null) {
        visited.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while(temp != null) {
    if(visited.contains(temp)) {
        return temp;
    }
        temp = temp.next;
    }
    return null;
}
```

### 9.2 反转链表

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。

```
public ListNode reverseList(ListNode head) {
    ListNode curr = head;
    ListNode prev = null;
    while(curr != null) {
        ListNode next = curr.next;
        curr.next = prev; 
        prev = curr;
        curr = next;       
    }
    return prev;
}
```

### 9.3 回文链表

给你一个单链表的头节点 `head` ，请你判断该链表是否为回文链表。如果是，返回 `true` ；否则，返回 `false` 。

```
public boolean isPalindrome(ListNode head) {
        List<Integer> vals = new ArrayList<Integer>();
        ListNode currNode = head;
        while(currNode != null) {
            vals.add(currNode.val);
            currNode = currNode.next;
        }

        int front = 0;
        int back = vals.size()-1;
        while(front < back) {
            if(vals.get(front) != vals.get(back)) {
                return false;
            }
            front++;
            back--;
        }
        return true;
}
```

### 9.4 环形链表

给你一个链表的头节点 `head` ，判断链表中是否有环。

```
public boolean hasCycle(ListNode head) {
        Set<ListNode> seen = new HashSet<ListNode>();
        while (head != null) {
            if (!seen.add(head)) {
                return true;
            }
            head = head.next;
        }
        return false;
}
```

### 9.5 合并两个有序链表

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

```
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) {
            return l2;
        } else if (l2 == null) {
            return l1;
        } else if (l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
}
```

## 10. 二叉树

### 10.1 二叉树的中序遍历

给定一个二叉树的根节点 `root` ，返回 它的 **中序** 遍历。

```
public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        inorder(root, res);
        return res;
}

public void inorder(TreeNode root, List<Integer> res) {
        if(root == null) {
            return;
        }
        inorder(root.left, res);
        res.add(root.val);
        inorder(root.right, res);
}
```

### 10.2 二叉树的最大深度

二叉树的 **最大深度** 是指从根节点到最远叶子节点的最长路径上的节点数。

```
public int maxDepth(TreeNode root) {
    if(root == null) {
        return 0;
    } else {
        int letfHeight = maxDepth(root.left);
        int rightHeight = maxDepth(root.right);
        return Math.max(letfHeight, rightHeight)+1;
    }
}
```

### 10.3 翻转二叉树

给你一棵二叉树的根节点 `root` ，翻转这棵二叉树，并返回其根节点。

```
public TreeNode invertTree(TreeNode root) {
        if(root == null) {
            return null;
        }
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);
        root.left = right;
        root.right =left;
        return root;
}
```

### 10.4 对称二叉树

给你一个二叉树的根节点 `root` ， 检查它是否轴对称。

```
public boolean isSymmetric(TreeNode root) {
        return check(root, root);
}

public boolean check(TreeNode p, TreeNode q) {
        if(p == null && q == null) {
            return true;
        }
        if(p == null || q == null) {
            return false;
        }
        return p.val == q.val && check(p.left, q.right) && check(p.right, q.left);
}
```

### 10.5 二叉树的直径

给你一棵二叉树的根节点，返回该树的 **直径** 。

二叉树的 **直径** 是指树中任意两个节点之间最长路径的 **长度** 。这条路径可能经过也可能不经过根节点 `root` 。

两节点之间路径的 **长度** 由它们之间边数表示。

```
class Solution {
    int ans;
    public int diameterOfBinaryTree(TreeNode root) {
        ans = 1;
        depth(root);
        return ans - 1;
    }

    public int depth(TreeNode node) {
        if(node == null) {
            return 0;
        }
        int L = depth(node.left);
        int R = depth(node.right);
        ans = Math.max(ans, L+R+1);
        return Math.max(L, R)+1;
    }
}
```

### 10.6 将有序数组转换为二叉搜索树

给你一个整数数组 `nums` ，其中元素已经按 **升序** 排列，请你将其转换为一棵平衡 二叉搜索树。

```
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return helper(nums, 0, nums.length - 1);
    }

    public TreeNode helper(int[] nums, int left, int right) {
        if(left > right) {
            return null;
        }
        int mid = (left+right)/2;
        TreeNode root = new TreeNode(nums[mid]);
        root.left = helper(nums, left, mid-1);
        root.right = helper(nums, mid+1, right);
        return root;
    }
}
```

## 11. 二分查找

### 11.1 搜索插入位置

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 `O(log n)` 的算法。

```
public int searchInsert(int[] nums, int target) {
    int left = 0, right = n-1, ans = n;
    while(left <= right){
        int mid = ((right - left)>>1) + left;
        if(target <= nums[mid]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}
```

## 12. 栈

### 12.1 有效的括号

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

```
public boolean isValid(String s) {
    int n = s.length();
    if(n % 2 == 1) return false;
    Map<Character, Character> pairs = new HashMap<Character, Character>() {
        {
            put(')', '(');
            put(']', '[');
            put('}', '{');
        }
    }
    Deque<Character> stack = new LinkedList<Character>();
    for(int i = 0; i < n; i++) {
        char ch = s.charAt(i);
        if(pairs.containsKey(ch)) {
            if(stack.isEmpty() || stack.peek() != pairs.get(ch)) {
                return false;
            }
            stack.pop();
        } else {
            stack.push(ch);
        }
    }
    return stack.isEmpty();
}
```

## 13. ACM 模式 - 处理输入输出

```
import java.util.*;
import java.lang.*;


public class Main {
    public static void main(String[] args) {
        // 数据输入
        Scanner in = new Scanner(System.in);
        // 读数字
        int numLen = in.nextInt();
        int[] numArr = new int[numLen];
        int i = 0;
        while(in.hasNextInt() && i < numLen) {
            numArr[i] = in.nextInt();
            i++;
        }
        // 读字符串
        int strLen = in.nextInt();
        in.nextLine();
        String[] strArr = new String[strLen];
        int j = 0;
        while(in.hasNextLine() && j < strLen) {
            strArr[j] = in.nextLine();
            j++;
        }
        // 处理
        Solution solution = new Solution();
        String result = solution.process(numArr, strArr);
    }
}


class Solution {
    public String process(int[] nums, String[] strs) {
        StringBuilder sb = new StringBuilder();
        sb.append(Arrays.toString(nums));
        sb.append(" && ");
        sb.append(Arrays.toString(strs));
        return sb.toString();
    }
}
```
