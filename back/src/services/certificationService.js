import { Certification } from '../db';
import dateToString from '../utils/dateObjToString';

class certificationService {
  static async addCertificationInfo({
    title,
    detail,
    certificationDate,
    userId,
  }) {
    const certification = await Certification.create({
      title,
      detail,
      certificationDate,
      userId,
    });

    certification.certificationDate = dateToString(
      certification.certificationDate
    );
    return certification;
  }

  static async getCertificationInfo(userId) {
    let certifications = await Certification.findByUserId(userId);

    if (certifications.length < 1) {
      throw new Error('자격증 정보가 존재하지 않습니다.');
    }

    certifications = certifications.map((cer) => {
      cer.certificationDate = dateToString(cer.certificationDate);
      return cer;
    })

    return certifications;
  }

  static async setCertificationInfo({ certificationId, toUpdate }) {
    const hasCertification = await Certification.findByCertificationId(
      certificationId
    );

    if (!hasCertification) {
      throw new Error('certificationId에 대응하는 데이터가 존재하지 않습니다.');
    }

    const { title, detail, certificationDate } = toUpdate;

    const newValues = {
      ...(title && { title }),
      ...(detail && { detail }),
      ...(certificationDate && { certificationDate }),
    };

    const certification = await Certification.update({certificationId, newValues});
    certification.certificationDate = dateToString(certification.certificationDate);

    return certification;
  }

  static async deleteCertificationInfo(certificationId) {
    const certification = await Certification.deleteByCertificationId(
      certificationId
    );
    if (certification.deletedCount < 1) {
      throw new Error('존재하지 않는 도큐먼트입니다.');
    }
    return certification.deletedCount;
  }
}

export { certificationService };
