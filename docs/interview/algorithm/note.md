## 0. 理论

①排序：

算法中所有语句的频度记为T(n)，用O(T(n))表示T(n)的数量级

**直接插入排序**：将一个待排序的记录按其关键字大小插入到前面已经排好序的子序列中。O(n^2)

**折半插入排序**：直接插入排序选择待插入记录该放在已排好序列中的那个位置，需要全遍历一遍，折半插入排序则是用折半查找，找到插入位置，故O(nlog2n)

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

平衡二叉树：根结点左右的子树高度之差绝对值不超过1，并且它的左右子树都是平衡二叉树

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

## 2. 哈希表

### 2.1 两数之和

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** *`target`*  的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

```
public int[] twoSum(int[] num, int target) {
    Map<Integer, Integer> hashmap = new HashMap<Integer, Integer>();
    for(int i = 0; i < nums.length; i++) {
        if(hashmap.containsKey(target - num[i])){
            return new int[]{hashmap.get(target-num[i]), i};
        }
        hashmap.put(num[i], i);
    }
    return new int[0];
}
```

### 2.2 最长连续序列

给定一个未排序的整数数组 `nums` ，找出数字连续的最长序列（**不要求**序列元素在原数组中**连续**）的长度。

请你设计并实现时间复杂度为 `O(n)` 的算法解决此问题。

```
public int longestConsecutive(int[] nums) {
    Set<Integer> num_set = new HashSet<Integer>();
    for(int num : nums) {
        num_set.add(num);
    }
    int longestSubStr = 0;
    for(int num : num_set) {
        if(!num_set.conatins(num-1) {
            int cur = num;
            int curLen = 1;
            while(num_set.contains(cur+1)) {
                cur += 1;
                curLen += 1;
            }
            longestSubStr = Math.max(longestSubStr, curLen);
        }
    }
    return longestSubStr;
}
```

## 3. 二叉树

### 3.1 二叉树的中序遍历

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

### 3.2 二叉树的最大深度

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

### 3.3 二叉树的层序遍历

给你二叉树的根节点 `root` ，返回其节点值的 **层序遍历** 。 （即逐层地，从左到右访问所有节点）。

```
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) {this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> ret = new ArrayList<List<Integer>>();
    if(root == null) {
        return ret;
    }
    Queue<TreeNode> queue = new LinkedList<TreeNode>();
    queue.offer(root);
    while(!queue.isEmpty()){
        List<Integer> level = new ArrayList<Integer>();
        int curLevelSize = queue.size();
        for(int i = 1; i <= curLevelSize; i++) {
            TreeNode node = queue.poll();    
            level.add(node.val);
            if(node.left != null) {
                queue.offer(node.left);
            }
            if(node.right != null) {
                queue.offer(node.right);
            }
        }
        ret.add(level);
    }
    return ret;
}
```

## 4. 链表

### 4.1 反转链表

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

### 4.2 环形链表

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

### 4.3 合并两个有序链表

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

### 4.4 LRU 缓存

请你设计并实现一个满足  **LRU (最近最少使用)** 缓存约束的数据结构。

实现 `LRUCache` 类：

- `LRUCache(int capacity)` 以 **正整数** 作为容量 `capacity` 初始化 LRU 缓存
- `int get(int key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1` 。
- `void put(int key, int value)` 如果关键字 `key` 已经存在，则变更其数据值 `value` ；如果不存在，则向缓存中插入该组 `key-value` 。如果插入操作导致关键字数量超过 `capacity` ，则应该 **逐出** 最久未使用的关键字。

函数 `get` 和 `put` 必须以 `O(1)` 的平均时间复杂度运行。

**哈希表+双向链表**

```
class LRUCache {
    class DLinkedNode {
        int key;
        int value;
        DLinkedNode prev;
        DLinkedNode next;
        public DLinkedNode() {}
        public DLinkedNode(int _key, int _value) {key = _key; value = _value;}
    }

    private int capacity;
    private int size;
    private Map<Integer, DLinkedNode> cache = new HashMap<Integer, DLinkedNode>();
    private DLinkedNode head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head = new DLinkedNode();
        tail = new DLinkedNode();
        head.next = tail;
        tail.prev = head;
        this.size = 0;
    }

    public int get(int key) {
        DLinkedNode node = cache.get(key);
        if(node == null) {
            return -1;
        }
        // 如果key存在，哈希表定位，再移动到头部
        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        DLinkedNode node = cache.get(key);
        if(node == null) {
            DLinkedNode newNode = new DLinkedNode(key, value);
            cache.put(key, newNode);
            addToHead(newNode);
            size++;
            if(size > capacity) {
                // 如果超出容量
                DLinkedNode tail = removeTail();
                cache.remove(tail.key);
                size--;
            }
        } else {
            node.value = value;
            moveToHead(node);
        }
    }

    private void removeNode(DLinkedNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void addToHead(DLinkedNode node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev= node;
        head.next = node;
    }

    private void moveToHead(DLinkedNode node) {
        removeNode(node);
        addToHead(node);
    }

    private DLinkedNode removeTail() {
        DLinkedNode res = tail.prev;
        removeNode(res);
        return res;
    }
}
```

### 4.5  K 个一组翻转链表

给你链表的头节点 `head` ，每 `k` 个节点一组进行翻转，请你返回修改后的链表。

`k` 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 `k` 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

```
public ListNode reverseKGroup(ListNode head, int k) {
    ListNode dummyNode = new ListNode(0);
    dummyNode.next = head;
    ListNode pre = dummyNode;
    while(head != null) {
        ListNode tail = pre;
        for(int i = 0; i < k; i++) {
            tail = tail.next;
            if(tail == null) {
                return dummyNode.next;
            }
        }
        ListNode nextNode = tail.next;
        ListNode[] reverse = ReverseKNode(head, tail);
        head = reverse[0];
        tail = reverse[1];
        pre.next = head;
        tail.next = nextNode;
        head = tail.next;
        pre = tail;        
    }
    return dummyNode.next;
}

public ListNode[] ReverseKNode(ListNode head, ListNode tail) {
    ListNode p = head;
    ListNode prev = tail.next;
    while(prev != tail) {
        ListNode next = p.next;
        p.next = prev;
        prev = p;
        p = next;
    }
    return new ListNode[]{tail, head};
}
```

## 5. 贪心

### 5.1 买卖股票的最佳时机

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

## 6. 动态规划

### 6.1 爬楼梯

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

### 6.2 接雨水

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

### 6.3 最长递增子序列

给你一个整数数组 `nums` ，找到其中最长严格递增子序列的长度。

**子序列** 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，`[3,6,2,7]` 是数组 `[0,3,1,6,2,2,7]` 的子序列。

```
public int lengthOfLIS(int[] nums) {
    int n = nums.length;
    if(n == 0) {
        return 0;
    }
    int[] dp = new int[n];
    dp[0] = 1;
    int maxLen = 1;
    for(int i = 0; i < n; i++) {
        dp[i] = 1;
        for(int j = 0; j < i; i++) {
            if(num[i] > num[j]) {
                dp[i] = Math.max(dp[i], dp[j]+1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    return maxLen;
}
```

### 6.4 最长公共子序列

给定两个字符串 `text1` 和 `text2`，返回这两个字符串的最长 **公共子序列** 的长度。如果不存在 **公共子序列** ，返回 `0` 。

一个字符串的 **子序列** 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

- 例如，`"ace"` 是 `"abcde"` 的子序列，但 `"aec"` 不是 `"abcde"` 的子序列。

两个字符串的 **公共子序列** 是这两个字符串所共同拥有的子序列。

```
public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m+1][n+1];
    for(int i = 1; i <= m; i++) {
        char c1 = text1.charAt(i-1);
        for(int j = 1; j <= n; j++) {
            char c2 = text2.charAt(j-1);
            if(c1 == c2) {
                dp[i][j] = dp[i-1[j-1]+1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}
```

## 7. 二分查找

### 7.1 搜索插入位置

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

## 8. 栈

### 8.1 有效的括号

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

## 9. 堆

### 9.1 数组中的第K个最大元素

给定整数数组 `nums` 和整数 `k`，请返回数组中第 `k` 个最大的元素。

请注意，你需要找的是数组排序后的第 `k` 个最大的元素，而不是第 `k` 个不同的元素。

你必须设计并实现时间复杂度为 `O(n)` 的算法解决此问题。

```
public int findKthLargest(int[] nums, int k) {
    int heapSize = nums.length;
    buildMaxHeap(nums, heapSize);
    for(int i = nums.length-1; i >= nums.length-k+1; i--) {
        swap(nums, 0, i);
        heapSize--;
        maxHeapify(nums, 0, heapSize);
    }
    return ;
}

public void buildMaxHeap(int[] a, int heapSize) {
    for(int i = heapSize/2-1; i >= 0; i--) {
        maxHeapify(a, i, heapSize);
    }
}

public void maxHeapify(int[] a, int i, int heapSize) {
    int l = i*2+1, r = i*2+2, largest = i;
    if(l < heapSize && a[l] > a[largest]) {
        largest = l;
    }
    if(r < heapSize && a[r] > a[largest]) {
        largest = r;
    }
    if(largest != i) {
        swap(a, i, largest);
        maxHeapify(a, largest, heapSize);
    }
}

public void swap(int[] a, int i, int j) {
    int tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
}
```

### 9.2 前 K 个高频元素

给你一个整数数组 `nums` 和一个整数 `k` ，请你返回其中出现频率前 `k` 高的元素。你可以按 **任意顺序** 返回答案。

=> 使用哈希表记录每个数字出现的次数，建立一个小顶堆，然后遍历哈希表。

- 如果堆的元素个数小于 k，就可以直接插入堆中。
- 如果堆的元素个数等于 k，则检查堆顶与当前出现次数的大小。如果堆顶更大，说明至少有 k 个数字的出现次数比当前值大，故舍弃当前值；否则，就弹出堆顶，并将当前值插入堆中。

```
    public int[] topKFrequent(int[] nums, int k) {
        HashMap<Integer, Integer> map = new HashMap();
        for(int num : nums) {
            map.put(num, map.getOrDefault(num, 0)+1);
        }
        Queue<int[]> pq = new PriorityQueue<int[]>(
            new Comparator<int[]>() {
                @Override
                public int compare(int[] a, int[] b) {
                    return  a[1]-b[1];
                }
            }
        );
        for(Map.Entry<Integer, Integer> entry : map.entrySet()) {
            int num = entry.getKey(), count = entry.getValue();
            if(pq.size() == k) {
                if(pq.peek()[1] < count) {
                    pq.poll();
                    pq.offer(new int[]{num, count});
                }
            } else {
                pq.offer(new int[]{num, count});
            }
        }
        int[] ret = new int[k];
        for(int i = 0; i < k; i++) {
            ret[i] = pq.poll()[0];
        }
        return ret;
    }
```

## 10. 图论

### 10.1 岛屿数量

给你一个由 `'1'`（陆地）和 `'0'`（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

```
public int numIslands(char[][] grid) {
    if(grid == null || grid.length == 0) {
        return 0;
    }
    int nr = grid.length;
    int nc = grid[0].length;
    int ans = 0;
    for(int r = 0; r < nr; r++) {
        for(int c = 0; c < nc; c++) {
            if(grid[r][c] == '1') {
                ans++;
                dfs(grid, r, c;)
            }
        }
    }
}

void dfs(char[][] grid, int r, int c) {
    int nr = grid.length;
    int nc = grid[0].length;
    if(r < 0 || c < 0 || r>= nr || c >= nc || grid[r][c] == '0') {
        return;
    }
    grid[r][c] == '0';
    dfs(grid, r-1, c);
    dfs(grid, r+1, c);
    dfs(grid, r, c-1);
    dfs(grid, r, c+1);
}
```

## 11. ACM 模式 - 处理输入输出

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
