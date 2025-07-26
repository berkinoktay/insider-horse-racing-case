import type { Column } from '@/types'

export const MAX_HORSES = 20
export const HORSES_PER_RACE = 10

export const HORSE_NAMES = [
  'Thunderbolt',
  'Shadowfax',
  'Black Beauty',
  'Seabiscuit',
  'Secretariat',
  "Man o' War",
  'War Admiral',
  'Citation',
  'Phar Lap',
  'Eclipse',
  'Bucephalus',
  'Rocinante',
  'Pegasus',
  'Hidalgo',
  'Joey',
  'Artax',
  'Flicka',
  'Brego',
  'Spirit',
  'Bullseye',
]

export const HORSE_COLORS = [
  '#e6194b', // kırmızı
  '#3cb44b', // yeşil
  '#ffe119', // sarı
  '#0082c8', // mavi
  '#f58231', // turuncu
  '#911eb4', // mor
  '#46f0f0', // camgöbeği
  '#f032e6', // pembe
  '#d2f53c', // açık yeşil
  '#fabebe', // açık pembe
  '#008080', // koyu camgöbeği
  '#e6beff', // lila
  '#aa6e28', // kahverengi
  '#fffac8', // krem
  '#800000', // bordo
  '#aaffc3', // mint
  '#808000', // zeytin
  '#ffd8b1', // açık turuncu
  '#000080', // lacivert
  '#808080', // gri
]

export const RACE_RESULTS_COLUMNS: Column[] = [
  {
    key: 'position',
    label: 'Pos',
  },
  {
    key: 'horse',
    label: 'Horse',
  },
  {
    key: 'time',
    label: 'Time',
  },
]
