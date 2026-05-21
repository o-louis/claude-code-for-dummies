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
    tagline: 'Des compétences que Claude apprend à la demande',
    analogy: {
      title: 'Le couteau suisse',
      line: 'Chaque skill est un outil replié dans le manche. Claude déplie celui dont il a besoin, quand il en a besoin.',
    },
    pitch:
      "Un Skill, c'est un fichier qui explique à Claude « comment faire X ». Quand ta demande ressemble à X, il déplie l'outil et suit la fiche.",
    howItWorks: [
      "Tu écris un petit fichier markdown qui décrit une compétence (ex : « comment rédiger un changelog »).",
      "Tu le déposes au bon endroit, Claude le détecte tout seul.",
      "Quand ta demande matche, Claude lit la fiche et applique la recette.",
    ],
    example: {
      prompt: 'Tu peux générer un changelog à partir des derniers commits ?',
      result: '[skill: changelog] → lit la fiche → produit un CHANGELOG.md propre',
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
    tagline: 'Une équipe de stagiaires spécialisés à qui déléguer',
    analogy: {
      title: "L'équipe de stagiaires",
      line: "Tu es le chef de projet. Tu envoies un stagiaire lire 100 fichiers, il revient avec un résumé. Ton bureau reste propre.",
    },
    pitch:
      "Un subagent, c'est une instance de Claude qui part faire un job précis en parallèle, sans encombrer ton contexte principal. Il revient juste avec le résultat.",
    howItWorks: [
      "Tu décris un agent spécialisé (ex : « code-reviewer »).",
      "Claude principal le délègue quand il rencontre ce type de tâche.",
      "Le subagent bosse dans sa propre bulle et te renvoie un rapport.",
    ],
    example: {
      prompt: "Cherche dans tout le repo où on utilise l'ancienne API d'auth.",
      result: "[subagent: Explore] → fouille 400 fichiers → revient avec une liste de 12 endroits",
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
    tagline: 'Une prise universelle pour brancher Claude au monde',
    analogy: {
      title: 'La prise USB-C',
      line: "Pas besoin d'un câble différent pour chaque service. MCP, c'est la prise universelle : un protocole, mille connecteurs.",
    },
    pitch:
      "MCP (Model Context Protocol), c'est la norme qui permet à Claude de se brancher à GitHub, Slack, ta base de données, ton outil interne, sans bricolage maison à chaque fois.",
    howItWorks: [
      "Un service publie un serveur MCP (GitHub le fait, Notion le fait, etc).",
      "Tu connectes Claude à ce serveur (une ligne de config).",
      "Claude peut maintenant lire/écrire dans ce service comme s'il avait un câble dédié.",
    ],
    example: {
      prompt: 'Ouvre une PR avec ce diff sur le repo X.',
      result: '[MCP: github] → appelle l\'API GitHub via le serveur MCP → PR créée',
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
    tagline: 'Des automatismes qui réagissent à ce que fait Claude',
    analogy: {
      title: 'La routine domotique',
      line: "« Quand je rentre à la maison, allume la lumière. » Pareil ici : quand un événement arrive, ton script se lance tout seul.",
    },
    pitch:
      "Un Hook, c'est un script que tu branches sur un événement (« avant un edit », « après un commit »). Tu ne demandes rien, ça s'exécute tout seul au bon moment.",
    howItWorks: [
      "Tu déclares un hook dans la config : événement + commande.",
      "Quand Claude déclenche cet événement (ex : PostToolUse), le hook part.",
      "Idéal pour lint, format, notif, garde-fou avant un push.",
    ],
    example: {
      prompt: '(invisible — tu ne le demandes pas)',
      result: '[hook: PostToolUse → prettier] → formate auto le fichier qui vient d\'être édité',
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
