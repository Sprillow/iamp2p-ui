export const ZOME_NAME = 'iamp2p_projects'

export const DNA_PATH =
  process.env.NODE_ENV === 'production'
    ? './dna/projects.dna.gz'
    : './dnas/projects/projects.dna.gz'
