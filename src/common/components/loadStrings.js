
/* eslint-disable no-undef */
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

// 언어 파일 목록을 가져옵니다.
// 언어 파일 json을 불러오거나, 네비게이션 바에 표시할 때 사용합니다.
export const langs = readdirSync(
  join(__static, 'strings')
).map(lang => lang.replace('.json', ''))

// 언어 파일 json을 불러옵니다.
// 아래와 같은 object가 됩니다.
/* {
  ko: {
    ...,
  },
  en: {
    ...,
  },
} */
// build 이후에도 json 파일을 수정할 수 있습니다.
export const strings = langs.reduce(
  (acc, lang) => ({
    ...acc,
    [lang]: JSON.parse(
      readFileSync(
        join(__static, 'strings', `${lang}.json`),
        'utf8'
      )
    )
  }),
  {}
)