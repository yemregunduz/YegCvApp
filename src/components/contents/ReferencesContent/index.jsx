import { FiPhone, FiMail } from 'react-icons/fi'
import cvData from '@/data/cv.json'
import { useLanguage } from '@/hooks/useLanguage'
import { YEGCard } from '@/libs'
import * as S from '@/components/contents/ReferencesContent/styles'

export default function ReferencesContent() {
  const { t } = useLanguage()

  return (
    <S.Grid>
      {cvData.references.map((ref, i) => (
        <YEGCard key={i}>
          <S.CardInner>
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
                    <S.ContactLabel>{t.references.phone} :</S.ContactLabel>
                    <S.ContactLink href={`tel:${ref.phone}`}>{ref.phone}</S.ContactLink>
                  </S.ContactItem>
                )}
                {ref.email && (
                  <S.ContactItem>
                    <S.ContactIcon>
                      <FiMail size={13} />
                    </S.ContactIcon>
                    <S.ContactLabel>{t.references.email} :</S.ContactLabel>
                    <S.ContactLink href={`mailto:${ref.email}`}>{ref.email}</S.ContactLink>
                  </S.ContactItem>
                )}
              </S.ContactList>
            </S.Body>
          </S.CardInner>
        </YEGCard>
      ))}
    </S.Grid>
  )
}
