import { FiExternalLink } from 'react-icons/fi'
import cvData from '@/data/cv.json'
import { useLanguage } from '@/hooks/useLanguage'
import { getIcon } from '@/utils/icons'
import * as S from '@/components/contents/CertificatesContent/styles'

const VALIDATE_URL = 'https://www.btkakademi.gov.tr/portal/certificate/validate?certificateId='

export default function CertificatesContent() {
  const { t } = useLanguage()

  return (
    <S.Grid>
      {cvData.certificates.map((cert, i) => (
        <S.Card key={i} $color={cert.color}>
          <S.Ribbon $color={cert.color}>{t.certificates.verified}</S.Ribbon>
          <S.CardHeader>
            <S.IconRing $color={cert.color}>{getIcon(cert.icon)}</S.IconRing>
            <div>
              <S.Title>{cert.title}</S.Title>
              {cert.instructor && <S.Instructor>{cert.instructor}</S.Instructor>}
            </div>
          </S.CardHeader>
          <S.Meta>
            <S.Issuer>{cert.issuer}</S.Issuer>
            <S.DateBadge $color={cert.color}>{cert.date}</S.DateBadge>
          </S.Meta>
          {cert.certificateId && (
            <S.VerifyLink
              href={`${VALIDATE_URL}${cert.certificateId}`}
              target="_blank"
              rel="noopener noreferrer"
              $color={cert.color}
            >
              <FiExternalLink size={12} />
              {t.certificates.showCertificate}
            </S.VerifyLink>
          )}
        </S.Card>
      ))}
    </S.Grid>
  )
}
