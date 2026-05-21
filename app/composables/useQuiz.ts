import type { ConceptId } from './useConcepts'

export interface QuizQuestion {
  id: number
  situation: string
  hint: string
  answer: ConceptId
  explanation: string
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    situation: 'I want Claude to auto-format my code after every edit, without me asking.',
    hint: 'Something that fires on its own when an event happens.',
    answer: 'hooks',
    explanation:
      'That\'s exactly what a Hook does: an event (\"file edited\") triggers a script (prettier) automatically.',
  },
  {
    id: 2,
    situation: 'I want to teach Claude my own way of writing commit messages, and have it apply that every time.',
    hint: 'A reusable note Claude pulls out when relevant.',
    answer: 'skills',
    explanation:
      'That\'s a Skill: you write a note saying "here\'s how I want commits" and Claude applies it whenever the need shows up.',
  },
  {
    id: 3,
    situation: 'I want Claude to open PRs and comment on issues in my GitHub.',
    hint: 'Connect Claude to an external service.',
    answer: 'mcp',
    explanation:
      'MCP is the bridge to external services. The GitHub MCP server gives Claude the right tools to interact with your repo.',
  },
  {
    id: 4,
    situation: 'I don\'t want a search across 500 files to flood my main conversation with results.',
    hint: 'Delegate the heavy lifting to someone else.',
    answer: 'subagents',
    explanation:
      'A Subagent does the heavy work in its own bubble and only sends back the summary. Your main context stays clean.',
  },
  {
    id: 5,
    situation: 'I want to stop Claude from pushing to main when tests are red.',
    hint: 'A guardrail that runs at the right moment.',
    answer: 'hooks',
    explanation:
      'A PreToolUse Hook can block a command before it runs. Perfect for a guardrail.',
  },
  {
    id: 6,
    situation: 'I want to connect Claude to my Postgres database so it can write queries and see the results.',
    hint: 'Plug an external service in through a standard protocol.',
    answer: 'mcp',
    explanation:
      'Still MCP: a Postgres MCP server exposes your database to Claude cleanly, without any custom plumbing.',
  },
]

export const useQuiz = () => {
  const list = readonly(questions)
  return { list }
}
