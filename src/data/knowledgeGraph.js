/**
 * @fileoverview NEXUS Knowledge Graph
 * Topic relationship graph with nodes and edges connecting knowledge base topics.
 * Supports prerequisite, related, and subtopic relationships.
 * @module data/knowledgeGraph
 */

export const knowledgeGraph = {
  nodes: [
    // Computer Science - Data Structures
    { id: 'cs_arrays', label: 'Arrays', category: 'Computer Science', group: 'ds' },
    { id: 'cs_linked_lists', label: 'Linked Lists', category: 'Computer Science', group: 'ds' },
    { id: 'cs_stacks', label: 'Stacks', category: 'Computer Science', group: 'ds' },
    { id: 'cs_queues', label: 'Queues', category: 'Computer Science', group: 'ds' },
    { id: 'cs_trees', label: 'Trees', category: 'Computer Science', group: 'ds' },
    { id: 'cs_bst', label: 'Binary Search Trees', category: 'Computer Science', group: 'ds' },
    { id: 'cs_hash_tables', label: 'Hash Tables', category: 'Computer Science', group: 'ds' },
    { id: 'cs_heaps', label: 'Heaps', category: 'Computer Science', group: 'ds' },
    { id: 'cs_graphs', label: 'Graphs', category: 'Computer Science', group: 'ds' },
    { id: 'cs_tries', label: 'Tries', category: 'Computer Science', group: 'ds' },
    // CS - Algorithms
    { id: 'cs_binary_search', label: 'Binary Search', category: 'Computer Science', group: 'algo' },
    { id: 'cs_sorting', label: 'Sorting Algorithms', category: 'Computer Science', group: 'algo' },
    { id: 'cs_recursion', label: 'Recursion', category: 'Computer Science', group: 'algo' },
    { id: 'cs_dynamic_programming', label: 'Dynamic Programming', category: 'Computer Science', group: 'algo' },
    { id: 'cs_bfs', label: 'BFS', category: 'Computer Science', group: 'algo' },
    { id: 'cs_dfs', label: 'DFS', category: 'Computer Science', group: 'algo' },
    { id: 'cs_dijkstra', label: "Dijkstra's Algorithm", category: 'Computer Science', group: 'algo' },
    { id: 'cs_greedy', label: 'Greedy Algorithms', category: 'Computer Science', group: 'algo' },
    { id: 'cs_backtracking', label: 'Backtracking', category: 'Computer Science', group: 'algo' },
    { id: 'cs_time_complexity', label: 'Time Complexity', category: 'Computer Science', group: 'algo' },
    // CS - OS
    { id: 'cs_processes', label: 'Processes', category: 'Computer Science', group: 'os' },
    { id: 'cs_threads', label: 'Threads', category: 'Computer Science', group: 'os' },
    { id: 'cs_scheduling', label: 'CPU Scheduling', category: 'Computer Science', group: 'os' },
    { id: 'cs_deadlocks', label: 'Deadlocks', category: 'Computer Science', group: 'os' },
    { id: 'cs_memory_management', label: 'Memory Management', category: 'Computer Science', group: 'os' },
    // CS - DB
    { id: 'cs_sql', label: 'SQL', category: 'Computer Science', group: 'db' },
    { id: 'cs_normalization', label: 'Normalization', category: 'Computer Science', group: 'db' },
    // CS - Networking
    { id: 'cs_osi_model', label: 'OSI Model', category: 'Computer Science', group: 'net' },
    { id: 'cs_tcp_ip', label: 'TCP/IP', category: 'Computer Science', group: 'net' },
    { id: 'cs_http', label: 'HTTP/HTTPS', category: 'Computer Science', group: 'net' },
    // CS - AI/ML
    { id: 'cs_machine_learning', label: 'Machine Learning', category: 'Computer Science', group: 'ml' },
    { id: 'cs_neural_networks', label: 'Neural Networks', category: 'Computer Science', group: 'ml' },
    { id: 'cs_deep_learning', label: 'Deep Learning', category: 'Computer Science', group: 'ml' },
    { id: 'cs_data_science', label: 'Data Science', category: 'Computer Science', group: 'ml' },
    // CS - Web
    { id: 'cs_html_css', label: 'HTML & CSS', category: 'Computer Science', group: 'web' },
    { id: 'cs_javascript', label: 'JavaScript', category: 'Computer Science', group: 'web' },
    { id: 'cs_react', label: 'React', category: 'Computer Science', group: 'web' },
    { id: 'cs_node_js', label: 'Node.js', category: 'Computer Science', group: 'web' },
    { id: 'cs_rest_api', label: 'REST APIs', category: 'Computer Science', group: 'web' },
    // CS - Other
    { id: 'cs_oop', label: 'OOP', category: 'Computer Science', group: 'se' },
    { id: 'cs_design_patterns', label: 'Design Patterns', category: 'Computer Science', group: 'se' },
    { id: 'cs_git', label: 'Git', category: 'Computer Science', group: 'se' },
    { id: 'cs_cybersecurity', label: 'Cybersecurity', category: 'Computer Science', group: 'se' },
    { id: 'cs_cloud_computing', label: 'Cloud Computing', category: 'Computer Science', group: 'se' },
    { id: 'cs_blockchain', label: 'Blockchain', category: 'Computer Science', group: 'se' },
    // Mathematics
    { id: 'math_algebra', label: 'Algebra', category: 'Mathematics', group: 'math' },
    { id: 'math_calculus', label: 'Calculus', category: 'Mathematics', group: 'math' },
    { id: 'math_linear_algebra', label: 'Linear Algebra', category: 'Mathematics', group: 'math' },
    { id: 'math_probability', label: 'Probability', category: 'Mathematics', group: 'math' },
    { id: 'math_statistics', label: 'Statistics', category: 'Mathematics', group: 'math' },
    { id: 'math_discrete', label: 'Discrete Math', category: 'Mathematics', group: 'math' },
    { id: 'math_trigonometry', label: 'Trigonometry', category: 'Mathematics', group: 'math' },
    { id: 'math_number_theory', label: 'Number Theory', category: 'Mathematics', group: 'math' },
    { id: 'math_combinatorics', label: 'Combinatorics', category: 'Mathematics', group: 'math' },
    { id: 'math_differential_equations', label: 'Differential Equations', category: 'Mathematics', group: 'math' },
    // Physics
    { id: 'phys_newtons_laws', label: "Newton's Laws", category: 'Physics', group: 'phys' },
    { id: 'phys_energy', label: 'Energy & Work', category: 'Physics', group: 'phys' },
    { id: 'phys_thermodynamics', label: 'Thermodynamics', category: 'Physics', group: 'phys' },
    { id: 'phys_electromagnetism', label: 'Electromagnetism', category: 'Physics', group: 'phys' },
    { id: 'phys_quantum', label: 'Quantum Mechanics', category: 'Physics', group: 'phys' },
    { id: 'phys_relativity', label: 'Special Relativity', category: 'Physics', group: 'phys' },
    { id: 'phys_waves', label: 'Waves', category: 'Physics', group: 'phys' },
    { id: 'phys_optics', label: 'Optics', category: 'Physics', group: 'phys' },
    { id: 'phys_kinematics', label: 'Kinematics', category: 'Physics', group: 'phys' },
    { id: 'phys_momentum', label: 'Momentum', category: 'Physics', group: 'phys' },
    // Chemistry
    { id: 'chem_atomic_structure', label: 'Atomic Structure', category: 'Chemistry', group: 'chem' },
    { id: 'chem_periodic_table', label: 'Periodic Table', category: 'Chemistry', group: 'chem' },
    { id: 'chem_chemical_bonding', label: 'Chemical Bonding', category: 'Chemistry', group: 'chem' },
    { id: 'chem_organic', label: 'Organic Chemistry', category: 'Chemistry', group: 'chem' },
    { id: 'chem_reactions', label: 'Chemical Reactions', category: 'Chemistry', group: 'chem' },
    { id: 'chem_acids_bases', label: 'Acids & Bases', category: 'Chemistry', group: 'chem' },
    { id: 'chem_physical', label: 'Physical Chemistry', category: 'Chemistry', group: 'chem' },
    // Biology
    { id: 'bio_cell_biology', label: 'Cell Biology', category: 'Biology', group: 'bio' },
    { id: 'bio_dna', label: 'DNA & Replication', category: 'Biology', group: 'bio' },
    { id: 'bio_genetics', label: 'Genetics', category: 'Biology', group: 'bio' },
    { id: 'bio_evolution', label: 'Evolution', category: 'Biology', group: 'bio' },
    { id: 'bio_ecology', label: 'Ecology', category: 'Biology', group: 'bio' },
    { id: 'bio_photosynthesis', label: 'Photosynthesis', category: 'Biology', group: 'bio' },
    { id: 'bio_protein_synthesis', label: 'Protein Synthesis', category: 'Biology', group: 'bio' },
    { id: 'bio_mitosis', label: 'Mitosis', category: 'Biology', group: 'bio' },
    // History
    { id: 'hist_world_war_1', label: 'World War I', category: 'History', group: 'hist' },
    { id: 'hist_world_war_2', label: 'World War II', category: 'History', group: 'hist' },
    { id: 'hist_cold_war', label: 'Cold War', category: 'History', group: 'hist' },
    { id: 'hist_indian_independence', label: 'Indian Independence', category: 'History', group: 'hist' },
    { id: 'hist_ancient_civilizations', label: 'Ancient Civilizations', category: 'History', group: 'hist' },
    { id: 'hist_french_revolution', label: 'French Revolution', category: 'History', group: 'hist' },
    // Economics
    { id: 'econ_supply_demand', label: 'Supply & Demand', category: 'Economics', group: 'econ' },
    { id: 'econ_gdp', label: 'GDP', category: 'Economics', group: 'econ' },
    { id: 'econ_inflation', label: 'Inflation', category: 'Economics', group: 'econ' },
    { id: 'econ_market_structures', label: 'Market Structures', category: 'Economics', group: 'econ' },
    { id: 'econ_fiscal_policy', label: 'Fiscal Policy', category: 'Economics', group: 'econ' },
    { id: 'econ_monetary_policy', label: 'Monetary Policy', category: 'Economics', group: 'econ' },
    { id: 'econ_elasticity', label: 'Elasticity', category: 'Economics', group: 'econ' },
    { id: 'econ_game_theory', label: 'Game Theory', category: 'Economics', group: 'econ' }
  ],
  edges: [
    // Data Structures prerequisites & relations
    { from: 'cs_arrays', to: 'cs_linked_lists', type: 'prerequisite' },
    { from: 'cs_arrays', to: 'cs_stacks', type: 'prerequisite' },
    { from: 'cs_arrays', to: 'cs_queues', type: 'prerequisite' },
    { from: 'cs_arrays', to: 'cs_hash_tables', type: 'prerequisite' },
    { from: 'cs_arrays', to: 'cs_binary_search', type: 'prerequisite' },
    { from: 'cs_arrays', to: 'cs_sorting', type: 'prerequisite' },
    { from: 'cs_linked_lists', to: 'cs_trees', type: 'prerequisite' },
    { from: 'cs_trees', to: 'cs_bst', type: 'prerequisite' },
    { from: 'cs_trees', to: 'cs_heaps', type: 'prerequisite' },
    { from: 'cs_trees', to: 'cs_graphs', type: 'prerequisite' },
    { from: 'cs_trees', to: 'cs_tries', type: 'prerequisite' },
    { from: 'cs_stacks', to: 'cs_dfs', type: 'related' },
    { from: 'cs_queues', to: 'cs_bfs', type: 'related' },
    { from: 'cs_stacks', to: 'cs_recursion', type: 'related' },
    { from: 'cs_linked_lists', to: 'cs_stacks', type: 'related' },
    { from: 'cs_linked_lists', to: 'cs_queues', type: 'related' },
    // Algorithms
    { from: 'cs_recursion', to: 'cs_dynamic_programming', type: 'prerequisite' },
    { from: 'cs_recursion', to: 'cs_backtracking', type: 'prerequisite' },
    { from: 'cs_recursion', to: 'cs_dfs', type: 'related' },
    { from: 'cs_graphs', to: 'cs_bfs', type: 'prerequisite' },
    { from: 'cs_graphs', to: 'cs_dfs', type: 'prerequisite' },
    { from: 'cs_graphs', to: 'cs_dijkstra', type: 'prerequisite' },
    { from: 'cs_heaps', to: 'cs_dijkstra', type: 'prerequisite' },
    { from: 'cs_bfs', to: 'cs_dijkstra', type: 'related' },
    { from: 'cs_sorting', to: 'cs_greedy', type: 'prerequisite' },
    { from: 'cs_dfs', to: 'cs_backtracking', type: 'related' },
    { from: 'cs_binary_search', to: 'cs_bst', type: 'related' },
    { from: 'cs_arrays', to: 'cs_time_complexity', type: 'related' },
    { from: 'cs_sorting', to: 'cs_time_complexity', type: 'related' },
    // OS
    { from: 'cs_processes', to: 'cs_threads', type: 'prerequisite' },
    { from: 'cs_processes', to: 'cs_scheduling', type: 'prerequisite' },
    { from: 'cs_processes', to: 'cs_memory_management', type: 'prerequisite' },
    { from: 'cs_threads', to: 'cs_deadlocks', type: 'prerequisite' },
    { from: 'cs_processes', to: 'cs_deadlocks', type: 'prerequisite' },
    { from: 'cs_scheduling', to: 'cs_deadlocks', type: 'related' },
    // DB
    { from: 'cs_sql', to: 'cs_normalization', type: 'prerequisite' },
    // Networking
    { from: 'cs_osi_model', to: 'cs_tcp_ip', type: 'prerequisite' },
    { from: 'cs_tcp_ip', to: 'cs_http', type: 'prerequisite' },
    // Web
    { from: 'cs_html_css', to: 'cs_javascript', type: 'prerequisite' },
    { from: 'cs_javascript', to: 'cs_react', type: 'prerequisite' },
    { from: 'cs_javascript', to: 'cs_node_js', type: 'prerequisite' },
    { from: 'cs_http', to: 'cs_rest_api', type: 'prerequisite' },
    { from: 'cs_javascript', to: 'cs_rest_api', type: 'related' },
    { from: 'cs_react', to: 'cs_node_js', type: 'related' },
    // OOP & SE
    { from: 'cs_javascript', to: 'cs_oop', type: 'related' },
    { from: 'cs_oop', to: 'cs_design_patterns', type: 'prerequisite' },
    // AI/ML
    { from: 'math_linear_algebra', to: 'cs_machine_learning', type: 'prerequisite' },
    { from: 'math_statistics', to: 'cs_machine_learning', type: 'prerequisite' },
    { from: 'math_calculus', to: 'cs_neural_networks', type: 'prerequisite' },
    { from: 'math_linear_algebra', to: 'cs_neural_networks', type: 'prerequisite' },
    { from: 'cs_machine_learning', to: 'cs_neural_networks', type: 'prerequisite' },
    { from: 'cs_neural_networks', to: 'cs_deep_learning', type: 'prerequisite' },
    { from: 'cs_machine_learning', to: 'cs_data_science', type: 'related' },
    { from: 'math_statistics', to: 'cs_data_science', type: 'prerequisite' },
    // Other CS
    { from: 'cs_tcp_ip', to: 'cs_cybersecurity', type: 'related' },
    { from: 'cs_http', to: 'cs_cybersecurity', type: 'related' },
    { from: 'cs_tcp_ip', to: 'cs_cloud_computing', type: 'related' },
    { from: 'cs_hash_tables', to: 'cs_blockchain', type: 'related' },
    // Mathematics
    { from: 'math_algebra', to: 'math_calculus', type: 'prerequisite' },
    { from: 'math_algebra', to: 'math_linear_algebra', type: 'prerequisite' },
    { from: 'math_algebra', to: 'math_trigonometry', type: 'prerequisite' },
    { from: 'math_algebra', to: 'math_discrete', type: 'prerequisite' },
    { from: 'math_algebra', to: 'math_probability', type: 'prerequisite' },
    { from: 'math_algebra', to: 'math_number_theory', type: 'prerequisite' },
    { from: 'math_algebra', to: 'math_combinatorics', type: 'prerequisite' },
    { from: 'math_probability', to: 'math_statistics', type: 'prerequisite' },
    { from: 'math_calculus', to: 'math_differential_equations', type: 'prerequisite' },
    { from: 'math_discrete', to: 'cs_graphs', type: 'related' },
    { from: 'math_combinatorics', to: 'math_probability', type: 'related' },
    // Physics
    { from: 'math_algebra', to: 'phys_kinematics', type: 'prerequisite' },
    { from: 'phys_kinematics', to: 'phys_newtons_laws', type: 'prerequisite' },
    { from: 'phys_newtons_laws', to: 'phys_energy', type: 'prerequisite' },
    { from: 'phys_newtons_laws', to: 'phys_momentum', type: 'prerequisite' },
    { from: 'phys_energy', to: 'phys_thermodynamics', type: 'prerequisite' },
    { from: 'math_calculus', to: 'phys_electromagnetism', type: 'prerequisite' },
    { from: 'phys_electromagnetism', to: 'phys_optics', type: 'related' },
    { from: 'math_trigonometry', to: 'phys_waves', type: 'prerequisite' },
    { from: 'phys_waves', to: 'phys_optics', type: 'prerequisite' },
    { from: 'phys_electromagnetism', to: 'phys_quantum', type: 'prerequisite' },
    { from: 'math_linear_algebra', to: 'phys_quantum', type: 'prerequisite' },
    { from: 'phys_newtons_laws', to: 'phys_relativity', type: 'prerequisite' },
    { from: 'math_calculus', to: 'phys_relativity', type: 'prerequisite' },
    // Chemistry
    { from: 'chem_atomic_structure', to: 'chem_periodic_table', type: 'prerequisite' },
    { from: 'chem_periodic_table', to: 'chem_chemical_bonding', type: 'prerequisite' },
    { from: 'chem_chemical_bonding', to: 'chem_organic', type: 'prerequisite' },
    { from: 'chem_chemical_bonding', to: 'chem_reactions', type: 'prerequisite' },
    { from: 'chem_reactions', to: 'chem_acids_bases', type: 'prerequisite' },
    { from: 'chem_reactions', to: 'chem_physical', type: 'prerequisite' },
    { from: 'phys_thermodynamics', to: 'chem_physical', type: 'related' },
    { from: 'phys_quantum', to: 'chem_atomic_structure', type: 'related' },
    // Biology
    { from: 'bio_cell_biology', to: 'bio_dna', type: 'prerequisite' },
    { from: 'bio_cell_biology', to: 'bio_photosynthesis', type: 'prerequisite' },
    { from: 'bio_cell_biology', to: 'bio_mitosis', type: 'prerequisite' },
    { from: 'bio_dna', to: 'bio_genetics', type: 'prerequisite' },
    { from: 'bio_dna', to: 'bio_protein_synthesis', type: 'prerequisite' },
    { from: 'bio_dna', to: 'bio_mitosis', type: 'prerequisite' },
    { from: 'bio_genetics', to: 'bio_evolution', type: 'prerequisite' },
    { from: 'bio_evolution', to: 'bio_ecology', type: 'prerequisite' },
    { from: 'chem_organic', to: 'bio_protein_synthesis', type: 'related' },
    // History
    { from: 'hist_world_war_1', to: 'hist_world_war_2', type: 'prerequisite' },
    { from: 'hist_world_war_2', to: 'hist_cold_war', type: 'prerequisite' },
    { from: 'hist_world_war_2', to: 'hist_indian_independence', type: 'related' },
    { from: 'hist_french_revolution', to: 'hist_world_war_1', type: 'related' },
    // Economics
    { from: 'econ_supply_demand', to: 'econ_elasticity', type: 'prerequisite' },
    { from: 'econ_supply_demand', to: 'econ_market_structures', type: 'prerequisite' },
    { from: 'econ_supply_demand', to: 'econ_gdp', type: 'prerequisite' },
    { from: 'econ_gdp', to: 'econ_inflation', type: 'prerequisite' },
    { from: 'econ_gdp', to: 'econ_fiscal_policy', type: 'prerequisite' },
    { from: 'econ_inflation', to: 'econ_monetary_policy', type: 'prerequisite' },
    { from: 'econ_market_structures', to: 'econ_game_theory', type: 'prerequisite' },
    // Cross-domain
    { from: 'math_statistics', to: 'econ_gdp', type: 'related' },
    { from: 'math_calculus', to: 'econ_elasticity', type: 'related' },
  ]
};

/**
 * Get related topics for a given topic ID.
 * @param {string} topicId
 * @returns {string[]} Array of related topic IDs
 */
export function getRelatedTopics(topicId) {
  const related = new Set();
  knowledgeGraph.edges.forEach(edge => {
    if (edge.from === topicId && edge.type === 'related') related.add(edge.to);
    if (edge.to === topicId && edge.type === 'related') related.add(edge.from);
  });
  return [...related];
}

/**
 * Get prerequisites for a given topic ID.
 * @param {string} topicId
 * @returns {string[]} Array of prerequisite topic IDs
 */
export function getPrerequisites(topicId) {
  return knowledgeGraph.edges
    .filter(e => e.to === topicId && e.type === 'prerequisite')
    .map(e => e.from);
}

/**
 * Get subtopics for a given topic ID.
 * @param {string} topicId
 * @returns {string[]} Array of subtopic IDs
 */
export function getSubtopics(topicId) {
  return knowledgeGraph.edges
    .filter(e => e.from === topicId && e.type === 'subtopic')
    .map(e => e.to);
}

/**
 * Filter nodes by category.
 * @param {string} category
 * @returns {object[]} Filtered nodes
 */
export function getTopicsByCategory(category) {
  return knowledgeGraph.nodes.filter(n => n.category === category);
}

/**
 * BFS shortest path between two topics.
 * @param {string} startId
 * @param {string} endId
 * @returns {string[]} Path of topic IDs, or empty if no path
 */
export function getLearningPath(startId, endId) {
  if (startId === endId) return [startId];
  
  const adjacency = {};
  knowledgeGraph.nodes.forEach(n => { adjacency[n.id] = []; });
  knowledgeGraph.edges.forEach(e => {
    if (adjacency[e.from]) adjacency[e.from].push(e.to);
    if (adjacency[e.to]) adjacency[e.to].push(e.from);
  });

  const visited = new Set([startId]);
  const queue = [[startId]];

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    for (const neighbor of (adjacency[current] || [])) {
      if (neighbor === endId) return [...path, neighbor];
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }
  return [];
}
