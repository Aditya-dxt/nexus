/**
 * @fileoverview NEXUS Quiz Bank
 * Question pools organized by topic with difficulty levels.
 * @module data/quizBank
 */

export const quizBank = {
  'cs_arrays': [
    { id:'a1', question:'What is the time complexity of accessing an element by index in an array?', options:['O(n)','O(1)','O(log n)','O(n²)'], correctIndex:1, explanation:'Arrays provide constant-time O(1) random access because elements are stored in contiguous memory.', difficulty:1 },
    { id:'a2', question:'What happens when you insert an element in the middle of an array?', options:['Nothing changes','All elements shift right','Only the last element moves','The array is recreated'], correctIndex:1, explanation:'Inserting in the middle requires shifting all subsequent elements to make room, costing O(n).', difficulty:1 },
    { id:'a3', question:'What is the main advantage of arrays over linked lists?', options:['Dynamic sizing','O(1) random access','Easier insertion','Less memory usage'], correctIndex:1, explanation:'Arrays allow constant-time access to any element via index, while linked lists require traversal.', difficulty:1 },
    { id:'a4', question:'In a dynamic array, what typically happens when the array is full and a new element is added?', options:['An error occurs','The array doubles its capacity','A new array of size+1 is created','Elements are compressed'], correctIndex:1, explanation:'Dynamic arrays typically double their capacity, giving amortized O(1) insertion.', difficulty:2 },
    { id:'a5', question:'What is the space complexity of an array of n elements?', options:['O(1)','O(log n)','O(n)','O(n²)'], correctIndex:2, explanation:'An array of n elements requires O(n) space — one slot per element.', difficulty:1 },
  ],
  'cs_linked_lists': [
    { id:'ll1', question:'What is the time complexity of inserting at the head of a singly linked list?', options:['O(n)','O(1)','O(log n)','O(n²)'], correctIndex:1, explanation:'Inserting at the head only requires updating the head pointer — constant time.', difficulty:1 },
    { id:'ll2', question:'What is the main disadvantage of a singly linked list?', options:['Uses too much memory','Cannot store different data types','No random access (must traverse)','Cannot be sorted'], correctIndex:2, explanation:'Linked lists require sequential traversal to access elements — no O(1) indexing.', difficulty:1 },
    { id:'ll3', question:'In a doubly linked list, each node contains:', options:['Only data','Data and one pointer','Data and two pointers','Data and three pointers'], correctIndex:2, explanation:'Doubly linked list nodes have data, a next pointer, and a prev pointer.', difficulty:1 },
    { id:'ll4', question:'How do you detect a cycle in a linked list efficiently?', options:['Use a hash set','Sort the list','Floyd\'s tortoise and hare algorithm','Binary search'], correctIndex:2, explanation:'Floyd\'s algorithm uses two pointers (slow and fast) to detect cycles in O(n) time, O(1) space.', difficulty:3 },
    { id:'ll5', question:'What is a sentinel node in a linked list?', options:['The last node','A dummy node that simplifies edge cases','A node with no data','The middle node'], correctIndex:1, explanation:'Sentinel nodes are dummy nodes placed at boundaries to eliminate null checks in operations.', difficulty:2 },
  ],
  'cs_stacks': [
    { id:'s1', question:'Which principle does a stack follow?', options:['FIFO','LIFO','LILO','Random'], correctIndex:1, explanation:'Stacks follow Last-In-First-Out — the most recently added element is removed first.', difficulty:1 },
    { id:'s2', question:'Which data structure is used to implement function calls in programming?', options:['Queue','Array','Stack (Call Stack)','Tree'], correctIndex:2, explanation:'The call stack stores function frames — each function call pushes a frame, return pops it.', difficulty:1 },
    { id:'s3', question:'What is the time complexity of push and pop operations on a stack?', options:['O(n)','O(1)','O(log n)','O(n²)'], correctIndex:1, explanation:'Both push and pop operate on the top element only, requiring constant time.', difficulty:1 },
    { id:'s4', question:'Which application does NOT typically use a stack?', options:['Undo/Redo operations','Expression evaluation','BFS traversal','Backtracking'], correctIndex:2, explanation:'BFS uses a queue (FIFO), not a stack. DFS uses a stack.', difficulty:2 },
    { id:'s5', question:'What happens when you pop from an empty stack?', options:['Returns null','Stack underflow error','Returns 0','Nothing happens'], correctIndex:1, explanation:'Popping from an empty stack causes a stack underflow — an error condition.', difficulty:1 },
  ],
  'cs_queues': [
    { id:'q1', question:'Which principle does a queue follow?', options:['LIFO','FIFO','Priority','Random'], correctIndex:1, explanation:'Queues follow First-In-First-Out — the earliest added element is removed first.', difficulty:1 },
    { id:'q2', question:'In a circular queue, what happens when the rear reaches the end of the array?', options:['The queue is full','It wraps around to the beginning','A new array is created','Elements are shifted'], correctIndex:1, explanation:'Circular queues wrap around using modular arithmetic: rear = (rear + 1) % size.', difficulty:2 },
    { id:'q3', question:'Which algorithm uses a queue as its primary data structure?', options:['DFS','Binary Search','BFS','Quick Sort'], correctIndex:2, explanation:'BFS (Breadth-First Search) uses a queue to explore nodes level by level.', difficulty:1 },
    { id:'q4', question:'What is a deque?', options:['A damaged queue','A double-ended queue','A deep queue','A deleted queue'], correctIndex:1, explanation:'A deque (double-ended queue) supports insertion and deletion at both ends.', difficulty:2 },
    { id:'q5', question:'In a priority queue, elements are dequeued based on:', options:['Arrival order','Random selection','Priority value','Alphabetical order'], correctIndex:2, explanation:'Priority queues dequeue the highest (or lowest) priority element first, regardless of arrival order.', difficulty:1 },
  ],
  'cs_binary_search': [
    { id:'bs1', question:'What is the prerequisite for binary search?', options:['Array must be dynamic','Array must be sorted','Array must have unique elements','Array must be small'], correctIndex:1, explanation:'Binary search requires a sorted array to correctly eliminate half the search space each step.', difficulty:1 },
    { id:'bs2', question:'What is the time complexity of binary search?', options:['O(n)','O(n²)','O(log n)','O(1)'], correctIndex:2, explanation:'Binary search halves the search space each iteration, giving O(log n) — about 20 steps for 1 million elements.', difficulty:1 },
    { id:'bs3', question:'In binary search, if the target is greater than the middle element:', options:['Search the left half','Search the right half','Return -1','Start over'], correctIndex:1, explanation:'If target > middle, the target must be in the right half (larger elements).', difficulty:1 },
    { id:'bs4', question:'How many comparisons does binary search need for an array of 1024 elements?', options:['1024','512','10','100'], correctIndex:2, explanation:'log₂(1024) = 10. Binary search needs at most 10 comparisons.', difficulty:2 },
    { id:'bs5', question:'Binary search uses which algorithm design paradigm?', options:['Greedy','Dynamic Programming','Divide and Conquer','Backtracking'], correctIndex:2, explanation:'Binary search divides the problem in half each step — classic divide and conquer.', difficulty:2 },
  ],
  'cs_sorting': [
    { id:'so1', question:'Which sorting algorithm has O(n log n) worst-case time complexity?', options:['Quick Sort','Bubble Sort','Merge Sort','Selection Sort'], correctIndex:2, explanation:'Merge sort guarantees O(n log n) in all cases. Quick sort is O(n²) worst case.', difficulty:2 },
    { id:'so2', question:'Which sorting algorithm is considered the fastest on average?', options:['Bubble Sort','Merge Sort','Quick Sort','Insertion Sort'], correctIndex:2, explanation:'Quick sort is fastest on average due to good cache locality and low constant factors, despite O(n²) worst case.', difficulty:2 },
    { id:'so3', question:'What does "stable sort" mean?', options:['Never crashes','Preserves relative order of equal elements','Always O(n log n)','Uses no extra memory'], correctIndex:1, explanation:'A stable sort maintains the original relative order of elements with equal keys.', difficulty:2 },
    { id:'so4', question:'Bubble sort has a best case of O(n) when:', options:['Array is reverse sorted','Array is already sorted','Array has duplicates','Array is small'], correctIndex:1, explanation:'With an optimization flag, bubble sort detects no swaps in a pass and exits — O(n) for sorted arrays.', difficulty:2 },
    { id:'so5', question:'Which sort works by repeatedly selecting the minimum element?', options:['Bubble Sort','Insertion Sort','Selection Sort','Merge Sort'], correctIndex:2, explanation:'Selection sort finds the minimum in the unsorted portion and places it at the correct position.', difficulty:1 },
  ],
  'cs_recursion': [
    { id:'r1', question:'What is the base case in recursion?', options:['The first recursive call','The condition that stops recursion','The recursive formula','The return type'], correctIndex:1, explanation:'The base case prevents infinite recursion by providing a direct answer for the simplest input.', difficulty:1 },
    { id:'r2', question:'What happens if a recursive function has no base case?', options:['It returns null','Infinite recursion / stack overflow','It runs once','It optimizes automatically'], correctIndex:1, explanation:'Without a base case, the function calls itself infinitely until the call stack overflows.', difficulty:1 },
    { id:'r3', question:'The factorial function fact(n) = n * fact(n-1) has base case:', options:['fact(1) = 1','fact(n) = n','fact(0) = n','fact(-1) = 0'], correctIndex:0, explanation:'fact(1) = 1 (or fact(0) = 1) is the base case that stops the recursion.', difficulty:1 },
    { id:'r4', question:'What is tail recursion?', options:['Recursion at the start','When the recursive call is the last operation','Recursion with two calls','Recursion without a base case'], correctIndex:1, explanation:'Tail recursion means the recursive call is the final operation, allowing compiler optimization.', difficulty:3 },
    { id:'r5', question:'The Fibonacci sequence is a classic example of:', options:['Linear recursion','Overlapping subproblems','Tail recursion','No recursion'], correctIndex:1, explanation:'Fibonacci has overlapping subproblems — fib(5) computes fib(3) multiple times, making DP beneficial.', difficulty:2 },
  ],
  'cs_dynamic_programming': [
    { id:'dp1', question:'What are the two key properties needed for dynamic programming?', options:['Sorting and searching','Overlapping subproblems and optimal substructure','Recursion and iteration','Speed and memory'], correctIndex:1, explanation:'DP requires overlapping subproblems (same subproblem solved multiple times) and optimal substructure.', difficulty:2 },
    { id:'dp2', question:'What is memoization?', options:['Writing notes','Caching results of recursive calls','A type of sorting','Memory allocation'], correctIndex:1, explanation:'Memoization stores computed results in a cache to avoid redundant recursive computations.', difficulty:2 },
    { id:'dp3', question:'Top-down DP uses:', options:['Loops only','Recursion with memoization','Iteration with tabulation','Neither recursion nor loops'], correctIndex:1, explanation:'Top-down DP = recursive approach + cache (memoization). Bottom-up DP = iterative tabulation.', difficulty:2 },
    { id:'dp4', question:'The 0/1 Knapsack problem is solved optimally using:', options:['Greedy algorithm','Bubble sort','Dynamic programming','Binary search'], correctIndex:2, explanation:'0/1 Knapsack has optimal substructure and overlapping subproblems — perfect for DP.', difficulty:3 },
    { id:'dp5', question:'DP can convert an exponential solution to:', options:['O(1)','O(log n)','Polynomial time','O(n!)'], correctIndex:2, explanation:'DP eliminates redundant computation, often converting O(2^n) to O(n²) or O(n).', difficulty:2 },
  ],
  'cs_neural_networks': [
    { id:'nn1', question:'What is the primary function of an activation function?', options:['To store weights','To introduce non-linearity','To reduce learning rate','To normalize output'], correctIndex:1, explanation:'Without activation functions, a neural network would be a linear model regardless of depth.', difficulty:1 },
    { id:'nn2', question:'What is backpropagation?', options:['Forward pass of data','Algorithm to compute gradients for weight updates','A type of neural network','Data preprocessing'], correctIndex:1, explanation:'Backpropagation computes the gradient of the loss w.r.t. each weight using the chain rule.', difficulty:2 },
    { id:'nn3', question:'Which activation function outputs values between 0 and 1?', options:['ReLU','Tanh','Sigmoid','Linear'], correctIndex:2, explanation:'Sigmoid: σ(x) = 1/(1+e^(-x)), squashes output to (0,1). Used for binary classification.', difficulty:1 },
    { id:'nn4', question:'What problem does ReLU solve compared to sigmoid?', options:['Overfitting','Vanishing gradient','Underfitting','Data imbalance'], correctIndex:1, explanation:'ReLU avoids vanishing gradients for positive values, enabling deeper networks to train effectively.', difficulty:3 },
    { id:'nn5', question:'In a feedforward neural network, data flows:', options:['In both directions','Only forward from input to output','In circles','Randomly'], correctIndex:1, explanation:'Feedforward networks process data in one direction: input → hidden layers → output.', difficulty:1 },
  ],
  'cs_processes': [
    { id:'p1', question:'Which of the following is NOT a process state?', options:['Ready','Running','Compiled','Waiting'], correctIndex:2, explanation:'Process states are: New, Ready, Running, Waiting, Terminated. "Compiled" is not a process state.', difficulty:1 },
    { id:'p2', question:'What is stored in a Process Control Block (PCB)?', options:['Only the process name','Process state, registers, memory info, scheduling data','Only the program counter','Only the stack pointer'], correctIndex:1, explanation:'The PCB contains all information the OS needs to manage a process.', difficulty:2 },
    { id:'p3', question:'Context switching involves:', options:['Saving one process state and loading another','Deleting a process','Creating a new process','Restarting the computer'], correctIndex:0, explanation:'Context switching saves the current process state and loads the next process to run on the CPU.', difficulty:1 },
    { id:'p4', question:'Which IPC mechanism involves two processes sharing a region of memory?', options:['Message passing','Shared memory','Pipes only','Signals only'], correctIndex:1, explanation:'Shared memory allows multiple processes to access the same memory region for fast communication.', difficulty:2 },
    { id:'p5', question:'A zombie process is:', options:['A virus','A process that has finished but its parent hasn\'t read its exit status','An infinite loop','A root process'], correctIndex:1, explanation:'Zombie processes have terminated but remain in the process table until the parent calls wait().', difficulty:3 },
  ],
  'cs_graphs': [
    { id:'g1', question:'In an undirected graph, an edge between A and B means:', options:['Only A can reach B','Only B can reach A','Both A and B can reach each other','Neither can reach the other'], correctIndex:2, explanation:'Undirected edges are bidirectional — both vertices are connected in both directions.', difficulty:1 },
    { id:'g2', question:'An adjacency matrix for a graph with V vertices uses how much space?', options:['O(V)','O(V+E)','O(V²)','O(E)'], correctIndex:2, explanation:'An adjacency matrix is a V×V 2D array, requiring O(V²) space regardless of edges.', difficulty:2 },
    { id:'g3', question:'A tree is a special type of graph that is:', options:['Connected and has cycles','Disconnected with no cycles','Connected with no cycles','Has exactly V edges'], correctIndex:2, explanation:'A tree is a connected acyclic graph with exactly V-1 edges.', difficulty:2 },
    { id:'g4', question:'The degree of a vertex is:', options:['Its distance from root','The number of edges connected to it','Its weight','The number of paths through it'], correctIndex:1, explanation:'Vertex degree counts incident edges. In directed graphs, there\'s in-degree and out-degree.', difficulty:1 },
    { id:'g5', question:'Which representation is better for sparse graphs?', options:['Adjacency matrix','Adjacency list','Both are equal','Neither'], correctIndex:1, explanation:'Adjacency lists use O(V+E) space, much better than O(V²) matrices when E << V².', difficulty:2 },
  ],
  'cs_sql': [
    { id:'sq1', question:'Which SQL clause is used to filter rows?', options:['SELECT','FROM','WHERE','ORDER BY'], correctIndex:2, explanation:'WHERE filters rows based on conditions before grouping or ordering.', difficulty:1 },
    { id:'sq2', question:'What does an INNER JOIN return?', options:['All rows from both tables','Only matching rows from both tables','All rows from the left table','All rows from the right table'], correctIndex:1, explanation:'INNER JOIN returns only rows where the join condition is satisfied in both tables.', difficulty:1 },
    { id:'sq3', question:'Which SQL function counts the number of rows?', options:['SUM()','AVG()','COUNT()','MAX()'], correctIndex:2, explanation:'COUNT() returns the number of rows matching the query. COUNT(*) counts all rows.', difficulty:1 },
    { id:'sq4', question:'What does GROUP BY do?', options:['Sorts results','Groups rows with same values for aggregate functions','Filters groups','Limits results'], correctIndex:1, explanation:'GROUP BY groups rows sharing values in specified columns, enabling aggregate calculations per group.', difficulty:2 },
    { id:'sq5', question:'Which constraint ensures unique values in a column?', options:['NOT NULL','UNIQUE','CHECK','DEFAULT'], correctIndex:1, explanation:'UNIQUE constraint prevents duplicate values in a column (or combination of columns).', difficulty:1 },
  ],
  'cs_oop': [
    { id:'oo1', question:'Which OOP principle hides internal state behind a public interface?', options:['Inheritance','Polymorphism','Encapsulation','Abstraction'], correctIndex:2, explanation:'Encapsulation bundles data and methods together, exposing only necessary interfaces.', difficulty:1 },
    { id:'oo2', question:'When class Dog extends class Animal, this demonstrates:', options:['Encapsulation','Polymorphism','Abstraction','Inheritance'], correctIndex:3, explanation:'Inheritance creates a parent-child relationship where Dog inherits Animal\'s properties and methods.', difficulty:1 },
    { id:'oo3', question:'Same method name working differently for different classes is:', options:['Encapsulation','Polymorphism','Inheritance','Composition'], correctIndex:1, explanation:'Polymorphism allows the same interface to have different implementations across classes.', difficulty:1 },
    { id:'oo4', question:'What is the "Diamond Problem" in OOP?', options:['A design pattern','Ambiguity in multiple inheritance','A memory leak','A type error'], correctIndex:1, explanation:'When a class inherits from two classes with a common ancestor, ambiguity arises about which method to use.', difficulty:3 },
    { id:'oo5', question:'Composition over inheritance means:', options:['Never use inheritance','Prefer combining objects over extending classes','Use more classes','Avoid polymorphism'], correctIndex:1, explanation:'Composition creates "has-a" relationships (more flexible) instead of "is-a" hierarchies.', difficulty:2 },
  ],
  'cs_hash_tables': [
    { id:'h1', question:'What is the average time complexity of hash table lookup?', options:['O(n)','O(log n)','O(1)','O(n²)'], correctIndex:2, explanation:'Hash tables provide average O(1) lookup by computing the index directly from the key.', difficulty:1 },
    { id:'h2', question:'What is a hash collision?', options:['A hash function error','Two keys mapping to the same index','A memory overflow','A syntax error'], correctIndex:1, explanation:'Collisions occur when different keys produce the same hash index.', difficulty:1 },
    { id:'h3', question:'Which method resolves collisions by storing a linked list at each index?', options:['Open addressing','Chaining','Linear probing','Rehashing'], correctIndex:1, explanation:'Chaining stores a linked list at each bucket, allowing multiple entries per index.', difficulty:2 },
    { id:'h4', question:'What is the load factor of a hash table?', options:['Number of keys','Keys divided by table size','Table size divided by keys','Number of collisions'], correctIndex:1, explanation:'Load factor = n/m (entries/table size). Higher load factor = more collisions.', difficulty:2 },
    { id:'h5', question:'When does hash table performance degrade to O(n)?', options:['Never','When all keys hash to the same index','When the table is empty','When keys are sorted'], correctIndex:1, explanation:'Worst case: all keys collide, forming a single chain of length n. Lookup becomes O(n).', difficulty:2 },
  ],
  'cs_machine_learning': [
    { id:'ml1', question:'In supervised learning, the training data includes:', options:['Only inputs','Only outputs','Both inputs and labeled outputs','Neither'], correctIndex:2, explanation:'Supervised learning uses labeled data — each input has a corresponding correct output.', difficulty:1 },
    { id:'ml2', question:'Overfitting means the model:', options:['Is too simple','Memorizes training data but fails on new data','Has high bias','Underfits'], correctIndex:1, explanation:'Overfitting: high training accuracy, low test accuracy. The model learns noise instead of patterns.', difficulty:1 },
    { id:'ml3', question:'Which is NOT a type of machine learning?', options:['Supervised','Unsupervised','Reinforcement','Compilational'], correctIndex:3, explanation:'The three main types are: supervised, unsupervised, and reinforcement learning.', difficulty:1 },
    { id:'ml4', question:'Cross-validation is used to:', options:['Train faster','Evaluate model robustness','Clean data','Select features'], correctIndex:1, explanation:'Cross-validation splits data into folds, training and testing on different subsets to assess generalization.', difficulty:2 },
    { id:'ml5', question:'K-means is an example of:', options:['Supervised learning','Unsupervised clustering','Reinforcement learning','Semi-supervised learning'], correctIndex:1, explanation:'K-means groups unlabeled data into K clusters based on similarity — unsupervised learning.', difficulty:2 },
  ],
  'cs_react': [
    { id:'re1', question:'React uses which pattern for UI updates?', options:['Direct DOM manipulation','Virtual DOM diffing','Shadow DOM','Server-side rendering only'], correctIndex:1, explanation:'React compares virtual DOM trees and only applies minimal changes to the real DOM.', difficulty:1 },
    { id:'re2', question:'What hook is used to manage state in a functional component?', options:['useEffect','useState','useRef','useMemo'], correctIndex:1, explanation:'useState returns a state variable and setter function for managing component state.', difficulty:1 },
    { id:'re3', question:'Props in React are:', options:['Mutable internal state','Read-only data passed from parent to child','Global variables','CSS properties'], correctIndex:1, explanation:'Props are read-only — a child component cannot modify props received from its parent.', difficulty:1 },
    { id:'re4', question:'useEffect with an empty dependency array runs:', options:['Every render','Only on mount (once)','Never','On unmount'], correctIndex:1, explanation:'useEffect(fn, []) runs the effect once after initial render — similar to componentDidMount.', difficulty:2 },
    { id:'re5', question:'What is the purpose of React.memo?', options:['Manage state','Memoize a component to prevent unnecessary re-renders','Create refs','Handle errors'], correctIndex:1, explanation:'React.memo wraps a component and skips re-rendering if props haven\'t changed.', difficulty:2 },
  ],
  'phys_newtons_laws': [
    { id:'nl1', question:'Newton\'s First Law is also known as the Law of:', options:['Gravity','Inertia','Action-Reaction','Acceleration'], correctIndex:1, explanation:'Inertia: an object resists changes to its state of motion unless acted upon by a force.', difficulty:1 },
    { id:'nl2', question:'According to F=ma, doubling the force on an object:', options:['Halves acceleration','Doubles acceleration','No change','Quadruples acceleration'], correctIndex:1, explanation:'F=ma is linear — double the force, double the acceleration (for constant mass).', difficulty:1 },
    { id:'nl3', question:'Newton\'s Third Law states:', options:['F=ma','Objects at rest stay at rest','Every action has an equal and opposite reaction','Energy is conserved'], correctIndex:2, explanation:'For every force, there is an equal force in the opposite direction on the other object.', difficulty:1 },
    { id:'nl4', question:'A 10 kg object with 20N force applied has acceleration:', options:['200 m/s²','2 m/s²','0.5 m/s²','10 m/s²'], correctIndex:1, explanation:'a = F/m = 20/10 = 2 m/s².', difficulty:1 },
    { id:'nl5', question:'Which scenario demonstrates Newton\'s Third Law?', options:['A ball rolling to a stop','A rocket propelling by expelling gas','A book sitting on a table (inertia)','An apple falling from a tree'], correctIndex:1, explanation:'The rocket pushes gas backward; the gas pushes the rocket forward — action-reaction pair.', difficulty:2 },
  ],
  'phys_quantum': [
    { id:'qm1', question:'What does wave-particle duality mean?', options:['Waves can become solid','Particles can exhibit wave-like and particle-like behavior','Only light has this property','Particles move in waves'], correctIndex:1, explanation:'All quantum objects exhibit both wave and particle properties depending on how they are observed.', difficulty:2 },
    { id:'qm2', question:'Heisenberg\'s Uncertainty Principle states you cannot simultaneously know:', options:['Mass and velocity','Charge and spin','Position and momentum precisely','Energy and mass'], correctIndex:2, explanation:'Δx·Δp ≥ ℏ/2. Greater precision in position means less precision in momentum, and vice versa.', difficulty:2 },
    { id:'qm3', question:'Superposition means a quantum system:', options:['Is in a definite state','Exists in multiple states simultaneously until measured','Cannot be observed','Has zero energy'], correctIndex:1, explanation:'Before measurement, a quantum system exists in a superposition of all possible states.', difficulty:2 },
    { id:'qm4', question:'What is quantum entanglement?', options:['Particles stuck together physically','Correlated quantum states between particles regardless of distance','A type of radiation','Electron spin'], correctIndex:1, explanation:'Entangled particles have correlated properties — measuring one instantly determines the other.', difficulty:3 },
    { id:'qm5', question:'The Schrödinger equation describes:', options:['Classical motion','How quantum states evolve over time','Nuclear reactions','Chemical bonds only'], correctIndex:1, explanation:'The Schrödinger equation is the fundamental equation governing quantum state evolution.', difficulty:3 },
  ],
  'math_calculus': [
    { id:'mc1', question:'The derivative of f(x) represents:', options:['The area under the curve','The rate of change of f','The maximum of f','The integral of f'], correctIndex:1, explanation:'The derivative gives the instantaneous rate of change — the slope of the tangent line at any point.', difficulty:1 },
    { id:'mc2', question:'∫ 2x dx equals:', options:['x²','x² + C','2x²','x + C'], correctIndex:1, explanation:'The antiderivative of 2x is x² + C (constant of integration).', difficulty:1 },
    { id:'mc3', question:'The Fundamental Theorem of Calculus connects:', options:['Algebra and geometry','Derivatives and integrals','Limits and series','Vectors and matrices'], correctIndex:1, explanation:'It states that differentiation and integration are inverse operations.', difficulty:2 },
    { id:'mc4', question:'What is a limit?', options:['The maximum value','What a function approaches as input approaches a value','The minimum value','The average value'], correctIndex:1, explanation:'Limits describe the behavior of functions near a point, even if the function isn\'t defined there.', difficulty:1 },
    { id:'mc5', question:'The derivative of sin(x) is:', options:['cos(x)','-cos(x)','sin(x)','-sin(x)'], correctIndex:0, explanation:'d/dx[sin(x)] = cos(x). This is a fundamental derivative to memorize.', difficulty:1 },
  ],
  'math_linear_algebra': [
    { id:'la1', question:'A matrix with 3 rows and 2 columns has dimensions:', options:['2×3','3×2','3×3','2×2'], correctIndex:1, explanation:'Matrix dimensions are rows × columns, so 3 rows and 2 columns = 3×2 matrix.', difficulty:1 },
    { id:'la2', question:'What is the determinant used for?', options:['Adding matrices','Checking if a matrix is invertible','Multiplying vectors','Transposing'], correctIndex:1, explanation:'A matrix is invertible if and only if its determinant is non-zero.', difficulty:2 },
    { id:'la3', question:'Eigenvalues of a matrix satisfy:', options:['A + v = λv','Av = λv','A - v = 0','Av = v + λ'], correctIndex:1, explanation:'Av = λv: the matrix A scales the eigenvector v by the eigenvalue λ without changing direction.', difficulty:3 },
    { id:'la4', question:'The transpose of a matrix swaps:', options:['Rows and columns','Diagonal elements','All elements to zero','Eigenvalues'], correctIndex:0, explanation:'Transpose A^T swaps rows and columns: element (i,j) becomes (j,i).', difficulty:1 },
    { id:'la5', question:'The dot product of two perpendicular vectors is:', options:['1','0','Infinity','-1'], correctIndex:1, explanation:'Perpendicular (orthogonal) vectors have a dot product of zero.', difficulty:2 },
  ],
  'bio_dna': [
    { id:'dn1', question:'DNA is made of how many strands?', options:['1','2','3','4'], correctIndex:1, explanation:'DNA is a double helix — two complementary strands wound around each other.', difficulty:1 },
    { id:'dn2', question:'Adenine pairs with:', options:['Cytosine','Guanine','Thymine','Uracil'], correctIndex:2, explanation:'In DNA: A-T (adenine-thymine) and G-C (guanine-cytosine). In RNA: A-U (adenine-uracil).', difficulty:1 },
    { id:'dn3', question:'Which enzyme builds the new DNA strand during replication?', options:['RNA polymerase','DNA polymerase','Helicase','Ligase'], correctIndex:1, explanation:'DNA polymerase synthesizes the new strand by adding complementary nucleotides in the 5\'→3\' direction.', difficulty:2 },
    { id:'dn4', question:'DNA replication is described as:', options:['Conservative','Dispersive','Semi-conservative','Destructive'], correctIndex:2, explanation:'Each new DNA molecule has one original strand and one newly synthesized strand.', difficulty:2 },
    { id:'dn5', question:'The human genome contains approximately how many protein-coding genes?', options:['200','2,000','20,000','200,000'], correctIndex:2, explanation:'The human genome has about 20,000 protein-coding genes across 23 pairs of chromosomes.', difficulty:2 },
  ],
  'bio_genetics': [
    { id:'ge1', question:'If both parents are Aa (heterozygous), what ratio of offspring will show the dominant phenotype?', options:['1/4','1/2','3/4','All'], correctIndex:2, explanation:'Aa × Aa = 1 AA : 2 Aa : 1 aa. Three out of four (AA + Aa + Aa) show the dominant phenotype.', difficulty:2 },
    { id:'ge2', question:'Genotype refers to:', options:['Physical appearance','Genetic makeup','Dominant traits only','Environment effects'], correctIndex:1, explanation:'Genotype is the set of alleles an organism carries. Phenotype is the observable expression.', difficulty:1 },
    { id:'ge3', question:'What is a Punnett square used for?', options:['DNA sequencing','Predicting offspring genotype ratios','Measuring mutations','Protein folding'], correctIndex:1, explanation:'Punnett squares are grid tools that predict the probability of offspring genotypes from parent crosses.', difficulty:1 },
    { id:'ge4', question:'Mendel\'s Law of Segregation states:', options:['Genes blend together','Allele pairs separate during gamete formation','All traits are dominant','Genes are on the same chromosome'], correctIndex:1, explanation:'Each gamete receives only one allele from each pair, and pairs separate independently.', difficulty:2 },
    { id:'ge5', question:'A homozygous organism has:', options:['Two different alleles','Two identical alleles','No alleles','Three alleles'], correctIndex:1, explanation:'Homozygous means both alleles are the same (AA or aa). Heterozygous means different (Aa).', difficulty:1 },
  ],
  'econ_supply_demand': [
    { id:'sd1', question:'When price increases, quantity demanded typically:', options:['Increases','Decreases','Stays the same','Becomes zero'], correctIndex:1, explanation:'Law of demand: price and quantity demanded are inversely related (downward-sloping demand curve).', difficulty:1 },
    { id:'sd2', question:'Market equilibrium occurs when:', options:['Demand is zero','Supply equals demand','Price is highest','Government sets the price'], correctIndex:1, explanation:'At equilibrium, quantity supplied equals quantity demanded — no shortage or surplus.', difficulty:1 },
    { id:'sd3', question:'A shift in the demand curve is caused by:', options:['Price change','Income change','Movement along the curve','Supply change'], correctIndex:1, explanation:'Non-price factors (income, tastes, substitutes) shift the entire demand curve. Price changes cause movements along the curve.', difficulty:2 },
    { id:'sd4', question:'A price ceiling set below equilibrium creates:', options:['A surplus','A shortage','No effect','Higher prices'], correctIndex:1, explanation:'Below-equilibrium ceilings mean Qd > Qs — a shortage. Example: rent control.', difficulty:2 },
    { id:'sd5', question:'Consumer surplus is:', options:['Total spending','Difference between willingness to pay and actual price','Excess supply','Government subsidy'], correctIndex:1, explanation:'Consumer surplus = max price willing to pay - actual price paid. It measures buyer benefit.', difficulty:2 },
  ],
  'chem_atomic_structure': [
    { id:'as1', question:'The atomic number of an element equals the number of:', options:['Neutrons','Electrons only','Protons','Protons + neutrons'], correctIndex:2, explanation:'Atomic number = number of protons, which defines the element. In a neutral atom, protons = electrons.', difficulty:1 },
    { id:'as2', question:'Electrons are found in:', options:['The nucleus','Orbitals around the nucleus','Between atoms','Nowhere specific'], correctIndex:1, explanation:'Electrons occupy orbitals — probability regions around the nucleus, organized into shells and subshells.', difficulty:1 },
    { id:'as3', question:'The maximum electrons in the second shell (n=2) is:', options:['2','4','8','18'], correctIndex:2, explanation:'Max electrons per shell = 2n². For n=2: 2(4) = 8 electrons (2 in 2s + 6 in 2p).', difficulty:2 },
    { id:'as4', question:'Isotopes differ in the number of:', options:['Protons','Electrons','Neutrons','All of the above'], correctIndex:2, explanation:'Isotopes have the same number of protons (same element) but different neutrons (different mass).', difficulty:1 },
    { id:'as5', question:'Valence electrons determine an atom\'s:', options:['Mass','Chemical reactivity','Nuclear stability','Color'], correctIndex:1, explanation:'Valence electrons (outermost shell) participate in bonding and determine chemical properties.', difficulty:1 },
  ],
};

/**
 * Get quiz questions for a topic filtered by difficulty.
 * @param {string} topicId
 * @param {number} [difficulty] - 1, 2, or 3. If omitted, all difficulties.
 * @param {number} [count=3] - Number of questions to return.
 * @returns {object[]}
 */
export function getQuizForTopic(topicId, difficulty, count = 3) {
  let questions = quizBank[topicId] || [];
  if (difficulty) {
    questions = questions.filter(q => q.difficulty === difficulty);
  }
  // Shuffle and take count
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Generate an adaptive quiz based on past performance.
 * @param {string} topicId
 * @param {number[]} pastScores - Array of past score percentages (0-100).
 * @returns {object[]}
 */
export function generateAdaptiveQuiz(topicId, pastScores = []) {
  const avgScore = pastScores.length > 0
    ? pastScores.reduce((a, b) => a + b, 0) / pastScores.length
    : 50;

  let difficulty;
  if (avgScore >= 80) difficulty = 3;       // Hard
  else if (avgScore >= 50) difficulty = 2;  // Medium
  else difficulty = 1;                       // Easy

  let questions = getQuizForTopic(topicId, difficulty, 3);
  // If not enough at target difficulty, fill with any
  if (questions.length < 3) {
    const all = getQuizForTopic(topicId, undefined, 5);
    const ids = new Set(questions.map(q => q.id));
    for (const q of all) {
      if (!ids.has(q.id) && questions.length < 3) {
        questions.push(q);
        ids.add(q.id);
      }
    }
  }
  return questions;
}

/**
 * Get all available topic IDs that have quizzes.
 * @returns {string[]}
 */
export function getQuizTopics() {
  return Object.keys(quizBank);
}
