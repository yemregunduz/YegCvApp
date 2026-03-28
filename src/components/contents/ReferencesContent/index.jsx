import cvData from '@/data/cv.json'
import * as S from '@/components/contents/ReferencesContent/styles'

export default function ReferencesContent() {
  return (
    <S.Grid>
      {cvData.references.map((ref, i) => (
        <S.Card key={i}>
          <S.Avatar>{ref.avatar}</S.Avatar>
          <S.Body>
            <S.Quote>{ref.quote}</S.Quote>
            <S.Footer>
              <S.Name>{ref.name}</S.Name>
              <S.Separator>//</S.Separator>
              <S.Role>{ref.role}</S.Role>
            </S.Footer>
          </S.Body>
        </S.Card>
      ))}
    </S.Grid>
  )
}
