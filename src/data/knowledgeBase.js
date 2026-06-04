/**
 * @fileoverview NEXUS Knowledge Base
 * 200+ curated topic entries across 7 major categories.
 * Each entry provides structured educational content for the Researcher Agent.
 * @module data/knowledgeBase
 */

export const knowledgeBase = [
  // ═══════════════════════════════════════════════════════════════════════════
  // COMPUTER SCIENCE (60+ topics)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Data Structures ---
  {
    id: 'cs_arrays', title: 'Arrays', category: 'Computer Science', subcategory: 'Data Structures', difficulty: 1,
    introduction: 'Arrays are the most fundamental data structure — a contiguous block of memory storing elements of the same type, accessed by index in O(1) time.',
    keyConcepts: [
      { term: 'Indexing', explanation: 'Elements are accessed via zero-based integer indices, allowing constant-time random access.' },
      { term: 'Contiguous Memory', explanation: 'Array elements are stored in adjacent memory locations, enabling efficient CPU cache utilization.' },
      { term: 'Fixed vs Dynamic', explanation: 'Static arrays have fixed size at creation; dynamic arrays (like ArrayList) resize automatically by doubling capacity.' },
      { term: 'Time Complexity', explanation: 'Access O(1), Search O(n), Insert/Delete O(n) due to shifting elements.' }
    ],
    analogy: 'An array is like a row of numbered lockers — you can instantly open locker #5, but inserting a new locker in the middle means renumbering everything after it.',
    takeaway: 'Arrays trade flexibility for speed — when you need fast random access and know the size upfront, arrays are unbeatable.',
    prerequisites: [], relatedTopics: ['cs_linked_lists', 'cs_strings', 'cs_dynamic_arrays'],
    tags: ['array', 'data structure', 'indexing', 'memory', 'fundamental']
  },
  {
    id: 'cs_linked_lists', title: 'Linked Lists', category: 'Computer Science', subcategory: 'Data Structures', difficulty: 2,
    introduction: 'A linked list is a linear data structure where each element (node) contains data and a pointer to the next node, enabling efficient insertions and deletions.',
    keyConcepts: [
      { term: 'Node Structure', explanation: 'Each node holds a data field and a reference (pointer) to the next node in the sequence.' },
      { term: 'Singly vs Doubly', explanation: 'Singly linked lists have one pointer (next); doubly linked lists add a prev pointer for bidirectional traversal.' },
      { term: 'Head & Tail', explanation: 'Head points to the first node; tail points to the last. The tail\'s next pointer is null.' },
      { term: 'Dynamic Size', explanation: 'Unlike arrays, linked lists grow and shrink dynamically without reallocation.' }
    ],
    analogy: 'A linked list is like a treasure hunt — each clue (node) tells you where to find the next one, but you can\'t jump directly to clue #7.',
    takeaway: 'Use linked lists when you need frequent insertions/deletions and don\'t need random access.',
    prerequisites: ['cs_arrays'], relatedTopics: ['cs_stacks', 'cs_queues', 'cs_doubly_linked_lists'],
    tags: ['linked list', 'node', 'pointer', 'data structure', 'dynamic']
  },
  {
    id: 'cs_stacks', title: 'Stacks', category: 'Computer Science', subcategory: 'Data Structures', difficulty: 1,
    introduction: 'A stack is a Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end, called the top.',
    keyConcepts: [
      { term: 'LIFO Principle', explanation: 'The last element pushed onto the stack is the first one to be popped off.' },
      { term: 'Push & Pop', explanation: 'Push adds an element to the top; Pop removes and returns the top element. Both are O(1).' },
      { term: 'Peek', explanation: 'Returns the top element without removing it, useful for inspection.' },
      { term: 'Applications', explanation: 'Function call stacks, undo operations, expression evaluation, and backtracking algorithms.' }
    ],
    analogy: 'A stack is like a stack of plates — you always add or remove from the top. You can\'t pull a plate from the middle without toppling everything.',
    takeaway: 'Stacks are simple but powerful — they\'re the backbone of function calls, undo systems, and recursive algorithms.',
    prerequisites: ['cs_arrays'], relatedTopics: ['cs_queues', 'cs_recursion', 'cs_expression_evaluation'],
    tags: ['stack', 'lifo', 'push', 'pop', 'data structure']
  },
  {
    id: 'cs_queues', title: 'Queues', category: 'Computer Science', subcategory: 'Data Structures', difficulty: 1,
    introduction: 'A queue is a First-In-First-Out (FIFO) data structure where elements are added at the rear and removed from the front, like a real-world line.',
    keyConcepts: [
      { term: 'FIFO Principle', explanation: 'The first element enqueued is the first to be dequeued — fair ordering.' },
      { term: 'Enqueue & Dequeue', explanation: 'Enqueue adds to the rear; Dequeue removes from the front. Both O(1) with proper implementation.' },
      { term: 'Circular Queue', explanation: 'Uses a fixed-size array with wrap-around to avoid wasted space from dequeue operations.' },
      { term: 'Priority Queue', explanation: 'Elements are dequeued based on priority rather than arrival order, often implemented with heaps.' }
    ],
    analogy: 'A queue is like waiting in line at a coffee shop — first come, first served. No cutting in line!',
    takeaway: 'Queues model fairness in computing — from CPU scheduling to print spooling to breadth-first search.',
    prerequisites: ['cs_arrays'], relatedTopics: ['cs_stacks', 'cs_bfs', 'cs_priority_queues'],
    tags: ['queue', 'fifo', 'enqueue', 'dequeue', 'data structure']
  },
  {
    id: 'cs_trees', title: 'Trees', category: 'Computer Science', subcategory: 'Data Structures', difficulty: 2,
    introduction: 'A tree is a hierarchical data structure consisting of nodes connected by edges, with a single root node and no cycles.',
    keyConcepts: [
      { term: 'Root, Parent, Child', explanation: 'The topmost node is the root. Each node can have children; a node with children is a parent.' },
      { term: 'Binary Tree', explanation: 'Each node has at most two children (left and right), forming the basis for BSTs and heaps.' },
      { term: 'Depth & Height', explanation: 'Depth is the distance from root to a node; height is the longest path from a node to a leaf.' },
      { term: 'Traversals', explanation: 'In-order, pre-order, post-order (DFS) and level-order (BFS) are the four standard traversal methods.' }
    ],
    analogy: 'A tree is like a family tree — one ancestor (root) at the top, branching into children, grandchildren, and so on.',
    takeaway: 'Trees are the foundation of databases (B-trees), compilers (ASTs), file systems, and AI decision-making.',
    prerequisites: ['cs_linked_lists', 'cs_recursion'], relatedTopics: ['cs_bst', 'cs_heaps', 'cs_avl_trees', 'cs_graph_theory'],
    tags: ['tree', 'binary tree', 'hierarchical', 'traversal', 'data structure']
  },
  {
    id: 'cs_bst', title: 'Binary Search Trees', category: 'Computer Science', subcategory: 'Data Structures', difficulty: 3,
    introduction: 'A Binary Search Tree (BST) is a binary tree where left children are smaller and right children are larger than the parent, enabling O(log n) search.',
    keyConcepts: [
      { term: 'BST Property', explanation: 'For every node, all values in the left subtree are less, and all in the right subtree are greater.' },
      { term: 'Search Operation', explanation: 'Compare target with current node; go left if smaller, right if larger. O(log n) average, O(n) worst.' },
      { term: 'Insertion & Deletion', explanation: 'Insert by finding the correct leaf position. Delete has three cases: leaf, one child, two children.' },
      { term: 'In-order Traversal', explanation: 'Visiting a BST in-order produces elements in sorted ascending order.' }
    ],
    analogy: 'A BST is like a well-organized filing cabinet — everything smaller goes left, larger goes right, so you can find any file by always choosing the right direction.',
    takeaway: 'BSTs provide efficient searching when balanced, but degenerate into linked lists when data is inserted in sorted order.',
    prerequisites: ['cs_trees'], relatedTopics: ['cs_avl_trees', 'cs_red_black_trees', 'cs_binary_search'],
    tags: ['bst', 'binary search tree', 'search', 'sorted', 'data structure']
  },
  {
    id: 'cs_hash_tables', title: 'Hash Tables', category: 'Computer Science', subcategory: 'Data Structures', difficulty: 2,
    introduction: 'A hash table maps keys to values using a hash function, providing average O(1) lookup, insertion, and deletion.',
    keyConcepts: [
      { term: 'Hash Function', explanation: 'Converts a key into an array index. Good hash functions distribute keys uniformly.' },
      { term: 'Collision Handling', explanation: 'When two keys hash to the same index. Solved via chaining (linked lists) or open addressing (probing).' },
      { term: 'Load Factor', explanation: 'Ratio of entries to table size. Higher load factors increase collisions; typical threshold is 0.75.' },
      { term: 'Amortized O(1)', explanation: 'Individual operations may be O(n) during rehashing, but amortized cost remains constant.' }
    ],
    analogy: 'A hash table is like a coat check — you hand over your coat (value), get a numbered ticket (hash), and retrieve it instantly later.',
    takeaway: 'Hash tables are the workhorse of computing — dictionaries, caches, databases, and symbol tables all use them.',
    prerequisites: ['cs_arrays'], relatedTopics: ['cs_sets', 'cs_maps', 'cs_bloom_filters'],
    tags: ['hash table', 'hashing', 'dictionary', 'map', 'collision']
  },
  {
    id: 'cs_heaps', title: 'Heaps', category: 'Computer Science', subcategory: 'Data Structures', difficulty: 3,
    introduction: 'A heap is a complete binary tree satisfying the heap property: in a max-heap, every parent is greater than its children; in a min-heap, smaller.',
    keyConcepts: [
      { term: 'Heap Property', explanation: 'Max-heap: parent ≥ children. Min-heap: parent ≤ children. Always maintained after operations.' },
      { term: 'Insert (Sift Up)', explanation: 'Add element at the end, then bubble it up by swapping with parent until heap property restored. O(log n).' },
      { term: 'Extract (Sift Down)', explanation: 'Remove root, replace with last element, then sink it down. O(log n).' },
      { term: 'Heapify', explanation: 'Build a heap from an unsorted array in O(n) by sifting down from the last internal node.' }
    ],
    analogy: 'A heap is like a corporate hierarchy — the CEO (root) is always the most important person, and every manager outranks their direct reports.',
    takeaway: 'Heaps power priority queues, heap sort, and are essential for algorithms like Dijkstra\'s shortest path.',
    prerequisites: ['cs_trees', 'cs_arrays'], relatedTopics: ['cs_priority_queues', 'cs_heap_sort', 'cs_dijkstra'],
    tags: ['heap', 'priority queue', 'binary heap', 'min heap', 'max heap']
  },
  {
    id: 'cs_graphs', title: 'Graphs', category: 'Computer Science', subcategory: 'Data Structures', difficulty: 3,
    introduction: 'A graph is a collection of vertices (nodes) connected by edges, used to model relationships like social networks, maps, and dependencies.',
    keyConcepts: [
      { term: 'Directed vs Undirected', explanation: 'Directed graphs have one-way edges; undirected graphs have bidirectional connections.' },
      { term: 'Adjacency Matrix vs List', explanation: 'Matrix: O(1) edge lookup, O(V²) space. List: O(V+E) space, better for sparse graphs.' },
      { term: 'Weighted Graphs', explanation: 'Edges carry numerical weights representing cost, distance, or capacity.' },
      { term: 'Connected Components', explanation: 'Maximal subgraphs where every vertex is reachable from every other vertex.' }
    ],
    analogy: 'A graph is like a social network — people are nodes, friendships are edges. Some are one-way (following on Twitter), some are mutual (Facebook friends).',
    takeaway: 'Graphs are the most versatile data structure — they model virtually any relationship-based problem in computer science.',
    prerequisites: ['cs_trees', 'cs_linked_lists'], relatedTopics: ['cs_bfs', 'cs_dfs', 'cs_dijkstra', 'cs_topological_sort'],
    tags: ['graph', 'vertices', 'edges', 'network', 'adjacency']
  },
  {
    id: 'cs_tries', title: 'Tries (Prefix Trees)', category: 'Computer Science', subcategory: 'Data Structures', difficulty: 3,
    introduction: 'A trie is a tree-like data structure that stores strings by sharing common prefixes, enabling fast prefix-based searching and autocomplete.',
    keyConcepts: [
      { term: 'Prefix Sharing', explanation: 'Common prefixes are stored once — "apple" and "app" share the first 3 nodes.' },
      { term: 'Node Structure', explanation: 'Each node represents a character, with children for possible next characters and an end-of-word marker.' },
      { term: 'Search Complexity', explanation: 'O(m) where m is the length of the search string — independent of how many strings are stored.' },
      { term: 'Applications', explanation: 'Autocomplete, spell checking, IP routing tables, and dictionary implementations.' }
    ],
    analogy: 'A trie is like a phone tree menu — press 1 for Sales, then 2 for Returns. Each button narrows your path, and shared menus save space.',
    takeaway: 'Tries are the secret behind every autocomplete feature and spell checker you\'ve ever used.',
    prerequisites: ['cs_trees', 'cs_strings'], relatedTopics: ['cs_hash_tables', 'cs_suffix_trees'],
    tags: ['trie', 'prefix tree', 'autocomplete', 'string', 'data structure']
  },

  // --- Algorithms ---
  {
    id: 'cs_binary_search', title: 'Binary Search', category: 'Computer Science', subcategory: 'Algorithms', difficulty: 1,
    introduction: 'Binary search is a divide-and-conquer algorithm that finds a target value in a sorted array by repeatedly halving the search space.',
    keyConcepts: [
      { term: 'Divide & Conquer', explanation: 'Compare target with middle element; eliminate half the remaining elements each step.' },
      { term: 'O(log n) Time', explanation: 'Each comparison eliminates half the array, giving logarithmic time complexity.' },
      { term: 'Precondition', explanation: 'The array must be sorted. Unsorted arrays require sorting first or linear search.' },
      { term: 'Iterative vs Recursive', explanation: 'Can be implemented with a loop (iterative) or function calls (recursive). Iterative uses O(1) space.' }
    ],
    analogy: 'Binary search is like looking up a word in a dictionary — you open to the middle, check if your word comes before or after, and repeat with the correct half.',
    takeaway: 'Binary search turns a million-element search from 1,000,000 comparisons to just 20. Always sort first if you\'ll search repeatedly.',
    prerequisites: ['cs_arrays'], relatedTopics: ['cs_sorting', 'cs_bst', 'cs_divide_and_conquer'],
    tags: ['binary search', 'search', 'algorithm', 'divide and conquer', 'logarithmic']
  },
  {
    id: 'cs_sorting', title: 'Sorting Algorithms', category: 'Computer Science', subcategory: 'Algorithms', difficulty: 2,
    introduction: 'Sorting algorithms arrange elements in a specific order. Understanding their trade-offs is fundamental to algorithm design.',
    keyConcepts: [
      { term: 'Bubble Sort', explanation: 'Repeatedly swap adjacent elements if out of order. Simple but O(n²) — only useful for small or nearly-sorted data.' },
      { term: 'Merge Sort', explanation: 'Divide array in half, sort each half, merge. O(n log n) guaranteed, but uses O(n) extra space.' },
      { term: 'Quick Sort', explanation: 'Pick a pivot, partition around it, recurse. O(n log n) average, O(n²) worst. In-place and cache-friendly.' },
      { term: 'Stability', explanation: 'Stable sorts preserve relative order of equal elements. Merge sort is stable; quicksort is not.' }
    ],
    analogy: 'Sorting is like organizing a bookshelf — bubble sort checks every pair of adjacent books, while merge sort divides the shelf in half and sorts each separately.',
    takeaway: 'No single sorting algorithm is best for everything — quicksort is fastest on average, merge sort is stable, and insertion sort wins for small arrays.',
    prerequisites: ['cs_arrays'], relatedTopics: ['cs_binary_search', 'cs_merge_sort', 'cs_quick_sort', 'cs_heap_sort'],
    tags: ['sorting', 'algorithm', 'comparison', 'merge sort', 'quick sort']
  },
  {
    id: 'cs_recursion', title: 'Recursion', category: 'Computer Science', subcategory: 'Algorithms', difficulty: 2,
    introduction: 'Recursion is a technique where a function calls itself to solve a problem by breaking it into smaller, identical subproblems.',
    keyConcepts: [
      { term: 'Base Case', explanation: 'The stopping condition that prevents infinite recursion. Every recursive function must have one.' },
      { term: 'Recursive Case', explanation: 'The part where the function calls itself with a smaller input, progressing toward the base case.' },
      { term: 'Call Stack', explanation: 'Each recursive call adds a frame to the stack. Too many calls cause stack overflow.' },
      { term: 'Tail Recursion', explanation: 'When the recursive call is the last operation, allowing compiler optimization to reuse the stack frame.' }
    ],
    analogy: 'Recursion is like Russian nesting dolls — open one doll to find a smaller identical doll inside, until you reach the smallest one (base case).',
    takeaway: 'Think recursively: solve the simplest case, then trust that the same solution works for larger inputs. If you can define it recursively, you can code it recursively.',
    prerequisites: ['cs_stacks'], relatedTopics: ['cs_dynamic_programming', 'cs_divide_and_conquer', 'cs_trees'],
    tags: ['recursion', 'base case', 'call stack', 'algorithm', 'divide and conquer']
  },
  {
    id: 'cs_dynamic_programming', title: 'Dynamic Programming', category: 'Computer Science', subcategory: 'Algorithms', difficulty: 4,
    introduction: 'Dynamic programming solves complex problems by breaking them into overlapping subproblems, storing results to avoid redundant computation.',
    keyConcepts: [
      { term: 'Overlapping Subproblems', explanation: 'The same subproblem is solved multiple times. DP stores results to compute each only once.' },
      { term: 'Optimal Substructure', explanation: 'An optimal solution contains optimal solutions to its subproblems.' },
      { term: 'Memoization (Top-Down)', explanation: 'Recursive approach with a cache. Solve subproblems on demand and store results.' },
      { term: 'Tabulation (Bottom-Up)', explanation: 'Iterative approach filling a table from smallest subproblem up. Often more space-efficient.' }
    ],
    analogy: 'DP is like climbing stairs and writing the number of ways to reach each step on it — when you reach step 10, you don\'t re-count from step 1; you just look at steps 8 and 9.',
    takeaway: 'If a problem has overlapping subproblems and optimal substructure, DP can transform exponential solutions into polynomial ones.',
    prerequisites: ['cs_recursion'], relatedTopics: ['cs_greedy', 'cs_knapsack', 'cs_fibonacci'],
    tags: ['dynamic programming', 'dp', 'memoization', 'tabulation', 'optimization']
  },
  {
    id: 'cs_bfs', title: 'Breadth-First Search (BFS)', category: 'Computer Science', subcategory: 'Algorithms', difficulty: 2,
    introduction: 'BFS explores a graph level by level using a queue, visiting all neighbors at the current depth before moving deeper.',
    keyConcepts: [
      { term: 'Queue-Based', explanation: 'BFS uses a FIFO queue to process nodes in the order they are discovered.' },
      { term: 'Level-Order', explanation: 'Visits all nodes at distance 1 from the source, then distance 2, and so on.' },
      { term: 'Shortest Path', explanation: 'In unweighted graphs, BFS guarantees finding the shortest path (fewest edges).' },
      { term: 'Time Complexity', explanation: 'O(V + E) where V is vertices and E is edges — visits each vertex and edge once.' }
    ],
    analogy: 'BFS is like a ripple spreading on water — it reaches all points at the same distance before moving further out.',
    takeaway: 'Use BFS when you need the shortest path in unweighted graphs or need to explore neighbors first.',
    prerequisites: ['cs_graphs', 'cs_queues'], relatedTopics: ['cs_dfs', 'cs_dijkstra', 'cs_shortest_path'],
    tags: ['bfs', 'breadth first search', 'graph', 'traversal', 'shortest path']
  },
  {
    id: 'cs_dfs', title: 'Depth-First Search (DFS)', category: 'Computer Science', subcategory: 'Algorithms', difficulty: 2,
    introduction: 'DFS explores a graph by going as deep as possible along each branch before backtracking, using a stack (or recursion).',
    keyConcepts: [
      { term: 'Stack-Based', explanation: 'DFS uses a LIFO stack (explicit or via recursion) to track the exploration path.' },
      { term: 'Backtracking', explanation: 'When a dead end is reached, DFS returns to the last decision point and tries the next option.' },
      { term: 'Applications', explanation: 'Topological sorting, cycle detection, connected components, maze solving, and puzzle solving.' },
      { term: 'Time Complexity', explanation: 'O(V + E) — same as BFS, but explores depth-first rather than breadth-first.' }
    ],
    analogy: 'DFS is like exploring a maze — go as far as you can down one path, hit a wall, backtrack to the last fork, and try a different direction.',
    takeaway: 'DFS is the go-to for exploring all possible paths, detecting cycles, and topological ordering of dependencies.',
    prerequisites: ['cs_graphs', 'cs_stacks', 'cs_recursion'], relatedTopics: ['cs_bfs', 'cs_topological_sort', 'cs_backtracking'],
    tags: ['dfs', 'depth first search', 'graph', 'traversal', 'backtracking']
  },
  {
    id: 'cs_dijkstra', title: "Dijkstra's Algorithm", category: 'Computer Science', subcategory: 'Algorithms', difficulty: 3,
    introduction: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights.",
    keyConcepts: [
      { term: 'Greedy Approach', explanation: 'Always processes the unvisited vertex with the smallest known distance from the source.' },
      { term: 'Priority Queue', explanation: 'Uses a min-heap to efficiently select the next vertex to process.' },
      { term: 'Relaxation', explanation: 'For each neighbor, check if the path through the current vertex is shorter than the known shortest path.' },
      { term: 'Non-negative Weights', explanation: 'Only works correctly with non-negative edge weights. Use Bellman-Ford for negative weights.' }
    ],
    analogy: "Dijkstra's is like a GPS finding the fastest route — it expands outward from your location, always extending the shortest known path first.",
    takeaway: "Dijkstra's is the gold standard for shortest paths in weighted graphs — it powers every navigation system and network routing protocol.",
    prerequisites: ['cs_graphs', 'cs_heaps', 'cs_bfs'], relatedTopics: ['cs_bellman_ford', 'cs_a_star', 'cs_shortest_path'],
    tags: ['dijkstra', 'shortest path', 'graph', 'greedy', 'priority queue']
  },
  {
    id: 'cs_greedy', title: 'Greedy Algorithms', category: 'Computer Science', subcategory: 'Algorithms', difficulty: 3,
    introduction: 'Greedy algorithms make the locally optimal choice at each step, hoping to find a global optimum. They work when the problem has greedy-choice property.',
    keyConcepts: [
      { term: 'Greedy Choice', explanation: 'At each step, pick the option that looks best right now without considering future consequences.' },
      { term: 'Optimal Substructure', explanation: 'A globally optimal solution contains locally optimal solutions to subproblems.' },
      { term: 'Proof of Correctness', explanation: 'Greedy algorithms need proof that local choices lead to global optimum — not always true.' },
      { term: 'Examples', explanation: 'Activity selection, Huffman coding, Kruskal\'s MST, coin change (with standard denominations).' }
    ],
    analogy: 'A greedy algorithm is like always eating the biggest piece of cake first — sometimes this works perfectly, sometimes you miss a better combination.',
    takeaway: 'Greedy is fast and simple, but only correct for problems with the greedy-choice property. Always verify correctness before assuming greedy works.',
    prerequisites: ['cs_sorting'], relatedTopics: ['cs_dynamic_programming', 'cs_dijkstra', 'cs_huffman'],
    tags: ['greedy', 'algorithm', 'optimization', 'heuristic']
  },
  {
    id: 'cs_backtracking', title: 'Backtracking', category: 'Computer Science', subcategory: 'Algorithms', difficulty: 3,
    introduction: 'Backtracking systematically explores all possible solutions by building candidates incrementally and abandoning ("pruning") branches that cannot lead to a valid solution.',
    keyConcepts: [
      { term: 'State Space Tree', explanation: 'The tree of all possible partial solutions. Backtracking navigates this tree via DFS.' },
      { term: 'Pruning', explanation: 'Eliminating branches early when constraints are violated, dramatically reducing the search space.' },
      { term: 'Constraint Satisfaction', explanation: 'Problems like N-Queens, Sudoku, and graph coloring are naturally solved with backtracking.' },
      { term: 'Recursive Structure', explanation: 'Make a choice → recurse → undo the choice (backtrack) → try next option.' }
    ],
    analogy: 'Backtracking is like solving a maze by trying each path — when you hit a dead end, you go back to the last fork and try a different direction.',
    takeaway: 'Backtracking is brute-force with intelligence — pruning bad branches early makes exponential problems tractable.',
    prerequisites: ['cs_recursion', 'cs_dfs'], relatedTopics: ['cs_dynamic_programming', 'cs_constraint_satisfaction'],
    tags: ['backtracking', 'recursion', 'pruning', 'constraint', 'algorithm']
  },

  // --- Operating Systems ---
  {
    id: 'cs_processes', title: 'Processes', category: 'Computer Science', subcategory: 'Operating Systems', difficulty: 2,
    introduction: 'A process is a program in execution — it includes the code, current state, memory space, and system resources allocated by the OS.',
    keyConcepts: [
      { term: 'Process States', explanation: 'New → Ready → Running → Waiting → Terminated. The OS manages transitions between these states.' },
      { term: 'Process Control Block', explanation: 'PCB stores process ID, state, registers, memory limits, and scheduling info.' },
      { term: 'Context Switching', explanation: 'Saving the state of one process and loading another. Has overhead but enables multitasking.' },
      { term: 'Inter-Process Communication', explanation: 'Processes communicate via shared memory, message passing, pipes, or sockets.' }
    ],
    analogy: 'A process is like a chef working on a recipe — they have their own workspace (memory), ingredients (data), and recipe steps (instructions).',
    takeaway: 'Processes are the fundamental unit of work in an OS — understanding them is key to understanding multitasking, scheduling, and system performance.',
    prerequisites: [], relatedTopics: ['cs_threads', 'cs_scheduling', 'cs_deadlocks', 'cs_memory_management'],
    tags: ['process', 'operating system', 'pcb', 'context switch', 'multitasking']
  },
  {
    id: 'cs_threads', title: 'Threads', category: 'Computer Science', subcategory: 'Operating Systems', difficulty: 3,
    introduction: 'A thread is the smallest unit of CPU execution within a process. Multiple threads share the same memory space but execute independently.',
    keyConcepts: [
      { term: 'Lightweight Process', explanation: 'Threads share code, data, and resources of their parent process, making creation faster than processes.' },
      { term: 'Concurrency vs Parallelism', explanation: 'Concurrency: interleaved execution. Parallelism: simultaneous execution on multiple cores.' },
      { term: 'Thread Safety', explanation: 'Code that works correctly when accessed by multiple threads simultaneously using synchronization.' },
      { term: 'Race Conditions', explanation: 'Bugs caused by threads accessing shared data without proper synchronization, leading to unpredictable results.' }
    ],
    analogy: 'Threads are like multiple chefs in the same kitchen — they share utensils and ingredients but need to coordinate so they don\'t grab the same pan.',
    takeaway: 'Threads enable parallelism and responsive applications, but require careful synchronization to avoid race conditions and deadlocks.',
    prerequisites: ['cs_processes'], relatedTopics: ['cs_deadlocks', 'cs_synchronization', 'cs_scheduling'],
    tags: ['thread', 'concurrency', 'parallelism', 'synchronization', 'operating system']
  },
  {
    id: 'cs_scheduling', title: 'CPU Scheduling', category: 'Computer Science', subcategory: 'Operating Systems', difficulty: 3,
    introduction: 'CPU scheduling determines which process runs on the processor at any given time, optimizing utilization, throughput, and response time.',
    keyConcepts: [
      { term: 'FCFS', explanation: 'First-Come-First-Served: simple FIFO queue. Fair but suffers from convoy effect with long processes.' },
      { term: 'Round Robin', explanation: 'Each process gets a fixed time quantum. Preemptive and fair, good for time-sharing systems.' },
      { term: 'Priority Scheduling', explanation: 'Higher priority processes run first. Can cause starvation of low-priority processes.' },
      { term: 'Shortest Job First', explanation: 'Process with shortest burst time runs next. Optimal average wait time but requires knowing burst times.' }
    ],
    analogy: 'CPU scheduling is like a hospital ER — FCFS treats patients in order, priority scheduling treats emergencies first, and round robin gives everyone a few minutes.',
    takeaway: 'No single scheduling algorithm is perfect — modern OSes use multi-level feedback queues combining the best aspects of each approach.',
    prerequisites: ['cs_processes'], relatedTopics: ['cs_deadlocks', 'cs_memory_management'],
    tags: ['scheduling', 'cpu', 'round robin', 'fcfs', 'operating system']
  },
  {
    id: 'cs_deadlocks', title: 'Deadlocks', category: 'Computer Science', subcategory: 'Operating Systems', difficulty: 3,
    introduction: 'A deadlock occurs when two or more processes are waiting for resources held by each other, creating a circular dependency where none can proceed.',
    keyConcepts: [
      { term: 'Four Conditions', explanation: 'Mutual exclusion, hold-and-wait, no preemption, and circular wait must ALL exist for deadlock.' },
      { term: 'Prevention', explanation: 'Eliminate one of the four conditions. E.g., require processes to request all resources upfront.' },
      { term: 'Detection', explanation: 'Use resource allocation graphs or wait-for graphs to detect cycles indicating deadlock.' },
      { term: 'Recovery', explanation: 'Kill a process, preempt resources, or roll back to a checkpoint to break the deadlock.' }
    ],
    analogy: 'A deadlock is like two cars meeting on a narrow bridge from opposite sides — neither can move forward, and neither will back up.',
    takeaway: 'Deadlocks are the ultimate coordination failure in computing. Prevention (breaking one of the four conditions) is usually better than detection and recovery.',
    prerequisites: ['cs_processes', 'cs_threads'], relatedTopics: ['cs_synchronization', 'cs_scheduling'],
    tags: ['deadlock', 'operating system', 'synchronization', 'resource', 'circular wait']
  },
  {
    id: 'cs_memory_management', title: 'Memory Management', category: 'Computer Science', subcategory: 'Operating Systems', difficulty: 3,
    introduction: 'Memory management is how the OS allocates, tracks, and reclaims memory for processes, enabling multiple programs to coexist safely.',
    keyConcepts: [
      { term: 'Virtual Memory', explanation: 'Gives each process the illusion of a large, contiguous memory space using disk as backup.' },
      { term: 'Paging', explanation: 'Divides memory into fixed-size pages. Eliminates external fragmentation and enables non-contiguous allocation.' },
      { term: 'Page Replacement', explanation: 'When physical memory is full, algorithms like LRU, FIFO, and Optimal decide which page to evict.' },
      { term: 'Segmentation', explanation: 'Divides memory into logical segments (code, data, stack) of varying sizes.' }
    ],
    analogy: 'Virtual memory is like a library with limited shelf space — popular books stay on shelves, others are stored in the basement (disk) and retrieved on demand.',
    takeaway: 'Virtual memory is one of the most elegant abstractions in CS — it lets programs use more memory than physically exists.',
    prerequisites: ['cs_processes'], relatedTopics: ['cs_paging', 'cs_scheduling'],
    tags: ['memory', 'virtual memory', 'paging', 'operating system', 'allocation']
  },

  // --- Databases ---
  {
    id: 'cs_sql', title: 'SQL (Structured Query Language)', category: 'Computer Science', subcategory: 'Databases', difficulty: 2,
    introduction: 'SQL is the standard language for managing relational databases — creating tables, inserting data, and querying with powerful declarative syntax.',
    keyConcepts: [
      { term: 'SELECT Queries', explanation: 'Retrieve data with filtering (WHERE), sorting (ORDER BY), grouping (GROUP BY), and aggregation (COUNT, SUM, AVG).' },
      { term: 'JOINs', explanation: 'Combine rows from multiple tables based on related columns. INNER, LEFT, RIGHT, and FULL OUTER joins.' },
      { term: 'CRUD Operations', explanation: 'Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE) — the four basic data operations.' },
      { term: 'Normalization', explanation: 'Organizing tables to reduce redundancy and dependency. Normal forms: 1NF, 2NF, 3NF, BCNF.' }
    ],
    analogy: 'SQL is like asking a librarian for books — you describe what you want ("all mystery books published after 2020"), and they find them for you.',
    takeaway: 'SQL is the lingua franca of data. Whether you\'re building web apps, doing data science, or managing business data, SQL is essential.',
    prerequisites: [], relatedTopics: ['cs_nosql', 'cs_normalization', 'cs_transactions', 'cs_indexing'],
    tags: ['sql', 'database', 'query', 'relational', 'crud']
  },
  {
    id: 'cs_normalization', title: 'Database Normalization', category: 'Computer Science', subcategory: 'Databases', difficulty: 3,
    introduction: 'Normalization is the process of organizing database tables to minimize redundancy and dependency, progressing through normal forms (1NF to BCNF).',
    keyConcepts: [
      { term: '1NF', explanation: 'Eliminate repeating groups — each column contains atomic (indivisible) values, each row is unique.' },
      { term: '2NF', explanation: 'Remove partial dependencies — every non-key column must depend on the entire primary key.' },
      { term: '3NF', explanation: 'Remove transitive dependencies — non-key columns must not depend on other non-key columns.' },
      { term: 'BCNF', explanation: 'Boyce-Codd Normal Form — every determinant must be a candidate key. Stricter than 3NF.' }
    ],
    analogy: 'Normalization is like organizing a messy desk — you separate papers into labeled folders (tables) so nothing is duplicated and everything has one home.',
    takeaway: 'Normalize to reduce redundancy, but don\'t over-normalize — sometimes denormalization improves read performance in practice.',
    prerequisites: ['cs_sql'], relatedTopics: ['cs_indexing', 'cs_transactions'],
    tags: ['normalization', 'database', 'normal form', 'redundancy', 'schema']
  },

  // --- Networking ---
  {
    id: 'cs_osi_model', title: 'OSI Model', category: 'Computer Science', subcategory: 'Networking', difficulty: 2,
    introduction: 'The OSI (Open Systems Interconnection) model divides network communication into 7 layers, each with a specific responsibility.',
    keyConcepts: [
      { term: 'Physical Layer', explanation: 'Transmits raw bits over a physical medium (cables, radio waves). Deals with voltages and frequencies.' },
      { term: 'Network Layer', explanation: 'Handles logical addressing (IP) and routing packets between different networks.' },
      { term: 'Transport Layer', explanation: 'Provides reliable (TCP) or fast (UDP) end-to-end data transfer between applications.' },
      { term: 'Application Layer', explanation: 'Provides network services to end-user applications (HTTP, FTP, SMTP, DNS).' }
    ],
    analogy: 'The OSI model is like sending a package — you write a letter (Application), put it in an envelope (Presentation), address it (Network), and hand it to the postal service (Physical).',
    takeaway: 'The OSI model is a conceptual framework — real networks use TCP/IP (4 layers), but OSI helps understand where each protocol fits.',
    prerequisites: [], relatedTopics: ['cs_tcp_ip', 'cs_http', 'cs_dns'],
    tags: ['osi', 'networking', 'layers', 'protocol', 'communication']
  },
  {
    id: 'cs_tcp_ip', title: 'TCP/IP Protocol', category: 'Computer Science', subcategory: 'Networking', difficulty: 2,
    introduction: 'TCP/IP is the foundational protocol suite of the internet, providing reliable, ordered data delivery between applications across networks.',
    keyConcepts: [
      { term: 'TCP (Transmission Control)', explanation: 'Connection-oriented, reliable delivery with acknowledgments, retransmission, and flow control.' },
      { term: 'IP (Internet Protocol)', explanation: 'Handles addressing and routing of packets between source and destination across networks.' },
      { term: 'Three-Way Handshake', explanation: 'TCP establishes connections with SYN → SYN-ACK → ACK. Ensures both sides are ready.' },
      { term: 'UDP Alternative', explanation: 'User Datagram Protocol — connectionless, faster but unreliable. Used for streaming, gaming, DNS.' }
    ],
    analogy: 'TCP is like registered mail — you get confirmation of delivery and items arrive in order. UDP is like shouting across a field — fast but no guarantee anyone heard.',
    takeaway: 'TCP/IP is the backbone of the internet. TCP for reliability (web, email), UDP for speed (video, gaming).',
    prerequisites: ['cs_osi_model'], relatedTopics: ['cs_http', 'cs_dns', 'cs_sockets'],
    tags: ['tcp', 'ip', 'protocol', 'networking', 'internet']
  },
  {
    id: 'cs_http', title: 'HTTP/HTTPS', category: 'Computer Science', subcategory: 'Networking', difficulty: 2,
    introduction: 'HTTP is the application-layer protocol for transferring web pages and data. HTTPS adds TLS encryption for security.',
    keyConcepts: [
      { term: 'Request-Response', explanation: 'Client sends a request (GET, POST, PUT, DELETE); server returns a response with status code and body.' },
      { term: 'Status Codes', explanation: '200 OK, 301 Redirect, 404 Not Found, 500 Server Error — communicate the result of a request.' },
      { term: 'REST Architecture', explanation: 'RESTful APIs use HTTP methods to perform CRUD operations on resources identified by URLs.' },
      { term: 'HTTPS/TLS', explanation: 'Encrypts HTTP traffic using TLS certificates, preventing eavesdropping and tampering.' }
    ],
    analogy: 'HTTP is like ordering food at a restaurant — you (client) give your order (request) to the waiter (server), who brings back your meal (response).',
    takeaway: 'Every web page, API call, and mobile app interaction uses HTTP. HTTPS should be the default for security.',
    prerequisites: ['cs_tcp_ip'], relatedTopics: ['cs_rest_api', 'cs_web_security'],
    tags: ['http', 'https', 'web', 'protocol', 'rest']
  },

  // --- AI & Machine Learning ---
  {
    id: 'cs_neural_networks', title: 'Neural Networks', category: 'Computer Science', subcategory: 'Machine Learning', difficulty: 3,
    introduction: 'Neural networks are computing systems inspired by the brain, consisting of interconnected layers of artificial neurons that learn patterns from data.',
    keyConcepts: [
      { term: 'Neurons & Layers', explanation: 'Input layer receives data, hidden layers process it, output layer produces predictions. Each neuron computes a weighted sum + activation.' },
      { term: 'Weights & Biases', explanation: 'Learnable parameters that determine the strength of connections. Training adjusts these to minimize error.' },
      { term: 'Activation Functions', explanation: 'ReLU, Sigmoid, Tanh — introduce non-linearity, allowing the network to learn complex patterns.' },
      { term: 'Backpropagation', explanation: 'Algorithm to compute gradients of the loss with respect to each weight, enabling gradient descent optimization.' }
    ],
    analogy: 'A neural network is like a team of decision-makers — each person weighs different factors, passes their opinion forward, and the group converges on a final answer through practice.',
    takeaway: 'Neural networks learn from data rather than being programmed with rules — they\'re the foundation of modern AI, from image recognition to language models.',
    prerequisites: ['math_linear_algebra', 'math_calculus'], relatedTopics: ['cs_deep_learning', 'cs_cnn', 'cs_backpropagation', 'cs_gradient_descent'],
    tags: ['neural network', 'ai', 'machine learning', 'deep learning', 'neurons']
  },
  {
    id: 'cs_deep_learning', title: 'Deep Learning', category: 'Computer Science', subcategory: 'Machine Learning', difficulty: 4,
    introduction: 'Deep learning uses neural networks with many layers (deep architectures) to automatically learn hierarchical representations from raw data.',
    keyConcepts: [
      { term: 'Deep Architectures', explanation: 'Networks with multiple hidden layers can learn increasingly abstract features — edges → shapes → objects.' },
      { term: 'CNNs', explanation: 'Convolutional Neural Networks excel at image tasks using filters that detect spatial patterns.' },
      { term: 'RNNs & Transformers', explanation: 'RNNs process sequences; Transformers use attention mechanisms for parallel processing of language.' },
      { term: 'Transfer Learning', explanation: 'Pre-train on large datasets, fine-tune on specific tasks. Saves training time and data.' }
    ],
    analogy: 'Deep learning is like learning to read — first you recognize lines, then letters, then words, then sentences. Each layer builds on the previous one.',
    takeaway: 'Deep learning has revolutionized AI — from ChatGPT to self-driving cars, it powers the most impressive AI applications today.',
    prerequisites: ['cs_neural_networks'], relatedTopics: ['cs_cnn', 'cs_transformers', 'cs_nlp_ml'],
    tags: ['deep learning', 'cnn', 'rnn', 'transformer', 'ai']
  },
  {
    id: 'cs_machine_learning', title: 'Machine Learning Fundamentals', category: 'Computer Science', subcategory: 'Machine Learning', difficulty: 3,
    introduction: 'Machine learning enables computers to learn from data without explicit programming, discovering patterns and making predictions.',
    keyConcepts: [
      { term: 'Supervised Learning', explanation: 'Train on labeled data (input-output pairs). Classification predicts categories; regression predicts numbers.' },
      { term: 'Unsupervised Learning', explanation: 'Find patterns in unlabeled data. Clustering groups similar items; dimensionality reduction simplifies data.' },
      { term: 'Overfitting vs Underfitting', explanation: 'Overfitting: model memorizes training data. Underfitting: model is too simple to capture patterns.' },
      { term: 'Train/Test Split', explanation: 'Divide data into training set (learn) and test set (evaluate). Cross-validation for robust evaluation.' }
    ],
    analogy: 'Machine learning is like teaching a child to recognize animals — show them many examples (training), and they learn to identify new animals (prediction) on their own.',
    takeaway: 'ML is about finding the right balance between learning from data and generalizing to new situations. It\'s not magic — it\'s math applied to data.',
    prerequisites: ['math_statistics', 'math_linear_algebra'], relatedTopics: ['cs_neural_networks', 'cs_deep_learning', 'cs_decision_trees'],
    tags: ['machine learning', 'supervised', 'unsupervised', 'ai', 'prediction']
  },

  // --- Web Development ---
  {
    id: 'cs_html_css', title: 'HTML & CSS', category: 'Computer Science', subcategory: 'Web Development', difficulty: 1,
    introduction: 'HTML structures web content with semantic elements; CSS controls visual presentation with styles, layouts, and responsive design.',
    keyConcepts: [
      { term: 'Semantic HTML', explanation: 'Using meaningful tags (header, nav, article, section) instead of generic divs improves accessibility and SEO.' },
      { term: 'CSS Selectors', explanation: 'Target elements by class (.btn), ID (#header), type (h1), attribute ([type="text"]), or relationship (parent > child).' },
      { term: 'Flexbox & Grid', explanation: 'Modern layout systems. Flexbox for one-dimensional; Grid for two-dimensional responsive layouts.' },
      { term: 'Responsive Design', explanation: 'Media queries adapt layouts to different screen sizes. Mobile-first approach is best practice.' }
    ],
    analogy: 'HTML is the skeleton of a house (structure), CSS is the interior design (appearance). You need both for a beautiful, functional home.',
    takeaway: 'HTML and CSS are the foundation of every website. Master semantic HTML for accessibility and CSS Grid/Flexbox for modern layouts.',
    prerequisites: [], relatedTopics: ['cs_javascript', 'cs_react', 'cs_web_accessibility'],
    tags: ['html', 'css', 'web', 'frontend', 'responsive']
  },
  {
    id: 'cs_javascript', title: 'JavaScript', category: 'Computer Science', subcategory: 'Web Development', difficulty: 2,
    introduction: 'JavaScript is the programming language of the web — it adds interactivity, handles events, manipulates the DOM, and powers both frontend and backend development.',
    keyConcepts: [
      { term: 'Event-Driven', explanation: 'Code executes in response to user actions (clicks, input) or system events (load, timer).' },
      { term: 'Async Programming', explanation: 'Promises, async/await, and callbacks handle non-blocking operations like API calls and file I/O.' },
      { term: 'DOM Manipulation', explanation: 'JavaScript can create, modify, and delete HTML elements dynamically, creating interactive UIs.' },
      { term: 'ES6+ Features', explanation: 'Arrow functions, destructuring, modules, template literals, classes, and spread operators modernize the language.' }
    ],
    analogy: 'If HTML is the house structure and CSS is the paint, JavaScript is the electricity — it makes everything interactive and alive.',
    takeaway: 'JavaScript is the most versatile language in web development — it runs in browsers, servers (Node.js), mobile apps, and even machine learning.',
    prerequisites: ['cs_html_css'], relatedTopics: ['cs_react', 'cs_node_js', 'cs_typescript'],
    tags: ['javascript', 'web', 'frontend', 'programming', 'async']
  },
  {
    id: 'cs_react', title: 'React', category: 'Computer Science', subcategory: 'Web Development', difficulty: 3,
    introduction: 'React is a JavaScript library for building user interfaces with reusable components, virtual DOM for performance, and unidirectional data flow.',
    keyConcepts: [
      { term: 'Components', explanation: 'Reusable UI building blocks. Functional components with hooks are the modern standard.' },
      { term: 'State & Props', explanation: 'State is internal mutable data; Props are external read-only data passed from parent to child.' },
      { term: 'Virtual DOM', explanation: 'React maintains a lightweight copy of the DOM, computing minimal updates for efficient rendering.' },
      { term: 'Hooks', explanation: 'useState, useEffect, useContext, useReducer — functions that let you use React features in functional components.' }
    ],
    analogy: 'React is like building with LEGO — each component (brick) is self-contained, reusable, and snaps together to create complex UIs.',
    takeaway: 'React\'s component model changed frontend development forever. Think in components, manage state carefully, and let React handle the DOM.',
    prerequisites: ['cs_javascript', 'cs_html_css'], relatedTopics: ['cs_node_js', 'cs_typescript', 'cs_redux'],
    tags: ['react', 'frontend', 'components', 'virtual dom', 'javascript']
  },
  {
    id: 'cs_node_js', title: 'Node.js', category: 'Computer Science', subcategory: 'Web Development', difficulty: 2,
    introduction: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine that enables server-side JavaScript, non-blocking I/O, and event-driven architecture.',
    keyConcepts: [
      { term: 'Event Loop', explanation: 'Single-threaded event loop handles concurrent connections without thread overhead, ideal for I/O-bound tasks.' },
      { term: 'npm Ecosystem', explanation: 'The world\'s largest package registry with over 2 million packages for every imaginable functionality.' },
      { term: 'Express Framework', explanation: 'Minimalist web framework for building REST APIs and web servers with middleware support.' },
      { term: 'Non-blocking I/O', explanation: 'File reads, database queries, and network requests don\'t block the main thread.' }
    ],
    analogy: 'Node.js is like a single waiter who\'s incredibly fast — instead of standing at one table waiting for a decision, they take orders from everyone and deliver as food is ready.',
    takeaway: 'Node.js unified frontend and backend under one language (JavaScript), transforming how web applications are built.',
    prerequisites: ['cs_javascript'], relatedTopics: ['cs_react', 'cs_rest_api', 'cs_mongodb'],
    tags: ['node', 'javascript', 'backend', 'server', 'event loop']
  },

  // --- OOP ---
  {
    id: 'cs_oop', title: 'Object-Oriented Programming', category: 'Computer Science', subcategory: 'Programming Paradigms', difficulty: 2,
    introduction: 'OOP organizes code around objects that bundle data (attributes) and behavior (methods), promoting modularity, reuse, and abstraction.',
    keyConcepts: [
      { term: 'Encapsulation', explanation: 'Bundling data and methods together, hiding internal state behind a public interface.' },
      { term: 'Inheritance', explanation: 'Creating new classes from existing ones, inheriting properties and methods. "Is-a" relationship.' },
      { term: 'Polymorphism', explanation: 'Same interface, different implementations. A Shape\'s draw() method works differently for Circle vs Rectangle.' },
      { term: 'Abstraction', explanation: 'Hiding complex implementation behind simple interfaces. Users interact with "what" not "how".' }
    ],
    analogy: 'OOP is like designing a car factory — you define a blueprint (class) with properties (color, speed) and behaviors (drive, brake), then manufacture individual cars (objects).',
    takeaway: 'OOP\'s four pillars — encapsulation, inheritance, polymorphism, abstraction — are the foundation of most modern software design.',
    prerequisites: ['cs_javascript'], relatedTopics: ['cs_design_patterns', 'cs_solid_principles'],
    tags: ['oop', 'classes', 'objects', 'inheritance', 'polymorphism']
  },
  {
    id: 'cs_design_patterns', title: 'Design Patterns', category: 'Computer Science', subcategory: 'Software Engineering', difficulty: 4,
    introduction: 'Design patterns are reusable solutions to common software design problems, categorized as creational, structural, and behavioral patterns.',
    keyConcepts: [
      { term: 'Singleton', explanation: 'Ensures only one instance of a class exists. Used for logging, database connections, configuration.' },
      { term: 'Observer', explanation: 'One-to-many dependency where dependents are notified of state changes. Event systems, pub/sub.' },
      { term: 'Factory', explanation: 'Creates objects without specifying exact class. Decouples creation from usage.' },
      { term: 'Strategy', explanation: 'Defines a family of algorithms, encapsulates each, and makes them interchangeable at runtime.' }
    ],
    analogy: 'Design patterns are like architectural blueprints — an architect doesn\'t reinvent the concept of a doorway for each building; they use proven designs.',
    takeaway: 'Patterns are tools, not rules. Know them so you can recognize when a problem fits a pattern, but don\'t force patterns where they don\'t belong.',
    prerequisites: ['cs_oop'], relatedTopics: ['cs_solid_principles', 'cs_software_architecture'],
    tags: ['design patterns', 'singleton', 'observer', 'factory', 'software engineering']
  },
  {
    id: 'cs_git', title: 'Git Version Control', category: 'Computer Science', subcategory: 'Software Engineering', difficulty: 2,
    introduction: 'Git is a distributed version control system that tracks changes to code, enables collaboration, and provides a complete history of every modification.',
    keyConcepts: [
      { term: 'Commits', explanation: 'Snapshots of your code at a point in time. Each commit has a hash, message, author, and parent.' },
      { term: 'Branches', explanation: 'Parallel lines of development. Feature branches isolate work; merging combines them.' },
      { term: 'Merge vs Rebase', explanation: 'Merge creates a merge commit preserving history. Rebase replays commits for a linear history.' },
      { term: 'Pull Requests', explanation: 'Code review mechanism on platforms like GitHub. Propose changes, get feedback, then merge.' }
    ],
    analogy: 'Git is like a time machine for your code — you can go back to any point in history, explore alternate timelines (branches), and merge the best outcomes.',
    takeaway: 'Git is non-negotiable for professional software development. Master branching and merging to collaborate effectively.',
    prerequisites: [], relatedTopics: ['cs_software_architecture'],
    tags: ['git', 'version control', 'branch', 'merge', 'collaboration']
  },
  {
    id: 'cs_time_complexity', title: 'Time Complexity & Big O', category: 'Computer Science', subcategory: 'Algorithms', difficulty: 2,
    introduction: 'Time complexity measures how an algorithm\'s runtime grows with input size, expressed using Big O notation to describe the upper bound.',
    keyConcepts: [
      { term: 'Big O Notation', explanation: 'Describes the worst-case growth rate: O(1) constant, O(log n) logarithmic, O(n) linear, O(n²) quadratic.' },
      { term: 'Common Complexities', explanation: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!). Memorize this hierarchy.' },
      { term: 'Space Complexity', explanation: 'How much extra memory an algorithm uses. In-place algorithms use O(1) additional space.' },
      { term: 'Amortized Analysis', explanation: 'Average cost per operation over a sequence. Dynamic array resizing is O(1) amortized despite occasional O(n) copies.' }
    ],
    analogy: 'Big O is like estimating travel time — O(1) is teleportation, O(log n) is a highway, O(n) is city driving, O(n²) is getting lost in every neighborhood.',
    takeaway: 'Always consider time complexity when choosing algorithms. An O(n log n) algorithm processing a million items is ~20x faster than O(n²).',
    prerequisites: ['cs_arrays'], relatedTopics: ['cs_sorting', 'cs_binary_search', 'cs_dynamic_programming'],
    tags: ['big o', 'time complexity', 'space complexity', 'algorithm analysis']
  },
  {
    id: 'cs_rest_api', title: 'REST APIs', category: 'Computer Science', subcategory: 'Web Development', difficulty: 2,
    introduction: 'REST (Representational State Transfer) is an architectural style for building APIs that use HTTP methods to perform operations on resources.',
    keyConcepts: [
      { term: 'Resources & URLs', explanation: 'Every entity is a resource identified by a URL: /users/123, /products/456.' },
      { term: 'HTTP Methods', explanation: 'GET (read), POST (create), PUT (update), DELETE (remove) map to CRUD operations.' },
      { term: 'Stateless', explanation: 'Each request contains all information needed. Server doesn\'t store client session state.' },
      { term: 'JSON Response', explanation: 'REST APIs typically return JSON data with status codes indicating success or failure.' }
    ],
    analogy: 'A REST API is like a restaurant menu — each item (resource) has a name (URL), you can order (POST), check status (GET), modify (PUT), or cancel (DELETE).',
    takeaway: 'REST APIs are the glue between frontend and backend. Master CRUD operations, status codes, and proper URL design.',
    prerequisites: ['cs_http', 'cs_javascript'], relatedTopics: ['cs_graphql', 'cs_node_js'],
    tags: ['rest', 'api', 'http', 'web', 'backend']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MATHEMATICS (30+ topics)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'math_calculus', title: 'Calculus Fundamentals', category: 'Mathematics', subcategory: 'Calculus', difficulty: 3,
    introduction: 'Calculus is the mathematics of change, providing tools to analyze rates of change (derivatives) and accumulation (integrals).',
    keyConcepts: [
      { term: 'Limits', explanation: 'The foundation of calculus — describing what a function approaches as input approaches a value.' },
      { term: 'Derivatives', explanation: 'The rate of change of a function. f\'(x) = lim(h→0) [f(x+h) - f(x)] / h' },
      { term: 'Integrals', explanation: 'The accumulation of quantities. Definite integrals compute area under a curve.' },
      { term: 'Fundamental Theorem', explanation: 'Connects derivatives and integrals — integration and differentiation are inverse operations.' }
    ],
    analogy: 'Calculus is like analyzing a road trip — the speedometer shows derivatives (rate of change), and the odometer shows integrals (total distance accumulated).',
    takeaway: 'Calculus is the language of physics, engineering, economics, and machine learning. Derivatives optimize, integrals accumulate.',
    prerequisites: ['math_algebra'], relatedTopics: ['math_differential_equations', 'math_multivariable_calculus', 'cs_gradient_descent'],
    tags: ['calculus', 'derivatives', 'integrals', 'limits', 'mathematics']
  },
  {
    id: 'math_linear_algebra', title: 'Linear Algebra', category: 'Mathematics', subcategory: 'Linear Algebra', difficulty: 3,
    introduction: 'Linear algebra studies vectors, matrices, and linear transformations — the mathematical foundation of computer graphics, ML, and quantum computing.',
    keyConcepts: [
      { term: 'Vectors', explanation: 'Ordered lists of numbers representing direction and magnitude. Can be added and scaled.' },
      { term: 'Matrices', explanation: 'Rectangular arrays of numbers representing linear transformations. Multiplication transforms vectors.' },
      { term: 'Eigenvalues/Eigenvectors', explanation: 'Special vectors that only get scaled (not rotated) by a matrix transformation. Key in PCA and stability analysis.' },
      { term: 'Matrix Operations', explanation: 'Addition, multiplication, transpose, inverse, determinant. Matrix multiplication is not commutative.' }
    ],
    analogy: 'Linear algebra is like a GPS coordinate system — vectors tell you where to go, matrices transform the entire map (rotate, scale, shear).',
    takeaway: 'Linear algebra is everywhere in modern computing — from 3D graphics to Google\'s PageRank to training neural networks.',
    prerequisites: ['math_algebra'], relatedTopics: ['cs_neural_networks', 'math_statistics', 'cs_computer_graphics'],
    tags: ['linear algebra', 'vectors', 'matrices', 'eigenvalues', 'mathematics']
  },
  {
    id: 'math_probability', title: 'Probability Theory', category: 'Mathematics', subcategory: 'Probability & Statistics', difficulty: 3,
    introduction: 'Probability quantifies uncertainty — the likelihood of events occurring, from coin flips to medical diagnoses to stock market predictions.',
    keyConcepts: [
      { term: 'Sample Space', explanation: 'The set of all possible outcomes. For a die: {1, 2, 3, 4, 5, 6}.' },
      { term: 'Conditional Probability', explanation: 'P(A|B) = P(A∩B) / P(B). The probability of A given that B has occurred.' },
      { term: 'Bayes\' Theorem', explanation: 'P(A|B) = P(B|A)·P(A) / P(B). Updates beliefs based on new evidence. Foundation of Bayesian inference.' },
      { term: 'Independence', explanation: 'Events A and B are independent if P(A∩B) = P(A)·P(B). Knowing one tells nothing about the other.' }
    ],
    analogy: 'Probability is like weather forecasting — you can\'t know exactly what will happen, but you can quantify how likely each outcome is based on evidence.',
    takeaway: 'Probability is the language of uncertainty. Bayes\' theorem is perhaps the most important formula in data science and AI.',
    prerequisites: ['math_algebra'], relatedTopics: ['math_statistics', 'math_combinatorics', 'cs_machine_learning'],
    tags: ['probability', 'bayes', 'statistics', 'uncertainty', 'mathematics']
  },
  {
    id: 'math_statistics', title: 'Statistics', category: 'Mathematics', subcategory: 'Probability & Statistics', difficulty: 2,
    introduction: 'Statistics is the science of collecting, analyzing, and interpreting data to make informed decisions under uncertainty.',
    keyConcepts: [
      { term: 'Mean, Median, Mode', explanation: 'Measures of central tendency. Mean is average, median is middle value, mode is most frequent.' },
      { term: 'Standard Deviation', explanation: 'Measures spread of data from the mean. Low SD = tightly clustered; high SD = widely spread.' },
      { term: 'Normal Distribution', explanation: 'Bell curve where 68% of data falls within 1 SD, 95% within 2 SD, 99.7% within 3 SD.' },
      { term: 'Hypothesis Testing', explanation: 'Evaluate claims about populations using sample data. P-value determines statistical significance.' }
    ],
    analogy: 'Statistics is like being a detective — you collect evidence (data), look for patterns (analysis), and draw conclusions (inference) while acknowledging uncertainty.',
    takeaway: 'Statistics helps separate signal from noise. Understanding distributions, confidence intervals, and significance testing is essential for data-driven decisions.',
    prerequisites: ['math_probability'], relatedTopics: ['cs_machine_learning', 'math_probability', 'econ_econometrics'],
    tags: ['statistics', 'mean', 'standard deviation', 'hypothesis testing', 'data']
  },
  {
    id: 'math_discrete', title: 'Discrete Mathematics', category: 'Mathematics', subcategory: 'Discrete Math', difficulty: 3,
    introduction: 'Discrete math studies mathematical structures that are countable or distinct, forming the theoretical foundation of computer science.',
    keyConcepts: [
      { term: 'Logic & Proofs', explanation: 'Propositional and predicate logic, truth tables, proof techniques (direct, contradiction, induction).' },
      { term: 'Set Theory', explanation: 'Collections of objects with operations: union, intersection, difference, complement, power set.' },
      { term: 'Graph Theory', explanation: 'Study of vertices and edges. Euler paths, Hamiltonian cycles, planarity, coloring.' },
      { term: 'Combinatorics', explanation: 'Counting techniques: permutations, combinations, pigeonhole principle, inclusion-exclusion.' }
    ],
    analogy: 'Discrete math is like digital vs analog — while calculus deals with smooth continuous curves, discrete math handles distinct, separate objects like the 1s and 0s of computing.',
    takeaway: 'Discrete math is the mathematical language of CS. Logic drives programming, graphs model networks, and combinatorics counts possibilities.',
    prerequisites: ['math_algebra'], relatedTopics: ['cs_graphs', 'cs_algorithms', 'math_combinatorics'],
    tags: ['discrete math', 'logic', 'set theory', 'graph theory', 'combinatorics']
  },
  {
    id: 'math_algebra', title: 'Algebra', category: 'Mathematics', subcategory: 'Algebra', difficulty: 1,
    introduction: 'Algebra uses symbols and letters to represent numbers and quantities in mathematical expressions and equations.',
    keyConcepts: [
      { term: 'Variables & Expressions', explanation: 'Letters represent unknown values. Expressions combine variables, numbers, and operations.' },
      { term: 'Equations & Inequalities', explanation: 'Equations state equality (2x + 3 = 7). Solving means finding values that make them true.' },
      { term: 'Functions', explanation: 'A relation mapping each input to exactly one output. f(x) = x² maps 3 to 9.' },
      { term: 'Polynomials', explanation: 'Expressions with variables raised to powers: ax² + bx + c. Quadratic formula solves degree-2.' }
    ],
    analogy: 'Algebra is like a balance scale — whatever you do to one side, you must do to the other to keep the equation balanced.',
    takeaway: 'Algebra is the gateway to all higher mathematics. Master equation solving and function thinking, and every other math topic becomes accessible.',
    prerequisites: [], relatedTopics: ['math_calculus', 'math_linear_algebra', 'math_discrete'],
    tags: ['algebra', 'equations', 'variables', 'functions', 'mathematics']
  },
  {
    id: 'math_trigonometry', title: 'Trigonometry', category: 'Mathematics', subcategory: 'Trigonometry', difficulty: 2,
    introduction: 'Trigonometry studies relationships between angles and sides of triangles, extending to periodic functions used in waves, signals, and rotations.',
    keyConcepts: [
      { term: 'Sine, Cosine, Tangent', explanation: 'Ratios of triangle sides: sin=opposite/hypotenuse, cos=adjacent/hypotenuse, tan=opposite/adjacent.' },
      { term: 'Unit Circle', explanation: 'Circle of radius 1 centered at origin. Defines trig functions for all angles, not just triangle angles.' },
      { term: 'Identities', explanation: 'sin²θ + cos²θ = 1, double angle formulas, sum/difference formulas. Essential for simplification.' },
      { term: 'Periodic Functions', explanation: 'Sine and cosine repeat every 2π. Model waves, oscillations, and cyclic phenomena.' }
    ],
    analogy: 'Trigonometry is like a Ferris wheel — as you go around (angle changes), your height (sine) and horizontal position (cosine) oscillate in smooth, predictable waves.',
    takeaway: 'Trigonometry connects geometry to algebra through functions. It\'s essential for physics, engineering, computer graphics, and signal processing.',
    prerequisites: ['math_algebra'], relatedTopics: ['math_calculus', 'phys_waves', 'cs_computer_graphics'],
    tags: ['trigonometry', 'sine', 'cosine', 'angles', 'mathematics']
  },
  {
    id: 'math_number_theory', title: 'Number Theory', category: 'Mathematics', subcategory: 'Number Theory', difficulty: 3,
    introduction: 'Number theory studies properties of integers — primes, divisibility, and modular arithmetic. It\'s the foundation of modern cryptography.',
    keyConcepts: [
      { term: 'Prime Numbers', explanation: 'Integers > 1 divisible only by 1 and themselves. The building blocks of all integers (Fundamental Theorem of Arithmetic).' },
      { term: 'Modular Arithmetic', explanation: 'Clock arithmetic: a ≡ b (mod n) means a and b have the same remainder when divided by n.' },
      { term: 'GCD & Euclidean Algorithm', explanation: 'Greatest Common Divisor found efficiently by repeated division. O(log min(a,b)).' },
      { term: 'RSA Cryptography', explanation: 'Public-key encryption based on the difficulty of factoring large numbers into primes.' }
    ],
    analogy: 'Number theory is like studying the atoms of mathematics — primes are atoms that combine (multiply) to form every molecule (composite number).',
    takeaway: 'Number theory went from "pure" math to crucial applied math. Every secure internet transaction uses number theory through RSA and elliptic curve cryptography.',
    prerequisites: ['math_algebra'], relatedTopics: ['cs_cryptography', 'math_discrete'],
    tags: ['number theory', 'primes', 'modular arithmetic', 'cryptography', 'mathematics']
  },
  {
    id: 'math_combinatorics', title: 'Combinatorics', category: 'Mathematics', subcategory: 'Discrete Math', difficulty: 3,
    introduction: 'Combinatorics is the art of counting — determining the number of ways to arrange, select, or combine objects under given constraints.',
    keyConcepts: [
      { term: 'Permutations', explanation: 'Ordered arrangements: n! / (n-r)! ways to arrange r items from n. Order matters.' },
      { term: 'Combinations', explanation: 'Unordered selections: C(n,r) = n! / (r!(n-r)!). Choosing a team from a group.' },
      { term: 'Pigeonhole Principle', explanation: 'If n+1 pigeons go into n holes, at least one hole has ≥2 pigeons. Simple but powerful proof technique.' },
      { term: 'Inclusion-Exclusion', explanation: '|A∪B| = |A| + |B| - |A∩B|. Counts unions by adding sets and subtracting overlaps.' }
    ],
    analogy: 'Combinatorics is like figuring out how many outfits you can make — 5 shirts × 3 pants × 2 shoes = 30 combinations.',
    takeaway: 'Combinatorics teaches you to count systematically. It\'s essential for probability, algorithm analysis, and competitive programming.',
    prerequisites: ['math_algebra'], relatedTopics: ['math_probability', 'math_discrete', 'cs_algorithms'],
    tags: ['combinatorics', 'permutations', 'combinations', 'counting', 'mathematics']
  },
  {
    id: 'math_differential_equations', title: 'Differential Equations', category: 'Mathematics', subcategory: 'Calculus', difficulty: 4,
    introduction: 'Differential equations relate functions to their derivatives, modeling dynamic systems like population growth, circuits, and planetary motion.',
    keyConcepts: [
      { term: 'ODE vs PDE', explanation: 'ODEs have one independent variable; PDEs have multiple. ODEs are simpler and more commonly encountered.' },
      { term: 'First-Order ODEs', explanation: 'Separable, linear, and exact equations. dy/dx = f(x,y). Solved by separation of variables or integrating factors.' },
      { term: 'Second-Order ODEs', explanation: 'Model vibrations, circuits, and mechanical systems. Characteristic equation gives solution form.' },
      { term: 'Initial Value Problems', explanation: 'Given ODE + initial condition y(0) = y₀, find the unique solution satisfying both.' }
    ],
    analogy: 'A differential equation is like a recipe that tells you how fast a cake rises at each moment — from that, you can figure out the final cake height over time.',
    takeaway: 'Differential equations describe how things change over time. Mastering them unlocks physics, engineering, biology, and economics.',
    prerequisites: ['math_calculus'], relatedTopics: ['phys_mechanics', 'phys_electromagnetism'],
    tags: ['differential equations', 'ode', 'pde', 'calculus', 'dynamics']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHYSICS (25+ topics)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'phys_newtons_laws', title: "Newton's Laws of Motion", category: 'Physics', subcategory: 'Mechanics', difficulty: 2,
    introduction: "Newton's three laws form the foundation of classical mechanics, describing how objects move and interact through forces.",
    keyConcepts: [
      { term: 'First Law (Inertia)', explanation: 'An object at rest stays at rest, in motion stays in motion, unless acted upon by an external force.' },
      { term: 'Second Law (F=ma)', explanation: 'Force equals mass times acceleration. The acceleration is directly proportional to the net force.' },
      { term: 'Third Law (Action-Reaction)', explanation: 'For every action, there is an equal and opposite reaction. Forces always come in pairs.' },
      { term: 'Applications', explanation: 'From engineering bridges to launching rockets, Newton\'s laws predict how everything moves.' }
    ],
    analogy: "Newton's laws are like the rules of a bumper car ride — cars resist changing direction (inertia), heavier cars need more force to accelerate, and every bump is felt equally by both cars.",
    takeaway: "Newton's laws are 300+ years old but still perfectly describe everyday physics. They only break down at very high speeds (relativity) or very small scales (quantum).",
    prerequisites: ['math_algebra'], relatedTopics: ['phys_kinematics', 'phys_energy', 'phys_momentum'],
    tags: ['newton', 'force', 'motion', 'mechanics', 'physics']
  },
  {
    id: 'phys_energy', title: 'Energy & Work', category: 'Physics', subcategory: 'Mechanics', difficulty: 2,
    introduction: 'Energy is the capacity to do work. The work-energy theorem and conservation of energy are among the most powerful tools in physics.',
    keyConcepts: [
      { term: 'Kinetic Energy', explanation: 'Energy of motion: KE = ½mv². Doubles when speed doubles means 4x the energy.' },
      { term: 'Potential Energy', explanation: 'Stored energy due to position: gravitational (mgh), elastic (½kx²), electric.' },
      { term: 'Conservation of Energy', explanation: 'Energy cannot be created or destroyed, only transformed. Total energy in a closed system is constant.' },
      { term: 'Work', explanation: 'W = F·d·cosθ. Work is force applied over a distance in the direction of motion.' }
    ],
    analogy: 'Energy is like money — you can earn it (do work), save it (potential energy), spend it (kinetic energy), but the total account balance never changes (conservation).',
    takeaway: 'Conservation of energy is one of the most fundamental laws in all of physics — it\'s never been violated in any experiment ever conducted.',
    prerequisites: ['phys_newtons_laws'], relatedTopics: ['phys_thermodynamics', 'phys_momentum'],
    tags: ['energy', 'work', 'conservation', 'kinetic', 'potential']
  },
  {
    id: 'phys_thermodynamics', title: 'Thermodynamics', category: 'Physics', subcategory: 'Thermodynamics', difficulty: 3,
    introduction: 'Thermodynamics studies heat, work, energy, and entropy — governing everything from engines to black holes to the arrow of time.',
    keyConcepts: [
      { term: 'Zeroth Law', explanation: 'If A is in thermal equilibrium with C, and B with C, then A is in equilibrium with B. Defines temperature.' },
      { term: 'First Law', explanation: 'Energy conservation: ΔU = Q - W. Change in internal energy = heat added minus work done.' },
      { term: 'Second Law', explanation: 'Entropy of an isolated system never decreases. Heat flows from hot to cold, never the reverse.' },
      { term: 'Entropy', explanation: 'Measure of disorder or the number of microscopic states. Always increases in isolated systems.' }
    ],
    analogy: 'Thermodynamics is like a casino — the First Law says you can\'t win more chips than exist (conservation), the Second Law says the house always wins in the long run (entropy increases).',
    takeaway: 'The Second Law of Thermodynamics defines the arrow of time and explains why perpetual motion machines are impossible.',
    prerequisites: ['phys_energy', 'math_calculus'], relatedTopics: ['phys_statistical_mechanics', 'chem_physical'],
    tags: ['thermodynamics', 'heat', 'entropy', 'energy', 'physics']
  },
  {
    id: 'phys_electromagnetism', title: 'Electromagnetism', category: 'Physics', subcategory: 'Electromagnetism', difficulty: 3,
    introduction: 'Electromagnetism unifies electricity and magnetism into one fundamental force, described by Maxwell\'s equations.',
    keyConcepts: [
      { term: "Coulomb's Law", explanation: 'Electric force between charges: F = kq₁q₂/r². Like charges repel, opposites attract.' },
      { term: 'Electric Fields', explanation: 'A field surrounding charges that exerts force on other charges. E = F/q.' },
      { term: 'Magnetic Fields', explanation: 'Created by moving charges (currents). Force on moving charge: F = qv×B.' },
      { term: "Maxwell's Equations", explanation: 'Four equations unifying electricity, magnetism, and light. Predict electromagnetic waves.' }
    ],
    analogy: 'Electric and magnetic fields are like a dance couple — a changing electric field creates a magnetic field, and vice versa, waltzing together as light.',
    takeaway: 'Electromagnetism is one of the four fundamental forces. Maxwell\'s equations predicted light is an electromagnetic wave — one of physics\' greatest unifications.',
    prerequisites: ['math_calculus', 'phys_newtons_laws'], relatedTopics: ['phys_optics', 'phys_quantum', 'phys_waves'],
    tags: ['electromagnetism', 'electric field', 'magnetic field', 'maxwell', 'physics']
  },
  {
    id: 'phys_quantum', title: 'Quantum Mechanics', category: 'Physics', subcategory: 'Modern Physics', difficulty: 5,
    introduction: 'Quantum mechanics describes the behavior of matter and energy at atomic scales, where particles exhibit wave-particle duality and exist in superpositions.',
    keyConcepts: [
      { term: 'Wave-Particle Duality', explanation: 'Particles like electrons behave as both particles and waves. The double-slit experiment demonstrates this.' },
      { term: 'Superposition', explanation: 'A quantum system can exist in multiple states simultaneously until measured (observed).' },
      { term: 'Uncertainty Principle', explanation: 'Heisenberg: you cannot simultaneously know both position and momentum with perfect precision.' },
      { term: 'Schrödinger Equation', explanation: 'The fundamental equation of QM describing how quantum states evolve over time.' }
    ],
    analogy: "Quantum mechanics is like a coin spinning in the air — it's neither heads nor tails until it lands (is measured), existing in a superposition of both states.",
    takeaway: 'Quantum mechanics is the most precisely tested theory in physics. It\'s counterintuitive, but it works — powering lasers, semiconductors, and quantum computers.',
    prerequisites: ['phys_electromagnetism', 'math_linear_algebra', 'math_differential_equations'],
    relatedTopics: ['phys_particle_physics', 'phys_quantum_computing'],
    tags: ['quantum', 'superposition', 'wave-particle', 'uncertainty', 'physics']
  },
  {
    id: 'phys_relativity', title: 'Special Relativity', category: 'Physics', subcategory: 'Modern Physics', difficulty: 4,
    introduction: "Einstein's special relativity shows that space and time are interwoven (spacetime), and the speed of light is constant for all observers.",
    keyConcepts: [
      { term: 'Constant Speed of Light', explanation: 'Light travels at c ≈ 3×10⁸ m/s in vacuum, regardless of the observer\'s motion.' },
      { term: 'Time Dilation', explanation: 'Moving clocks tick slower: t\' = t/√(1-v²/c²). Proven by GPS satellites and particle accelerators.' },
      { term: 'Length Contraction', explanation: 'Moving objects appear shorter in the direction of motion: L\' = L√(1-v²/c²).' },
      { term: 'E = mc²', explanation: 'Mass and energy are equivalent. A small amount of mass contains enormous energy.' }
    ],
    analogy: 'Special relativity is like watching a train pass — from the train, you\'re still; from the platform, you\'re moving. Both are equally valid perspectives, and light speed resolves the contradiction.',
    takeaway: 'E = mc² is the most famous equation in physics. Relativity shows our everyday intuitions about space and time break down at high speeds.',
    prerequisites: ['phys_newtons_laws', 'math_calculus'], relatedTopics: ['phys_general_relativity', 'phys_quantum'],
    tags: ['relativity', 'einstein', 'spacetime', 'e=mc2', 'physics']
  },
  {
    id: 'phys_waves', title: 'Waves & Oscillations', category: 'Physics', subcategory: 'Waves', difficulty: 2,
    introduction: 'Waves transfer energy through oscillations without transferring matter. They describe sound, light, water waves, and quantum particles.',
    keyConcepts: [
      { term: 'Transverse vs Longitudinal', explanation: 'Transverse: oscillation perpendicular to travel (light). Longitudinal: parallel to travel (sound).' },
      { term: 'Wavelength, Frequency, Speed', explanation: 'v = fλ. Speed equals frequency times wavelength. Higher frequency = shorter wavelength.' },
      { term: 'Interference', explanation: 'Constructive (waves add) and destructive (waves cancel) interference create patterns.' },
      { term: 'Standing Waves', explanation: 'Two waves traveling in opposite directions create stationary patterns with nodes and antinodes.' }
    ],
    analogy: 'A wave is like "the wave" in a stadium — energy travels around the arena, but each person stays in their seat. Information moves, matter doesn\'t.',
    takeaway: 'Waves are everywhere — sound, light, WiFi, earthquakes, and even matter at quantum scales. Understanding waves unlocks much of physics.',
    prerequisites: ['math_trigonometry'], relatedTopics: ['phys_optics', 'phys_electromagnetism', 'phys_quantum'],
    tags: ['waves', 'oscillation', 'frequency', 'interference', 'physics']
  },
  {
    id: 'phys_optics', title: 'Optics', category: 'Physics', subcategory: 'Optics', difficulty: 2,
    introduction: 'Optics studies light behavior — how it reflects, refracts, diffracts, and interferes — enabling everything from eyeglasses to fiber optics to lasers.',
    keyConcepts: [
      { term: 'Reflection', explanation: 'Light bounces off surfaces. Angle of incidence equals angle of reflection.' },
      { term: 'Refraction', explanation: 'Light bends when passing between media of different densities. Snell\'s law: n₁sinθ₁ = n₂sinθ₂.' },
      { term: 'Diffraction', explanation: 'Light bends around obstacles and spreads through narrow openings. Explains why CDs show rainbows.' },
      { term: 'Lenses & Mirrors', explanation: 'Convex lenses converge light (magnifying glass); concave mirrors focus light (telescope reflectors).' }
    ],
    analogy: 'Refraction is like a marching band turning on a field — the side that hits soft ground (denser medium) slows down first, causing the whole band to change direction.',
    takeaway: 'Optics connects wave physics to everyday technology — cameras, fiber optics, lasers, and our own eyes all work on these principles.',
    prerequisites: ['phys_waves'], relatedTopics: ['phys_electromagnetism', 'phys_quantum'],
    tags: ['optics', 'light', 'refraction', 'reflection', 'physics']
  },
  {
    id: 'phys_kinematics', title: 'Kinematics', category: 'Physics', subcategory: 'Mechanics', difficulty: 1,
    introduction: 'Kinematics describes motion — position, velocity, and acceleration — without considering the forces that cause it.',
    keyConcepts: [
      { term: 'Displacement vs Distance', explanation: 'Displacement is shortest path (vector); distance is total path length (scalar).' },
      { term: 'Velocity vs Speed', explanation: 'Velocity has direction (vector); speed is magnitude only. Average velocity = displacement/time.' },
      { term: 'SUVAT Equations', explanation: 'Five kinematic equations relating s (displacement), u (initial velocity), v (final velocity), a (acceleration), t (time).' },
      { term: 'Projectile Motion', explanation: 'Two-dimensional motion under gravity. Horizontal: constant velocity. Vertical: constant acceleration (g).' }
    ],
    analogy: 'Kinematics is like analyzing a sports replay — you measure positions at different times to calculate speed and acceleration, without worrying about why the player moved that way.',
    takeaway: 'Kinematics gives you the mathematical tools to describe any motion. Master the SUVAT equations and you can solve most mechanics problems.',
    prerequisites: ['math_algebra'], relatedTopics: ['phys_newtons_laws', 'phys_energy'],
    tags: ['kinematics', 'motion', 'velocity', 'acceleration', 'physics']
  },
  {
    id: 'phys_momentum', title: 'Momentum & Collisions', category: 'Physics', subcategory: 'Mechanics', difficulty: 2,
    introduction: 'Momentum (p = mv) is a measure of moving mass. Conservation of momentum governs collisions, explosions, and rocket propulsion.',
    keyConcepts: [
      { term: 'Linear Momentum', explanation: 'p = mv. Momentum is a vector quantity — it has both magnitude and direction.' },
      { term: 'Conservation', explanation: 'In a closed system, total momentum before = total momentum after. No external forces needed.' },
      { term: 'Elastic vs Inelastic', explanation: 'Elastic: kinetic energy conserved (billiard balls). Inelastic: KE lost to heat/deformation (car crashes).' },
      { term: 'Impulse', explanation: 'J = FΔt = Δp. Impulse equals change in momentum. Airbags extend Δt to reduce force.' }
    ],
    analogy: 'Momentum is like a freight train — a heavy train going slowly has the same momentum as a light car going very fast. Both are equally hard to stop.',
    takeaway: 'Conservation of momentum is as fundamental as conservation of energy. It explains everything from Newton\'s cradle to rocket propulsion.',
    prerequisites: ['phys_newtons_laws'], relatedTopics: ['phys_energy', 'phys_rotational_motion'],
    tags: ['momentum', 'collision', 'conservation', 'impulse', 'physics']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHEMISTRY (20+ topics)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'chem_atomic_structure', title: 'Atomic Structure', category: 'Chemistry', subcategory: 'General Chemistry', difficulty: 2,
    introduction: 'Atoms are the building blocks of matter, consisting of a nucleus (protons + neutrons) surrounded by an electron cloud.',
    keyConcepts: [
      { term: 'Protons & Neutrons', explanation: 'Protons (+) determine the element (atomic number). Neutrons (neutral) add mass. Together they form the nucleus.' },
      { term: 'Electron Configuration', explanation: 'Electrons fill orbitals in order: 1s, 2s, 2p, 3s, 3p, 4s, 3d... Following aufbau principle and Hund\'s rule.' },
      { term: 'Quantum Numbers', explanation: 'n (shell), l (subshell shape), ml (orbital orientation), ms (spin). Uniquely describe each electron.' },
      { term: 'Valence Electrons', explanation: 'Outermost electrons that participate in bonding. Determine chemical properties and reactivity.' }
    ],
    analogy: 'An atom is like a tiny solar system — the nucleus is the sun (heavy center), and electrons orbit like planets at specific energy levels.',
    takeaway: 'The arrangement of electrons determines everything about an element\'s chemistry — its reactivity, bonding, color, and properties.',
    prerequisites: [], relatedTopics: ['chem_periodic_table', 'chem_chemical_bonding', 'phys_quantum'],
    tags: ['atom', 'electron', 'nucleus', 'orbital', 'chemistry']
  },
  {
    id: 'chem_periodic_table', title: 'Periodic Table', category: 'Chemistry', subcategory: 'General Chemistry', difficulty: 1,
    introduction: 'The periodic table organizes all known elements by atomic number, revealing periodic trends in properties like reactivity, size, and electronegativity.',
    keyConcepts: [
      { term: 'Periods & Groups', explanation: 'Periods (rows) represent energy levels. Groups (columns) share similar chemical properties.' },
      { term: 'Electronegativity', explanation: 'Tendency to attract bonding electrons. Increases right and up. Fluorine is most electronegative.' },
      { term: 'Atomic Radius', explanation: 'Size of atom. Increases down a group (more shells) and left across a period (less nuclear pull).' },
      { term: 'Ionization Energy', explanation: 'Energy to remove an electron. Increases right and up. Noble gases have highest.' }
    ],
    analogy: 'The periodic table is like a seating chart where everyone in the same column has similar personalities (properties), and each row adds another layer of complexity.',
    takeaway: 'Mendeleev predicted undiscovered elements using the periodic table. It\'s one of the most elegant organizational systems in all of science.',
    prerequisites: ['chem_atomic_structure'], relatedTopics: ['chem_chemical_bonding', 'chem_reactions'],
    tags: ['periodic table', 'elements', 'electronegativity', 'trends', 'chemistry']
  },
  {
    id: 'chem_chemical_bonding', title: 'Chemical Bonding', category: 'Chemistry', subcategory: 'General Chemistry', difficulty: 2,
    introduction: 'Chemical bonds are the forces holding atoms together in molecules. The three main types — ionic, covalent, and metallic — determine material properties.',
    keyConcepts: [
      { term: 'Ionic Bonds', explanation: 'Electrons transferred from metal to non-metal. Creates ions held by electrostatic attraction. Example: NaCl.' },
      { term: 'Covalent Bonds', explanation: 'Electrons shared between non-metals. Single, double, or triple bonds. Example: H₂O, O₂.' },
      { term: 'Metallic Bonds', explanation: 'Electrons delocalized in a "sea" shared by all metal atoms. Explains conductivity and malleability.' },
      { term: 'Lewis Structures', explanation: 'Dot diagrams showing valence electrons and bonds. Follow the octet rule for main-group elements.' }
    ],
    analogy: 'Ionic bonds are like adoption (one atom takes the electron), covalent bonds are like sharing a pizza (both atoms share electrons), and metallic bonds are like a communal pool (everyone shares).',
    takeaway: 'The type of bonding determines everything — melting point, conductivity, hardness, solubility. Understanding bonds is understanding materials.',
    prerequisites: ['chem_atomic_structure', 'chem_periodic_table'], relatedTopics: ['chem_molecular_geometry', 'chem_organic'],
    tags: ['bonding', 'ionic', 'covalent', 'metallic', 'chemistry']
  },
  {
    id: 'chem_organic', title: 'Organic Chemistry', category: 'Chemistry', subcategory: 'Organic Chemistry', difficulty: 3,
    introduction: 'Organic chemistry studies carbon-based compounds and their reactions — the chemistry of life, drugs, plastics, and fuels.',
    keyConcepts: [
      { term: 'Functional Groups', explanation: 'Groups that determine reactivity: -OH (alcohol), -COOH (carboxylic acid), -NH₂ (amine), C=O (carbonyl).' },
      { term: 'Hydrocarbons', explanation: 'Chains of carbon and hydrogen. Alkanes (single bonds), alkenes (double), alkynes (triple).' },
      { term: 'Isomers', explanation: 'Same molecular formula, different structures. Structural isomers differ in connectivity; stereoisomers differ in spatial arrangement.' },
      { term: 'Reaction Mechanisms', explanation: 'Step-by-step electron movement: substitution (SN1, SN2), elimination (E1, E2), addition reactions.' }
    ],
    analogy: 'Organic molecules are like LEGO chains — carbon is the universal connector piece, snapping together in endless combinations. Functional groups are the special pieces that add superpowers.',
    takeaway: 'Carbon\'s ability to form 4 bonds and chain with itself creates essentially infinite molecular diversity — that\'s why life is carbon-based.',
    prerequisites: ['chem_chemical_bonding'], relatedTopics: ['chem_biochemistry', 'bio_proteins'],
    tags: ['organic', 'carbon', 'functional groups', 'hydrocarbons', 'chemistry']
  },
  {
    id: 'chem_reactions', title: 'Chemical Reactions', category: 'Chemistry', subcategory: 'General Chemistry', difficulty: 2,
    introduction: 'Chemical reactions transform reactants into products by breaking and forming chemical bonds, governed by conservation of mass and energy.',
    keyConcepts: [
      { term: 'Balancing Equations', explanation: 'Same number of each atom on both sides. Conservation of mass — matter cannot be created or destroyed.' },
      { term: 'Reaction Types', explanation: 'Synthesis (A+B→AB), Decomposition (AB→A+B), Single replacement, Double replacement, Combustion.' },
      { term: 'Stoichiometry', explanation: 'Quantitative relationships between reactants and products using mole ratios from balanced equations.' },
      { term: 'Equilibrium', explanation: 'Dynamic state where forward and reverse reaction rates are equal. Le Chatelier\'s principle predicts shifts.' }
    ],
    analogy: 'A chemical reaction is like rearranging LEGO pieces — you break apart old structures (reactants) and snap together new ones (products), using the same bricks.',
    takeaway: 'Chemical reactions follow strict rules — conservation of mass, energy, and charge. Mastering stoichiometry is mastering the quantitative side of chemistry.',
    prerequisites: ['chem_chemical_bonding'], relatedTopics: ['chem_thermochemistry', 'chem_kinetics', 'chem_equilibrium'],
    tags: ['reactions', 'stoichiometry', 'equilibrium', 'balancing', 'chemistry']
  },
  {
    id: 'chem_acids_bases', title: 'Acids and Bases', category: 'Chemistry', subcategory: 'General Chemistry', difficulty: 2,
    introduction: 'Acids donate protons (H⁺), bases accept them. pH measures acidity on a 0-14 scale, with 7 being neutral.',
    keyConcepts: [
      { term: 'Brønsted-Lowry', explanation: 'Acid = proton donor, Base = proton acceptor. HCl donates H⁺ to water; NH₃ accepts H⁺ from water.' },
      { term: 'pH Scale', explanation: 'pH = -log[H⁺]. pH 0-6 acidic, 7 neutral, 8-14 basic. Each unit is 10x difference in H⁺ concentration.' },
      { term: 'Strong vs Weak', explanation: 'Strong acids/bases fully dissociate (HCl, NaOH). Weak partially dissociate (CH₃COOH, NH₃).' },
      { term: 'Buffers', explanation: 'Solutions that resist pH changes. Made from weak acid + conjugate base. Essential in biology (blood pH ~7.4).' }
    ],
    analogy: 'Acids and bases are like hot and cold water — mixing them neutralizes the extremes, and the pH scale is your thermometer.',
    takeaway: 'Acid-base chemistry is fundamental to biology (enzymes work at specific pH), industry (manufacturing), and everyday life (cooking, cleaning).',
    prerequisites: ['chem_reactions'], relatedTopics: ['chem_equilibrium', 'bio_biochemistry'],
    tags: ['acids', 'bases', 'ph', 'buffer', 'chemistry']
  },
  {
    id: 'chem_physical', title: 'Physical Chemistry', category: 'Chemistry', subcategory: 'Physical Chemistry', difficulty: 4,
    introduction: 'Physical chemistry applies physics principles to chemical systems — studying thermodynamics, kinetics, and quantum chemistry.',
    keyConcepts: [
      { term: 'Chemical Thermodynamics', explanation: 'Enthalpy (ΔH), entropy (ΔS), Gibbs free energy (ΔG = ΔH - TΔS). ΔG < 0 means spontaneous.' },
      { term: 'Reaction Kinetics', explanation: 'Study of reaction rates. Rate laws, rate constants, activation energy, Arrhenius equation.' },
      { term: 'Quantum Chemistry', explanation: 'Applying quantum mechanics to chemical bonding. Molecular orbital theory, electron density calculations.' },
      { term: 'Phase Diagrams', explanation: 'Maps of temperature vs pressure showing solid, liquid, gas phases and transition boundaries.' }
    ],
    analogy: 'Physical chemistry is the engineering department of chemistry — it doesn\'t just describe what happens, it explains why and predicts how fast.',
    takeaway: 'Physical chemistry bridges chemistry and physics. Understanding thermodynamics and kinetics lets you predict whether a reaction will happen and how fast.',
    prerequisites: ['chem_reactions', 'phys_thermodynamics', 'math_calculus'], relatedTopics: ['chem_equilibrium'],
    tags: ['physical chemistry', 'thermodynamics', 'kinetics', 'quantum', 'chemistry']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BIOLOGY (20+ topics)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'bio_cell_biology', title: 'Cell Biology', category: 'Biology', subcategory: 'Cell Biology', difficulty: 2,
    introduction: 'The cell is the fundamental unit of life. Understanding cell structure and function is the foundation of all biology.',
    keyConcepts: [
      { term: 'Cell Membrane', explanation: 'Phospholipid bilayer that controls what enters and exits the cell. Selectively permeable.' },
      { term: 'Nucleus', explanation: 'Contains DNA organized into chromosomes. The "control center" directing protein synthesis.' },
      { term: 'Mitochondria', explanation: 'The "powerhouse" — generates ATP through cellular respiration (aerobic metabolism).' },
      { term: 'Prokaryote vs Eukaryote', explanation: 'Prokaryotes lack a nucleus (bacteria). Eukaryotes have membrane-bound organelles (plants, animals).' }
    ],
    analogy: 'A cell is like a factory — the nucleus is the manager\'s office (instructions), mitochondria are power plants (energy), ribosomes are assembly lines (protein production).',
    takeaway: 'Every living organism is made of cells. Understanding the cell is understanding the basic unit of life itself.',
    prerequisites: [], relatedTopics: ['bio_genetics', 'bio_dna', 'bio_mitosis', 'bio_photosynthesis'],
    tags: ['cell', 'biology', 'organelle', 'membrane', 'eukaryote']
  },
  {
    id: 'bio_dna', title: 'DNA & Replication', category: 'Biology', subcategory: 'Molecular Biology', difficulty: 3,
    introduction: 'DNA (deoxyribonucleic acid) is the molecule of heredity — a double helix storing genetic instructions that are copied during cell division.',
    keyConcepts: [
      { term: 'Double Helix', explanation: 'Two complementary strands wound together. Sugar-phosphate backbone with nitrogenous base rungs.' },
      { term: 'Base Pairing', explanation: 'Adenine pairs with Thymine (A-T), Guanine pairs with Cytosine (G-C). Hydrogen bonds hold pairs together.' },
      { term: 'Replication', explanation: 'Semi-conservative: each strand serves as template for a new complementary strand. DNA polymerase builds 5\'→3\'.' },
      { term: 'Genes', explanation: 'Segments of DNA encoding proteins. Human genome has ~20,000 protein-coding genes across 23 chromosome pairs.' }
    ],
    analogy: 'DNA is like a twisted ladder — the sides are sugar-phosphate (structural), and the rungs are base pairs (information). Unzip it to copy the information.',
    takeaway: 'DNA is the language of life — just 4 letters (A, T, G, C) encode all the instructions needed to build any living organism.',
    prerequisites: ['bio_cell_biology'], relatedTopics: ['bio_protein_synthesis', 'bio_genetics', 'bio_mutations'],
    tags: ['dna', 'replication', 'genetics', 'double helix', 'biology']
  },
  {
    id: 'bio_genetics', title: 'Genetics & Heredity', category: 'Biology', subcategory: 'Genetics', difficulty: 3,
    introduction: 'Genetics studies how traits are inherited from parents to offspring through genes, following patterns discovered by Gregor Mendel.',
    keyConcepts: [
      { term: 'Dominant & Recessive', explanation: 'Dominant alleles mask recessive ones. Aa appears the same as AA (dominant phenotype).' },
      { term: 'Punnett Squares', explanation: 'Grid tool predicting offspring genotype ratios. Cross Aa × Aa → 1 AA : 2 Aa : 1 aa.' },
      { term: 'Genotype vs Phenotype', explanation: 'Genotype is genetic makeup (Aa). Phenotype is observable trait (tall, blue-eyed).' },
      { term: 'Mendel\'s Laws', explanation: 'Law of segregation (alleles separate) and independent assortment (genes on different chromosomes sort independently).' }
    ],
    analogy: 'Genetics is like a recipe book — you inherit one copy from each parent, and the dominant "recipe" is the one that gets cooked (expressed).',
    takeaway: 'Mendel\'s laws explain why you look like your parents but not exactly like either one. Genetics is the foundation of medicine, agriculture, and forensics.',
    prerequisites: ['bio_dna'], relatedTopics: ['bio_evolution', 'bio_mutations', 'bio_gene_expression'],
    tags: ['genetics', 'heredity', 'mendel', 'alleles', 'biology']
  },
  {
    id: 'bio_evolution', title: 'Evolution & Natural Selection', category: 'Biology', subcategory: 'Evolution', difficulty: 3,
    introduction: 'Evolution is the change in inherited traits of populations over generations, driven primarily by natural selection.',
    keyConcepts: [
      { term: 'Natural Selection', explanation: 'Organisms with favorable traits survive and reproduce more. "Survival of the fittest" in a specific environment.' },
      { term: 'Variation', explanation: 'Genetic differences within populations. Mutations, recombination, and gene flow create variation.' },
      { term: 'Speciation', explanation: 'Formation of new species when populations are reproductively isolated and diverge genetically.' },
      { term: 'Evidence', explanation: 'Fossils, DNA comparisons, homologous structures, embryology, and direct observation of microevolution.' }
    ],
    analogy: 'Evolution is like a river slowly carving a canyon — imperceptible in a human lifetime, but over millions of years, it reshapes the entire landscape of life.',
    takeaway: 'Evolution by natural selection is the unifying theory of biology — it explains the diversity of life, from bacteria to blue whales, through one elegant mechanism.',
    prerequisites: ['bio_genetics'], relatedTopics: ['bio_ecology', 'bio_taxonomy'],
    tags: ['evolution', 'natural selection', 'darwin', 'speciation', 'biology']
  },
  {
    id: 'bio_ecology', title: 'Ecology', category: 'Biology', subcategory: 'Ecology', difficulty: 2,
    introduction: 'Ecology studies interactions between organisms and their environment — from individual organisms to global ecosystems.',
    keyConcepts: [
      { term: 'Food Chains & Webs', explanation: 'Energy flows from producers (plants) → primary consumers (herbivores) → secondary consumers (carnivores) → decomposers.' },
      { term: 'Ecosystems', explanation: 'Communities of organisms interacting with their physical environment. Include biotic (living) and abiotic (non-living) factors.' },
      { term: 'Population Dynamics', explanation: 'Birth rates, death rates, carrying capacity, and growth models (exponential vs logistic).' },
      { term: 'Biodiversity', explanation: 'Variety of life at genetic, species, and ecosystem levels. Higher biodiversity = more resilient ecosystems.' }
    ],
    analogy: 'An ecosystem is like a complex web of dominoes — remove one species, and the effects ripple through the entire system in unexpected ways.',
    takeaway: 'Ecology teaches us that everything is connected. Understanding ecosystems is crucial for conservation, sustainability, and our own survival.',
    prerequisites: ['bio_evolution'], relatedTopics: ['bio_conservation', 'bio_biomes'],
    tags: ['ecology', 'ecosystem', 'food chain', 'biodiversity', 'biology']
  },
  {
    id: 'bio_photosynthesis', title: 'Photosynthesis', category: 'Biology', subcategory: 'Biochemistry', difficulty: 2,
    introduction: 'Photosynthesis converts light energy, CO₂, and water into glucose and oxygen — the process that sustains nearly all life on Earth.',
    keyConcepts: [
      { term: 'Light Reactions', explanation: 'In thylakoid membranes: water is split, O₂ released, ATP and NADPH produced using light energy.' },
      { term: 'Calvin Cycle', explanation: 'In stroma: CO₂ is fixed into glucose using ATP and NADPH from light reactions. "Dark reactions" (don\'t need light directly).' },
      { term: 'Chlorophyll', explanation: 'Green pigment that absorbs red and blue light, reflects green. Located in chloroplasts.' },
      { term: 'Overall Equation', explanation: '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Carbon dioxide + water + light → sugar + oxygen.' }
    ],
    analogy: 'Photosynthesis is like a solar-powered factory — sunlight (energy) powers machines (chloroplasts) that convert raw materials (CO₂ + H₂O) into products (glucose + O₂).',
    takeaway: 'Photosynthesis is the foundation of almost all food chains. Without it, there would be no oxygen and no food for most life on Earth.',
    prerequisites: ['bio_cell_biology'], relatedTopics: ['bio_cellular_respiration', 'chem_reactions'],
    tags: ['photosynthesis', 'chlorophyll', 'glucose', 'oxygen', 'biology']
  },
  {
    id: 'bio_protein_synthesis', title: 'Protein Synthesis', category: 'Biology', subcategory: 'Molecular Biology', difficulty: 3,
    introduction: 'Protein synthesis is the two-step process (transcription → translation) by which cells build proteins according to the instructions in DNA.',
    keyConcepts: [
      { term: 'Transcription', explanation: 'DNA → mRNA in the nucleus. RNA polymerase reads the template strand and builds a complementary mRNA.' },
      { term: 'Translation', explanation: 'mRNA → Protein at ribosomes. tRNA brings amino acids; codons (3-base sequences) specify which amino acid.' },
      { term: 'Codons', explanation: '64 codons encode 20 amino acids + stop signals. AUG is both start codon and methionine.' },
      { term: 'Central Dogma', explanation: 'DNA → RNA → Protein. Information flows in one direction (with exceptions like reverse transcriptase).' }
    ],
    analogy: 'Protein synthesis is like building from blueprints — DNA is the master plan (stays in the office/nucleus), mRNA is the photocopy (goes to the construction site/ribosome), and the protein is the finished building.',
    takeaway: 'The central dogma (DNA→RNA→Protein) is biology\'s most important information flow. Understanding it unlocks genetics, medicine, and biotechnology.',
    prerequisites: ['bio_dna', 'bio_cell_biology'], relatedTopics: ['bio_genetics', 'bio_mutations'],
    tags: ['protein synthesis', 'transcription', 'translation', 'codon', 'biology']
  },
  {
    id: 'bio_mitosis', title: 'Cell Division (Mitosis)', category: 'Biology', subcategory: 'Cell Biology', difficulty: 2,
    introduction: 'Mitosis is the process by which a cell divides to produce two genetically identical daughter cells, essential for growth and repair.',
    keyConcepts: [
      { term: 'Phases', explanation: 'Prophase (chromosomes condense) → Metaphase (align at center) → Anaphase (separate) → Telophase (reform nuclei).' },
      { term: 'Interphase', explanation: 'Before division: cell grows (G1), replicates DNA (S phase), and prepares (G2). Cell spends ~90% of time here.' },
      { term: 'Cytokinesis', explanation: 'Physical division of cytoplasm after nuclear division. Cleavage furrow in animals, cell plate in plants.' },
      { term: 'Cell Cycle Control', explanation: 'Checkpoints ensure proper DNA replication and division. Failure leads to cancer.' }
    ],
    analogy: 'Mitosis is like photocopying a book — you duplicate every page (DNA replication), then split the copies into two identical binders (daughter cells).',
    takeaway: 'Mitosis is how your body grows and repairs itself. When it goes wrong (uncontrolled division), the result is cancer.',
    prerequisites: ['bio_cell_biology', 'bio_dna'], relatedTopics: ['bio_meiosis', 'bio_genetics'],
    tags: ['mitosis', 'cell division', 'cell cycle', 'chromosomes', 'biology']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HISTORY (15+ topics)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'hist_world_war_1', title: 'World War I', category: 'History', subcategory: 'Modern History', difficulty: 2,
    introduction: 'World War I (1914-1918) was a global conflict triggered by the assassination of Archduke Franz Ferdinand, reshaping the political map of Europe.',
    keyConcepts: [
      { term: 'Causes (MAIN)', explanation: 'Militarism, Alliances, Imperialism, Nationalism — interconnected tensions that turned a regional crisis into a world war.' },
      { term: 'Trench Warfare', explanation: 'Static warfare with opposing trenches. Brutal conditions, machine guns, and poison gas defined the Western Front.' },
      { term: 'Major Powers', explanation: 'Central Powers (Germany, Austria-Hungary, Ottoman) vs Allied Powers (Britain, France, Russia, later USA).' },
      { term: 'Treaty of Versailles', explanation: 'Imposed harsh reparations on Germany, redrew borders, created League of Nations. Seeds of WWII.' }
    ],
    analogy: 'WWI was like a bar fight where everyone\'s buddy pacts dragged the whole town into it — one incident escalated because of complex alliance systems.',
    takeaway: 'WWI shattered the old European order, killed 17 million, and the harsh peace treaty directly set the stage for World War II just 20 years later.',
    prerequisites: [], relatedTopics: ['hist_world_war_2', 'hist_russian_revolution'],
    tags: ['world war 1', 'ww1', 'trench warfare', 'versailles', 'history']
  },
  {
    id: 'hist_world_war_2', title: 'World War II', category: 'History', subcategory: 'Modern History', difficulty: 2,
    introduction: 'World War II (1939-1945) was the deadliest conflict in history, involving most of the world\'s nations in a struggle against Axis fascism.',
    keyConcepts: [
      { term: 'Rise of Fascism', explanation: 'Hitler (Germany), Mussolini (Italy), and Imperial Japan built authoritarian regimes driven by nationalism and expansionism.' },
      { term: 'Major Theaters', explanation: 'European Theater (D-Day, Stalingrad, Battle of Britain) and Pacific Theater (Pearl Harbor, Midway, Hiroshima).' },
      { term: 'The Holocaust', explanation: 'Systematic genocide of 6 million Jews and millions of others by Nazi Germany. History\'s greatest atrocity.' },
      { term: 'Aftermath', explanation: 'United Nations created, Cold War began, decolonization accelerated, nuclear age started.' }
    ],
    analogy: 'WWII was like a global forest fire — started by the unresolved sparks of WWI (Treaty of Versailles), fueled by economic desperation and fascist ideology.',
    takeaway: 'WWII killed 70-85 million people and fundamentally reshaped the world order. Its lessons about the dangers of unchecked authoritarianism remain vital.',
    prerequisites: ['hist_world_war_1'], relatedTopics: ['hist_cold_war', 'hist_indian_independence'],
    tags: ['world war 2', 'ww2', 'holocaust', 'fascism', 'history']
  },
  {
    id: 'hist_cold_war', title: 'The Cold War', category: 'History', subcategory: 'Modern History', difficulty: 3,
    introduction: 'The Cold War (1947-1991) was a geopolitical rivalry between the US and Soviet Union, fought through proxy wars, nuclear brinkmanship, and ideology.',
    keyConcepts: [
      { term: 'Iron Curtain', explanation: 'Division of Europe into Western (capitalist/democratic) and Eastern (communist/Soviet) blocs.' },
      { term: 'Nuclear Arms Race', explanation: 'Both superpowers built massive nuclear arsenals. MAD (Mutually Assured Destruction) prevented direct war.' },
      { term: 'Proxy Wars', explanation: 'Korea, Vietnam, Afghanistan — superpowers fought indirectly through allied states and guerrilla groups.' },
      { term: 'Space Race', explanation: 'Competition in space exploration: Sputnik (1957), Moon landing (1969). Drove technological innovation.' }
    ],
    analogy: 'The Cold War was like two neighbors who hated each other but couldn\'t fight directly (nuclear weapons), so they competed in everything else — sports, space, and supporting opposite sides in other people\'s conflicts.',
    takeaway: 'The Cold War shaped the modern world — NATO, the EU, nuclear policy, and global alliances all trace back to this 44-year standoff.',
    prerequisites: ['hist_world_war_2'], relatedTopics: ['hist_fall_of_ussr'],
    tags: ['cold war', 'usa', 'soviet union', 'nuclear', 'history']
  },
  {
    id: 'hist_indian_independence', title: 'Indian Independence Movement', category: 'History', subcategory: 'Indian History', difficulty: 2,
    introduction: 'India\'s independence movement (1857-1947) was a mass struggle against British colonial rule, led by figures like Gandhi and Nehru.',
    keyConcepts: [
      { term: 'Non-Violent Resistance', explanation: 'Gandhi\'s satyagraha — civil disobedience, non-cooperation, and peaceful protest as tools for political change.' },
      { term: 'Key Movements', explanation: 'Non-Cooperation (1920), Salt March (1930), Quit India (1942). Each escalated pressure on British rule.' },
      { term: 'Partition', explanation: 'Independence came with the traumatic partition into India and Pakistan (1947), causing mass displacement and violence.' },
      { term: 'Constitutional Foundation', explanation: 'Nehru became first PM, Ambedkar drafted the Constitution. World\'s largest democracy established.' }
    ],
    analogy: 'India\'s freedom struggle was like water wearing down a rock — persistent, non-violent pressure over decades eventually broke the mighty British Empire\'s grip.',
    takeaway: 'India\'s independence proved that non-violent mass movements can defeat empires. It inspired civil rights movements worldwide, from MLK to Mandela.',
    prerequisites: [], relatedTopics: ['hist_world_war_2', 'hist_ancient_india'],
    tags: ['india', 'independence', 'gandhi', 'partition', 'history']
  },
  {
    id: 'hist_ancient_civilizations', title: 'Ancient Civilizations', category: 'History', subcategory: 'Ancient History', difficulty: 2,
    introduction: 'The great ancient civilizations — Mesopotamia, Egypt, Indus Valley, China — independently invented writing, agriculture, and organized government.',
    keyConcepts: [
      { term: 'Mesopotamia', explanation: 'Between Tigris & Euphrates rivers. Invented writing (cuneiform), the wheel, and the first legal code (Hammurabi).' },
      { term: 'Ancient Egypt', explanation: 'Nile-based civilization. Built pyramids, developed hieroglyphics, and created advanced mathematics and medicine.' },
      { term: 'Indus Valley', explanation: 'Planned cities (Mohenjo-daro, Harappa) with grid streets, drainage systems, and standardized weights.' },
      { term: 'Ancient China', explanation: 'Developed paper, gunpowder, compass, and printing. Confucianism and Taoism shaped philosophy.' }
    ],
    analogy: 'Ancient civilizations were like the first startups of humanity — each independently "invented" the same basic products (writing, government, cities) in different markets (regions).',
    takeaway: 'All major ancient civilizations arose near rivers, invented writing independently, and created social hierarchies. These patterns reveal fundamental human needs.',
    prerequisites: [], relatedTopics: ['hist_greek_philosophy', 'hist_roman_empire'],
    tags: ['ancient', 'mesopotamia', 'egypt', 'indus valley', 'history']
  },
  {
    id: 'hist_french_revolution', title: 'French Revolution', category: 'History', subcategory: 'Modern History', difficulty: 3,
    introduction: 'The French Revolution (1789-1799) overthrew the monarchy and established revolutionary ideals of liberty, equality, and fraternity that reshaped global politics.',
    keyConcepts: [
      { term: 'Causes', explanation: 'Financial crisis, inequality of the Estates system, Enlightenment ideas, and food shortages among common people.' },
      { term: 'Storming of Bastille', explanation: 'July 14, 1789 — symbolic start. The people attacked the royal fortress-prison, becoming a symbol of popular uprising.' },
      { term: 'Reign of Terror', explanation: 'Robespierre\'s radical phase (1793-94). ~17,000 executed by guillotine in the name of "virtue and terror."' },
      { term: 'Napoleon\'s Rise', explanation: 'Revolution\'s chaos enabled Napoleon Bonaparte to seize power in 1799, eventually becoming Emperor.' }
    ],
    analogy: 'The French Revolution was like a pressure cooker explosion — centuries of inequality built up pressure until the lid blew off, releasing transformative but violent change.',
    takeaway: 'The French Revolution introduced the modern concepts of citizenship, human rights, and popular sovereignty. Its motto "Liberty, Equality, Fraternity" still defines democratic values.',
    prerequisites: [], relatedTopics: ['hist_world_war_1', 'hist_american_revolution'],
    tags: ['french revolution', 'liberty', 'equality', 'napoleon', 'history']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ECONOMICS (15+ topics)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'econ_supply_demand', title: 'Supply and Demand', category: 'Economics', subcategory: 'Microeconomics', difficulty: 1,
    introduction: 'Supply and demand is the fundamental model of economics — it determines prices and quantities in a free market.',
    keyConcepts: [
      { term: 'Demand Curve', explanation: 'Downward sloping: as price increases, quantity demanded decreases (law of demand).' },
      { term: 'Supply Curve', explanation: 'Upward sloping: as price increases, quantity supplied increases (law of supply).' },
      { term: 'Equilibrium', explanation: 'Where supply and demand curves intersect. Market-clearing price where quantity supplied = quantity demanded.' },
      { term: 'Shifts vs Movements', explanation: 'Price changes cause movements along curves. Non-price factors (income, preferences) shift the entire curve.' }
    ],
    analogy: 'Supply and demand is like an auction — if many people want something rare, the price goes up. If nobody wants it, the seller must lower the price.',
    takeaway: 'Supply and demand explains everything from housing prices to why concert tickets cost more when a band is popular. It\'s the foundation of all economics.',
    prerequisites: [], relatedTopics: ['econ_elasticity', 'econ_market_structures', 'econ_price_controls'],
    tags: ['supply', 'demand', 'equilibrium', 'price', 'economics']
  },
  {
    id: 'econ_gdp', title: 'GDP & National Income', category: 'Economics', subcategory: 'Macroeconomics', difficulty: 2,
    introduction: 'GDP (Gross Domestic Product) measures the total value of goods and services produced in a country — the primary indicator of economic health.',
    keyConcepts: [
      { term: 'GDP Calculation', explanation: 'GDP = C + I + G + (X - M). Consumption + Investment + Government spending + Net exports.' },
      { term: 'Real vs Nominal', explanation: 'Nominal GDP uses current prices. Real GDP adjusts for inflation, showing true growth.' },
      { term: 'GDP Per Capita', explanation: 'GDP divided by population. Better indicator of individual standard of living than total GDP.' },
      { term: 'Limitations', explanation: 'Doesn\'t capture inequality, environmental damage, unpaid labor, or quality of life.' }
    ],
    analogy: 'GDP is like a country\'s report card — it measures total economic output, but just like grades don\'t capture everything about a student, GDP doesn\'t capture everything about well-being.',
    takeaway: 'GDP is the most watched economic indicator, but it\'s an imperfect measure. High GDP doesn\'t always mean high quality of life.',
    prerequisites: ['econ_supply_demand'], relatedTopics: ['econ_inflation', 'econ_unemployment', 'econ_fiscal_policy'],
    tags: ['gdp', 'national income', 'macroeconomics', 'growth', 'economics']
  },
  {
    id: 'econ_inflation', title: 'Inflation', category: 'Economics', subcategory: 'Macroeconomics', difficulty: 2,
    introduction: 'Inflation is the general increase in prices over time, reducing the purchasing power of money. Moderate inflation is normal; hyperinflation is devastating.',
    keyConcepts: [
      { term: 'Demand-Pull', explanation: 'Too much money chasing too few goods. Excess demand drives prices up.' },
      { term: 'Cost-Push', explanation: 'Rising production costs (wages, materials) force businesses to raise prices.' },
      { term: 'CPI (Consumer Price Index)', explanation: 'Measures average change in prices of a basket of consumer goods. Primary inflation gauge.' },
      { term: 'Central Bank Response', explanation: 'Raise interest rates to cool inflation (less borrowing, less spending). Lower rates to stimulate economy.' }
    ],
    analogy: 'Inflation is like a slowly shrinking candy bar — you pay the same price, but you get less chocolate each year. Your money buys less over time.',
    takeaway: 'Moderate inflation (2-3%) is healthy for an economy. Zero inflation can mean stagnation, and hyperinflation destroys economies. Central banks walk a tightrope.',
    prerequisites: ['econ_supply_demand', 'econ_gdp'], relatedTopics: ['econ_monetary_policy', 'econ_unemployment'],
    tags: ['inflation', 'cpi', 'prices', 'monetary policy', 'economics']
  },
  {
    id: 'econ_market_structures', title: 'Market Structures', category: 'Economics', subcategory: 'Microeconomics', difficulty: 3,
    introduction: 'Market structures describe the competitive landscape of industries — from perfect competition to monopoly, each with distinct pricing power and efficiency.',
    keyConcepts: [
      { term: 'Perfect Competition', explanation: 'Many firms, identical products, no barriers. Firms are price takers. Theoretically most efficient.' },
      { term: 'Monopoly', explanation: 'Single seller, no substitutes, high barriers. Price maker with restricted output. Often regulated.' },
      { term: 'Oligopoly', explanation: 'Few large firms dominate. Strategic interdependence — each firm\'s decisions affect others. Game theory applies.' },
      { term: 'Monopolistic Competition', explanation: 'Many firms, differentiated products, low barriers. Brand loyalty provides some pricing power.' }
    ],
    analogy: 'Market structures are like different types of restaurants — a food court is perfect competition (many identical options), a Michelin star restaurant in a small town is a monopoly (only choice).',
    takeaway: 'Understanding market structure tells you how much power firms have over prices. Most real markets fall between perfect competition and monopoly.',
    prerequisites: ['econ_supply_demand'], relatedTopics: ['econ_game_theory', 'econ_antitrust'],
    tags: ['market structure', 'monopoly', 'oligopoly', 'competition', 'economics']
  },
  {
    id: 'econ_fiscal_policy', title: 'Fiscal Policy', category: 'Economics', subcategory: 'Macroeconomics', difficulty: 3,
    introduction: 'Fiscal policy uses government spending and taxation to influence the economy — stimulating growth during recessions and cooling overheated economies.',
    keyConcepts: [
      { term: 'Expansionary Policy', explanation: 'Increase government spending and/or cut taxes to boost aggregate demand during recessions.' },
      { term: 'Contractionary Policy', explanation: 'Decrease spending and/or raise taxes to reduce inflation during economic booms.' },
      { term: 'Budget Deficit/Surplus', explanation: 'Deficit: spending > revenue (borrowing needed). Surplus: revenue > spending.' },
      { term: 'Multiplier Effect', explanation: 'Government spending creates a cascade — ₹1 spent can generate ₹1.50+ in economic activity.' }
    ],
    analogy: 'Fiscal policy is like a thermostat for the economy — when it\'s too cold (recession), turn up the heat (spending). Too hot (inflation), turn it down (taxes).',
    takeaway: 'Fiscal policy is one of the two main tools governments use to manage the economy (the other being monetary policy). It works but has lags and political constraints.',
    prerequisites: ['econ_gdp'], relatedTopics: ['econ_monetary_policy', 'econ_inflation', 'econ_unemployment'],
    tags: ['fiscal policy', 'government spending', 'taxation', 'macroeconomics', 'economics']
  },
  {
    id: 'econ_monetary_policy', title: 'Monetary Policy', category: 'Economics', subcategory: 'Macroeconomics', difficulty: 3,
    introduction: 'Monetary policy is how central banks (like RBI or the Fed) control the money supply and interest rates to manage inflation and economic stability.',
    keyConcepts: [
      { term: 'Interest Rates', explanation: 'The primary tool. Lower rates encourage borrowing/spending (stimulative). Higher rates discourage (contractionary).' },
      { term: 'Open Market Operations', explanation: 'Buying/selling government bonds to inject or absorb money from the banking system.' },
      { term: 'Reserve Requirements', explanation: 'Minimum reserves banks must hold. Lower requirements = more lending capacity = more money in circulation.' },
      { term: 'Quantitative Easing', explanation: 'Unconventional tool: central bank buys assets to inject money when rates are already near zero.' }
    ],
    analogy: 'Monetary policy is like controlling a car — interest rates are the gas and brake pedals, and the central bank is the driver trying to keep the economy on the road.',
    takeaway: 'Central banks are the silent guardians of economic stability. Their interest rate decisions affect everything from your home loan EMI to stock market performance.',
    prerequisites: ['econ_inflation', 'econ_gdp'], relatedTopics: ['econ_fiscal_policy', 'econ_banking'],
    tags: ['monetary policy', 'interest rates', 'central bank', 'rbi', 'economics']
  },
  {
    id: 'econ_elasticity', title: 'Elasticity', category: 'Economics', subcategory: 'Microeconomics', difficulty: 2,
    introduction: 'Elasticity measures how sensitive quantity demanded or supplied is to changes in price, income, or other factors.',
    keyConcepts: [
      { term: 'Price Elasticity of Demand', explanation: 'PED = % change in Qd / % change in P. Elastic (>1): demand very responsive. Inelastic (<1): not responsive.' },
      { term: 'Determinants', explanation: 'Availability of substitutes, necessity vs luxury, time horizon, and proportion of income spent.' },
      { term: 'Revenue Impact', explanation: 'Elastic demand: lower price → more revenue. Inelastic demand: raise price → more revenue.' },
      { term: 'Cross & Income Elasticity', explanation: 'Cross: how demand for A changes with price of B. Income: how demand changes with income.' }
    ],
    analogy: 'Elasticity is like a rubber band — an elastic good stretches a lot when you pull (change price), while an inelastic good (like insulin) barely budges.',
    takeaway: 'Elasticity is crucial for pricing strategy. Luxury goods are elastic (price matters), necessities are inelastic (people buy regardless).',
    prerequisites: ['econ_supply_demand'], relatedTopics: ['econ_market_structures', 'econ_taxation_effects'],
    tags: ['elasticity', 'demand', 'price sensitivity', 'microeconomics', 'economics']
  },
  {
    id: 'econ_game_theory', title: 'Game Theory', category: 'Economics', subcategory: 'Microeconomics', difficulty: 4,
    introduction: 'Game theory studies strategic interactions where the outcome depends on the decisions of multiple players, each trying to maximize their own payoff.',
    keyConcepts: [
      { term: "Prisoner's Dilemma", explanation: 'Two players individually benefit from defecting, but mutual cooperation gives better joint outcome. Shows why cooperation is hard.' },
      { term: 'Nash Equilibrium', explanation: 'A state where no player can improve their outcome by unilaterally changing strategy. Stable but not always optimal.' },
      { term: 'Dominant Strategy', explanation: 'A strategy that is best regardless of what the opponent does. Not all games have one.' },
      { term: 'Applications', explanation: 'Pricing wars, nuclear deterrence, auctions, evolutionary biology, and negotiation strategies.' }
    ],
    analogy: "Game theory is like a chess match where you must think several moves ahead, anticipating your opponent's responses to your actions.",
    takeaway: 'Game theory reveals why rational individuals sometimes fail to cooperate, even when cooperation benefits everyone. It explains cartels, arms races, and market competition.',
    prerequisites: ['econ_market_structures'], relatedTopics: ['cs_algorithms', 'econ_behavioral'],
    tags: ['game theory', 'nash equilibrium', 'strategy', 'prisoner dilemma', 'economics']
  },

  // Additional cross-cutting topics
  {
    id: 'cs_cybersecurity', title: 'Cybersecurity Fundamentals', category: 'Computer Science', subcategory: 'Security', difficulty: 3,
    introduction: 'Cybersecurity protects systems, networks, and data from digital attacks, unauthorized access, and damage.',
    keyConcepts: [
      { term: 'CIA Triad', explanation: 'Confidentiality (data privacy), Integrity (data accuracy), Availability (data accessible when needed).' },
      { term: 'Common Attacks', explanation: 'Phishing, SQL injection, cross-site scripting (XSS), DDoS, ransomware, and man-in-the-middle.' },
      { term: 'Encryption', explanation: 'Transforming data into unreadable form using algorithms. Symmetric (AES) and Asymmetric (RSA) encryption.' },
      { term: 'Authentication', explanation: 'Verifying identity. Passwords, multi-factor authentication (MFA), biometrics, and tokens.' }
    ],
    analogy: 'Cybersecurity is like protecting a castle — you need walls (firewalls), guards (authentication), secret codes (encryption), and watchfulness (monitoring).',
    takeaway: 'Every organization is a target. Security is not a product but a process — layered defenses, regular updates, and human awareness.',
    prerequisites: ['cs_networking', 'cs_http'], relatedTopics: ['cs_cryptography', 'cs_web_security'],
    tags: ['cybersecurity', 'security', 'encryption', 'hacking', 'protection']
  },
  {
    id: 'cs_cloud_computing', title: 'Cloud Computing', category: 'Computer Science', subcategory: 'Infrastructure', difficulty: 2,
    introduction: 'Cloud computing delivers computing services (servers, storage, databases, networking) over the internet, enabling scalable, on-demand resources.',
    keyConcepts: [
      { term: 'IaaS, PaaS, SaaS', explanation: 'Infrastructure (VMs, storage), Platform (dev environments), Software (Gmail, Office 365) as a Service.' },
      { term: 'Scalability', explanation: 'Vertical (bigger machine) and horizontal (more machines) scaling. Auto-scaling adjusts to demand.' },
      { term: 'Major Providers', explanation: 'AWS (Amazon), Azure (Microsoft), GCP (Google). Each offers 200+ services.' },
      { term: 'Serverless', explanation: 'Run code without managing servers. Pay per execution. AWS Lambda, Google Cloud Functions.' }
    ],
    analogy: 'Cloud computing is like electricity — you don\'t build your own power plant; you plug into the grid and pay for what you use.',
    takeaway: 'Cloud computing transformed IT from capital expense (buy servers) to operational expense (rent computing). It powers most modern applications.',
    prerequisites: ['cs_networking'], relatedTopics: ['cs_devops', 'cs_docker'],
    tags: ['cloud', 'aws', 'azure', 'saas', 'infrastructure']
  },
  {
    id: 'cs_data_science', title: 'Data Science', category: 'Computer Science', subcategory: 'Data Science', difficulty: 3,
    introduction: 'Data science extracts knowledge and insights from structured and unstructured data using statistics, machine learning, and domain expertise.',
    keyConcepts: [
      { term: 'Data Pipeline', explanation: 'Collection → Cleaning → Exploration → Modeling → Evaluation → Deployment. Each step is critical.' },
      { term: 'Exploratory Data Analysis', explanation: 'Visualize distributions, correlations, and patterns before modeling. Histograms, scatter plots, box plots.' },
      { term: 'Feature Engineering', explanation: 'Creating new features from raw data to improve model performance. Often more impactful than model choice.' },
      { term: 'Model Evaluation', explanation: 'Accuracy, precision, recall, F1-score, ROC-AUC. Different metrics suit different problems.' }
    ],
    analogy: 'Data science is like being a detective — you gather evidence (data), look for clues (patterns), form theories (models), and test them against new evidence.',
    takeaway: 'Data science is not just about algorithms — it\'s about asking the right questions, understanding the data, and communicating insights effectively.',
    prerequisites: ['math_statistics', 'cs_machine_learning'], relatedTopics: ['cs_deep_learning', 'cs_big_data'],
    tags: ['data science', 'analytics', 'visualization', 'modeling', 'insights']
  },
  {
    id: 'cs_blockchain', title: 'Blockchain', category: 'Computer Science', subcategory: 'Distributed Systems', difficulty: 4,
    introduction: 'Blockchain is a decentralized, distributed ledger that records transactions in immutable blocks linked by cryptographic hashes.',
    keyConcepts: [
      { term: 'Blocks & Chains', explanation: 'Each block contains transactions, a timestamp, and the hash of the previous block, forming an immutable chain.' },
      { term: 'Consensus Mechanisms', explanation: 'Proof of Work (mining), Proof of Stake (staking) — protocols to agree on the valid chain.' },
      { term: 'Decentralization', explanation: 'No single authority controls the network. All participants maintain copies of the ledger.' },
      { term: 'Smart Contracts', explanation: 'Self-executing contracts with terms written in code. Ethereum popularized programmable blockchain.' }
    ],
    analogy: 'Blockchain is like a shared Google Doc that everyone can read but nobody can edit past entries — once something is written, it\'s permanent and everyone has the same version.',
    takeaway: 'Blockchain enables trust without intermediaries. Beyond cryptocurrency, it has applications in supply chains, voting, identity, and DeFi.',
    prerequisites: ['cs_hash_tables', 'cs_networking'], relatedTopics: ['cs_cryptography', 'cs_distributed_systems'],
    tags: ['blockchain', 'cryptocurrency', 'decentralized', 'consensus', 'web3']
  }
];

/**
 * Find a topic by its ID.
 * @param {string} id - Topic ID.
 * @returns {object|undefined} The topic entry or undefined.
 */
export function findTopicById(id) {
  return knowledgeBase.find(t => t.id === id);
}

/**
 * Search topics by a query string, matching against title, tags, and category.
 * @param {string} query - Search query.
 * @returns {object[]} Matching topics sorted by relevance.
 */
export function searchTopics(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  return knowledgeBase
    .map(topic => {
      let score = 0;
      if (topic.title.toLowerCase().includes(q)) score += 10;
      if (topic.category.toLowerCase().includes(q)) score += 5;
      if (topic.subcategory.toLowerCase().includes(q)) score += 5;
      if (topic.tags.some(t => t.includes(q))) score += 3;
      if (topic.introduction.toLowerCase().includes(q)) score += 1;
      topic.keyConcepts.forEach(kc => {
        if (kc.term.toLowerCase().includes(q)) score += 4;
        if (kc.explanation.toLowerCase().includes(q)) score += 1;
      });
      return { ...topic, _score: score };
    })
    .filter(t => t._score > 0)
    .sort((a, b) => b._score - a._score);
}

/**
 * Get all unique categories from the knowledge base.
 * @returns {string[]} Array of category names.
 */
export function getCategories() {
  return [...new Set(knowledgeBase.map(t => t.category))];
}

/**
 * Get topics filtered by category.
 * @param {string} category - Category name.
 * @returns {object[]} Topics in that category.
 */
export function getTopicsByCategory(category) {
  return knowledgeBase.filter(t => t.category === category);
}
