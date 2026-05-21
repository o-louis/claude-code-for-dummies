export type TerminalLineKind =
  | 'cmd'
  | 'out'
  | 'dim'
  | 'skill'
  | 'subagent'
  | 'mcp'
  | 'hook'
  | 'error'
  | 'success'
  | 'highlight'

export interface TerminalLine {
  text: string
  kind: TerminalLineKind
}

export type CommandEffect = { type: 'clear' } | { type: 'scroll'; target: string }

export interface TerminalCommand {
  name: string
  description: string
  output: TerminalLine[]
  effect?: CommandEffect
}

const conceptCommands: TerminalCommand[] = [
  {
    name: 'claude /skills',
    description: 'Show what Skills are',
    output: [
      { text: '[skill] Skills', kind: 'skill' },
      { text: 'Small markdown files that teach Claude how to do X.', kind: 'out' },
      { text: 'When your request looks like X, Claude unfolds the recipe.', kind: 'out' },
      { text: 'analogy: the swiss army knife.', kind: 'dim' },
      { text: '→ scrolling to the full section…', kind: 'success' },
    ],
    effect: { type: 'scroll', target: 'concepts' },
  },
  {
    name: 'claude /agents',
    description: 'Show what Subagents are',
    output: [
      { text: '[subagent] Subagents', kind: 'subagent' },
      { text: 'A separate instance of Claude that runs a focused job in parallel.', kind: 'out' },
      { text: "It works in its own bubble and hands back the result — your main context stays clean.", kind: 'out' },
      { text: 'analogy: a team of specialized interns.', kind: 'dim' },
      { text: '→ scrolling to the full section…', kind: 'success' },
    ],
    effect: { type: 'scroll', target: 'concepts' },
  },
  {
    name: 'claude /mcp',
    description: 'Show what MCP is',
    output: [
      { text: '[mcp] Model Context Protocol', kind: 'mcp' },
      { text: 'A standard that lets Claude plug into GitHub, Slack, your DB, your tools…', kind: 'out' },
      { text: 'One protocol, many connectors — no custom bridge each time.', kind: 'out' },
      { text: 'analogy: the USB-C port.', kind: 'dim' },
      { text: '→ scrolling to the full section…', kind: 'success' },
    ],
    effect: { type: 'scroll', target: 'concepts' },
  },
  {
    name: 'claude /hooks',
    description: 'Show what Hooks are',
    output: [
      { text: '[hook] Hooks', kind: 'hook' },
      { text: 'Scripts attached to events ("before edit", "after commit").', kind: 'out' },
      { text: "You don't ask for them — they run by themselves at the right moment.", kind: 'out' },
      { text: 'analogy: smart home automations.', kind: 'dim' },
      { text: '→ scrolling to the full section…', kind: 'success' },
    ],
    effect: { type: 'scroll', target: 'concepts' },
  },
]

const extraCommands: TerminalCommand[] = [
  {
    name: 'claude --version',
    description: 'Print the version',
    output: [
      { text: 'claude-code-for-dummies v1.0.0', kind: 'highlight' },
      { text: '  4 concepts · 4 analogies · 0 jargon', kind: 'dim' },
      { text: '  built with Nuxt, Tailwind, and a healthy dose of neon.', kind: 'dim' },
    ],
  },
  {
    name: 'clear',
    description: 'Clear the terminal',
    output: [],
    effect: { type: 'clear' },
  },
]

const allButHelp = [...conceptCommands, ...extraCommands]

const helpCommand: TerminalCommand = {
  name: 'claude /help',
  description: 'List available commands',
  output: [
    { text: 'available commands:', kind: 'dim' },
    { text: `  ${'claude /help'.padEnd(20)} — List available commands`, kind: 'out' },
    ...allButHelp.map((c) => ({
      text: `  ${c.name.padEnd(20)} — ${c.description}`,
      kind: 'out' as const,
    })),
    { text: '', kind: 'out' },
    { text: 'tip: ↑/↓ for history, Tab to autocomplete.', kind: 'dim' },
  ],
}

const commands: TerminalCommand[] = [helpCommand, ...allButHelp]

export const useTerminalCommands = () => {
  const list = readonly(commands)

  const findExact = (input: string): TerminalCommand | undefined => {
    const trimmed = input.trim()
    return commands.find((c) => c.name === trimmed)
  }

  const findSuggestion = (input: string): TerminalCommand | undefined => {
    const trimmed = input.trim()
    if (!trimmed) return undefined
    return commands.find((c) => c.name.startsWith(trimmed) && c.name !== trimmed)
  }

  const unknownOutput = (input: string): TerminalLine[] => [
    { text: `command not found: ${input.trim()}`, kind: 'error' },
    { text: 'try: claude /help', kind: 'dim' },
  ]

  return { list, findExact, findSuggestion, unknownOutput }
}
