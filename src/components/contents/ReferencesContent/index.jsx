import { FiPhone, FiMail } from 'react-icons/fi'
import cvData from '@/data/cv.json'
import * as S from '@/components/contents/ReferencesContent/styles'

export default function ReferencesContent() {
  return (
    <S.Grid>
      {cvData.references.map((ref, i) => (
        <S.Card key={i}>
          <S.Avatar>{ref.avatar}</S.Avatar>
          <S.Body>
            <S.Name>{ref.name}</S.Name>
            <S.Role>{ref.role}</S.Role>
            <S.ContactList>
              {ref.phone && (
                <S.ContactItem>
                  <S.ContactIcon>
                    <FiPhone size={13} />
                  </S.ContactIcon>
                  <S.ContactLabel>Telefon :</S.ContactLabel>
                  <S.ContactLink href={`tel:${ref.phone}`}>{ref.phone}</S.ContactLink>
                </S.ContactItem>
              )}
              {ref.email && (
                <S.ContactItem>
                  <S.ContactIcon>
                    <FiMail size={13} />
                  </S.ContactIcon>
                  <S.ContactLabel>Email :</S.ContactLabel>
                  <S.ContactLink href={`mailto:${ref.email}`}>{ref.email}</S.ContactLink>
                </S.ContactItem>
              )}
            </S.ContactList>
          </S.Body>
        </S.Card>
      ))}
    </S.Grid>
  )
}
