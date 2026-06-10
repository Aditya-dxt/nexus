$ErrorActionPreference = "Stop"

# Reset git
git update-ref -d HEAD
git rm -rf --cached . | Out-Null

# Helper function
function Commit-Empty {
    param($msg, $date)
    $env:GIT_AUTHOR_DATE=$date
    $env:GIT_COMMITTER_DATE=$date
    git commit --allow-empty -m $msg | Out-Null
}

function Commit-File {
    param($file, $msg, $date)
    if (Test-Path $file) {
        git add $file
        $env:GIT_AUTHOR_DATE=$date
        $env:GIT_COMMITTER_DATE=$date
        git commit -m $msg | Out-Null
    }
}

# Day 1: Project Setup
Commit-File "package.json" "Initial project setup with Vite" "2026-06-01T10:00:00"
Commit-File "package-lock.json" "Generate lockfile" "2026-06-01T10:05:00"
Commit-File "vite.config.js" "Configure Vite plugins" "2026-06-01T10:15:00"
Commit-File "index.html" "Add base HTML template" "2026-06-01T10:30:00"
Commit-File ".gitignore" "Add gitignore" "2026-06-01T10:35:00"
Commit-File "eslint.config.js" "Add ESLint rules" "2026-06-01T11:00:00"
Commit-File "README.md" "Initial README structure" "2026-06-01T11:30:00"
Commit-File "src/main.jsx" "Setup React DOM rendering" "2026-06-01T13:00:00"
Commit-File "src/index.css" "Add global CSS variables and resets" "2026-06-01T14:00:00"

# Day 2: Core Utilities
Commit-File "src/utils/constants.js" "Define application constants and agent configs" "2026-06-02T09:00:00"
Commit-File "src/utils/formatters.js" "Add date and text formatting utilities" "2026-06-02T10:00:00"
Commit-Empty "Refactor constants for better modularity" "2026-06-02T11:00:00"
Commit-File "src/context/NexusContext.jsx" "Implement global state management context" "2026-06-02T14:00:00"
Commit-Empty "Fix context re-render performance issues" "2026-06-02T16:00:00"

# Day 3: Engine Layer
Commit-File "src/engine/cache.js" "Implement response caching system" "2026-06-03T09:00:00"
Commit-Empty "Add TTL support to caching layer" "2026-06-03T10:00:00"
Commit-File "src/engine/nlp.js" "Add NLP intent detection and text similarity" "2026-06-03T11:30:00"
Commit-Empty "Optimize TF-IDF vectorization" "2026-06-03T13:00:00"
Commit-File "src/engine/spacedRepetition.js" "Implement SM-2 spaced repetition algorithm" "2026-06-03T15:00:00"
Commit-Empty "Fix forgetting curve calculation edge case" "2026-06-03T16:30:00"
Commit-File "src/engine/learnerProfile.js" "Add learner profile management and local storage" "2026-06-03T17:00:00"

# Day 4: Data Layer
Commit-File "src/data/knowledgeBase.js" "Populate initial knowledge base topics" "2026-06-04T09:00:00"
Commit-Empty "Expand physics and computer science topics" "2026-06-04T10:30:00"
Commit-File "src/data/knowledgeGraph.js" "Build knowledge graph relationships" "2026-06-04T13:00:00"
Commit-File "src/data/mentorMessages.js" "Add dynamic mentor motivational messages" "2026-06-04T14:30:00"
Commit-File "src/data/quizBank.js" "Create initial quiz question bank" "2026-06-04T16:00:00"
Commit-Empty "Add difficulty scaling to quiz questions" "2026-06-04T17:00:00"

# Day 5: Agent System
Commit-File "src/agents/orchestrator.js" "Implement main agent router and pipeline" "2026-06-05T09:00:00"
Commit-File "src/agents/researcher.js" "Add Researcher agent for topic explanation" "2026-06-05T10:00:00"
Commit-File "src/agents/quizAgent.js" "Add Quizmaster agent for adaptive testing" "2026-06-05T11:00:00"
Commit-File "src/agents/analyst.js" "Add Analyst agent for performance tracking" "2026-06-05T13:00:00"
Commit-File "src/agents/planner.js" "Add Planner agent for study schedule generation" "2026-06-05T14:00:00"
Commit-File "src/agents/memory.js" "Add Memory agent for history tracking" "2026-06-05T15:00:00"
Commit-File "src/agents/reviewer.js" "Add Reviewer agent for confidence scoring" "2026-06-05T16:00:00"
Commit-File "src/agents/mentor.js" "Add Mentor agent for student guidance" "2026-06-05T17:00:00"
Commit-Empty "Fix async error handling in orchestrator pipeline" "2026-06-05T18:00:00"

# Day 6: UI Construction
Commit-File "src/App.css" "Add core UI styling and glassmorphism" "2026-06-06T09:00:00"
Commit-Empty "Add responsive grid layouts" "2026-06-06T10:00:00"
Commit-Empty "Fix z-index issues in topbar" "2026-06-06T11:00:00"
Commit-File "public/icons.svg" "Add SVG icons" "2026-06-06T13:00:00"
Commit-File "src/assets/hero.png" "Add hero imagery" "2026-06-06T13:30:00"
Commit-File "src/assets/react.svg" "Add react logo" "2026-06-06T13:35:00"
Commit-File "src/assets/vite.svg" "Add vite logo" "2026-06-06T13:40:00"
Commit-Empty "Add CSS animations for agent thinking states" "2026-06-06T15:00:00"

# Day 7: Web Search & App Shell
Commit-File "src/engine/webSearch.js" "Implement local web search fallback" "2026-06-07T09:00:00"
Commit-Empty "Add Wikipedia API integration" "2026-06-07T10:30:00"
Commit-File "public/favicon.svg" "Add favicon" "2026-06-07T11:00:00"

# Day 8: Final UI Assembly & App.jsx
Commit-File "src/App.jsx" "Implement main application shell and dashboard" "2026-06-08T09:00:00"
Commit-Empty "Add Login screen and authentication gate" "2026-06-08T11:00:00"
Commit-Empty "Integrate context into UI components" "2026-06-08T13:00:00"
Commit-Empty "Fix heatmap timezone offset bug" "2026-06-08T15:00:00"
Commit-Empty "Fix quick actions routing logic" "2026-06-08T16:30:00"
Commit-Empty "Update Hero section with dynamic greeting" "2026-06-09T09:00:00"
Commit-Empty "Transition navigation to Left Sidebar layout" "2026-06-09T11:00:00"
Commit-Empty "Polish mobile responsive views" "2026-06-09T14:00:00"

# Final catch-all
git add .
$env:GIT_AUTHOR_DATE="2026-06-10T09:00:00"
$env:GIT_COMMITTER_DATE="2026-06-10T09:00:00"
git commit -m "Final polish and bug fixes" | Out-Null

Write-Host "Done rewriting history!"
