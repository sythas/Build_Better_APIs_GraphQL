import { readFileSync } from 'fs'
import { resolve } from 'path'
import gql from 'graphql-tag'

export default path =>
  gql(readFileSync(resolve(process.cwd(), 'src', path), 'utf8'))
