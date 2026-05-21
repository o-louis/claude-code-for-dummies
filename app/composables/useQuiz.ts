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
    situation: 'Je veux que Claude formate automatiquement mon code après chaque édition, sans avoir à le demander.',
    hint: 'Ça se déclenche tout seul sur un événement.',
    answer: 'hooks',
    explanation:
      'C\'est exactement le boulot d\'un Hook : un événement (« édition de fichier ») déclenche un script (prettier) automatiquement.',
  },
  {
    id: 2,
    situation: 'Je veux apprendre à Claude ma propre méthode pour rédiger des messages de commit, et qu\'il l\'utilise à chaque fois.',
    hint: 'Une fiche que Claude consulte quand il en a besoin.',
    answer: 'skills',
    explanation:
      'C\'est un Skill : tu écris une fiche « comment je veux mes commits » et Claude l\'applique dès que le besoin se présente.',
  },
  {
    id: 3,
    situation: 'Je veux que Claude puisse ouvrir des PRs et commenter des issues sur mon GitHub.',
    hint: 'Il faut le brancher à un service externe.',
    answer: 'mcp',
    explanation:
      'MCP est le pont vers les services externes. Le serveur MCP GitHub donne à Claude les bons outils pour interagir avec ton repo.',
  },
  {
    id: 4,
    situation: 'Je veux qu\'une recherche dans 500 fichiers ne pollue pas ma conversation principale avec des tonnes de résultats.',
    hint: 'Déléguer le boulot à quelqu\'un d\'autre.',
    answer: 'subagents',
    explanation:
      'Un Subagent fait le boulot dans sa propre bulle et te renvoie juste la synthèse. Ton contexte reste propre.',
  },
  {
    id: 5,
    situation: 'Je veux empêcher Claude de pousser sur main sans tests verts.',
    hint: 'Un garde-fou qui s\'exécute au bon moment.',
    answer: 'hooks',
    explanation:
      'Un Hook PreToolUse peut bloquer une commande avant qu\'elle ne s\'exécute. Parfait pour un garde-fou.',
  },
  {
    id: 6,
    situation: 'Je veux connecter Claude à ma base Postgres pour qu\'il puisse écrire des requêtes et voir les résultats.',
    hint: 'Brancher un service externe via un protocole standard.',
    answer: 'mcp',
    explanation:
      'Encore MCP : un serveur MCP pour Postgres expose la base à Claude de façon propre, sans bricolage maison.',
  },
]

export const useQuiz = () => {
  const list = readonly(questions)
  return { list }
}
