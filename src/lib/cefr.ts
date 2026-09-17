export type CefrCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type CefrLevel = {
  code: CefrCode
  name: string
  learnerProfile: string
  objectives: string[]
  skills: {
    speaking: string
    listening: string
    reading: string
    writing: string
  }
  progression: string
  next: CefrCode | null
}

export const CEFR_LEVELS: CefrLevel[] = [
  {
    code: 'A1',
    name: 'Beginner',
    learnerProfile: 'For people starting French, or rebuilding the very first basics.',
    objectives: [
      'Introduce yourself and handle simple everyday exchanges',
      'Understand familiar words and slow, clear speech',
      'Read short notices, forms, and simple messages',
    ],
    skills: {
      speaking: 'Simple phrases about yourself, family, and immediate needs',
      listening: 'Familiar words when people speak slowly and clearly',
      reading: 'Very short texts: signs, menus, basic forms',
      writing: 'Short personal details and simple notes',
    },
    progression: 'A1 typically opens the door to independent travel phrases and A2 study.',
    next: 'A2',
  },
  {
    code: 'A2',
    name: 'Elementary',
    learnerProfile: 'For learners who can already manage greetings and want everyday independence.',
    objectives: [
      'Describe routine life, work, and simple plans',
      'Follow clear, everyday conversations on familiar topics',
      'Write short messages about immediate needs',
    ],
    skills: {
      speaking: 'Short exchanges on familiar topics',
      listening: 'Simple information in shops, travel, and class',
      reading: 'Short personal letters and straightforward articles',
      writing: 'Simple connected sentences about daily life',
    },
    progression: 'A2 prepares you for longer conversation and B1 independence.',
    next: 'B1',
  },
  {
    code: 'B1',
    name: 'Intermediate',
    learnerProfile: 'For learners who want to handle most travel, study, and workplace situations.',
    objectives: [
      'Explain opinions, experiences, and plans with more detail',
      'Follow the main points of clear standard speech',
      'Produce connected text on familiar subjects',
    ],
    skills: {
      speaking: 'Sustained conversation on familiar and some new topics',
      listening: 'Radio, class, and conversation when language is standard',
      reading: 'Straightforward factual texts and correspondence',
      writing: 'Simple connected essays, emails, and descriptions',
    },
    progression: 'B1 is a common threshold for more independent study and some exam tracks.',
    next: 'B2',
  },
  {
    code: 'B2',
    name: 'Upper Intermediate',
    learnerProfile: 'For learners who need more precise, confident French for study or work.',
    objectives: [
      'Argue a point and interact with native-level speakers more fluently',
      'Understand extended speech and complex argument',
      'Write clear, detailed text on a wide range of subjects',
    ],
    skills: {
      speaking: 'Spontaneous interaction with fewer pauses and more nuance',
      listening: 'Lectures, films, and discussions in standard French',
      reading: 'Articles, reports, and contemporary prose',
      writing: 'Detailed essays, reports, and reasoned opinions',
    },
    progression: 'B2 is often the level associated with more demanding academic or professional use.',
    next: 'C1',
  },
  {
    code: 'C1',
    name: 'Advanced',
    learnerProfile: 'For learners aiming at flexible, well-structured French in complex settings.',
    objectives: [
      'Express ideas fluently without obvious searching for words',
      'Understand implicit meaning in demanding texts and speech',
      'Produce well-organised, detailed writing for professional or academic use',
    ],
    skills: {
      speaking: 'Extended, well-structured speech with nuance',
      listening: 'Long, demanding spoken language, including implied meaning',
      reading: 'Long, complex factual and literary texts',
      writing: 'Clear, well-structured texts in an appropriate style',
    },
    progression: 'C1 supports high-level academic, professional, or cultural use of French.',
    next: 'C2',
  },
  {
    code: 'C2',
    name: 'Mastery',
    learnerProfile: 'For learners working toward near-native ease across specialised topics.',
    objectives: [
      'Understand virtually everything heard or read with ease',
      'Summarise and reconstruct arguments from different sources',
      'Express yourself very fluently, precisely, and spontaneously',
    ],
    skills: {
      speaking: 'Effortless, precise expression even in complex discussion',
      listening: 'Any spoken language, live or broadcast, at natural speed',
      reading: 'Abstract, structurally complex, or highly colloquial texts',
      writing: 'Fine-grained, well-argued writing suited to specialised contexts',
    },
    progression: 'C2 is the highest CEFR level. Fluenciel will list it as available only if a course is published.',
    next: null,
  },
]

export function normalizeLevel(level: string | null | undefined): CefrCode | null {
  if (!level) return null
  const match = level.toUpperCase().match(/A1|A2|B1|B2|C1|C2/)
  return (match?.[0] as CefrCode) ?? null
}
