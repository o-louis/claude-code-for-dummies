export type ConceptId = 'skills' | 'subagents' | 'mcp' | 'hooks'

export interface Concept {
  id: ConceptId
  index: string
  name: string
  tagline: string
  analogy: {
    title: string
    line: string
  }
  pitch: string
  howItWorks: string[]
  example: {
    prompt: string
    result: string
  }
  command: string
  accent: 'green' | 'cyan' | 'purple' | 'orange'
  hexAccent: string
  icon: string
}

const concepts: Concept[] = [
  {
    id: 'skills',
    index: '01',
    name: 'Skills',
    tagline: 'Abilities Claude can pick up on demand',
    analogy: {
      title: 'The Swiss Army knife',
      line: 'Every skill is a tool folded inside the handle. Claude pulls out the right one exactly when it needs it.',
    },
    pitch:
      "A Skill is a small file that teaches Claude how to do X. When what you ask looks like X, Claude unfolds the tool and follows the recipe.",
    howItWorks: [
      "You write a tiny markdown file describing a skill (e.g. \"how to write a changelog\").",
      "You drop it in the right folder — Claude picks it up automatically.",
      "When your request matches, Claude reads the file and applies the recipe.",
    ],
    example: {
      prompt: 'Can you generate a changelog from the latest commits?',
      result: '[skill: changelog] → reads the file → produces a clean CHANGELOG.md',
    },
    command: '$ claude --explain skills',
    accent: 'green',
    hexAccent: '#00ffa3',
    icon: 'lucide:swiss-franc',
  },
  {
    id: 'subagents',
    index: '02',
    name: 'Subagents',
    tagline: 'A team of specialized interns you can delegate to',
    analogy: {
      title: 'The intern team',
      line: "You're the project lead. You send an intern to read 100 files; they come back with a summary. Your desk stays clean.",
    },
    pitch:
      "A subagent is a separate instance of Claude that runs a focused job in parallel, without cluttering your main context. It comes back with the result and nothing else.",
    howItWorks: [
      "You describe a specialized agent (e.g. \"code-reviewer\").",
      "Main Claude delegates to it whenever it hits that kind of task.",
      "The subagent works in its own bubble and hands you back a report.",
    ],
    example: {
      prompt: "Find every spot in the repo where we still use the old auth API.",
      result: "[subagent: Explore] → scans 400 files → returns a list of 12 locations",
    },
    command: '$ claude --explain subagents',
    accent: 'cyan',
    hexAccent: '#5cf2ff',
    icon: 'lucide:users-round',
  },
  {
    id: 'mcp',
    index: '03',
    name: 'MCP',
    tagline: 'A universal port to plug Claude into the world',
    analogy: {
      title: 'The USB-C port',
      line: "No more custom cable for every service. MCP is the universal port: one protocol, a thousand connectors.",
    },
    pitch:
      "MCP (Model Context Protocol) is the standard that lets Claude plug into GitHub, Slack, your database, your internal tool — without building a one-off bridge every time.",
    howItWorks: [
      "A service ships an MCP server (GitHub has one, Notion has one, and so on).",
      "You wire Claude to that server with a line of config.",
      "Claude can now read from and write to that service like it has a dedicated cable.",
    ],
    example: {
      prompt: 'Open a PR with this diff on repo X.',
      result: '[MCP: github] → calls the GitHub API through the MCP server → PR opened',
    },
    command: '$ claude --explain mcp',
    accent: 'purple',
    hexAccent: '#b66cff',
    icon: 'lucide:plug-zap',
  },
  {
    id: 'hooks',
    index: '04',
    name: 'Hooks',
    tagline: 'Automations that react to what Claude does',
    analogy: {
      title: 'Smart home automations',
      line: '"When I get home, turn on the lights." Same idea here: when an event fires, your script runs on its own.',
    },
    pitch:
      "A Hook is a script you attach to an event (\"before an edit\", \"after a commit\"). You don't ask for anything — it runs by itself at the right moment.",
    howItWorks: [
      "You declare a hook in your config: event + command.",
      "When Claude triggers that event (e.g. PostToolUse), the hook fires.",
      "Perfect for linting, formatting, notifications, or a guardrail before a push.",
    ],
    example: {
      prompt: '(invisible — you never ask for it)',
      result: '[hook: PostToolUse → prettier] → auto-formats the file Claude just edited',
    },
    command: '$ claude --explain hooks',
    accent: 'orange',
    hexAccent: '#ff9558',
    icon: 'lucide:zap',
  },
]

export const useConcepts = () => {
  const list = readonly(concepts)
  const byId = (id: ConceptId) => concepts.find((c) => c.id === id)
  return { list, byId }
}
